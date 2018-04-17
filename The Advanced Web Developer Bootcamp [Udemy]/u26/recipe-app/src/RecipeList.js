import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';
import './RecipeList.css'

class RecipeList extends Component {
    static defaultProps = {
        recipes: [{
          title: 'Spaghetti',
          ingredients: ['pasta', '8 cups water', '1 box spaghetti'],
          img: 'spaghetti.jpeg',
          instructions: 'Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce.'
        }, {
          title: 'Milkshake',
          ingredients: ['2 scoops ice cream', '8 ounces milk'],
          img: 'milkshake.jpeg',
          instructions: 'Combine ice cream and milk. Blend until creamy.'
        }, {
          title: 'Avocado Toast',
          ingredients: ['2 slices of bread', '1 avocado', '1 tablespoon olive oil', '1 pinch of salt', 'pepper'],
          img: 'toast.jpg',
          instructions: 'Toast bread. Slice avocado and spread on bread. Add salt, oil and pepper to taste.'
        }]
    }

    static propTypes = {
        recipes: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    render() {
        const recipes = this.props.recipes.map((r, index) => (
            <Recipe key={index}
                    title={r.title}
                    ingredients={r.ingredients}
                    img={r.img}
                    instructions={r.instructions} />
        ));
        return (
            <div className="recipe-list">
                {recipes}
            </div>
        );
    }
}

export default RecipeList;
