package com.wipro.models;

import javax.persistence.*;

@Entity
public class QuestionAnswer {

    @Id
    @GeneratedValue
    Long id;

    String question;
    Boolean isMandatory;
    String answer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Boolean getIsMandatory() {
        return isMandatory;
    }

    public void setIsMandatory(Boolean isMandatory) {
        this.isMandatory = isMandatory;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "QuestionAnswer [answer=" + answer + ", id=" + id + ", isMandatory=" + isMandatory + ", question="
                + question + "]";
    }

    public QuestionAnswer() {
        super();
    }

    public QuestionAnswer(String question, Boolean isMandatory, String answer) {
        super();
        this.question = question;
        this.isMandatory = isMandatory;
        this.answer = answer;
    }

    

}