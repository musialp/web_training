import React from 'react';

import pizzaImage from '../../assets/pizza.jpg';

import classes from './PizzaImage.css';

const PizzaImage = (props) => (
    <div className={classes.PizzaImage}>
        <img src={pizzaImage} className={classes.Image} />
    </div>
);

export default PizzaImage;
