import React from 'react';
import classes from './Person.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import PropTypes from 'prop-types';


const person = (props) => {
  return (
    <Auxiliary>
      {props.isAuth ? <p> Authenticated!</p> :<p>Please log in</p>  }
     <div className={classes.Person}>
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age} year old
        </p>
      <p>{props.children}</p>
      <input
       key="21"
       //ref={(inputEl) => {inputEl.focus()}}
       type="text"
       onChange={props.changed}
       value={props.name} />
      </div>
      </Auxiliary>
  )
};

person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default person;
