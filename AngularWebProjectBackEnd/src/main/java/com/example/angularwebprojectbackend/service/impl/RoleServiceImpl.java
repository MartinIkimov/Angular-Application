package com.example.angularwebprojectbackend.service.impl;

import com.example.angularwebprojectbackend.model.entity.Role;
import com.example.angularwebprojectbackend.model.entity.enums.RoleNameEnum;
import com.example.angularwebprojectbackend.repository.RoleRepository;
import com.example.angularwebprojectbackend.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findByRole(RoleNameEnum admin) {

        return roleRepository.findByRole(admin);
    }

    @Override
    public void initRoles() {
        if(roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setRole(RoleNameEnum.ADMIN);

            Role userRole = new Role();
            userRole.setRole(RoleNameEnum.USER);

            roleRepository.saveAll(List.of(userRole, adminRole));
        }
    }
}
