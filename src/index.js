import "./styles.css";
import HashMap from "./hashmap";

document.addEventListener("DOMContentLoaded", () => {
    const hash = new HashMap();
    console.log(hash.buckets);
    console.log(hash.capacity);
    hash.set("Peter", "Parker");
    console.log(hash.buckets);
    hash.set("Peter", "Spiderman");
    console.log(hash.buckets);
    console.log(hash.get("Peter"));
})
