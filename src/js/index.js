
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from "./views/base";


// Global state of the app
/*
    - Search Object
    - Current recipe object
    - Shopping list object
    - Liked recipes

*/
const state = {
    
};
/* Search Controller
 */
const controlSearch = async () =>{
    // 1) Get query from view

     const query = searchView.getInput();
 
    


    if(query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
             // 4) Search for recipes.
            await state.search.getResults();
            console.log(state.recipe.ingredients);
            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            console.log('Something wrong with the search...');
            clearLoader();
        }
       
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
         
    }
});


/* Recipe Controller
 */
const controlRecipe = async () => {
    // Extracting hash with hashchange
    // Get ID from url
    const id = window.location.hash.replace('#', '');


    if(id){
        // Prepare UI for changes

        // Create new recipe object.
        state.recipe = new Recipe(id);


        try{       
        // Get recipe data. and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // Calculate servings and time.
        state.recipe.calcTime();
        state.recipe.calcServings();

        // Render recipe.
        // console.log(state.recipe);
         }catch{
             alert('Error processing recipe!');
         }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// windows.addEventListener('load', controlRecipe);
// Creating 1 event listener with different parameters.
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
