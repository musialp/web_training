import React, { Component, Fragment } from 'react';

import Button from '../../UI/Button/Button';

//This was turned into classed component for debuging purposes only.

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredient => {
                return (
                    <li key={ingredient}>
                        {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}: {this.props.ingredients[ingredient]}
                    </li>
                )
            })
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.orderCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.orderContinued}>CONTINUE</Button>
            </Fragment>
        )
    }
}

export default OrderSummary;
