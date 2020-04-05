import React, { useState } from 'react';
import { connect } from 'react-redux';
import {LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import *  as d3f from 'd3-format';
 
function GlobalTimeSeriesGraph(props) {

  const [type, setType] = useState('confirmed');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const colorMap = {
    confirmed: '#8884d8',
    active: '#8884d8',
    recovered: '#82ca9d',
    deaths: '#ff7300'
  }

  return (
    <div style={{marginBottom: 40}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
        <p className="title is-4"  style={{paddingTop: 7}}>Global Charts</p>
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
      <div className="columns">
        <div className="column">
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={props.globalCovidTimeSeries} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
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
            <BarChart data={props.globalCovidDailyDelta} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
              <XAxis dataKey="date" tickFormatter={(v) => v.substring(5)}/>
              <YAxis tickFormatter={(v) => d3f.format('.2s')(v)}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey={type} fill={colorMap[type]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {globalCovidTimeSeries: state.globalCovidTimeSeries, globalCovidDailyDelta: state.globalCovidDailyDelta};
}

export default connect(mapStateToProps)(GlobalTimeSeriesGraph);

