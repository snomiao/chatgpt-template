import OpenAI from "openai";
import pMap from "p-map";
import PolyfillTextDecoderStream from "polyfill-text-decoder-stream";
import { zipWith } from "rambda";
import { sf, type FlowSource } from "sflow";
import { isXMLHTTPRequestBodyInit } from "./isXMLHTTPRequestBodyInit";
export const gptEnv: Record<string, string> = {
  // OPENAI_API_KEY: "",
  // OPENAI_CHAT_MODEL
  
};

export const gpt = (
  tsa: TemplateStringsArray,
  ...slots: (XMLHttpRequestBodyInit | FlowSource<string>)[]
) => {
  // allow to inject env by gpt.env = {...}
  Object.assign(process.env, gptEnv);

  return sf(
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
        await new OpenAI({
          // todo: use api key from gptenv
        }).chat.completions
          .create({
            model: 
            // todo: use model from enve
            process.env.OPENAI_CHATGPT_MODEL ?? "gpt-4o",
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
  ).confluenceByConcat();
};
