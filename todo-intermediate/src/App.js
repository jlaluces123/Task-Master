import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    render() {
        return <h1>Hello World</h1>;
    }
}

export default App;
