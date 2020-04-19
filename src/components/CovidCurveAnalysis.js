import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import codeToName from '../data/alpha2toname';
import moment from 'moment';

function CovidCurveAnalysis(props) {

  const [duration, setDuration] = useState(7);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  }

  const colorMap = {
    confirmed: '#8884d8',
    active: '#8884d8',
    recovered: '#82ca9d',
    deaths: '#ff7300'
  }

  let facts = null;
  let isFlatStr = '';

  if(props.match.path.toLowerCase() === '/india') {
    facts = props.facts['india'];
    isFlatStr = 'in India,';
  }
  else if(props.match.params.countryCode) {
    facts = props.facts[codeToName[props.match.params.countryCode.toLowerCase()].toLowerCase()];
    isFlatStr = 'in ' + codeToName[props.match.params.countryCode.toLowerCase()]+ ',';
  }
  else {
    facts = props.facts['global'];
    isFlatStr = 'Globally,'
  }

  return (
    <div style={{marginBottom: 40}}>
      <div style={{margin: 20, padding: 20}} className="card notification is-dark is-light">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p className="title is-5">Curve Analysis</p>
          <div className="has-text-centered has-text-dark" style={{marginBottom: 20}}>
            <span class="select is-small">
              <select onChange={handleDurationChange}>
                <option value={7} selected={7 === duration}>Last 7 Days</option>
                <option value={15} selected={15 === duration}>Last 15 Days</option>
                <option value={30} selected={30 === duration}>Last 30 Days</option>
              </select>
            </span>
          </div>
        </div>
        {facts ? 
        <div className="content">
          <ol>
            <li>{`In last ${duration} days, number of infected people have increased ${facts.ratioRateConfirmed[duration].ratio} times and has a rate of ${facts.ratioRateConfirmed[duration].rate} cases/day.`}</li>
            <li>{`In last ${duration} days, number of deaths due to COVID-19 have increased ${facts.ratioRateDeaths[duration].ratio} times and has a rate of ${facts.ratioRateDeaths[duration].rate} deaths/day.`}</li>
            <li>{`Highest number of Infected cases in a single day were recorded on ${moment(facts.highestConfirmed.date).format('MMMM Do YYYY')} with ${facts.highestConfirmed.confirmed} confirmed cases, since the beginning of this Pandemic.`}</li>
            <li>{`Since the Origin of COVID-19 Pandemic, Highest number of deaths were recorded on ${moment(facts.highestDeaths.date).format('MMMM Do YYYY')} with ${facts.highestDeaths.deaths} deaths in a single day.`}</li>
            <li>{`Most intense 7-days period, since the beginning of this Pandemic, was from ${moment(facts.minMaxConfirmedSlope[7].max.startDate).format('MMMM Do YYYY')} to ${moment(facts.minMaxConfirmedSlope[7].max.endDate).format('MMMM Do YYYY')} that added about ${facts.minMaxConfirmedSlope[7].max.slope} confirmed cases per day, that is ${facts.minMaxConfirmedSlope[7].max.total} cases in 7 days.`}</li>
          </ol>
        </div>
        :
        null
        }
      </div>
      {facts ? facts.latestActive[7].rate <= 0 ?
      <div style={{margin: 20, padding: 20}} className="card notification is-success">
        <p className="title is-5">Is The Curve Flattening?</p>
        <p className="title is-6">{`Yes, The Curve is Flattening ${isFlatStr} because the number of active cases are decreasing for last 7 days.`}</p>
      </div>
      :
      <div style={{margin: 20, padding: 20}} className="card notification is-danger">
        <p className="title is-5">Is The Curve Flattening?</p>
        <p className="title is-6">{`No, The Curve is not Flattening ${isFlatStr} because the number of active cases are increasing for last 7 days.`}</p>
      </div>
      : <div></div>}
    </div>
  )
}

function mapStateToProps(state) {
  return {facts: state.facts};
}

export default withRouter(connect(mapStateToProps)(CovidCurveAnalysis));