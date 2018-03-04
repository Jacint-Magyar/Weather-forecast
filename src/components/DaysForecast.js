import React from 'react';
import Days from './Days';
import { occurence } from '../helpers';
import { dayNumber, dayList } from '../currentDay';

const DaysForecast = (props) => {
  let days;
  
  if (props.gotData) {
    const dataList = props.city.list;
    
    // Find indexes when next day starts
    let indexes = [];
    let prevElem = dataList[0].dt_txt.substring(0, 10);

    dataList.forEach(function(elem, index) {

      if (elem.dt_txt.substring(0, 10) !== prevElem) {
        indexes.push(index);
        prevElem = this[index].dt_txt.substring(0, 10);
      }
    }, dataList);

    // Divide dataList into days 
    const day1 = dataList.slice(0, indexes[0]);
    const day2 = dataList.slice(indexes[0], indexes[1]);
    const day3 = dataList.slice(indexes[1], indexes[2]);
    const day4 = dataList.slice(indexes[2], indexes[3]);
    const day5 = dataList.slice(indexes[3], indexes[4]);
    const day6 = dataList.slice(indexes[4]);
    // Make one array of all days
    const allDays = [day1, day2, day3, day4, day5, day6];

    // Find the lowest and highest temperatures as well as the icons to display
    const lowestTemps = [];
    const highestTemps = [];
    const prevalentWeatherIcon = [];
    const dates = [];

    allDays.forEach((day) => {

      const sortLowest = day.sort((a, b) => {
        return a.main.temp_max - b.main.temp_max;
      });
      lowestTemps.push(sortLowest[0].main.temp_min);
      
      const sortHighest = day.sort((a, b) => {
        return b.main.temp_max - a.main.temp_max;
      });
      highestTemps.push(sortHighest[0].main.temp_max);
      
      prevalentWeatherIcon.push(occurence(day).weather[0].icon);

      // ez nem mukodik ha csak 1 object van valamelyik napban (a nap vege fele, amikor csak a 21:00-as adat van)
      dates.push(day[0].dt_txt.substring(5, 10))
      
    });
    const daysArray = [
      [lowestTemps[0], highestTemps[0], prevalentWeatherIcon[0], dates[0]],
      [lowestTemps[1], highestTemps[1], prevalentWeatherIcon[1], dates[1]],
      [lowestTemps[2], highestTemps[2], prevalentWeatherIcon[2], dates[2]],
      [lowestTemps[3], highestTemps[3], prevalentWeatherIcon[3], dates[3]],
      [lowestTemps[4], highestTemps[4], prevalentWeatherIcon[4], dates[4]],
      [lowestTemps[5], highestTemps[5], prevalentWeatherIcon[5], dates[5]]
    ];
    
    days = daysArray.map((elem, index) => {

      return <Days
              key={index}
              date={elem[3]}
              day={index === 0 ? 'Today' : dayList[dayNumber + index]}
              icon={elem[2]}
              tempMin={Math.round(elem[0])}
              tempMax={Math.round(elem[1])}
              />;
    });
  } else {
    days = '';
  }
    
  return (
      <ul>
        {days}
      </ul>
  );
}

export default DaysForecast;