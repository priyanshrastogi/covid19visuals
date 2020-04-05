import React from 'react';

export default function Hero(props) {
  return (
    <section class={`hero is-${props.type}`}>
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-4">
            {props.title}
          </h1>
          <h2 class="subtitle">
            {props.subtitle}
          </h2>
          <div class="tags has-addons">
            <p>
              <span class="tag is-dark">Last Updated</span>
              <span class="tag is-light">{props.date ?  new Date(props.date).toLocaleDateString(): '--'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}