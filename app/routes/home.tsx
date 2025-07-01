// Home route for Para Recipe Manager: displays, adds, edits, and removes recipes using Para backend or mock data fallback.

import { useState, useEffect, useCallback } from 'react';
import type { Route } from "./+types/home";
import RecipeService from '../RecipeService';
import showdown from 'showdown';
const { Converter } = showdown;

// --- Types ---
interface Recipe {
    id?: string;
    name: string;
    text: string;
}

interface RecipeResponse {
    items: Recipe[];
}

interface RecipeItemProps {
    recipe: Recipe;
    index: number;
    onEdit: (recipe: Recipe) => void;
    onRemove: (id?: string) => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, recipe: Recipe, index: number) => void;
    isEditing: boolean;
    onCloseForm: (id?: string) => void;
    onAddRecipe: (recipe: Recipe) => void;
    createMode: boolean;
}

// --- Meta for React Router ---
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Para Recipe Manager" },
        { name: "description", content: "Para with React example - Recipe Manager" },
    ];
}

// --- Main Home Component ---
export default function Home() {
    // --- State ---
    const [q, setQ] = useState('');
    const [createMode, setCreateMode] = useState(false);
    const [recipesList, setRecipesList] = useState<Recipe[]>([]);
    const [editedRecipes, setEditedRecipes] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Helpers ---
    const getMockRecipes = (): Recipe[] => [
        { id: '1', name: 'Mock Recipe', text: 'This is a mock recipe.' }
    ];

    // --- Fetch Recipes on Mount ---
    useEffect(() => {
        async function fetchRecipes() {
            setLoading(true);
            setError(null);
            try {
                const data = await RecipeService.get();
                const d: RecipeResponse = await data.json();
                console.log('API response:', d);
                setRecipesList(d.items);
                const edited: { [key: string]: boolean } = {};
                d.items.forEach((recipe) => {
                    if (recipe.id) edited[recipe.id] = false;
                });
                setEditedRecipes(edited);
            } catch (err: any) {
                console.error('API error:', err);
                setError('Failed to load recipes. Showing mock data.');
                setRecipesList(getMockRecipes());
                setEditedRecipes({ '1': false });
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);

    // --- CRUD Handlers ---
    const addRecipe = useCallback((recipe: Recipe) => {
        if (recipe && recipe.id) {
            RecipeService.edit(recipe.id, recipe.name, recipe.text);
        } else {
            let recipes = [...recipesList];
            RecipeService.add(recipe.name, recipe.text).then((data) => {
                if (data) {
                    data.json().then((d: Recipe) => {
                        recipes.unshift(d);
                        setRecipesList(recipes);
                        setCreateMode(false);
                    });
                }
            });
        }
        closeForm(recipe.id);
    }, [recipesList, createMode]);

    const editRecipe = useCallback((recipe: Recipe) => {
        if (!recipe.id) return;
        setEditedRecipes((prev) => ({ ...prev, [recipe.id!]: true }));
    }, []);

    const removeRecipe = useCallback((id?: string) => {
        if (!id) return;
        RecipeService.remove(id).then(() => {
            setRecipesList((prev) => prev.filter((el) => el.id !== id));
        });
    }, []);

    const newRecipeForm = useCallback(() => {
        if (!createMode) {
            setRecipesList((prev) => [{ name: '', text: '' }, ...prev]);
            setCreateMode(true);
        }
    }, [createMode]);

    const closeForm = useCallback((recipeId?: string) => {
        if (recipeId) {
            setEditedRecipes((prev) => ({ ...prev, [recipeId]: false }));
        } else {
            setCreateMode(false);
            setRecipesList((prev) => prev.filter((r) => r.id));
        }
    }, []);

    // --- Markdown Conversion ---
    const md2html = (text: string): string => new Converter().makeHtml(text || '');
    const renderMD = (text: string) => ({ __html: md2html(text) });

    // --- Search Handler ---
    const search = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const q = formData.get("q")?.toString() || '*';
        RecipeService.search(q).then(data => {
            data.json().then((d: RecipeResponse) => {
                if (d.items) setRecipesList(d.items);
            });
        });
    }, []);

    // --- Input Change Handler ---
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, recipe: Recipe, index: number) => {
        let recipes = [...recipesList];
        const updatedRecipe = { ...recipe, [event.target.name]: event.target.value };
        recipes[index] = updatedRecipe;
        setRecipesList(recipes);
    }, [recipesList]);

    // --- Recipe Item Component ---
    const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, index, onEdit, onRemove, onInputChange, isEditing, onCloseForm, onAddRecipe, createMode }) => (
        <li className="recipe-box">
            <div className={isEditing ? "hide" : ""}>
                <h3>{recipe.name}</h3>
                <hr />
                <div dangerouslySetInnerHTML={renderMD(recipe.text)} />
                <br />
                <button onClick={() => onEdit(recipe)}>edit</button> &nbsp;
                <a href="/" onClick={(e) => { onRemove(recipe.id); e.preventDefault(); }} className="red right">remove</a>
            </div>
            <div>
                <form onSubmit={(e) => { onAddRecipe(recipe); e.preventDefault(); }} className={(!isEditing ? "hide" : "")}> 
                    <div>
                        <input
                            type="text"
                            value={recipe.name}
                            onChange={(e) => onInputChange(e, recipe, index)}
                            placeholder="Title"
                            name="name"
                        />
                    </div>
                    <br />
                    <div>
                        <textarea
                            value={recipe.text}
                            onChange={(e) => onInputChange(e, recipe, index)}
                            rows={10}
                            cols={33}
                            placeholder="Recipe"
                            name="text"
                        />
                    </div>
                    <button type="submit">
                        <span>{createMode ? "Add" : "Save"}</span>
                    </button>
                    &nbsp;
                    <a href="/" onClick={(e) => { onCloseForm(recipe.id); e.preventDefault(); }}>Close</a>
                </form>
            </div>
        </li>
    );

    // --- Render ---
    return (
        <div id="home">
            <h1>My Recipes &nbsp; <button onClick={newRecipeForm}>Add</button></h1>
            <div>
                <form onSubmit={search}>
                    <label htmlFor="search">
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2IDk2IiBoZWlnaHQ9Ijk2cHgiIGlkPSJtYWduaWZ5aW5nX2dsYXNzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA5NiA5NiIgd2lkdGg9Ijk2cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik05MC42Myw4NC45NzFsLTIyLjUtMjIuNUM3My4wNSw1Ni4zMTEsNzYsNDguNSw3Niw0MEM3NiwyMC4xMiw1OS44OCw0LDQwLDRTNCwyMC4xMiw0LDQwICBzMTYuMTIsMzYsMzYsMzZjOC41LDAsMTYuMzExLTIuOTUsMjIuNDcxLTcuODdsMjIuNSwyMi41YzAuNzc5LDAuNzgsMS44MTIsMS4xNywyLjgyOSwxLjE3YzEuMDIxLDAsMi4wNS0wLjM5LDIuODMtMS4xNyAgQzkyLjE4OSw4OS4wNyw5Mi4xODksODYuNTI5LDkwLjYzLDg0Ljk3MXogTTQwLDY4Yy0xNS40NjQsMC0yOC0xMi41MzYtMjgtMjhzMTIuNTM2LTI4LDI4LTI4czI4LDEyLjUzNiwyOCwyOFM1NS40NjQsNjgsNDAsNjh6IiBpZD0iX3gzQ19QYXRoX3gzRV8iLz48L3N2Zz4=" height="24" alt="search" /> &nbsp;
                    </label>
                    <input type="text" name="q" placeholder="Search" id="search" value={q} onChange={e => setQ(e.target.value)} />
                </form>
            </div>
            {loading && <div className="empty-box">Loading...</div>}
            {error && <div className="empty-box" style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && recipesList.length === 0 ? (
                <div className="empty-box">No recipes to show.</div>
            ) : null}
            <ul>
                {recipesList.map((recipe, index) => (
                    <RecipeItem
                        key={recipe.id || "new"}
                        recipe={recipe}
                        index={index}
                        onEdit={editRecipe}
                        onRemove={removeRecipe}
                        onInputChange={handleInputChange}
                        isEditing={!!(recipe.id && editedRecipes[recipe.id]) || (!recipe.id && createMode)}
                        onCloseForm={closeForm}
                        onAddRecipe={addRecipe}
                        createMode={createMode}
                    />
                ))}
            </ul>
        </div>
    );
}
