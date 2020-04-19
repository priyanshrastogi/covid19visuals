import React from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

function IndiaCovidCounter(props) {
  const indiaLatest = props.indiaCovid.statewise;
  
  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-warning">
          <p className="heading">Total Infected</p>
          <p className="title is-5">{indiaLatest ? parseInt(indiaLatest[0].confirmed).toLocaleString() : <Loader />}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-danger">
          <p className="heading">Total Deaths</p>
          <p className="title is-5">{indiaLatest ? parseInt(indiaLatest[0].deaths).toLocaleString() : <Loader />}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-success">
          <p className="heading">Total Recovered</p>
          <p className="title is-5">{indiaLatest ? parseInt(indiaLatest[0].recovered).toLocaleString() : <Loader />}</p>
        </div>
      </div>
      <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
        <div style={styles.item} className="has-background-info">
          <p className="heading">Total Active</p>
          <p className="title is-5">{indiaLatest ? parseInt(indiaLatest[0].active).toLocaleString() : <Loader />}</p>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {indiaCovid: state.indiaCovid};
}

export default connect(mapStateToProps)(IndiaCovidCounter);

const styles = {
  item: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5
  }
}