package com.wipro.CapstoneBackEnd;

import com.wipro.models.User;
import com.wipro.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.wipro.repositories")
@EntityScan(basePackages = "com.wipro.models")
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.wipro.controllers,com.wipro.services")
public class CapstoneBackEndApplication implements CommandLineRunner{

	@Autowired
	UserRepository userRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(CapstoneBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		User admin = new User("admin", "admin");
		this.userRepository.save(admin);
	}
	
}
