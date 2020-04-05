import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ResponsiveChoropleth } from '@nivo/geo';
import features from '../data/mapData';

function GlobalCovidMap(props) {
  
  const [type, setType] = useState('confirmed');
  const [domain, setDomain] = useState(100000);
  const [colors, setColors] = useState('oranges')

  const domainMap = {
    confirmed: 100000,
    active: 100000,
    deaths: 10000,
    recovered: 50000
  }

  const colorsMap = {
    confirmed: 'oranges',
    active: 'oranges',
    deaths: 'reds',
    recovered: 'greens'
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setDomain(domainMap[e.target.value]);
    setColors(colorsMap[e.target.value]);
  }

  return (
    <div style={{marginBottom: 40, marginTop: 20}}>
      <p className="has-text-centered"><span style={{paddingTop: 10}}>Select Map Type &nbsp; &nbsp;</span>
      <span class="select">
        <select onChange={handleTypeChange}>
          <option value='confirmed' selected={'confirmed' === type}>Confirmed</option>
          <option value='active' selected={'active' === type}>Active</option>
          <option value='deaths' selected={'deaths' === type}>Deaths</option>
          <option value='recovered' selected={'recovered' === type}>Recovered</option>
        </select>
      </span>
      </p>
      {props.countrywiseCovid.length !== 0 ?
      <div style={{marginTop: 20}}>
        <div className="is-hidden-mobile" style={{height: '50vh'}}>
          <ResponsiveChoropleth
            data={props.countrywiseCovid}
            features={features}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            colors={colors}
            domain={[ 0, domain ]}
            unknownColor="#ffffff"
            label="properties.name"
            value={type}
            valueFormat=".2s"
            projectionTranslation={[ 0.5, 0.5 ]}
            projectionRotation={[ 0, 0, 0 ]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            projectionScale={120}
          />
        </div>
        <div className="is-hidden-tablet" style={{height: '50vh'}}>
          <ResponsiveChoropleth
            data={props.countrywiseCovid}
            features={features}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            colors={colors}
            domain={[ 0, domain ]}
            unknownColor="#ffffff"
            label="properties.name"
            value={type}
            valueFormat=".2s"
            projectionTranslation={[ 0.4, 0.5 ]}
            projectionRotation={[ 0, 0, 0 ]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            projectionScale={55}
          />
        </div>
      </div>
      :
      null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {countrywiseCovid: state.countrywiseCovid};
}

export default connect(mapStateToProps)(GlobalCovidMap);