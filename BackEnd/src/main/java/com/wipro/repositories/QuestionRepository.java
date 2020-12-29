package com.wipro.repositories;

import com.wipro.models.Question;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long>{ 

}
