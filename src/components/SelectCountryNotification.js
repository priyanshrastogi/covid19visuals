import React from 'react';
import { Link } from 'react-router-dom';
import codeToName from '../data/alpha2toname';

export default function SelectCountryNotification(props) {
  
  const [visible, setVisible] = React.useState(true);
  const [selectedCountry, setSelectedCountry] = React.useState('in');

  return (
    <div>
      {visible 
      ?
      <div className="notification is-black has-text-centered" style={{marginBottom: 0, borderRadius: 0}}>
        <button className="delete" onClick={() => setVisible(false)}></button>
        <p style={{marginBottom: 10}}>Select Country to View Detailed Situation</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{maxWidth: '50vw'}}>
            <span class="select has-text-black is-small">
              <select onChange={(e) => setSelectedCountry(e.target.value)}>
                {Object.keys(codeToName).map((value, index) => {
                  return <option value={value} selected={value === selectedCountry} key={index}>{codeToName[value]}</option>
                  }
                )}
              </select>
            </span>
          </div>
          <div>
            <Link className='button is-light is-small' style={{paddingRight: 20, paddingLeft: 20}} to={`/${selectedCountry}`}>Go</Link>
          </div>
        </div>
      </div> 
      :
      null
      }
    </div>
  )
}