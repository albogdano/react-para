(window["webpackJsonpreact-para"]=window["webpackJsonpreact-para"]||[]).push([[0],{22:function(e){e.exports=JSON.parse('{"name":"react-para","version":"1.0.0","private":true,"homepage":"https://albogdano.github.io/react-para","dependencies":{"husky":"^3.0.3","lint-staged":"^9.2.1","prettier":"^1.18.2","react":"^16.9.0","react-dom":"^16.9.0","react-router-dom":"^5.0.1","react-scripts":"3.1.0","showdown":"^1.9.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":"react-app"},"husky":{"hooks":{"pre-commit":"lint-staged"}},"lint-staged":{"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}":["prettier --single-quote --write","git add"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},23:function(e,t,a){e.exports=a.p+"static/media/logo.99a80ee4.svg"},28:function(e,t,a){e.exports=a(40)},33:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(21),c=a.n(r),s=(a(33),a(9)),o=a(5),l=a(22),u=a(7),d=a(8),h=a(13),p=a(12),m=a(14),f=a(23),v=a.n(f),E=function(e){function t(){return Object(u.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{id:"about"},i.a.createElement("h2",null,"Powered by"),i.a.createElement("br",null),i.a.createElement("a",{href:"https://paraio.com"},i.a.createElement("img",{src:v.a,width:"230",alt:"logo"})),i.a.createElement("p",null,"This is an example application generated with ",i.a.createElement("a",{href:"https://create-react-app.dev"},"React's create-react-app tool"),".",i.a.createElement("br",null),"It is part of a tutorial on ",i.a.createElement("a",{href:"http://www.erudika.com/blog/2019/08/14/Building-a-full-stack-application-from-scratch-with-React/"},"how to get started quickly with React"),"and how to integrate your React frontend with a Para backend."),i.a.createElement("h2",null,"Features"),i.a.createElement("ul",null,i.a.createElement("li",null,"CRUD functionality for recipes"),i.a.createElement("li",null,"Full-text search"),i.a.createElement("li",null,"Markdown support")),i.a.createElement("h4",null,"Made with ",i.a.createElement("span",{className:"red"},"\u2764")," by ",i.a.createElement("a",{href:"https://github.com/albogdano"},"Alex Bogdanovski")))}}]),t}(i.a.Component),g=a(16),w=a.n(g),b=a(24),y=a(6),R=function(){function e(){Object(u.a)(this,e)}return Object(d.a)(e,null,[{key:"get",value:function(){return fetch(e.RECIPES_RESOURCE,{headers:e.headers})}},{key:"add",value:function(t,a){if(!t||!a)return Promise.reject();var n={name:t,text:a};return fetch(e.RECIPES_RESOURCE,{headers:e.headers,body:JSON.stringify(n),method:"POST"})}},{key:"edit",value:function(t,a,n){if(!t)return Promise.reject();var i={name:a,text:n};return fetch(e.RECIPES_RESOURCE+"/"+t,{headers:e.headers,body:JSON.stringify(i),method:"PATCH"})}},{key:"remove",value:function(t){return t?fetch(e.RECIPES_RESOURCE+"/"+t,{headers:e.headers,method:"DELETE"}):Promise.reject()}},{key:"search",value:function(t){return fetch(e.RECIPES_RESOURCE+"?q="+t,{headers:e.headers})}}]),e}();R.appID=Object({NODE_ENV:"production",PUBLIC_URL:"/react-para"}).PARA_APP_ID||"app:albogdano",R.appSecret=Object({NODE_ENV:"production",PUBLIC_URL:"/react-para"}).PARA_SECRET||"",R.RECIPES_RESOURCE=(Object({NODE_ENV:"production",PUBLIC_URL:"/react-para"}).PARA_ENDPOINT||"https://paraio.com")+"/v1/recipes",R.headers={"Content-Type":"application/json",Authorization:"Anonymous "+R.appID};var I=a(25),M=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).state={q:"",createMode:!1,recipesList:[],editedRecipes:{}},a.search=a.search.bind(Object(y.a)(a)),a.recipeInfo=a.recipeInfo.bind(Object(y.a)(a)),a.RecipeItem=a.RecipeItem.bind(Object(y.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(y.a)(a)),a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.listRecipes(),a={};t.then(function(e){e.forEach(function(e,t){a[e.id]=!1})}).finally(function(){e.setState({editedRecipes:Object.assign(e.state.editedRecipes,a)})})}},{key:"listRecipes",value:function(){var e=Object(b.a)(w.a.mark(function e(){var t,a;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.get();case 2:return t=e.sent,e.next=5,t.json();case 5:return a=e.sent,this.setState({recipesList:a.items}),e.abrupt("return",a.items);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"addRecipe",value:function(e){var t=this;if(e&&e.id)R.edit(e.id,e.name,e.text);else{var a=this.state.recipesList.slice(0);R.add(e.name,e.text).then(function(e){e&&e.json().then(function(e){if(t.state.createMode){var n=a.shift();a.unshift(e),a.unshift(n)}else a.unshift(e);t.setState({recipesList:a})})})}this.closeForm(e.id)}},{key:"editRecipe",value:function(e){var t={};t[e.id]=!0,this.setState({editedRecipes:Object.assign(this.state.editedRecipes,t)})}},{key:"removeRecipe",value:function(e){var t=this;R.remove(e).then(function(){var a=t.state.recipesList.slice(0);t.setState({recipesList:a.filter(function(t){return t.id!==e})})})}},{key:"newRecipeForm",value:function(){this.state.createMode||(this.state.recipesList.unshift({name:"",text:""}),this.setState({createMode:!0}))}},{key:"closeForm",value:function(e){if(e){var t=this.state.editedRecipes;t[e]=!1,this.setState({editedRecipes:t})}else if(this.state.createMode){var a=Array.of(this.state.recipesList);a.shift(),this.setState({createMode:!1,recipesList:a})}}},{key:"md2html",value:function(e){return(new I.Converter).makeHtml(e||"")}},{key:"search",value:function(e){var t=this;R.search(e.target.q.value||"*").then(function(e){e.json().then(function(e){e.items&&t.setState({recipesList:e.items})})}),e.preventDefault()}},{key:"handleInputChange",value:function(e,t,a){var n=this.state.recipesList.slice(0);t[e.target.name]=e.target.value,n[a]=t,this.setState({recipesList:Object.assign(this.state.recipesList,n)})}},{key:"renderMD",value:function(e){return{__html:this.md2html(e)}}},{key:"recipeInfo",value:function(e){var t=this;if(!this.state.editedRecipes[e.id]&&(e.id||!this.state.createMode))return i.a.createElement("div",null,i.a.createElement("h3",null,e.name),i.a.createElement("hr",null),i.a.createElement("div",{dangerouslySetInnerHTML:this.renderMD(e.text)}),i.a.createElement("br",null),i.a.createElement("button",{onClick:function(a){return t.editRecipe(e)}},"edit")," \xa0",i.a.createElement("a",{href:"/",onClick:function(a){t.removeRecipe(e.id),a.preventDefault()},className:"red right"},"remove"))}},{key:"RecipeItem",value:function(e){var t=this,a=e.recipe;return i.a.createElement("li",{className:"recipe-box"},this.recipeInfo(a),i.a.createElement("div",null,i.a.createElement("form",{onSubmit:function(e){t.addRecipe(a),e.preventDefault()},className:!a.id&&this.state.createMode||this.state.editedRecipes[a.id]?"":"hide"},i.a.createElement("div",null,i.a.createElement("input",{type:"text",value:a.name,onChange:function(n){return t.handleInputChange(n,a,e.index)},placeholder:"Title",name:"name"})),i.a.createElement("br",null),i.a.createElement("div",null,i.a.createElement("textarea",{value:a.text,onChange:function(n){return t.handleInputChange(n,a,e.index)},rows:"10",cols:"33",placeholder:"Recipe",name:"text"})),i.a.createElement("button",{type:"submit"},i.a.createElement("span",null,this.state.createMode?"Add":"Save")),"\xa0",i.a.createElement("a",{href:"/",onClick:function(e){t.closeForm(a.id),e.preventDefault()}},"Close"))))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{id:"home"},i.a.createElement("h1",null,"My Recipes \xa0 ",i.a.createElement("button",{onClick:function(){return e.newRecipeForm()}},"Add")),i.a.createElement("div",null,i.a.createElement("form",{onSubmit:this.search},i.a.createElement("label",{htmlFor:"search"},i.a.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2IDk2IiBoZWlnaHQ9Ijk2cHgiIGlkPSJtYWduaWZ5aW5nX2dsYXNzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA5NiA5NiIgd2lkdGg9Ijk2cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik05MC42Myw4NC45NzFsLTIyLjUtMjIuNUM3My4wNSw1Ni4zMTEsNzYsNDguNSw3Niw0MEM3NiwyMC4xMiw1OS44OCw0LDQwLDRTNCwyMC4xMiw0LDQwICBzMTYuMTIsMzYsMzYsMzZjOC41LDAsMTYuMzExLTIuOTUsMjIuNDcxLTcuODdsMjIuNSwyMi41YzAuNzc5LDAuNzgsMS44MTIsMS4xNywyLjgyOSwxLjE3YzEuMDIxLDAsMi4wNS0wLjM5LDIuODMtMS4xNyAgQzkyLjE4OSw4OS4wNyw5Mi4xODksODYuNTI5LDkwLjYzLDg0Ljk3MXogTTQwLDY4Yy0xNS40NjQsMC0yOC0xMi41MzYtMjgtMjhzMTIuNTM2LTI4LDI4LTI4czI4LDEyLjUzNiwyOCwyOFM1NS40NjQsNjgsNDAsNjh6IiBpZD0iX3gzQ19QYXRoX3gzRV8iLz48L3N2Zz4=",height:"24",alt:"search"})," \xa0"),i.a.createElement("input",{type:"text",defaultValue:"",name:"q",placeholder:"Search",id:"search"}))),this.state.recipesList&&0===this.state.recipesList.length?i.a.createElement("div",{className:"empty-box"},"No recipes to show."):"",i.a.createElement("ul",null,this.state.recipesList.map(function(t,a){return i.a.createElement(e.RecipeItem,{key:t.id||"new",recipe:t,index:a})})))}}]),t}(i.a.Component);var j=function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement("h1",null,"Recipe Manager ",i.a.createElement("code",null,i.a.createElement("small",null,"v",l.version))),i.a.createElement("div",{className:"more"}))),i.a.createElement("div",null,i.a.createElement(s.a,{basename:"/react-para"},i.a.createElement("nav",null,i.a.createElement(s.b,{to:"/",exact:!0,activeClassName:"router-link-active"},"Home"),i.a.createElement(s.b,{to:"/about",activeClassName:"router-link-active"},"About")),i.a.createElement(o.a,{path:"/",exact:!0,component:M}),i.a.createElement(o.a,{path:"/about",exact:!0,component:E}))))},k=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function L(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(i.a.createElement(s.a,null,i.a.createElement(j,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/react-para",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/react-para","/service-worker.js");k?(!function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):L(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):L(t,e)})}}()}},[[28,1,2]]]);
//# sourceMappingURL=main.af277a69.chunk.js.map