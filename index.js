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

function HashMap(capacity = 16) {
  let loadFactor = 0.75;
  let bucket = Array.from("_".repeat(capacity));

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  };

  const set = (key, value) => {
    let index = hash(key);
    let list;
    if (bucket[index] === "_") {
      list = newLinkedList();
      // console.log("call 1 ", list.getHead());
    } else {
      list = bucket[index];
      // console.log("call 2", list.getHead());
    }

    list.append({ key, value });
    bucket[index] = list;
    // console.log("call 3 ", list.getHead());
  };

  return {
    hash,
    bucket, //temporary access to bucket
    set,
  };
}

let test = HashMap();

console.log(test.bucket);
test.set("Abc", "First");
test.set("bAc", "Second");
test.set("bcA", "Third");
console.log(test.bucket);
