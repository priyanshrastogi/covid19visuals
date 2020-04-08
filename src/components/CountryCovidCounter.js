import React from 'react';
import PropTypes from 'prop-types';

function CountryCovidCounter(props) {
  
  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-warning">
          <p className="heading">Total Infected</p>
          <p className="title is-4">{props.covidData ? props.covidData.confirmed.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-danger">
          <p className="heading">Total Deaths</p>
          <p className="title is-4">{props.covidData ? props.covidData.deaths.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-success">
          <p className="heading">Total Recovered</p>
          <p className="title is-4">{props.covidData ? props.covidData.recovered.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-info">
          <p className="heading">Total Active</p>
          <p className="title is-4">{props.covidData ? props.covidData.active.toLocaleString() : '--'}</p>
        </div>
      </div>
    </div>
  )
}

export default CountryCovidCounter;

CountryCovidCounter.propTypes = {
  covidData: PropTypes.object
}

const styles = {
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5
  }
}