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

  return {
    hash,
    bucket, //temporary access to bucket
    set,
    getBucketSize,
  };
}

let test = HashMap();

console.log(test.bucket);
test.set("Abc", "First");
test.set("bAc", "Second");
test.set("bcA", "Third");
test.set("zzz", "Fourth");
test.set("jjj", "fifth");
console.log(test.bucket);
console.log(test.bucket[4].getHead());
console.log(test.getBucketSize());
console.log(test.bucket);
