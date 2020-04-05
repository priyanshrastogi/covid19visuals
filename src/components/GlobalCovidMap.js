import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import features from '../data/mapData';

export default function GlobalCovidMap(props) {
  return (
    <div style={{height: '50vh', marginBottom: 40}}>
      {props.countrywiseCovid.length !== 0 ?
      <ResponsiveChoropleth
        data={props.countrywiseCovid}
        features={features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="oranges"
        domain={[ 0, 100000 ]}
        unknownColor="#ffffff"
        label="properties.name"
        value="confirmed"
        valueFormat=".2s"
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
      />
      :
      null
      }
    </div>
  )
}