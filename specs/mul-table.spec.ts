import "d3";
import { csvParse } from "d3";
import { gpt } from "../index";

it("streams csv", async () => {
  const out =
    await gpt`Act as a speak only CSV without comments, give me a 3*3 multiplication table, start with header\nexpr,answer\n1*1,1`
      .lines({ EOL: "NONE" })
      // .log((e) => console.log(e)) // csv
      .tees((s) =>
        s
          .skip(1)
          .flatMap((e) => csvParse("expr,answer\n" + e))
          .map((e) => JSON.stringify(e))
          .log()
          .done()
      )
      .map((e) => e + "\n")
      .text();
  const exp = `expr,answer\n1*1,1\n1*2,2\n1*3,3\n2*1,2\n2*2,4\n2*3,6\n3*1,3\n3*2,6\n3*3,9\n`;
  expect(out).toEqual(exp);
}, 30e3);
