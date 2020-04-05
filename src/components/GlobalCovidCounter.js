import React from 'react';

export default function GlobalCovidCounter(props) {
  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-warning">
          <p className="heading">Total Infected</p>
          <p className="title is-4">{props.globalCovid.confirmed ? props.globalCovid.confirmed.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-danger">
          <p className="heading">Total Deaths</p>
          <p className="title is-4">{props.globalCovid.deaths ? props.globalCovid.deaths.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-success">
          <p className="heading">Total Recovered</p>
          <p className="title is-4">{props.globalCovid.recovered ? props.globalCovid.recovered.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-info">
          <p className="heading">Countries/Regions</p>
          <p className="title is-4">{props.globalCovid.ncountries ? props.globalCovid.ncountries : '--'}</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5
  }
}