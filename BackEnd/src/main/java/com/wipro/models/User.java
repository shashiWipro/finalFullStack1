package com.wipro.models;

import javax.persistence.*;

@Entity
public class User {

    @Id
    private String userName;

    private String password;

    @Override
    public String toString() {
        return "User [password=" + password + ", userName=" + userName + "]";
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User(String userName, String password) {
        super();
        this.userName = userName;
        this.password = password;
    }

    public User() {
        super();
    }
}