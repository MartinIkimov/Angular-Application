package com.example.angularwebprojectbackend.service;

import com.example.angularwebprojectbackend.model.entity.MediaEntity;

public interface MediaService {
    void saveMedia(MediaEntity media);

    MediaEntity findMediaById(Long id);
}
