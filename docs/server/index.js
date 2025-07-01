var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, NavLink, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect, useCallback } from "react";
import showdown from "showdown";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const version = "1.0.1";
const pkg = {
  version
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("div", {
          className: "App",
          children: /* @__PURE__ */ jsxs("header", {
            className: "App-header",
            children: [/* @__PURE__ */ jsxs("h1", {
              children: ["Para Recipe Manager ", /* @__PURE__ */ jsx("code", {
                children: /* @__PURE__ */ jsxs("small", {
                  children: ["v", pkg.version]
                })
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "more"
            })]
          })
        }), /* @__PURE__ */ jsxs("nav", {
          children: [/* @__PURE__ */ jsx(NavLink, {
            to: "/",
            className: ({
              isActive
            }) => isActive ? "router-link-active" : void 0,
            end: true,
            children: "Home"
          }), /* @__PURE__ */ jsx(NavLink, {
            to: "/about",
            className: ({
              isActive
            }) => isActive ? "router-link-active" : void 0,
            children: "About"
          })]
        })]
      }), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const _RecipeService = class _RecipeService {
  static get() {
    return fetch(_RecipeService.RECIPES_RESOURCE, {
      headers: _RecipeService.headers
    });
  }
  static add(name, text) {
    if (!name || !text) return Promise.reject("Name and text are required.");
    const recipe = { name, text };
    return fetch(_RecipeService.RECIPES_RESOURCE, {
      headers: _RecipeService.headers,
      body: JSON.stringify(recipe),
      method: "POST"
    });
  }
  static edit(id, name, text) {
    if (!id) return Promise.reject("ID is required.");
    const recipe = { name, text };
    return fetch(`${_RecipeService.RECIPES_RESOURCE}/${id}`, {
      headers: _RecipeService.headers,
      body: JSON.stringify(recipe),
      method: "PATCH"
    });
  }
  static remove(id) {
    if (!id) return Promise.reject("ID is required.");
    return fetch(`${_RecipeService.RECIPES_RESOURCE}/${id}`, {
      headers: _RecipeService.headers,
      method: "DELETE"
    });
  }
  static search(q) {
    return fetch(`${_RecipeService.RECIPES_RESOURCE}?q=${encodeURIComponent(q)}`, {
      headers: _RecipeService.headers
    });
  }
};
__publicField(_RecipeService, "appID", "app:albogdano");
__publicField(_RecipeService, "appSecret", "");
// unused
__publicField(_RecipeService, "RECIPES_RESOURCE", "https://paraio.com/v1/recipes");
__publicField(_RecipeService, "headers", {
  "Content-Type": "application/json",
  "Authorization": "Anonymous " + _RecipeService.appID
});
let RecipeService = _RecipeService;
const {
  Converter
} = showdown;
function meta$1({}) {
  return [{
    title: "Para Recipe Manager"
  }, {
    name: "description",
    content: "Para with React example - Recipe Manager"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [q, setQ] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [recipesList, setRecipesList] = useState([]);
  const [editedRecipes, setEditedRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getMockRecipes = () => [{
    id: "1",
    name: "Mock Recipe",
    text: "This is a mock recipe."
  }];
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      try {
        const data = await RecipeService.get();
        const d = await data.json();
        console.log("API response:", d);
        setRecipesList(d.items);
        const edited = {};
        d.items.forEach((recipe) => {
          if (recipe.id) edited[recipe.id] = false;
        });
        setEditedRecipes(edited);
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to load recipes. Showing mock data.");
        setRecipesList(getMockRecipes());
        setEditedRecipes({
          "1": false
        });
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);
  const addRecipe = useCallback((recipe) => {
    if (recipe && recipe.id) {
      RecipeService.edit(recipe.id, recipe.name, recipe.text);
    } else {
      let recipes = [...recipesList];
      RecipeService.add(recipe.name, recipe.text).then((data) => {
        if (data) {
          data.json().then((d) => {
            recipes.unshift(d);
            setRecipesList(recipes);
            setCreateMode(false);
          });
        }
      });
    }
    closeForm(recipe.id);
  }, [recipesList, createMode]);
  const editRecipe = useCallback((recipe) => {
    if (!recipe.id) return;
    setEditedRecipes((prev) => ({
      ...prev,
      [recipe.id]: true
    }));
  }, []);
  const removeRecipe = useCallback((id) => {
    if (!id) return;
    RecipeService.remove(id).then(() => {
      setRecipesList((prev) => prev.filter((el) => el.id !== id));
    });
  }, []);
  const newRecipeForm = useCallback(() => {
    if (!createMode) {
      setRecipesList((prev) => [{
        name: "",
        text: ""
      }, ...prev]);
      setCreateMode(true);
    }
  }, [createMode]);
  const closeForm = useCallback((recipeId) => {
    if (recipeId) {
      setEditedRecipes((prev) => ({
        ...prev,
        [recipeId]: false
      }));
    } else {
      setCreateMode(false);
      setRecipesList((prev) => prev.filter((r) => r.id));
    }
  }, []);
  const md2html = (text) => new Converter().makeHtml(text || "");
  const renderMD = (text) => ({
    __html: md2html(text)
  });
  const search = useCallback((event) => {
    var _a;
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const q2 = ((_a = formData.get("q")) == null ? void 0 : _a.toString()) || "*";
    RecipeService.search(q2).then((data) => {
      data.json().then((d) => {
        if (d.items) setRecipesList(d.items);
      });
    });
  }, []);
  const handleInputChange = useCallback((event, recipe, index) => {
    let recipes = [...recipesList];
    const updatedRecipe = {
      ...recipe,
      [event.target.name]: event.target.value
    };
    recipes[index] = updatedRecipe;
    setRecipesList(recipes);
  }, [recipesList]);
  const RecipeItem = ({
    recipe,
    index,
    onEdit,
    onRemove,
    onInputChange,
    isEditing,
    onCloseForm,
    onAddRecipe,
    createMode: createMode2
  }) => /* @__PURE__ */ jsxs("li", {
    className: "recipe-box",
    children: [/* @__PURE__ */ jsxs("div", {
      className: isEditing ? "hide" : "",
      children: [/* @__PURE__ */ jsx("h3", {
        children: recipe.name
      }), /* @__PURE__ */ jsx("hr", {}), /* @__PURE__ */ jsx("div", {
        dangerouslySetInnerHTML: renderMD(recipe.text)
      }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("button", {
        onClick: () => onEdit(recipe),
        children: "edit"
      }), "  ", /* @__PURE__ */ jsx("a", {
        href: "/",
        onClick: (e) => {
          onRemove(recipe.id);
          e.preventDefault();
        },
        className: "red right",
        children: "remove"
      })]
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: (e) => {
          onAddRecipe(recipe);
          e.preventDefault();
        },
        className: !isEditing ? "hide" : "",
        children: [/* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("input", {
            type: "text",
            value: recipe.name,
            onChange: (e) => onInputChange(e, recipe, index),
            placeholder: "Title",
            name: "name"
          })
        }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("textarea", {
            value: recipe.text,
            onChange: (e) => onInputChange(e, recipe, index),
            rows: 10,
            cols: 33,
            placeholder: "Recipe",
            name: "text"
          })
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          children: /* @__PURE__ */ jsx("span", {
            children: createMode2 ? "Add" : "Save"
          })
        }), " ", /* @__PURE__ */ jsx("a", {
          href: "/",
          onClick: (e) => {
            onCloseForm(recipe.id);
            e.preventDefault();
          },
          children: "Close"
        })]
      })
    })]
  });
  return /* @__PURE__ */ jsxs("div", {
    id: "home",
    children: [/* @__PURE__ */ jsxs("h1", {
      children: ["My Recipes   ", /* @__PURE__ */ jsx("button", {
        onClick: newRecipeForm,
        children: "Add"
      })]
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: search,
        children: [/* @__PURE__ */ jsxs("label", {
          htmlFor: "search",
          children: [/* @__PURE__ */ jsx("img", {
            src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2IDk2IiBoZWlnaHQ9Ijk2cHgiIGlkPSJtYWduaWZ5aW5nX2dsYXNzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA5NiA5NiIgd2lkdGg9Ijk2cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik05MC42Myw4NC45NzFsLTIyLjUtMjIuNUM3My4wNSw1Ni4zMTEsNzYsNDguNSw3Niw0MEM3NiwyMC4xMiw1OS44OCw0LDQwLDRTNCwyMC4xMiw0LDQwICBzMTYuMTIsMzYsMzYsMzZjOC41LDAsMTYuMzExLTIuOTUsMjIuNDcxLTcuODdsMjIuNSwyMi41YzAuNzc5LDAuNzgsMS44MTIsMS4xNywyLjgyOSwxLjE3YzEuMDIxLDAsMi4wNS0wLjM5LDIuODMtMS4xNyAgQzkyLjE4OSw4OS4wNyw5Mi4xODksODYuNTI5LDkwLjYzLDg0Ljk3MXogTTQwLDY4Yy0xNS40NjQsMC0yOC0xMi41MzYtMjgtMjhzMTIuNTM2LTI4LDI4LTI4czI4LDEyLjUzNiwyOCwyOFM1NS40NjQsNjgsNDAsNjh6IiBpZD0iX3gzQ19QYXRoX3gzRV8iLz48L3N2Zz4=",
            height: "24",
            alt: "search"
          }), "  "]
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          name: "q",
          placeholder: "Search",
          id: "search",
          value: q,
          onChange: (e) => setQ(e.target.value)
        })]
      })
    }), loading && /* @__PURE__ */ jsx("div", {
      className: "empty-box",
      children: "Loading..."
    }), error && /* @__PURE__ */ jsx("div", {
      className: "empty-box",
      style: {
        color: "red"
      },
      children: error
    }), !loading && !error && recipesList.length === 0 ? /* @__PURE__ */ jsx("div", {
      className: "empty-box",
      children: "No recipes to show."
    }) : null, /* @__PURE__ */ jsx("ul", {
      children: recipesList.map((recipe, index) => /* @__PURE__ */ jsx(RecipeItem, {
        recipe,
        index,
        onEdit: editRecipe,
        onRemove: removeRecipe,
        onInputChange: handleInputChange,
        isEditing: !!(recipe.id && editedRecipes[recipe.id]) || !recipe.id && createMode,
        onCloseForm: closeForm,
        onAddRecipe: addRecipe,
        createMode
      }, recipe.id || "new"))
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/assets/logo-CGKJv2Wa.svg";
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    id: "about",
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Powered by"
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("a", {
      href: "https://paraio.com",
      children: /* @__PURE__ */ jsx("img", {
        src: logo,
        width: "230",
        alt: "logo"
      })
    }), /* @__PURE__ */ jsxs("p", {
      children: ["This is an example application generated with the ", /* @__PURE__ */ jsx("a", {
        href: "https://vite.dev",
        children: "Vite toolbox"
      }), ".", /* @__PURE__ */ jsx("br", {}), "It is part of a tutorial on ", /* @__PURE__ */ jsx("a", {
        href: "https://www.erudika.com/blog/2019/08/14/Building-a-full-stack-application-from-scratch-with-React/",
        children: "how to get started quickly with React"
      }), "  and how to integrate your React frontend with a Para backend."]
    }), /* @__PURE__ */ jsx("h2", {
      children: "Features"
    }), /* @__PURE__ */ jsxs("ul", {
      children: [/* @__PURE__ */ jsx("li", {
        children: "CRUD functionality for recipes"
      }), /* @__PURE__ */ jsx("li", {
        children: "Full-text search"
      }), /* @__PURE__ */ jsx("li", {
        children: "Markdown support"
      })]
    }), /* @__PURE__ */ jsxs("h4", {
      children: ["Made with ", /* @__PURE__ */ jsx("span", {
        className: "red",
        children: "❤"
      }), " by ", /* @__PURE__ */ jsx("a", {
        href: "https://github.com/albogdano",
        children: "Alex Bogdanovski"
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BdP5C0qv.js", "imports": ["/assets/chunk-QMGIS6GS-Bv6VNRS7.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-TUYs1zlM.js", "imports": ["/assets/chunk-QMGIS6GS-Bv6VNRS7.js"], "css": ["/assets/root-Ckd50hST.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BHF-SESe.js", "imports": ["/assets/chunk-QMGIS6GS-Bv6VNRS7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-D3gd8gQA.js", "imports": ["/assets/chunk-QMGIS6GS-Bv6VNRS7.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-819baad6.js", "version": "819baad6", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
