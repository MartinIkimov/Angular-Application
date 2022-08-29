package com.example.angularwebprojectbackend.service;

import com.example.angularwebprojectbackend.model.entity.Role;
import com.example.angularwebprojectbackend.model.entity.enums.RoleNameEnum;

import java.util.List;

public interface RoleService {
    Role findByRole(RoleNameEnum admin);

    void initRoles();
}
