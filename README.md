# GPT Template

use ChatGPT in JS Template Style

## Get Started

1. Setup your env.OPENAI_API_KEY into your .env file
2. Try following code:

### Get full text once:

```ts
import { gpt } from "chatgpt-template";
console.log(await gpt`Hello, world`.text()); // greetings
```

### Return as Streaming Response

```ts
import { gpt } from "chatgpt-template";
import DIE from "@snomiao/die";

export const GET = async (req: NextRequest) =>
  await gpt`
You are an AI flash card making assistant, please make flash cards for new words in given articles or note-lists, give me a csv with head Front,Back, which Front is Japanese word, and Back is "振仮名 of the Japanese world...<br />(English Translation...)"
Here is my input:

${req.nextUrl.searchParams.get("q") ?? DIE("Missing Query")}
`; // new Response( ... token ... stream ... )
```

### Streaming to console:

```ts
import { gpt } from "chatgpt-template";
await gpt`
You are an AI flash card making assistant, please make flash cards for new words in given articles or note-lists, give me a csv with head Front,Back, which Front is Japanese word, and Back is "振仮名 of the Japanese world...<br />(English Translation...)"
Here is my input:

ロート製薬は、子どもの花粉症に関するアンケート調査の結果を公表した。花粉症で目がかゆい小学生の4人に1人が「授業など勉強に集中できない」と訴える一方、子どもが日常生活で感じる影響を親は十分に把握できていない状況も明らかになった。

【あなたの地域は？】スギ、ヒノキ…花粉が本格飛来する時期

　調査は1月24～25日、0歳から16歳の子どもを持つ親7131人を対象にインターネットで行った。

　子どもが「花粉症と診断された」「花粉症だと思う」と回答したのは42・6％で、2014年12月調査の「花粉症である」との回答（32・7％）から約10ポイント増加した。

　発症した平均年齢は5・8歳。症状を緩和するための対策で、最も多かったのは「マスクの着用」で60・9％、次いで「病院で処方された飲み薬の使用」が55・4％だった。小学生が感じる症状の第2位が「目のかゆみ」だったが、市販の目薬やメガネの使用などの対策はいずれも3割以下にとどまっていた。

　通学や外遊びなどで屋外にいる機会が多い子どもにとって「目のかゆみ」は日常生活への影響が大きい。親から「目のかゆみ」がある小学生に複数回答で状況を聞いてもらったところ、「日常生活に影響がある」と答えたのは53・9％に上り、「授業など勉強に集中できない」が25・6％、「外で遊びを楽しめない」が23％、「夜眠れない」が11％などと深刻な影響が出ていることが判明した。

　子どもが感じている目のかゆみによる日常生活への影響について、44・2％の親がこのアンケートに答えるまで把握していなかった内容があったと答えており、一緒に暮らしていても花粉症の影響を把握できていない実態も浮き彫りとなった。【佐久間一輝】

`.pipeTo(
  new WritableStream({
    write: (content) => {
      console.write(content);
    },
  })
); // write to console
```

### More [./examples HERE](./examples)

## Reference

Inspired by zx & bun shell
