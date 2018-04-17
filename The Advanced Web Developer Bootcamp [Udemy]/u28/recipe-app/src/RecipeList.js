import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import './RecipeList.css'

class RecipeList extends Component {
    static propTypes = {
        recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
        onDelete: PropTypes.func.isRequired
    }

    render() {
        const {onDelete} = this.props;
        const recipes = this.props.recipes.map((r, index) => (
            <Recipe id={r.id}
                    key={r.id}
                    title={r.title}
                    ingredients={r.ingredients}
                    img={r.img}
                    instructions={r.instructions}
                    onDelete={onDelete} />
        ));
        return (
            <div className="recipe-list">
                {recipes}
            </div>
        );
    }
}

export default RecipeList;
