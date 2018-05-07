import React from 'react';
import ReactDOM from 'react-dom';
import API from './utils/api.js';

console.log('api');

API.test().then(res=>{
 console.log(res);
});

 ReactDOM.render(
     <h1>Hello, world!!</h1>,
     document.getElementById('root')
 );