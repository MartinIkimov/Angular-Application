package com.example.angularwebprojectbackend.repository;

import com.example.angularwebprojectbackend.model.entity.Role;
import com.example.angularwebprojectbackend.model.entity.enums.RoleNameEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRole(RoleNameEnum admin);
}
