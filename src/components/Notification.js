import React from 'react';
import { Link } from 'react-router-dom';

export default function Notification(props) {
  
  const [visible, setVisible] = React.useState(true);
  
  return (
    <div>
      {visible 
      ?
      <div className={`notification is-${props.type}`} style={{marginBottom: 0}}>
        <button className="delete" onClick={() => setVisible(false)}></button>
        <p>{props.content} <Link to={props.link}>{props.linkTitle}</Link></p>
      </div> 
      :
      null
      }
    </div>
  )
}