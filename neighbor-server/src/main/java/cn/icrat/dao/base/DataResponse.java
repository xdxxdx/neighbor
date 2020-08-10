package cn.icrat.dao.base;



public class DataResponse<T> extends RestResponse {
    private T data;

    public DataResponse() {
        super();
    }

    public DataResponse(int errorCode, String errorMessage) {
        super(errorCode, errorMessage);
    }

    public DataResponse(T data) {
        super();
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
