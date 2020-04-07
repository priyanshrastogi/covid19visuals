import React, { useState } from 'react';
import { connect } from 'react-redux';
import {LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import *  as d3f from 'd3-format';
 
function CountrywiseTimeSeriesGraph(props) {

  const [type, setType] = useState('confirmed');
  const [country, setCountry] = useState(156);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }

  const colorMap = {
    confirmed: '#8884d8',
    active: '#8884d8',
    recovered: '#82ca9d',
    deaths: '#ff7300'
  }

  const renderCountryOptions = () => {
    return props.countrywiseCovidTimeSeries.map((value, index) => {
      return <option value={index} selected={index === country}>{value.country}</option>
      }
    );
  }

  return (
    <div style={{marginBottom: 40, marginTop: 40}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
        <div className="has-text-centered" style={{marginBottom: 20, maxWidth: '50vw'}}>
          <span class="select">
            <select onChange={handleCountryChange}>
              {renderCountryOptions()}
            </select>
          </span>
        </div>
        <div className="has-text-centered" style={{marginBottom: 20}}>
          <span class="select">
            <select onChange={handleTypeChange}>
              <option value='confirmed' selected={'confirmed' === type}>Confirmed</option>
              <option value='active' selected={'active' === type}>Active</option>
              <option value='deaths' selected={'deaths' === type}>Deaths</option>
              <option value='recovered' selected={'recovered' === type}>Recovered</option>
            </select>
          </span>
        </div>
      </div>
      {props.countrywiseCovidTimeSeries.length !== 0 && props.countrywiseCovidDailyDelta.length !== 0
      ?
      <div className="columns">
        <div className="column">
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={props.countrywiseCovidTimeSeries[country].data} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
              <XAxis dataKey="date" tickFormatter={(v) => v.substring(5)}/>
              <YAxis tickFormatter={(v) => d3f.format('.2s')(v)}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Line type="monotone" dataKey={type} stroke={colorMap[type]} strokeWidth={2} dot={false} fillOpacity={0} activeDot={{r: 5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="column">
          <ResponsiveContainer width='100%' height={200}>
            <BarChart data={props.countrywiseCovidDailyDelta[country].data} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
              <XAxis dataKey="date" tickFormatter={(v) => v.substring(5)}/>
              <YAxis tickFormatter={(v) => d3f.format('.2s')(v)}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey={type} fill={colorMap[type]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      :
      null
      }
      <div className="has-text-centered" style={{marginTop: 20, paddingRight: 10, paddingLeft: 20}}>
        <p>You might find inaccuracy in above visualizations. This is due to inaccuracy in the data from source, which is provided by <a target="__blank" href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>. We are working to integrate more reliable data sources.</p>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {countrywiseCovidTimeSeries: state.countrywiseCovidTimeSeries, countrywiseCovidDailyDelta: state.countrywiseCovidDailyDelta, countries: state.countries};
}

export default connect(mapStateToProps)(CountrywiseTimeSeriesGraph);

