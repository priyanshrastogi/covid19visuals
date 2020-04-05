import React from 'react';

export default function GlobalCovidCounter(props) {
  return (
    <div class="columns is-mobile is-multiline">
      <div class="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-warning">
          <p class="heading">Total Infected</p>
          <p class="title is-4">{props.globalCovid.confirmed ? props.globalCovid.confirmed.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div class="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-danger">
          <p class="heading">Total Deaths</p>
          <p class="title is-4">{props.globalCovid.deaths ? props.globalCovid.deaths.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div class="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-success">
          <p class="heading">Total Recovered</p>
          <p class="title is-4">{props.globalCovid.recovered ? props.globalCovid.recovered.toLocaleString() : '--'}</p>
        </div>
      </div>
      <div class="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-info">
          <p class="heading">Countries/Regions</p>
          <p class="title is-4">{props.globalCovid.ncountries ? props.globalCovid.ncountries : '--'}</p>
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