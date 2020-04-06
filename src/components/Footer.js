import React from 'react';

export default function Footer() {
  return (
    <footer class="footer" style={{marginTop: 50}}>
      <div className="columns">
        <div className="column has-text-centered">
          <p>This data is sourced from <a target="__blank" href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>, which takes data from WHO, US CDC, Various News Sources and Govts.</p>
        </div>
        <div className="column has-text-centered">
          <p>This data and visualizations are updated daily automatically. 100% Accuracy of the data and visualizations is not guaranteed.</p>
        </div>
        <div className="column has-text-centered">
          <p>This project is open-source. To contribute, make a PR to <a href="https://github.com/priyanshrastogi/covid19visuals">priyanshrastogi/covid19visuals</a>.</p>
        </div>
      </div>
      <div class="content has-text-centered">
        <p>
          <strong>Covid19 Visuals is a not-for-profit project </strong> by <a href="https://priyanshrastogi.com">Priyansh Rastogi</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
        </p>
      </div>
    </footer>
  )
}