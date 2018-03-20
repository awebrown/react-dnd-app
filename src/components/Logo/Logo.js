import React from 'react';

import gpaLogo from '../../assets/images/gpa-logo2.jpg';
import classes from './Logo.css';

function hey() {
  alert('It does this... Nothing.')
}

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}} onClick={hey} style={{cursor: 'pointer'}}>
        <img src={gpaLogo} alt="gpa logo" />
    </div>
);

export default logo;
