package com.example.angularwebprojectbackend.model.entity;

import com.example.angularwebprojectbackend.model.entity.enums.RoleNameEnum;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity{
    private RoleNameEnum role;

    public Role() {
    }

    @Enumerated(EnumType.STRING)
    public RoleNameEnum getRole() {
        return role;
    }

    public void setRole(RoleNameEnum role) {
        this.role = role;
    }
}
