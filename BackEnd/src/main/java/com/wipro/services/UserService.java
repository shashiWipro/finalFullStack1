package com.wipro.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.MessagingException;

import com.wipro.models.ResponseObject;
import com.wipro.models.SurveyResponse;
import com.wipro.repositories.SurveyResponseRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService { 
    
	@Autowired
    SurveyResponseRepository surveyResponseRepository;

	@Autowired
    private JavaMailSender javaMailSender;

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);

    public ResponseObject saveResponse(SurveyResponse surveyResponse) {
        
        LOGGER.info("Saving Response {}", surveyResponse);
        ResponseObject ro = new ResponseObject(true, "response saved successfully");
        this.surveyResponseRepository.save(surveyResponse);
        this.sendEmail(surveyResponse);
        LOGGER.info("Response saved");
        return ro;
    }

    public ResponseObject checkuser(SurveyResponse surveyResponse) {
        
        LOGGER.info("Checking user {}", surveyResponse);
        ResponseObject responseObject;
        SurveyResponse response =  this.surveyResponseRepository.findByEmailIdAndSurveyId(surveyResponse.getEmailId(), surveyResponse.getsurveyId());
        if (response == null) {
            responseObject = new ResponseObject(true, "New user");
        } else {
            responseObject = new ResponseObject(false, "Already taken");
        }
        LOGGER.info("Result {}", responseObject);
        return responseObject;
    }

    public boolean sendEmail(SurveyResponse receipent) {

        LOGGER.info("Sending  email notification to {}", receipent.getEmailId());
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(receipent.getEmailId());

        msg.setSubject("Survey submission notification");
        String message = "Hello  " + receipent.getName() + 
                        "\nThis is to notify that you have successfully submitted " + 
                        receipent.getSurveyName() + " survey\n Thanks & Regards,\nCampaign Management System";
        msg.setText(message);

        try {
            javaMailSender.send(msg);
            LOGGER.info("Email notification sent to {}", receipent.getEmailId());
        } catch (Exception e) {
            LOGGER.info("Some error occured while sending email to {}", receipent.getEmailId());
            e.printStackTrace();
        }
        return true;
    }

}
