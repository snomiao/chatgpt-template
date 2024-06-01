import { ChatOpenAI } from "@langchain/openai";
import TextEncoderStream from "polyfill-text-encoder-stream";

export function gpt<V extends string | undefined>(
  s: TemplateStringsArray | string,
  ...v: V[]
) {
  const content =
    typeof s === "string"
      ? s
      : s[0] + s.slice(1).map((e, i) => (v[i] ?? "") + e);
  const tr = new TransformStream<string, Uint8Array>();
  (async function () {
    (await new ChatOpenAI({ model: "gpt-4o" }).stream(content))
      .pipeThrough(
        new TransformStream({
          transform: (chunk, ctrl) =>
            ctrl.enqueue((chunk.content as string) ?? ""),
        }),
      )
      .pipeThrough(new TextEncoderStream())
      .pipeTo(tr.writable);
  })();
  return new Response(tr.readable);
}
