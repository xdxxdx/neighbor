package cn.icrat.dao.base;

public abstract interface Response{
    public abstract boolean isSuccess();

    public abstract int getErrorCode();

    public abstract String getErrorMessage();
}