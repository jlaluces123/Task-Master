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

    async componentDidUpdate(prevState) {
        if (prevState.todos !== this.state.todos) {
            const res = await fetch(
                'https://interview-practice-todo-server.herokuapp.com/todos'
            );
            const json = await res.json();
            this.setState({ todos: json });
            return false;
        }
        return false;
    }

    saveTodo = async e => {
        e.preventDefault();

        const options = {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.inputRef.current.value })
        };

        const res = await fetch(
            'https://interview-practice-todo-server.herokuapp.com/todos',
            options
        );
        const json = await res.json();
        console.log(json);

        this.setState(prevState => {
            return {
                todos: [...prevState.todos, json]
            };
        });

        this.inputRef.current.value = null;
        return false;
    };

    deleteTodo = async e => {
        e.preventDefault();

        const res = await fetch(
            `https://interview-practice-todo-server.herokuapp.com/todos/${e.target.id}`
        );
        const json = await res.json();
        this.setState(prevState => {
            return { todos: [...this.state.todos, json] };
        });
        return false;
    };

    render() {
        return (
            <div className='wrapper'>
                <form onSubmit={this.saveTodo}>
                    <input type='text' ref={this.inputRef} />
                    <ul>
                        {this.state.todos.map(todo => {
                            return (
                                <li id={todo._id} key={todo._id}>
                                    {todo.name}
                                    <button onClick={this.deleteTodo}>X</button>
                                </li>
                            );
                        })}
                    </ul>
                </form>
            </div>
        );
    }
}

export default App;
