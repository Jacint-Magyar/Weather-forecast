import React from 'react';
import PropTypes from 'prop-types';
import './Location.css';

const Location = ({ country, city }) => {
  return (
    <div className="location">
      <span className="city-name">{city}, </span>
      <span className="country-name">{country}</span>
    </div>
  );
};

Location.propTypes ={
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};

export default Location;