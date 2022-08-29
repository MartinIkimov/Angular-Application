package com.example.angularwebprojectbackend.service;

import com.example.angularwebprojectbackend.model.view.StatsViewModel;

public interface StatsService {
    StatsViewModel getStats();

    void onRequest();
}
