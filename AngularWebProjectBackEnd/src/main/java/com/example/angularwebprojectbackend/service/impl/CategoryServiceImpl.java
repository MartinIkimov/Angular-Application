package com.example.angularwebprojectbackend.service.impl;

import com.example.angularwebprojectbackend.model.entity.Category;
import com.example.angularwebprojectbackend.repository.CategoryRepository;
import com.example.angularwebprojectbackend.service.CategoryService;
import org.springframework.stereotype.Service;



@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void saveCategory(Category cat) {
        categoryRepository.save(cat);
    }
}
