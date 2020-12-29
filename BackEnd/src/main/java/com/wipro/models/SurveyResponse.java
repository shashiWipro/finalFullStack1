package com.wipro.models;

import java.util.*;

import javax.persistence.*;

@Entity
public class SurveyResponse {

    @Id
    @GeneratedValue
    Long id;

    Long createdOn;
    String emailId;
    String name;
    Long surveyId;
    String surveyName;
    Long takenOn;
    Long validTill;
    
    @OneToMany(cascade=CascadeType.ALL)
    @JoinTable(name="response_question_answer_mapping",joinColumns=@JoinColumn(name="response_id"),inverseJoinColumns=@JoinColumn(name="question_id"))
    Collection<QuestionAnswer> questions = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Long createdOn) {
        this.createdOn = createdOn;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getsurveyId() {
        return surveyId;
    }

    public void setsurveyId(Long surveyId) {
        this.surveyId = surveyId;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public Long getTakenOn() {
        return takenOn;
    }

    public void setTakenOn(Long takenOn) {
        this.takenOn = takenOn;
    }

    public Long getValidTill() {
        return validTill;
    }

    public void setValidTill(Long validTill) {
        this.validTill = validTill;
    }

    public Collection<QuestionAnswer> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<QuestionAnswer> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "SurveyResponse [createdOn=" + createdOn + ", emailId=" + emailId + ", id=" + id + ", name=" + name
                + ", questions=" + questions + ", surveyName=" + surveyName + ", surveyId=" + surveyId + ", takenOn="
                + takenOn + ", validTill=" + validTill + "]";
    }

    public SurveyResponse() {
        super();
    }

    public SurveyResponse(Long createdOn, String emailId, String name, Long surveyId, String surveyName, Long takenOn,
            Long validTill, Collection<QuestionAnswer> questions) {
        super();
        this.createdOn = createdOn;
        this.emailId = emailId;
        this.name = name;
        this.surveyId = surveyId;
        this.surveyName = surveyName;
        this.takenOn = takenOn;
        this.validTill = validTill;
        this.questions = questions;
    }

}