import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGlobalData } from '../actions';
import codeToName from '../data/alpha2toname';
import Hero from '../components/Hero';
import CovidTimeSeriesGraph from '../components/CovidTimeSeriesGraph';
import CountryCovidCounter from '../components/CountryCovidCounter';
import { Redirect } from 'react-router-dom';
import CovidCurveAnalysis from '../components/CovidCurveAnalysis';

function CountryCovid(props) {

  useEffect(() => {
    if(props.countrywiseCovid.length === 0) {
      props.getGlobalData();
    }
  }, []);

  let countryData = null, countryTimeSeries = null, countryCovidDelta = null;
  if(props.countrywiseCovid && props.countries)
    countryData = props.countrywiseCovid[props.countries[codeToName[props.match.params.countryCode.toLowerCase()].toLowerCase()]];

  if(props.countrywiseCovidTimeSeries && props.countries)
    countryTimeSeries = props.countrywiseCovidTimeSeries[props.countries[codeToName[props.match.params.countryCode.toLowerCase()].toLowerCase()]];

  if(props.countrywiseCovidDailyDelta && props.countries)
    countryCovidDelta = props.countrywiseCovidDailyDelta[props.countries[codeToName[props.match.params.countryCode.toLowerCase()].toLowerCase()]];

  if(props.match.params.countryCode.toLowerCase() === 'in') {
    return <Redirect to='/india'/>
  }

  return (
    <div>
      <Hero type='link' title={`${codeToName[props.match.params.countryCode]} Covid-19 Information`} subtitle='Daily Updates, Facts and Analysis' date={countryData ? countryData.date : null}/>
      <div className="container is-fluid" style={{marginTop: 20}}>
        <CountryCovidCounter covidData={countryData}/>
      </div>
      <div className="container" style={{marginTop: 40}}>
        <CovidTimeSeriesGraph covidTimeSeries={countryTimeSeries ? countryTimeSeries.data : []} covidTimeSeriesDelta={countryCovidDelta ? countryCovidDelta.data : []} title={`${codeToName[props.match.params.countryCode]} Charts`}/>
        <CovidCurveAnalysis />
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {countrywiseCovid: state.countrywiseCovid, countries: state.countries, countrywiseCovidTimeSeries: state.countrywiseCovidTimeSeries, countrywiseCovidDailyDelta: state.countrywiseCovidDailyDelta};
}

export default connect(mapStateToProps, { getGlobalData })(CountryCovid);