package com.example.EverExpanding.repository;

import com.example.EverExpanding.model.entity.Post;
import com.example.EverExpanding.model.view.PostViewModelSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
