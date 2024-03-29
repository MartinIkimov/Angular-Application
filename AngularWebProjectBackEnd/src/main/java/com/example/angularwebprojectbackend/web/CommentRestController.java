package com.example.angularwebprojectbackend.web;

import com.example.angularwebprojectbackend.model.binding.CommentBindingModel;
import com.example.angularwebprojectbackend.model.service.CommentServiceModel;
import com.example.angularwebprojectbackend.model.validation.ApiError;
import com.example.angularwebprojectbackend.model.view.CommentViewModel;
import com.example.angularwebprojectbackend.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class CommentRestController {

    private final CommentService commentService;
    private final ModelMapper modelMapper;

    public CommentRestController(CommentService commentService, ModelMapper modelMapper) {
        this.commentService = commentService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/api/{postId}/comments")
    public ResponseEntity<List<CommentViewModel>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    @PostMapping("/api/{postId}/comments")
    public ResponseEntity<CommentViewModel> newComment(@PathVariable Long postId, @RequestBody @Valid CommentBindingModel commentBindingModel, Principal principal) {


        CommentServiceModel serviceModel = modelMapper.map(commentBindingModel, CommentServiceModel.class);
        serviceModel.setPostId(postId);
        serviceModel.setCreator(principal.getName());

        CommentViewModel newComment = commentService.createComment(serviceModel);

        URI locationOfNewComment = URI.create(String.format("/api/%s/comments/%s", postId, newComment.getCommentId()));
        return ResponseEntity.created(locationOfNewComment).body(newComment);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> onValidationFailure(MethodArgumentNotValidException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
        ex.getFieldErrors().forEach(fe ->
                apiError.addFieldWithError(fe.getField()));

        return ResponseEntity.badRequest().body(apiError);
    }


}
