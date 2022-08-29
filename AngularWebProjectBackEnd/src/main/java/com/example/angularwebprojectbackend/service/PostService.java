package com.example.angularwebprojectbackend.service;


import com.example.angularwebprojectbackend.model.entity.Post;
import com.example.angularwebprojectbackend.model.service.PostServiceModel;
import com.example.angularwebprojectbackend.model.view.PostViewModelSummary;

import java.util.List;

public interface PostService {
    void savePost(PostServiceModel postServiceModel, String name, Long id);

    List<PostViewModelSummary> getAllPosts();

    PostViewModelSummary findById(Long id, String email);

    Post findPostById(Long routeId);

    void deleteOffer(Long id);

    boolean isOwner(String name, Long id);

    void updatePost(PostServiceModel serviceModel, Long id);

    boolean findByUsernameAndPostIdCanDelete(long id, String name);
}
