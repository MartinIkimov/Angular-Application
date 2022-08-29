package com.example.angularwebprojectbackend.model.binding;

public class UserLoginErrorBindingModel {
    private String email;
    private String password;

    public UserLoginErrorBindingModel() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
