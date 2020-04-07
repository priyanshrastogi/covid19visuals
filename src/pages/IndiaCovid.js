import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getIndiaCovidData } from '../actions';
import Hero from '../components/Hero';
import IndiaCovidCounter from '../components/IndiaCovidCounter';

function IndiaCovid(props) {
  
  useEffect(() => {
    if(Object.keys(props.indiaCovid).length === 0) {
      props.getIndiaCovidData();
    }
  }, []);

  let datetime = props.indiaCovid.statewise ? props.indiaCovid.statewise[0].lastupdatedtime : '--';
  if(datetime !== '--') {
    const date = datetime.split(' ')[0].split('/');
    datetime = `${date[1]}/${date[0]}/${date[2]}  ${datetime.split(' ')[1]}`
  }

  return (
    <div>
      <Hero type='link' title='India Covid-19 Information' subtitle='Statewise Information is coming soon' date={datetime} dontadd30/>
      <div className="container is-fluid" style={{marginTop: 20}}>
        <IndiaCovidCounter/>
      </div>
      <div className="container">
        {/*time series india*/}
      </div>
      <div style={{marginTop: 40}} className="container is-fluid">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            {/*props.countrywiseCovid.length !== 0 ?
            <CovidTable data={props.countrywiseCovid}/>
            :
            null*/}
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