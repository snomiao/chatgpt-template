import { file, write } from "bun";
import { gpt } from "chatgpt-template";
import { renderToString } from "react-dom/server";
const resp = gpt`
You are an AI assistant that speak only TypeScript (*.tsx) without codeblock fence.

Please generate a React component with TailwindCSS for Login Page, note this is server component so you can not use any of react hooks.
Now export a default function as Login page in React and tailwindcss, Please start with '"use server";'

Props: {}
Inputs: {username, password }
Submit Action: POST /login {username, password }

`;

const f = import.meta.dir + "/Login.tsx";
const code = await resp.text();
console.log("--- react code");
console.log(code);
await write(file(f), code);

const html = await import(import.meta.dir + "/Login.tsx")
  .then((e: any) => e.default)
  .then(async (Component) => await Component({}))
  .then((element) => renderToString(element));
console.log("--- render result");
console.log(html);
console.log("--- preview link");
console.log(`data:text/html,${encodeURIComponent(html)}`);
await Bun.$`rm -f ${f}`;
console.log("--- done");