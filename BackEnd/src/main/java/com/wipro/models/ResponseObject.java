package com.wipro.models;

public class ResponseObject {

    Boolean result;
    Object resultObject;

    @Override
    public String toString() {
        return "ResponseObject [result=" + result + ", resultObject=" + resultObject + "]";
    }


    public Object getResultObject() {
        return resultObject;
    }

    public void setResultObject(Object resultObject) {
        this.resultObject = resultObject;
    }

    public ResponseObject(Boolean result, Object resultObject) {
        super();
        this.result = result;
        this.resultObject = resultObject;
    }

    public ResponseObject() {
        super();
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }
}