import React, { PureComponent } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxiliary from '../hoc/Auxiliary';
import classed from '../hoc/classed'
import classes from './App.css';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside constructor()', props);
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Update App.js] Inside shouldComponentUpdate()', nextProps, nextState);
    //     return nextState.persons !== this.state.persons ||
    //         nextState.showPersons !== this.state.showPersons;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[Update App.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[Update App.js] Inside getDerivedStateFromProps()', nextProps, prevState);
        return prevState;
    }

    getSnapshotBeforeUpdate() {
        console.log('[Update App.js] Inside getSnapshotBeforeUpdate()');
    }

    componentDidUpdate() {
        console.log('[Update App.js] Inside componentDidUpdate()');
    }

    state = {
        persons: [
            { id: 'adsa12', name: 'Piotr', age: 26 },
            { id: 'fdgdsg', name: 'Adam', age: 29 },
            { id: 'dasdas', name: 'Janusz', age: 69 },
        ],
        otherState: 'some other value',
        showPersons: false,
        toggleClicked: 0,
        authenticated: false,
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(person => {
            return person.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        }

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons });
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({ persons });
    }

    togglePersonsHandler = (event) => {
        const doesShow = this.state.showPersons;
        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1,
            }
        })
    }

    loginHandler = () => {
        this.setState({ authenticated: true });
    }

    render() {
        console.log('[App.js] Inside render()');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler} />;
        }

        return (
            <Auxiliary>
                <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
                <Cockpit
                    appTitle={this.props.appTitle}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    login={this.loginHandler}
                    clicked={this.togglePersonsHandler} />
                <AuthContext.Provider value={this.state.authenticated}>
                    {persons}
                </AuthContext.Provider>
            </Auxiliary>
        );
    }
}

export default classed(App, classes.App);
