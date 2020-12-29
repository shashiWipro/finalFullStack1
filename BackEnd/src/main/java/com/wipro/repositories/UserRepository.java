package com.wipro.repositories;

import com.wipro.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String>{ 

    @Query(value="select u from User u where u.userName = ?1 and u.password = ?2")
    User findByEmailAndPassword(String userName, String password);
}
