package com.example.angularwebprojectbackend.repository;

import com.example.angularwebprojectbackend.model.entity.Comment;
import com.example.angularwebprojectbackend.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findCommentByAuthorAndMessage(UserEntity author, String message);
}
