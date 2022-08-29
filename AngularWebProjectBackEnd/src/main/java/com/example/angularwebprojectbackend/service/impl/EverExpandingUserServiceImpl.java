package com.example.angularwebprojectbackend.service.impl;

import com.example.angularwebprojectbackend.model.entity.UserEntity;
import com.example.angularwebprojectbackend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class EverExpandingUserServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public EverExpandingUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return EverExpandingUser.build(user);
    }
}
