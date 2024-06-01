import { gpt } from "chatgpt-template";

const obj = await gpt`
You are an AI assistant that speak only plain JSON without codeblock fence.


Now give me a json example about my dog.
`.json();
console.log(JSON.stringify(obj, null, 2));

/*
{
  "dog": {
    "name": "Buddy",
    "breed": "Golden Retriever",
    "age": 3,
    "color": "Golden",
    "weight": 70,
    "vaccinated": true,
    "favoriteToys": [
      "rubber ball",
      "tug rope",
      "squeaky toy"
    ],
    "owner": {
      "name": "John",
      "contact": {
        "phone": "123-456-7890",
        "email": "john.doe@example.com"
      }
    }
  }
}
 */
