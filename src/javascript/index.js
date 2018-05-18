import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
    render(){
        return(
            <h1>Hello World !</h1>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root'));