import LinkedList from "./linkedList";

export default class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.buckets = new Array(16).fill(0).map(item => new LinkedList);
        this.capacity = this.buckets.length;
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
        let bucket = this.getBucket(key);

        let itemExists = bucket.containsKey(key);

        if (itemExists) {
            let index = bucket.findKey(key);
            bucket.list[index].value = value;
        } else {
            bucket.append(key, value);
        }

        this.checkLoad();
    }

    get(key) {
        let bucket = this.getBucket(key);
        let index = bucket.findKey(key);

        return bucket.list[index].value;
    }

    getBucket(key) {
        let hashCode = this.hash(key);
        return this.buckets[hashCode];
    }
 
    checkLoad() {
        let load = this.capacity * this.loadFactor;

        if (load > this.buckets.length) {
            this.increaseLoad();
        }
    }

    increaseLoad() {
        // TODO: Double capacity and copy existing buckets into new buckets
    }
}