package cn.icrat.dao.entity;

import cn.icrat.dao.base.BaseDomain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class AmountDetail  extends BaseDomain {

    private Long finishTime;
    private Integer type;       //0 充值  1 提现   2 赠送爱心币 3 接受赠送爱心币 4 使用爱心币 5 分享收入 6 签到
    private Long userId;        //记账用户id
    private Integer amount;
    private Integer heartPoint;
    private Integer balance;
    private Long targetId;       //相关用户id，被赠送人，赠送人等
    private Long itemId;

    @Basic
    @Column(name = "finishTime")
    public Long getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Long finishTime) {
        this.finishTime = finishTime;
    }

    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Basic
    @Column(name = "userId")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "amount")
    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getHeartPoint() {
        return heartPoint;
    }

    public void setHeartPoint(Integer heartPoint) {
        this.heartPoint = heartPoint;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }
}
