import React,{ Component } from 'react';
import classes from'./App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';


class App extends Component {

  constructor(props) {
    super(props);
    console.log('App.js constructor');
  }

  state = {
    persons: [
      { id: 'asf1', name: 'Max', age: 28 },
      { id: 'bsf2', name: 'Mujahid', age: 29},
      { id: 'csf3', name: 'Manu', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props,state) {
    console.log("  getDerivedStateFromProps ");
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons; it will lead to delete the original State
    // const persons = this.state.persons.slice(); correct way
    // es6 way
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.stat.persons[personIndex]); alternat of ...

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState((prevState, props ) => {
      return {
        persons: persons, changeCounter: prevState.changeCounter +1 
        
      };
      //alert("Name changed number of times: " + prevState.changeCounter)

    } ); 
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
  let persons = null;

  if( this.state.showPersons ) {
    persons = 
        <Persons
          persons={this.state.persons} 
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated} 
        />;
  }
  
  return (
    <WithClass classes="classes.App">
      <Cockpit
        title={this.props.appTitle} 
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        clicked={this.togglePersonsHandler}
        login={this.loginHandler} />
      {persons}
    </WithClass>
  );
 }
}

export default App;
