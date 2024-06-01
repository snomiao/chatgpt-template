import { gpt } from "chatgpt-template";

console.log(
  await gpt`Give me The Sonnet: A Poem in 14 Lines by William Shakespeare.`.body!.pipeTo(
    new WritableStream({
      write: (e) => {
        console.write(e);
      },
    })
  )
);
