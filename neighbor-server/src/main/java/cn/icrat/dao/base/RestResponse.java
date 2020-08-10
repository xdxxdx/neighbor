package cn.icrat.dao.base;

public class RestResponse
        implements Response {
    private boolean success;
    private int errorCode;
    private String errorMessage;

    public RestResponse() {
        this.success = true;
        this.errorCode = 0;
        this.errorMessage = "";
    }
    public RestResponse(String errorMessage) {
        this.success = true;
        this.errorCode = 0;
        this.errorMessage = errorMessage;
    }
    public RestResponse(int errorCode, String errorMessage) {
        this.success = false;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public int getErrorCode() {
        return this.errorCode;
    }

    public String getErrorMessage() {
        return this.errorMessage;
    }
}