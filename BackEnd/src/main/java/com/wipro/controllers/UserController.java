package com.wipro.controllers;

import com.wipro.models.ResponseObject;
import com.wipro.models.SurveyResponse;
import com.wipro.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value="/saveResponse", method = RequestMethod.POST)
    public ResponseObject saveResponse(@RequestBody SurveyResponse surveyResponse) {
        return this.userService.saveResponse(surveyResponse);
    }

    
    @RequestMapping(value="/checkUser", method = RequestMethod.POST)
    public ResponseObject checkUser(@RequestBody SurveyResponse surveyResponse) {
        return this.userService.checkuser(surveyResponse);
    }
}
