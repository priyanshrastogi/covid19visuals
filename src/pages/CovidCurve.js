import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGlobalData } from '../actions';
import Hero from '../components/Hero';
import CovidCurveTable from '../components/CovidCurveTable';
import Notification from '../components/Notification';
import CovidTimeSeriesGraph from '../components/CovidTimeSeriesGraph';
import CovidCurveAnalysis from '../components/CovidCurveAnalysis';

function CovidCurve(props) {

  useEffect(() => {
    if(Object.keys(props.facts).length === 0) {
      props.getGlobalData();
    }
  }, []);

  let curveFacts = props.facts.curve;
  let globalFacts = props.facts.global;

  if(curveFacts && globalFacts) {
    return (
      <div>
        <Hero type='link' title={`The Curve`} subtitle='Is it flattening?' date={props.globalCovid.date}/>
        <div className="container" style={{marginTop: 40}}>
          <CovidTimeSeriesGraph covidTimeSeries={props.globalCovidTimeSeries} covidTimeSeriesDelta={props.globalCovidDailyDelta} title='Global Charts'/>
          <CovidCurveAnalysis/>
        </div>
        <Hero type='link' title={`The Curve is Flattening`} subtitle='In These Countries' date={props.globalCovid.date} id='flatcurve'/>
        <div style={{marginTop: 40}} className="container is-fluid">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div style={{marginBottom: 20}}>
                <Notification content={<span><strong>L7DACGR: Last 7 Days Active Cases Growth Rate. If it's negative that means active cases are declining in last 7 days. So Curve is Flattening.</strong></span>} type='success'/>
              </div>
              <CovidCurveTable data={curveFacts} headerColumn='Country/Region' headerAccessor='country' />
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return <div>Getting data for you...</div>
  }
}

function mapStateToProps(state) {
  return {facts: state.facts, globalCovid: state.globalCovid, globalCovidTimeSeries: state.globalCovidTimeSeries, globalCovidDailyDelta: state.globalCovidDailyDelta};
}

export default connect(mapStateToProps, { getGlobalData })(CovidCurve);