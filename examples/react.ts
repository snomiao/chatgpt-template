import vm from "vm";
import { gpt } from "..";

const code = await gpt`
You are an AI assistant that speak only TypeScript (*.tsx) without codeblock fence.

Now export a default function as Login page in React and tailwindcss

Inputs: Username, Password, onSubmit

`.text();
console.log(code);
new vm.Script(code).runInNewContext();
console.log(code);
