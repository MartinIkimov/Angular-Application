package com.example.EverExpanding.model.view;

import com.example.EverExpanding.model.entity.Category;
import com.example.EverExpanding.model.entity.Comment;
import com.example.EverExpanding.model.entity.MediaEntity;
import com.example.EverExpanding.model.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

public class PostInProfileView {

    private long id;
    private LocalDateTime createdOn;
    private String title;
    private String description;
    private Integer likes;
    private MediaEntity media;
    private List<Category> categories;

    public PostInProfileView() {
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public MediaEntity getMedia() {
        return media;
    }

    public void setMedia(MediaEntity media) {
        this.media = media;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
