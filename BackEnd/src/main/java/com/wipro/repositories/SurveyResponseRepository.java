package com.wipro.repositories;

import java.util.List;

import com.wipro.models.SurveyResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long>{ 

    @Query(value = "select s from SurveyResponse s where s.emailId=?1 and s.surveyId=?2")
    public SurveyResponse findByEmailIdAndSurveyId(String emailId, Long surveyId);

    @Query(value= "select s from SurveyResponse s where s.takenOn >=?2 and s.takenOn<=?3 and surveyId=?1")
    public List<SurveyResponse> findByDateRange(Long surveyId, Long from, Long to);
    
    @Query(value= "select s from SurveyResponse s where s.takenOn >=?2 and surveyId=?1")
    public List<SurveyResponse> findByDateFrom(Long surveyId, Long from);

    @Query(value= "select s from SurveyResponse s where s.takenOn<=?2 and surveyId=?1")
    public List<SurveyResponse> findByDateTo(Long surveyId, Long to);

    public List<SurveyResponse> findBySurveyId(Long surveyId);
}
