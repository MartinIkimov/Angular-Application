package com.example.EverExpanding.model.view;

import com.example.EverExpanding.model.entity.Category;
import com.example.EverExpanding.model.entity.MediaEntity;
import com.example.EverExpanding.model.entity.UserEntity;

import java.util.List;

public class PostViewModelSummary {
    private Long id;
    private String title;
    private String description;
    private MediaEntity media;
    private String author;
    private long authorId;
    private List<Category> categories;
    private boolean canDelete;

    public PostViewModelSummary() {
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MediaEntity getMedia() {
        return media;
    }

    public void setMedia(MediaEntity media) {
        this.media = media;
    }

    public boolean isCanDelete() {
        return canDelete;
    }

    public void setCanDelete(boolean canDelete) {
        this.canDelete = canDelete;
    }

    public long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(long authorId) {
        this.authorId = authorId;
    }
}
