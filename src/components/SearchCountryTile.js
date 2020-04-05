import React, { useState } from 'react';
import { connect } from 'react-redux';

function SeachCountryTile(props) {
  
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = (e) => {
    const index = props.countries[e.target.value.toLowerCase()];
    if(index) {
      setSelectedCountry(index);
    }
  }
  console.log(props.countries);
  return (
    <div className="columns">
      <div className="column is-three-fifths is-offset-one-fifth">
        <div className="card" style={{padding: 20}}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" onChange={handleChange} type="text" placeholder="Search a Country"/>
            </div>
            <div className="control">
              <a className="button is-info">
                Search
              </a>
            </div>
          </div>
          {selectedCountry ? 
          <div>
            <div className="has-text-centered" style={{padding: 10}}>
              <p className="title is-5">{props.countrywiseCovid[selectedCountry].country}</p>
            </div>
            <div className="columns is-mobile is-multiline">
              <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
                <div style={styles.item}>
                  <p className="heading">Total Infected</p>
                  <p className="title is-5">{props.countrywiseCovid[selectedCountry].confirmed}</p>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
                <div style={styles.item}>
                  <p className="heading">Total Deaths</p>
                  <p className="title is-5">{props.countrywiseCovid[selectedCountry].deaths}</p>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
                <div style={styles.item}>
                  <p className="heading">Total Recovered</p>
                  <p className="title is-5">{props.countrywiseCovid[selectedCountry].recovered}</p>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarter-desktop has-text-centered">
                <div style={styles.item}>
                  <p className="heading">Total Active</p>
                  <p className="title is-5">{props.countrywiseCovid[selectedCountry].active}</p>
                </div>
              </div>
            </div>
          </div>
          :
          null
          }
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {countries: state.countries, countrywiseCovid: state.countrywiseCovid}
}

export default connect(mapStateToProps)(SeachCountryTile);

const styles = {
  item: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  }
}