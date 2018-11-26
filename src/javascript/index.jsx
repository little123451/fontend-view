import React from 'react';
import ReactDOM from 'react-dom';
import API from './utils/api';

class Index extends React.Component {
    render(){
        API.test();
        return(
            <h1>Hello World !</h1>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root'));