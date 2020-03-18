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

    saveTodo = async e => {
        e.preventDefault();

        let todoValue = this.inputRef.current.value;

        this.setState({ todos: [...this.state.todos, todoValue] });

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
