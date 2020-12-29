package com.wipro.models;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

@Entity
public class Survey {

    @Id
    @GeneratedValue
    Long id;

    String surveyName;
    Long createdOn;
    String description;
    String status;
    Long validTill;
    @OneToMany(cascade=CascadeType.ALL)
    @JoinTable(name="survey_question_mapping",joinColumns=@JoinColumn(name="survey_id"),inverseJoinColumns=@JoinColumn(name="question_id"))
    Collection<Question> questions = new ArrayList<>();

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public Long getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Long createdOn) {
        this.createdOn = createdOn;
    }

    public Collection<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<Question> questions) {
        this.questions = questions;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Survey() {
        super();
    }

    @Override
    public String toString() {
        return "Survey [createdOn=" + createdOn + ", id=" + id + ", questions=" + questions + ", status=" + status
                + ", surveyName=" + surveyName + ", validTill=" + validTill + "]";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getValidTill() {
        return validTill;
    }

    public void setValidTill(Long validTill) {
        this.validTill = validTill;
    }

    public Survey(String surveyName, Long createdOn, String status, Long validTill, Collection<Question> questions) {
        super();
        this.surveyName = surveyName;
        this.createdOn = createdOn;
        this.status = status;
        this.validTill = validTill;
        this.questions = questions;
    }
}