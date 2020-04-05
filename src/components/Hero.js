import React from 'react';

export default function Hero(props) {
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
              <span className="tag is-light">{props.date ?  new Date(props.date).toLocaleDateString(): '--'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}