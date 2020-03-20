import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.inputRef = React.createRef();
    }

    async componentDidMount() {
        const res = await fetch(
            'https://interview-practice-todo-server.herokuapp.com/todos'
        );
        const json = await res.json();

        this.setState({ todos: json });
    }

    saveTodo = async e => {
        e.preventDefault();

        const options = {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo: this.inputRef.current.value })
        };

        const res = await fetch(
            'https://interview-practice-todo-server.herokuapp.com/todos',
            options
        );
        const json = await res.json();
        console.log(json);

        this.setState({ todos: json });

        this.inputRef.current.value = null;
        return false;
    };

    render() {
        return (
            <div className='wrapper'>
                <form onSubmit={this.saveTodo}>
                    <input type='text' ref={this.inputRef} />
                    <ul>
                        {this.state.todos.map((todo, idx) => {
                            return <li key={idx}>{todo}</li>;
                        })}
                    </ul>
                </form>
            </div>
        );
    }
}

export default App;
