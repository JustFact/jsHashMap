const newNode = (value) => {
  return {
    value: value ? value : null,
    next: null,
  };
};

const newLinkedList = () => {
  let head = null;
  const getHead = () => {
    return head;
  };

  const append = (value) => {
    if (head === null) {
      head = newNode(value);
      return;
    } else {
      let currentNode = head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode(value);
    }
  };

  return {
    append,
    getHead,
  };
};

function HashMap(capacity = 6) {
  let loadFactor = 0.75;
  let bucket = Array.from("_".repeat(capacity));
  let numberOfEntries = 0;

  const getBucket = () => {
    return bucket;
  };

  const getBucketSize = () => {
    return bucket.length;
  };

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  };

  const set = (key, value) => {
    if (getBucketSize() * loadFactor - numberOfEntries <= 1) {
      //I literally have no idea what i'm suppose to do here.
      //increasing size of array in Javascript doesn't make sense
      //let's pretend it was actually required
      bucket = Array.from([...bucket, ..."_".repeat(capacity)]);
      capacity = capacity * 2;
    }

    let index = hash(key);
    let list;
    if (bucket[index] === "_") {
      list = newLinkedList();
    } else {
      list = bucket[index];
    }
    numberOfEntries = numberOfEntries + 1;
    list.append({ key, value });
    bucket[index] = list;
  };

  const get = (key) => {
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== "_") {
        let currentNode = bucket[i].getHead();
        do {
          if (currentNode.value.key === key) {
            return currentNode.value.value;
          }
          currentNode = currentNode.next;
        } while (currentNode);
      }
    }
    return null;
  };

  const has = (key) => {
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== "_") {
        let currentNode = bucket[i].getHead();
        do {
          if (currentNode.value.key === key) {
            return true;
          }
          currentNode = currentNode.next;
        } while (currentNode);
      }
    }
    return false;
  };

  const remove = (key) => {
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== "_") {
        let currentNode = bucket[i].getHead();
        let previousNode = bucket[i].getHead();
        do {
          if (currentNode.value.key === key) {
            if (currentNode === previousNode) {
              bucket[i] = "_";
            } else {
              previousNode.next = currentNode.next;
            }
            return true;
          }
          previousNode = currentNode;
          currentNode = currentNode.next;
        } while (currentNode);
      }
    }
    return false;
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    getBucketSize,
    getBucket,
  };
}

let test = HashMap();

console.log(test.getBucket());
test.set("Abc", "First");
test.set("bAc", "Second");
test.set("bcA", "Third");
test.set("zzz", "Fourth");
test.set("jjj", "fifth");
console.log(test.getBucket()[0].getHead());
console.log(test.getBucket()[6].getHead());
console.log(test.getBucket()[4].getHead());
console.log(test.getBucket());
console.log(test.remove("bAc"));
console.log(test.getBucket());
console.log(test.getBucket()[4].getHead());
