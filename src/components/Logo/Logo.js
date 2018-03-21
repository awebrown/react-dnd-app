import React from 'react';
import classes from './Logo.css';
import genericLogo from '../../assets/images/generic-logo.svg';

function hey() {
  alert('This does nothing.... But it could!')
}

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}} onClick={hey} style={{cursor: 'pointer'}}>
        <img src={genericLogo} alt="logo" />
    </div>
);

export default logo;
