package com.wipro.repositories;

import java.util.List;

import com.wipro.models.Survey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SurveyRepository extends JpaRepository<Survey, Long>{ 

    @Query(value = "select * from survey where status='PUBLISHED'", nativeQuery = true)
    public List<Survey> findAllPublishedSurveys();

    @Modifying
    @Transactional
    @Query(value = "UPDATE survey SET status='EXPIRED' WHERE valid_till<:currentDate and status!='EXPIRED'", nativeQuery = true)
    public int updateStatus(@Param("currentDate") Long currentTime);

    @Query(value = "select s from Survey s where s.status!='DRAFT' order by s.id")
    public List<Survey> findSurveysForAnalysis();
}
