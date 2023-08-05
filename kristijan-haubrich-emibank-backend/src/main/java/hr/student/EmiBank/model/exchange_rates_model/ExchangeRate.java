package hr.student.EmiBank.model.exchange_rates_model;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ExchangeRate {
    public Double exchangeRate(String fromCurrency, String toCurrency, Double amount) throws Exception{
        Double absAmount = Math.abs(amount);

        OkHttpClient client = new OkHttpClient().newBuilder().build();

        Request request = new Request.Builder()
                .url("https://api.apilayer.com/exchangerates_data/convert?to="+toCurrency+"&from="+fromCurrency+"&amount="+absAmount)
                .addHeader("apikey", "5zm5QV1NWCY4tdDUgHPfYVh6VHrVktxl")
                .method("GET",null)
                .build();
        Response response = client.newCall(request).execute();

        ObjectMapper mapper = new ObjectMapper();
        ExchangeRatesResponse ratesResponse = mapper.reader().forType(ExchangeRatesResponse.class).readValue(response.body().string());



        if (amount < 0) return ratesResponse.result-(ratesResponse.result*2);

        return ratesResponse.result;
    }
}
