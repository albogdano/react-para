export default interface Recipe {
    id?: string;
    name: string;
    text: string;
}

export default class RecipeService {
  static appID: string = import.meta.env.PARA_APP_ID || 'app:albogdano';
  static appSecret: string = import.meta.env.PARA_SECRET || ""; // unused
  static RECIPES_RESOURCE: string =
    (import.meta.env.PARA_ENDPOINT || "https://paraio.com") + "/v1/recipes";

  static headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': 'Anonymous ' + RecipeService.appID
  };

  static get(): Promise<Response> {
    return fetch(RecipeService.RECIPES_RESOURCE, {
      headers: RecipeService.headers
    });
  }

  static add(name: string, text: string): Promise<Response> {
    if (!name || !text) return Promise.reject("Name and text are required.");
    const recipe: Recipe = { name, text };
    return fetch(RecipeService.RECIPES_RESOURCE, {
      headers: RecipeService.headers,
      body: JSON.stringify(recipe),
      method: 'POST'
    });
  }

  static edit(id: string, name?: string, text?: string): Promise<Response> {
    if (!id) return Promise.reject("ID is required.");
    const recipe: Partial<Recipe> = { name, text };
    return fetch(`${RecipeService.RECIPES_RESOURCE}/${id}`, {
      headers: RecipeService.headers,
      body: JSON.stringify(recipe),
      method: 'PATCH'
    });
  }

  static remove(id: string): Promise<Response> {
    if (!id) return Promise.reject("ID is required.");
    return fetch(`${RecipeService.RECIPES_RESOURCE}/${id}`, {
      headers: RecipeService.headers,
      method: 'DELETE'
    });
  }

  static search(q: string): Promise<Response> {
    return fetch(`${RecipeService.RECIPES_RESOURCE}?q=${encodeURIComponent(q)}`, {
      headers: RecipeService.headers
    });
  }
}