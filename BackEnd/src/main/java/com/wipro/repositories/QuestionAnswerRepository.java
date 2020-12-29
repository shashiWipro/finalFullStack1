package com.wipro.repositories;

import com.wipro.models.QuestionAnswer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long>{ 

}
