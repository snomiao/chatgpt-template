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

await write(file(import.meta.dir + "/Login.tsx"), await resp.text());
// await $`bun build ${import.meta.dir+"./Login.tsx"} --outdir ${import.meta.dir}`;
// console.log(code);
const html = await import(import.meta.dir + "/Login.tsx")
  .then(async (e: any) => await e.default({}))
  .then(async (e: any) => await renderToString(e));

console.log(html);
