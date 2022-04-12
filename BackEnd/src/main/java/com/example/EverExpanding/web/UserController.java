package com.example.EverExpanding.web;

import com.example.EverExpanding.model.binding.UserLoginErrorBindingModel;
import com.example.EverExpanding.model.binding.UserRegisterBindingModel;
import com.example.EverExpanding.model.binding.UserRegisterSignUpModel;
import com.example.EverExpanding.model.entity.UserEntity;
import com.example.EverExpanding.model.service.UserServiceModel;
import com.example.EverExpanding.model.view.UserViewModel;
import com.example.EverExpanding.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestBody UserLoginErrorBindingModel userLoginErrorBindingModel) {
        UserEntity user = userService.findByEmail(userLoginErrorBindingModel.getEmail());
        if(Objects.equals(user.getPassword(), userLoginErrorBindingModel.getPassword())) {
            return true;
        }
        return false;
    }
    

//    @PostMapping("/login-error")
//    public ResponseEntity<?> loginError() {
//        return new ResponseEntity<>("Invalid username or password", HttpStatus.BAD_REQUEST);
//    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterSignUpModel userRegisterSignUpModel) {

        if(userService.usernameExists(userRegisterSignUpModel.getUsername())) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }
        if(userService.emailExists(userRegisterSignUpModel.getEmail())) {
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }

        UserServiceModel newUser = modelMapper.map(userRegisterSignUpModel, UserServiceModel.class);
        userService.registerUserAndLogin(newUser);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/profile")
    public String profile(Principal principal, Model model) {
        UserViewModel userViewModel = modelMapper.map(userService.findByEmail(principal.getName()), UserViewModel.class);
        model.addAttribute("profile", userViewModel);
        return "profile";
    }


    @GetMapping("/profile/{id}")
    public String userProfile(@PathVariable Long id, Model model) {
        UserViewModel userViewModel = modelMapper.map(userService.findById(id), UserViewModel.class);
        model.addAttribute("profile", userViewModel);
        return "profile";
    }

    private boolean isUsernameUnique(UserRegisterBindingModel userRegisterBindingModel, RedirectAttributes redirectAttributes) {
        if (userService.usernameExists(userRegisterBindingModel.getUsername())) {
            redirectAttributes.addFlashAttribute("userModel", userRegisterBindingModel);
            redirectAttributes.addFlashAttribute("isUsernameUnique", true);
            return true;
        }
        return false;
    }

    private boolean isEmailUnique(UserRegisterBindingModel userRegisterBindingModel, RedirectAttributes redirectAttributes) {
        if (userService.emailExists(userRegisterBindingModel.getEmail())) {
            redirectAttributes.addFlashAttribute("userModel", userRegisterBindingModel);
            redirectAttributes.addFlashAttribute("isEmailUnique", true);
            return true;
        }
        return false;
    }

    @ModelAttribute("userModel")
    public UserRegisterBindingModel userModel() {
        return new UserRegisterBindingModel();
    }
}
