import React from 'react';
import moment from 'moment';

export default function Hero(props) {
  const date =  new Date(props.date);
  props.dontadd30 ? console.log(date) : date.setHours(date.getHours() + 30);
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
              <span className="tag is-light">{moment(date).fromNow()}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}