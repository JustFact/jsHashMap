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

  return {
    hash,
    bucket, //temporary access to bucket
  };
}

let test = HashMap();

console.log(test.hash("Abc"));
console.log(test.hash("bAc"));
console.log(test.hash("bcA"));
