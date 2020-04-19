import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Loader from './Loader';

export default function Hero(props) {
  let date = null;
  if(props.timezone === 'utc' && props.date) {
    const splits = props.date.split('-');
    date = new Date(Date.UTC(parseInt(splits[0]), parseInt(splits[1])-1, parseInt(splits[2])+1, 0, 15, 0));
  }
  else if(props.timezone === 'ist' && props.date) {
    date = moment.utc(props.date).subtract(330, 'minutes');
  }
  return (
    <section className={`hero is-${props.type}`}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-4">
            {props.title}
          </h1>
          <h2 className="subtitle">
            {props.subtitle}
          </h2>
          <div className="tags has-addons">
            <p>
              <span className="tag is-dark">Last Updated</span>
              {props.date ? <span className="tag is-light">{moment(date).fromNow()}</span> : <span className="tag is-light"><Loader/></span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  date: PropTypes.string,
  type: PropTypes.string,
  customDate: PropTypes.bool
}

Hero.defaultProps = {
  timezone: 'utc'
}