import { gpt } from "..";

it("works", async () => {
  expect(await gpt`1 + 1 =`.text()).toEqual("1 + 1 = 2");
});
