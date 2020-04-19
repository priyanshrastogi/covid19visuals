import React from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';

function GlobalCovidCounter(props) {
  return (
    <div>
      <div className="columns is-mobile is-multiline">
        <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
          <div style={styles.item} className="has-background-warning">
            <p className="heading">Total Infected</p>
            <p className="title is-5">{props.globalCovid.confirmed ? props.globalCovid.confirmed.toLocaleString() : <Loader/>}</p>
          </div>
        </div>
        <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
          <div style={styles.item} className="has-background-danger">
            <p className="heading">Total Deaths</p>
            <p className="title is-5">{props.globalCovid.deaths ? props.globalCovid.deaths.toLocaleString() : <Loader/>}</p>
          </div>
        </div>
        <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
          <div style={styles.item} className="has-background-success">
            <p className="heading">Total Recovered</p>
            <p className="title is-5">{props.globalCovid.recovered ? props.globalCovid.recovered.toLocaleString() : <Loader/>}</p>
          </div>
        </div>
        <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
          <div style={styles.item} className="has-background-info">
            <p className="heading">Total Active</p>
            <p className="title is-5">{props.globalCovid.active ? props.globalCovid.active.toLocaleString() : <Loader/>}</p>
          </div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
        <span></span>
        <p>{props.globalCovid.ncountries ? `Data from ${props.globalCovid.ncountries} Countries/Regions*` : <Loader />}</p>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {globalCovid: state.globalCovid};
}

export default connect(mapStateToProps)(GlobalCovidCounter);

const styles = {
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5
  }
}