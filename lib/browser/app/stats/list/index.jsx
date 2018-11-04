import React from 'react';


export default function Login(props) {
  return (
    <ol>
      {props.list.map(item =>
        <li key={item.username}>{`${item.username} | ${item.buzzerClicked}x`}</li>)}
    </ol>
  );
}
