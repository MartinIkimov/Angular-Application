package com.example.angularwebprojectbackend.service;

import com.example.angularwebprojectbackend.model.entity.UserEntity;
import com.example.angularwebprojectbackend.model.service.UserServiceModel;
import com.example.angularwebprojectbackend.model.view.UserViewModel;

import java.util.Optional;

public interface UserService {

    void registerUserAndLogin(UserServiceModel newUser);

    boolean usernameExists(String username);

    boolean emailExists(String email);

    UserEntity findByEmail(String email);

    UserViewModel findById(Long id);

    Optional<UserEntity> findByUsername(String username);

    UserEntity findUserEntityByUsername(String email);
}
