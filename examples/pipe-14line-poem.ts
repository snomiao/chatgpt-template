import { gpt } from "chatgpt-template";
import { WritableConsole } from "writable-console";

await gpt`Write me The Sonnet: A Poem in 14 Lines by William Shakespeare.`.body!.pipeTo(
  new WritableConsole()
);
