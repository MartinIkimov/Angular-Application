package com.example.angularwebprojectbackend.web;

import com.example.angularwebprojectbackend.model.entity.MediaEntity;
import com.example.angularwebprojectbackend.model.entity.Post;
import com.example.angularwebprojectbackend.model.service.PostServiceModel;
import com.example.angularwebprojectbackend.model.view.PostViewModelSummary;
import com.example.angularwebprojectbackend.service.CloudinaryImage;
import com.example.angularwebprojectbackend.service.CloudinaryService;
import com.example.angularwebprojectbackend.service.MediaService;
import com.example.angularwebprojectbackend.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PostsController {

    private final CloudinaryService cloudinaryService;
    private final MediaService mediaService;
    private final PostService postService;
    private final ModelMapper modelMapper;

    public PostsController(CloudinaryService cloudinaryService, MediaService mediaService, PostService postService, ModelMapper modelMapper) {
        this.cloudinaryService = cloudinaryService;
        this.mediaService = mediaService;
        this.postService = postService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPost(@RequestParam(value = "imageFile", required = false) MultipartFile file,
                                     @RequestParam("title") String title,
                                     @RequestParam("categories") String categories,
                                     @RequestParam("description") String description,
                                     Principal principal) throws IOException {
        if(Objects.equals(title.trim(), "") || Objects.equals(categories.trim(), "")||Objects.equals(description.trim(), "") ) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PostServiceModel postServiceModel = new PostServiceModel();
        postServiceModel.setTitle(title);
        postServiceModel.setCategories(categories);
        postServiceModel.setDescription(description);
        MediaEntity media = null;

        if(file != null) {
            media = createMediaEntity(file);
            mediaService.saveMedia(media);
        }
        if(media != null) {
            postService.savePost(postServiceModel, principal.getName(), media.getId());
        } else {
            postService.savePost(postServiceModel, principal.getName(), null);
        }


        return new ResponseEntity<>(postServiceModel,HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Page<PostViewModelSummary> allPosts(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "3") int size) {
        Pageable paging = PageRequest.of(page, size);
        return postService.findAll(paging);
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<PostViewModelSummary> postDetails(@PathVariable("id") long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Post post = postService.findPostById(id);
        PostViewModelSummary postViewModelSummary = modelMapper.map(post, PostViewModelSummary.class);
        postViewModelSummary.setAuthorId(post.getAuthor().getId());
        postViewModelSummary.setAuthor(post.getAuthor().getUsername());
        postViewModelSummary.setCanDelete(postService.findByUsernameAndPostIdCanDelete(id, authentication.getName()));

        if(post != null) {
            return new ResponseEntity<>(postViewModelSummary, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOffer(@PathVariable Long id, Principal principal) {
        if(!postService.isOwner(principal.getName(), id)) {
            throw new RuntimeException();
        }
        try {
            postService.deleteOffer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}/edit")
    public ResponseEntity<?> editPost(@PathVariable long id,
                            @RequestParam(value = "imageFile", required = false) MultipartFile file,
                           @RequestParam(value = "title", required = true) String title,
                           @RequestParam(value = "categories", required = true) String categories,
                           @RequestParam(value = "description", required = true) String description,
                           Principal principal) throws IOException {

        if(Objects.equals(title.trim(), "") || Objects.equals(categories.trim(), "")||Objects.equals(description.trim(), "") ) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PostServiceModel postServiceModel = new PostServiceModel();
        postServiceModel.setTitle(title);
        postServiceModel.setCategories(categories);
        postServiceModel.setDescription(description);
        postServiceModel.setId(id);
        MediaEntity media = null;

        if(file != null) {
            media = createMediaEntity(file);
            mediaService.saveMedia(media);
        }
        if(media != null) {
            postService.updatePost(postServiceModel, media.getId());
        } else {
            postService.updatePost(postServiceModel, null);
        }

        return new ResponseEntity<>(postServiceModel,HttpStatus.CREATED);
    }

    private MediaEntity createMediaEntity(MultipartFile file) throws IOException {
        final CloudinaryImage uploaded = this.cloudinaryService.upload(file);
        MediaEntity media = new MediaEntity();
        media.setUrl(uploaded.getUrl());
        media.setTitle(file.getOriginalFilename());
        media.setPublicId(uploaded.getPublicId());

        return media;
    }
}
