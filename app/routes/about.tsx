import type { Route } from "./+types/home";
import logo from '../logo.svg';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
 return (
             <div id="about">
                 <h2>Powered by</h2>
                 <br />
                 <a href="https://paraio.com"><img src={logo} width="230" alt="logo" /></a>
                 <p>
                     This is an example application generated with the <a href="https://vite.dev">Vite toolbox</a>.<br />
                     It is part of a tutorial on <a href="https://www.erudika.com/blog/2019/08/14/Building-a-full-stack-application-from-scratch-with-React/">how to get started quickly with React</a>&nbsp;
                      and how to integrate your React frontend with a Para backend.
                 </p>
 
                 <h2>Features</h2>
                 <ul>
                     <li>CRUD functionality for recipes</li>
                     <li>Full-text search</li>
                     <li>Markdown support</li>
                 </ul>
 
                 <h4>
                     Made with <span className="red">❤</span> by <a href="https://github.com/albogdano">Alex Bogdanovski</a>
                 </h4>
             </div>
         );
}
