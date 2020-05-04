import React,{ Component } from 'react';
import classes from'./App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {

  constructor(props) {
    super(props);
    console.log('App.js constructor');
  }

  state = {
    persons: [
      { id: 'asf1', name: 'Max', age:28 },
      { id: 'bsf2', name: 'Mujahid', age:29},
      { id: 'csf3', name: 'Manu', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
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
    this.setState( {persons: persons} )
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
  let persons = null;

  if( this.state.showPersons ) {
    persons = 
        <Persons
          persons={this.state.persons} 
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />;
  }
  
  return (
    <div className="classes.App">
      <Cockpit
        title={this.props.appTitle} 
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        clicked={this.togglePersonsHandler} />
      {persons}
    </div>
  );
 }
}

export default App;
