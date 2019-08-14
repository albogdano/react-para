import React from 'react';
import RecipeService from './RecipeService';
import { Converter } from 'showdown';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            q: '',
            createMode: false,
            recipesList: [],
            editedRecipes: {}
        };
        this.search = this.search.bind(this);
        this.RecipeItem = this.RecipeItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        let recipes = this.listRecipes();
        let edited = {};
        recipes.then(recipes => {
            recipes.forEach((recipe, index) => {
                edited[recipe.id] = false;
            });
        }).finally(() => {
            this.setState({editedRecipes:  Object.assign(this.state.editedRecipes, edited)});
        });
    }

    async listRecipes() {
        const data = await RecipeService.get();
        const d = await data.json();
        this.setState({ recipesList: d.items });
        return d.items;
    }

    addRecipe(recipe) {
        if (recipe && recipe.id) {
            RecipeService.edit(recipe.id, recipe.name, recipe.text);
        } else {
            let recipes = this.state.recipesList.slice(0);
            RecipeService.add(recipe.name, recipe.text).then(data => {
                if (data) {
                    data.json().then(d => {
                        if (this.state.createMode) {
                            const first = recipes.shift();
                            recipes.unshift(d);
                            recipes.unshift(first);
                        } else {
                            recipes.unshift(d);
                        }
                        this.setState({ recipesList: recipes });
                    });
                }
            });
        }
        this.closeForm(recipe.id);
    }

    editRecipe(recipe) {
        let props = {};
        props[recipe.id] = true;
        this.setState({ editedRecipes: Object.assign(this.state.editedRecipes, props) });
    }

    removeRecipe(id) {
        RecipeService.remove(id).then(() => {
            let recipes = this.state.recipesList.slice(0);
            this.setState({ recipesList: recipes.filter((el) => el.id !== id) });
        });
    }

    newRecipeForm() {
        if (!this.state.createMode) {
            this.state.recipesList.unshift({ name: '', text: '' });
            this.setState({ createMode: true });
        }
    }

    closeForm(recipeId) {
        if (recipeId) {
            let props = this.state.editedRecipes;
            props[recipeId] = false;
            this.setState({ editedRecipes: props });
        }
    }

    md2html(text) {
        return new Converter().makeHtml(text || '');
    }

    search(event) {
        RecipeService.search(event.target.q.value || '*').then(data => {
            data.json().then(d => {
                if (d.items) {
                    this.setState({ recipesList: d.items });
                }
            });
        });
        event.preventDefault();
    }

    handleInputChange(event, recipe, index) {
        let recipes = this.state.recipesList.slice(0);
        recipe[event.target.name] = event.target.value;
        recipes[index] = recipe;
        this.setState({
            recipesList: Object.assign(this.state.recipesList, recipes)
        });
    }

    renderMD(text) {
        return { __html: this.md2html(text) };
    }

    RecipeItem(props) {
        let recipe = props.recipe;
        let index = props.index;
        return (
            <li className="recipe-box">
                <div className={(this.state.editedRecipes[recipe.id] || (!recipe.id && this.state.createMode)) ? "hide" : ""}>
                    <h3>{recipe.name}</h3>
                    <hr />
                    <div dangerouslySetInnerHTML={this.renderMD(recipe.text)} />
                    <br />
                    <button onClick={(e) => this.editRecipe(recipe)}>edit</button> &nbsp;
                <a href="/" onClick={(e) => { this.removeRecipe(recipe.id); e.preventDefault() }} className="red right">remove</a>
                </div>
                <div>
                    <form onSubmit={(e) => { this.addRecipe(recipe); e.preventDefault() }} className={((recipe.id || !this.state.createMode) && !this.state.editedRecipes[recipe.id]) ? "hide" : ""}>
                        <div>
                            <input type="text" value={recipe.name} onChange={(e) => this.handleInputChange(e, recipe, index)} placeholder="Title" name="name" />
                        </div>
                        <br />
                        <div>
                            <textarea value={recipe.text} onChange={(e) => this.handleInputChange(e, recipe, index)} rows="10" cols="33" placeholder="Recipe" name="text"></textarea>
                        </div>
                        <button type="submit">
                            <span>{this.state.createMode ? "Add" : "Save"}</span>
                        </button>
                        &nbsp;
                    <a href="/" onClick={(e) => { this.closeForm(recipe.id); e.preventDefault() }}>Close</a>
                    </form>
                </div>
            </li>
        );
    }

    render() {
        return (
            <div id="home">
                <h1>My Recipes &nbsp; <button onClick={() => this.newRecipeForm()}>Add</button></h1>
                <div>
                    <form onSubmit={this.search}>
                        <label htmlFor="search"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2IDk2IiBoZWlnaHQ9Ijk2cHgiIGlkPSJtYWduaWZ5aW5nX2dsYXNzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA5NiA5NiIgd2lkdGg9Ijk2cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik05MC42Myw4NC45NzFsLTIyLjUtMjIuNUM3My4wNSw1Ni4zMTEsNzYsNDguNSw3Niw0MEM3NiwyMC4xMiw1OS44OCw0LDQwLDRTNCwyMC4xMiw0LDQwICBzMTYuMTIsMzYsMzYsMzZjOC41LDAsMTYuMzExLTIuOTUsMjIuNDcxLTcuODdsMjIuNSwyMi41YzAuNzc5LDAuNzgsMS44MTIsMS4xNywyLjgyOSwxLjE3YzEuMDIxLDAsMi4wNS0wLjM5LDIuODMtMS4xNyAgQzkyLjE4OSw4OS4wNyw5Mi4xODksODYuNTI5LDkwLjYzLDg0Ljk3MXogTTQwLDY4Yy0xNS40NjQsMC0yOC0xMi41MzYtMjgtMjhzMTIuNTM2LTI4LDI4LTI4czI4LDEyLjUzNiwyOCwyOFM1NS40NjQsNjgsNDAsNjh6IiBpZD0iX3gzQ19QYXRoX3gzRV8iLz48L3N2Zz4=" height="24" alt="search" /> &nbsp;</label>
                        <input type="text" defaultValue="" name="q" placeholder="Search" id="search" />
                    </form>
                </div>
                {this.state.recipesList && this.state.recipesList.length === 0 ? <div className="empty-box">No recipes to show.</div> : ""}
                <ul>{this.state.recipesList.map((recipe, index) => <this.RecipeItem key={recipe.id || "new" } recipe={recipe} index={index} />)}</ul>
            </div>
        );
    }
}

