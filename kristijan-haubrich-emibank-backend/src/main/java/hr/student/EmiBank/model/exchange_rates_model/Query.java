package hr.student.EmiBank.model.exchange_rates_model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Query{
    public String from;
    @JsonProperty("to")
    public String toCurrency;
    public int amount;
}