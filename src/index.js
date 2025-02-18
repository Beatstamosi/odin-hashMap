import "./styles.css";
import HashMap from "./hashmap";

document.addEventListener("DOMContentLoaded", () => {
  const test = new HashMap(0.75, 16);
  test.set("apple", "red");
  test.set("banana", "yellow");
  test.set("carrot", "orange");
  test.set("dog", "brown");
  test.set("elephant", "gray");
  test.set("frog", "green");
  test.set("grape", "purple");
  test.set("ice cream", "white");
  test.set("jacket", "blue");
  test.set("kite", "pink");
  test.set("lion", "golden");
  test.set("hat", "black");
  console.log(test.buckets);
  test.set("moon", "silver");
  test.set("sky", "blue");
  console.log(test.buckets);
  test.set("berlin", "grey");
  test.set("giraffe", "black");
  console.log(test.keys());
  console.log(test.entries());
  console.log(test.values());
});
