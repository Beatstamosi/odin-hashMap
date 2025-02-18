import LinkedList from "./linkedList";

export default class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(0).map((item) => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    this.insert(key, value);
    this.checkLoad();
  }

  insert(key, value) {
    let bucket = this.getBucket(key);

    let itemExists = bucket.containsKey(key);

    if (itemExists) {
      let index = bucket.findKey(key);
      bucket.list[index].value = value;
    } else {
      bucket.prepend(key, value);
    }
  }

  get(key) {
    let bucket = this.getBucket(key);
    let index = bucket.findKey(key);

    return bucket.list[index].value;
  }

  has(key) {
    let bucket = this.getBucket(key);
    return bucket.containsKey(key);
  }

  remove(key) {
    if (this.has(key)) {
      let bucket = this.getBucket(key);
      let index = bucket.findKey(key);

      bucket.removeAt(index);
      return true;
    } else {
      return false;
    }
  }

  length() {
    let sum = 0;

    this.buckets.forEach((bucket) => {
      sum += bucket.size();
    });

    return sum;
  }

  clear() {
    this.buckets = this.buckets.map((item) => new LinkedList());
  }

  keys() {
    let arr = [];

    this.buckets.forEach((bucket) => {
      let keys = bucket.extractKeys();

      arr = arr.concat(keys);
    });

    return arr;
  }

  values() {
    let arr = [];

    this.buckets.forEach((bucket) => {
      let values = bucket.extractValues();

      arr = arr.concat(values);
    });

    return arr;
  }

  entries() {
    let arr = [];

    this.buckets.forEach((bucket) => {
      let entries = bucket.extractEntries();

      arr = arr.concat(entries);
    });

    return arr;
  }

  getBucket(key) {
    let hashCode = this.hash(key);
    return this.buckets[hashCode];
  }

  checkLoad() {
    let load = this.length() / this.capacity;
    console.log(load);

    if (load > this.loadFactor) {
      this.increaseLoad();
    }
  }

  increaseLoad() {
    let entries = this.entries();

    this.buckets = new Array(this.capacity * 2)
      .fill(0)
      .map((item) => new LinkedList());
    this.capacity = this.buckets.length;

    entries.forEach((entry) => {
      this.insert(entry[0], entry[1]);
    });
  }
}
