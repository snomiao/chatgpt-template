import { ChatOpenAI } from "@langchain/openai";
export function gpt<V extends string | undefined>(
  s: TemplateStringsArray | string,
  ...v: V[]
) {
  const content =
    typeof s === "string"
      ? s
      : s[0] + s.slice(1).map((e, i) => (v[i] ?? "") + e);
  let stream: ReadableStream<string>;
  const ac = new AbortController();
  const signal = ac.signal;
  const promise = (async function () {
    const res = await new ChatOpenAI({ model: "gpt-4o" }).stream(content, {
      signal,
    });
    stream = res.pipeThrough(
      new TransformStream({
        transform: (chunk, ctrl) =>
          ctrl.enqueue((chunk.content as string) ?? ""),
      })
    );
    return Object.assign(new Response(stream), stream);
  })();
  return Object.assign(promise, {
    abort: () => ac.abort(),
    text: () => promise.then((e) => e.text()),
    json: () => promise.then((e) => e.json()),
    pipeTo: <R extends string>(
      destination: WritableStream<R>,
      options?: StreamPipeOptions
    ) => promise.then((e) => stream.pipeTo(destination, options)),
  });
}
