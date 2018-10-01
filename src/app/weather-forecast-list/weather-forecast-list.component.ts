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
  }

  getWeather() {
    this.weatherBitUrl = `${weatherBit.urlBase}?city=${this.searchText}&key=${weatherBit.apiKey}`;
    //subscribe to weatherbit forecase results here
    this.http.get(this.weatherBitUrl).subscribe(
      (response) => {
        console.log('WEATHER RESULTS ....');
        console.log(response);
        console.log('WEATHER RESULTS ....');
        
        this.cityDetails = new CityDetails();
        this.cityDetails.cityName = response['city_name'];
        this.cityDetails.stateCode = response['state_code'];
        this.cityDetails.countryCode = response['country_code'];
        this.cityDetails.latitude = response['lat'];
        this.cityDetails.longitude = response['lon'];
        this.cityDetails.timeZone = response['timezone'];
        this.weatherForecasts = response['data'];
      }
    );
  }

  ngOnInit() {
  }

}
