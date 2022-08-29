package com.example.angularwebprojectbackend.web;

import com.example.angularwebprojectbackend.config.jwt.JwtUtils;
import com.example.angularwebprojectbackend.model.binding.UserLoginBindingModel;
import com.example.angularwebprojectbackend.model.entity.Post;
import com.example.angularwebprojectbackend.model.entity.UserEntity;
import com.example.angularwebprojectbackend.model.request.UserRegister;
import com.example.angularwebprojectbackend.model.response.JwtResponse;
import com.example.angularwebprojectbackend.model.response.MessageResponse;
import com.example.angularwebprojectbackend.model.service.UserServiceModel;
import com.example.angularwebprojectbackend.model.view.PostInProfileView;
import com.example.angularwebprojectbackend.model.view.UserProfileViewModel;
import com.example.angularwebprojectbackend.service.UserService;
import com.example.angularwebprojectbackend.service.impl.EverExpandingUser;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    public UserController(UserService userService, ModelMapper modelMapper, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginBindingModel userLoginBindingModel) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginBindingModel.getUsername(), userLoginBindingModel.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        EverExpandingUser userDetails = (EverExpandingUser) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getLikes(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegister userRegister) {
        if (userService.usernameExists(userRegister.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Username is already taken!");
        }
        if (userService.emailExists(userRegister.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Email is already taken");
        }
        UserServiceModel newUser = modelMapper.map(userRegister, UserServiceModel.class);
        userService.registerUserAndLogin(newUser);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Transactional
    @GetMapping("/profile")
    public ResponseEntity<List<PostInProfileView>> getAllCurrentUserPosts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user1 = userService.findByUsername(authentication.getName());
        List<PostInProfileView> posts = new ArrayList<>();
        for (Post post : user1.get().getPosts()) {
            PostInProfileView postInProfileView = new PostInProfileView();
            postInProfileView.setId(post.getId());
            postInProfileView.setCategories(post.getCategories());
            postInProfileView.setLikes(post.getLikes());
            postInProfileView.setDescription(post.getDescription());
            postInProfileView.setMedia(post.getMedia());
            postInProfileView.setTitle(post.getTitle());
            postInProfileView.setCreatedOn(post.getCreatedOn());
            posts.add(postInProfileView);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<UserProfileViewModel> userProfile(@PathVariable Long id) {
        UserProfileViewModel userProfileViewModel = modelMapper.map(userService.findById(id), UserProfileViewModel.class);
        return new ResponseEntity<>(userProfileViewModel, HttpStatus.OK);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }
}
