import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { weatherBit } from '../../environments/environment';

import { WeatherForecast } from '../models/weather-forecast';
import { CityDetails } from '../models/city-details';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent implements OnInit {
  @Input() searchText: string;
  
  weatherBitUrl: string;
  weatherForecasts: WeatherForecast[];
  cityDetails: CityDetails;
  
  constructor(private http: HttpClient) {
    this.weatherForecasts = [];
    this.weatherBitUrl = ``;
    this.cityDetails = null;
  }

  getWeather() {
    this.weatherBitUrl = `${weatherBit.urlBase}?city=${this.searchText}&key=${weatherBit.apiKey}`;
    //subscribe to weatherbit forecase results here
    this.http.get(this.weatherBitUrl).subscribe(
      (response) => {
        if (response === null) {
          console.log(`Failed to get weather in ${this.searchText}!`);
          this.cityDetails = null;
          this.weatherForecasts = [];
          return;
        }

        console.log('WEATHER RESULTS ....');
        console.log(response);
        console.log('WEATHER RESULTS ....');
        
        // set detailed city information to CityDetails 
        this.cityDetails = new CityDetails();
        this.cityDetails.cityName = response['city_name'];
        this.cityDetails.stateCode = response['state_code'];
        this.cityDetails.countryCode = response['country_code'];
        this.cityDetails.latitude = response['lat'];
        this.cityDetails.longitude = response['lon'];
        this.cityDetails.timeZone = response['timezone'];
        
        // set detailed weather information to WeatherForecasts list
        let originWeatherForecasts = response['data'];
        this.weatherForecasts = [];
        originWeatherForecasts.forEach(originWeatherForecast => {
          let weatherForecast = new WeatherForecast();
          weatherForecast.datetime = originWeatherForecast['datetime'];
          weatherForecast.temp = originWeatherForecast['temp'];
          weatherForecast.maxTemp = originWeatherForecast['max_temp'];
          weatherForecast.minTemp = originWeatherForecast['min_temp']
          weatherForecast.weatherDescription = originWeatherForecast.weather.description;
          weatherForecast.windDirectionFull = originWeatherForecast['wind_cdir_full'];
          weatherForecast.windSpeed = originWeatherForecast['wind_spd'];

          this.weatherForecasts.push(weatherForecast);
        });
      }
    );
  }

  ngOnInit() {
  }

}
