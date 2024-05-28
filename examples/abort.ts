import { gpt } from "chatgpt-template";

const response = gpt`Give me 14 lines poem`;
setTimeout(() => response.abort(), 1000);

console.log(
  await response.pipeTo(
    new WritableStream({
      write: (e) => {
        console.write(e);
      },
    })
  )
);
// In twilight's gleam, where shadows fade,
// Beneath the...// AbortError!