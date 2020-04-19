import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getIndiaCovidData } from '../actions';
import Hero from '../components/Hero';
import IndiaCovidCounter from '../components/IndiaCovidCounter';
import CovidTable from '../components/CovidTable';
import CovidTimeSeriesGraph from '../components/CovidTimeSeriesGraph';
import CovidCurveAnalysis from '../components/CovidCurveAnalysis';

function IndiaCovid(props) {
  
  useEffect(() => {
    if(Object.keys(props.indiaCovid).length === 0) {
      props.getIndiaCovidData();
    }
  }, []);

  let datetime = props.indiaCovid.statewise ? props.indiaCovid.statewise[0].lastupdatedtime : null;
  if(datetime) {
    const date = datetime.split(' ')[0].split('/');
    datetime = `${date[1]}/${date[0]}/${date[2]}  ${datetime.split(' ')[1]}`
  }

  return (
    <div>
      <Hero type='link' title='India Covid-19 Information' subtitle='Latest Updates, Facts and Analysis' date={datetime} timezone='ist'/>
      <div className="container is-fluid" style={{marginTop: 20}}>
        <IndiaCovidCounter/>
      </div>
      <div className="container" style={{marginTop: 40}}>
        <CovidTimeSeriesGraph covidTimeSeries={props.indiaCovid.timeseries} covidTimeSeriesDelta={props.indiaCovid.timeseriesDelta} title='India Charts'/>
        <CovidCurveAnalysis />
      </div>
      <Hero type='success' title='State-wise Information' subtitle='District-level information is coming soon' date={datetime} timezone='ist'/>
      <div style={{marginTop: 40}} className="container is-fluid">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            {props.indiaCovid.statewise ?
            <CovidTable data={props.indiaCovid.statewise.slice(1)} headerColumn='State/UT' headerAccessor='state' pageSize={20}/>
            :
            null}
          </div>
        </div>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {indiaCovid: state.indiaCovid};
}

export default connect(mapStateToProps, { getIndiaCovidData })(IndiaCovid);