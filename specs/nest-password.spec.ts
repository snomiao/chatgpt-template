import { maps } from "snoflow";
import { fromWritable } from "snoflow/fromNodeStream";
import { chalk } from "zx";
import { gpt } from "..";

it("work with nest", async () => {
  const password = "jUzHaoLWQUYvHwzR";

  // alice tell story
  const aliceWrite = gpt`
Write a story about beautiful princess and a dragon
Embed a password ${password} into the story (have to be searchable),
but don't tell it's a password, finish in 80 words`;

  const [peek, letter] = aliceWrite.tee();

  // bob read story
  const bobRead = gpt`
Given this letter: {{${letter}}}

1. What is the moral of the story?
2. What is the password?

Dont explain, just answer
`;

  // we watched in console
  await peek
    .pipeThrough(maps((s) => chalk.blue(s)))
    .pipeTo(fromWritable(process.stdout), {preventClose:true});
  console.log("\n\n");

  const [scanner, speaker] = bobRead.tee();
  await speaker
    .pipeThrough(maps((s) => chalk.green(s)))
    .pipeTo(fromWritable(process.stdout), {preventClose:true});
  console.log("\n\n");
  const answer = await new Response(scanner).text();
  expect(answer.includes(password)).toBe(true);
}, 15e3); // 15s timeout
