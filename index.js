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

  const replaceValue = (value) => {
    if (head === null) {
      return;
    }

    let currentNode = head;
    while (currentNode) {
      if (currentNode.value.key === value.key) {
        currentNode.value.value = value.value;
        return;
      }
      currentNode = currentNode.next;
    }
  };

  const contains = (value) => {
    console.log(head, value);
    if (head === null) {
      return false;
    }
    let currentNode = head;
    // console.log(head, value);
    if (currentNode.value.key === value) {
      return true;
    }

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      if (currentNode.value.key === value) {
        return true;
      }
    }
    return false;
  };

  return {
    append,
    getHead,
    replaceValue,
    contains,
  };
};

function HashMap(capacity = 16) {
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
    numberOfEntries = numberOfEntries + 1;
    if (getBucketSize() * loadFactor < numberOfEntries) {
      //TODO: re-add all the key-value pairs according to new bucket size
      //the following is a temporary solution and is not correct
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
    // console.log(list.contains(key), key);
    if (list.contains(key)) {
      // console.log("worked on", key);
      list.replaceValue({ key, value });
    } else {
      list.append({ key, value });
    }
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

  const length = () => {
    return numberOfEntries;
  };

  const clear = () => {
    for (let i = 0; i < bucket.length; i++) {
      bucket[i] = "_";
    }
  };

  const keys = () => {
    let result = [];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== "_") {
        let currentNode = bucket[i].getHead();
        do {
          result.push(currentNode.value.key);
          currentNode = currentNode.next;
        } while (currentNode);
      }
    }
    return result;
  };

  const values = () => {
    let result = [];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== "_") {
        let currentNode = bucket[i].getHead();
        do {
          result.push(currentNode.value.value);
          currentNode = currentNode.next;
        } while (currentNode);
      }
    }
    return result;
  };

  const entries = () => {
    let result = [];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] !== "_") {
        let currentNode = bucket[i].getHead();
        do {
          result.push([currentNode.value.key, currentNode.value.value]);
          currentNode = currentNode.next;
        } while (currentNode);
      }
    }
    return result;
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    getBucketSize,
    getBucket,
  };
}

let test = HashMap();

// console.log(test.getBucket());
// console.log(test.getBucketSize());
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
// console.log(test.getBucket());
console.log(test.entries());
test.set("hat", "silver");
console.log(test.getBucketSize());
console.log(test.entries());
console.log(test.hash("grape"));
console.log(test.hash("hat"));
