import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView';
import List from './models/List';
import * as listView from './views/listView';
import Likes from './models/Likes';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader, highlightSelected } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();
    if(query) {
        // New Search object and add to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // Search for recipes
            await state.search.getResults();

            // Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            console.log('Something went wrong with the search');
            console.log(error);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search) {
            searchView.highlightSelected(id);
        }

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render recipe
            clearLoader();
            // console.log(state.recipe);
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch(error) {
            console.log('Error processing recipe.');
            console.log(error);
        }
    }
}

const controlList = () => {
    // Create new list if there is none yet
    if(!state.list) {
        state.list = new List();
    }

    // Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

const controlLike = () => {
    if(!state.likes) {
        state.likes = new Likes();
    }
    const currentId = state.recipe.id;

    // User has not yet liked current recipe
    if(!state.likes.isLiked(currentId)) {
        // Add like to state
        const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img)
        //Toggle the like button
        likesView.toggleLikeBtn(true);
        // Add like to UI list
        likesView.renderLike(newLike);

        // User has liked current recipe
    } else {
        // Remove like from state
        state.likes.deleteLike(currentId);
        // Toggle the like button
        likesView.toggleLikeBtn(false);
        // Remove like from UI list
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsAndIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsAndIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to the shopping list
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')) {
        //
        controlLike();
    }
})

// Handle delete and udpate list item events
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    // Handle the count update
    } else if(e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
})
