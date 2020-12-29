package com.wipro.models;

import javax.persistence.*;

@Entity
public class Question {

    @Id
    @GeneratedValue
    Long id;

    String question;
    String responseType;
    String validation;
    String options;
    Boolean isMandatory;

    // @ManyToOne
    // @JoinColumn(name="survey_id")
    // private Survey survey;


    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getResponseType() {
        return responseType;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public String getValidation() {
        return validation;
    }

    public void setValidation(String validation) {
        this.validation = validation;
    }

    public Question() {
        super();
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    @Override
    public String toString() {
        return "Question [id=" + id + ", isMandatory=" + isMandatory + ", options=" + options + ", question=" + question
                + ", responseType=" + responseType + ", validation=" + validation + "]";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsMandatory() {
        return isMandatory;
    }

    public void setIsMandatory(Boolean isMandatory) {
        this.isMandatory = isMandatory;
    }

    public Question(String question, String responseType, String validation, String options, Boolean isMandatory) {
        this.question = question;
        this.responseType = responseType;
        this.validation = validation;
        this.options = options;
        this.isMandatory = isMandatory;
    }
}
