package com.wipro.services;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

import com.wipro.models.ResponseObject;
import com.wipro.models.Survey;
import com.wipro.models.SurveyResponse;
import com.wipro.models.User;
import com.wipro.repositories.SurveyRepository;
import com.wipro.repositories.SurveyResponseRepository;
import com.wipro.repositories.UserRepository;

import org.apache.catalina.connector.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);

	@Autowired
    UserRepository userRepository;

	@Autowired
    SurveyRepository surveyRepository;
    
	@Autowired
    SurveyResponseRepository surveyResponseRepository;

    public ResponseObject saveSurvey( Survey survey) {
        LOGGER.info("Saving Survey {}", survey);
        Survey savedData = this.surveyRepository.save(survey);
        LOGGER.info("Survey saved");
        return new ResponseObject(true, savedData);
    }

    public ResponseObject getAllSurveys() {

        this.updateSurveyStatus();
        LOGGER.info("Fetching all surveys");
        List<Survey> allSurveys = this.surveyRepository.findAll();
        LOGGER.info("All Surveys {}", allSurveys);
        return new ResponseObject(true, allSurveys);
    }

    public ResponseObject login(String userName, String password) {
        LOGGER.info("Authenticating user {}", userName);
        ResponseObject response;
        User result = this.userRepository.findByEmailAndPassword(userName, password);
        if (result == null) {
            response = new ResponseObject(false, "Invalid credentials");
        } else {
            response = new ResponseObject(true, "Success");
        }
        LOGGER.info("Authentication result {}", response);
        return response;
    }

    public ResponseObject launchSurvey(Long surveyId) {

        LOGGER.info("Publishing survey {}", surveyId);
        Survey updatedSurvey = this.surveyRepository.findById(surveyId).orElse(null);
        updatedSurvey.setStatus("PUBLISHED");
        this.surveyRepository.save(updatedSurvey);
        LOGGER.info("Published survey {}", surveyId);
        return new ResponseObject(true, updatedSurvey);
    }

    public ResponseObject getSurvey(Long surveyId) {

        ResponseObject response;
        Survey foundSurvey = this.surveyRepository.findById(surveyId).orElse(null);
        if (foundSurvey == null) {
            response = new ResponseObject(false, "Invalid surveyId");
        } else {
            response = new ResponseObject(true, foundSurvey);
        }
        return response;
    }

    public ResponseObject deleteSurvey(Long surveyId) {

        ResponseObject response = new ResponseObject(true, "Survey Deleted Successfully");;
        this.surveyRepository.deleteById(surveyId);
        return response;
    }

    public ResponseObject getPublishedSurveys() {

        LOGGER.info("Fetching published surveys");
        List<Survey> publishedSurveys = this.surveyRepository.findAllPublishedSurveys();
        LOGGER.info("All published Surveys {}", publishedSurveys);
        return new ResponseObject(true, publishedSurveys);
    }

    public void updateSurveyStatus() {

        LOGGER.info("Checking and updating survey status if any survey expired");
        Long currentTime = new Date().getTime();
        int updatedSurveys = this.surveyRepository.updateStatus(currentTime);
        LOGGER.info("Updated survey {}", updatedSurveys);

    }

    public ResponseObject createUser(String userName, String password) {

        LOGGER.info("Creating new user {}", userName);
        ResponseObject response;
        if (this.login(userName, password).getResult()) {
            response = new ResponseObject(false, "Username already exists");
        } else {
            this.userRepository.save(new User(userName, password));
            response = new ResponseObject(true, "User created successfully");
        }
        LOGGER.info("Created new user {}", userName);
        return response;
    }

    public ResponseObject getSurveysForAnalysis() {

        LOGGER.info("Getting surveys for analysis");
        ResponseObject response;
        List<Survey> surveysForAnalysis = this.surveyRepository.findSurveysForAnalysis();
        response = new ResponseObject(true, surveysForAnalysis);
        LOGGER.info("Surveys for analysis {}", surveysForAnalysis);
        return response;
    }

    public ResponseObject getSurveyResponses(Long surveyId, Long from, Long to) {

        LOGGER.info("getting survey responses {} {} {}", surveyId, from, to);
        ResponseObject response;
        List<SurveyResponse> surveysForAnalysis;
        if (from != null && to != null) {
            surveysForAnalysis = this.surveyResponseRepository.findByDateRange(surveyId, from, to);
        } else if (from == null && to == null) {
            surveysForAnalysis = this.surveyResponseRepository.findBySurveyId(surveyId);
        } else if (to == null) {
            surveysForAnalysis = this.surveyResponseRepository.findByDateFrom(surveyId, from);
        } else {
            surveysForAnalysis = this.surveyResponseRepository.findByDateTo(surveyId, to);
        }
        response = new ResponseObject(true, surveysForAnalysis);
        LOGGER.info("Survey responses {}", surveysForAnalysis);
        return response;
    }

    public ResponseObject getSurveyResponsesForChart() {

        List<Survey> surveysForAnalysis = this.surveyRepository.findSurveysForAnalysis();
        LinkedHashMap<String, Object> surveys = new LinkedHashMap<String, Object>();
        for (Survey survey: surveysForAnalysis) {
            LinkedHashMap<String, Object> data = new LinkedHashMap<String, Object>();
            data.put("name", survey.getSurveyName());
            data.put("noOfQuestions", survey.getQuestions().size());
            data.put("noOfResponses", this.surveyResponseRepository.findBySurveyId(survey.getId()).size());
            data.put("createdOn", survey.getCreatedOn());
            data.put("validTill", survey.getValidTill());
            surveys.put(survey.getSurveyName(), data);
        }
        return new ResponseObject(true, surveys);
    }
}