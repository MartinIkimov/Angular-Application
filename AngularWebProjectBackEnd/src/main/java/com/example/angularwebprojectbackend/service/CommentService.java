package com.example.angularwebprojectbackend.service;

import com.example.angularwebprojectbackend.model.service.CommentServiceModel;
import com.example.angularwebprojectbackend.model.view.CommentViewModel;

import java.security.Principal;
import java.util.List;

public interface CommentService {
    List<CommentViewModel> getComments(Long routeId);

    CommentViewModel createComment(CommentServiceModel serviceModel);

    Long findByEmailAndTextMessage(String name, String message);
}
