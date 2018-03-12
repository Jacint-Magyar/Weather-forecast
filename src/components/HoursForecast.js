import React from 'react';
import Hours from './Hours';

const HoursForecast = (props) => {

  let hours;
  
  if (props.gotData) {
    //console.log(props.city.list[0].dt_txt);
    const shortenedArray = props.city.list.slice(0, 7);
    const test = shortenedArray.slice(0,1);
    // const testa = [...test];
    // console.log(testa);

    hours = shortenedArray.map((elem, index) => {
      return <Hours
              key={index}
              hour={elem.dt_txt.substring(11, elem.dt_txt.length - 3)}
              description={elem.weather[0].description}
              icon={elem.weather[0].icon}
              temp={Math.round(elem.main.temp)}
              />;
    });
  } else {
    hours = '';
  }
    
  return (
    <ul>
      {hours}
    </ul> 
  );
}

export default HoursForecast;