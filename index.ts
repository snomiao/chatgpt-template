import OpenAI from "openai";
import pMap from "p-map";
import PolyfillTextDecoderStream from "polyfill-text-decoder-stream";
import { zipWith } from "rambda";
import { sf, type FlowSource } from "sflow";
import { isXMLHTTPRequestBodyInit } from "./isXMLHTTPRequestBodyInit";
function unpromises<T>(promise: Promise<ReadableStream<T>>): ReadableStream<T> {
  const tr = new TransformStream<T, T>();
  (async function () {
    const s = await promise;
    await s.pipeTo(tr.writable);
  })().catch((error) =>
    tr.readable.cancel(error).catch(() => {
      throw error;
    })
  );
  return tr.readable;
}
export const gpt = (
  tsa: TemplateStringsArray,
  ...slots: (XMLHttpRequestBodyInit | FlowSource<string>)[]
) =>
  sf(
    unpromises(
      (async () => {
        const u = [...tsa] as string[];
        const v = await pMap(slots ?? [], async (e) =>
          isXMLHTTPRequestBodyInit(e)
            ? new Response(e).text()
            : sf<string>(e).text()
        );
        const body = zipWith((a, b) => a + b, u, [...v, ""]).join("");
        const prompt = [body].join("");
        return sf(
          await new OpenAI().chat.completions
            .create({
              model: process.env.CHATGPT_MODEL ?? "gpt-4o",
              messages: [{ content: `${prompt}`, role: "user" }],
              stream: true,
            })
            .then((e) => e.toReadableStream())
        )
          .through(new PolyfillTextDecoderStream())
          .map(
            (e) => (JSON.parse(e)?.choices?.[0]?.delta?.content as string) ?? ""
          );
      })()
    )
  );
