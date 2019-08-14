export default class RecipeService {
    static appID = process.env.PARA_APP_ID || 'app:albogdano';
    static appSecret = process.env.PARA_SECRET || ""; // unused
    static RECIPES_RESOURCE = (process.env.PARA_ENDPOINT || "https://paraio.com") + "/v1/recipes";

    static headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Anonymous ' + RecipeService.appID
    };

    static get() {
        return fetch(RecipeService.RECIPES_RESOURCE, { headers: RecipeService.headers})
    }

    static add(name, text) {
      if (!name || !text) { return Promise.reject(); }
      const recipe = { name, text };
      return fetch(RecipeService.RECIPES_RESOURCE, { headers: RecipeService.headers,
        body: JSON.stringify(recipe), method: 'POST'});
    }

    static edit(id, name, text) {
      if (!id) { return Promise.reject(); }
      const recipe = { name, text };
      return fetch(RecipeService.RECIPES_RESOURCE + '/' + id, { headers: RecipeService.headers,
        body: JSON.stringify(recipe), method: 'PATCH'});
    }

    static remove(id) {
      if (!id) { return Promise.reject(); }
      return fetch(RecipeService.RECIPES_RESOURCE + '/' + id, { headers: RecipeService.headers, method: 'DELETE'});
    }

    static search(q) {
      return fetch(RecipeService.RECIPES_RESOURCE + '?q=' + q, { headers: RecipeService.headers});
    }
}
