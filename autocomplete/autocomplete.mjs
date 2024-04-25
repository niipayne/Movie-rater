/*
    This file will decompress our compressed trie
    and find matches based on a given prefix
*/

import Trie from "./trie.mjs";
import fs from 'fs'
import Pako from "pako";

var trie = new Trie();
const compressed = fs.readFileSync("titles_trie.emmanuel")
console.log(compressed)
const decompressed = JSON.parse(Pako.inflate(compressed, { to: 'string' }));
console.log(decompressed)
trie.root = decompressed;

// please try any prefixes you can think of
console.log(trie.getSuggestions('Chi')) //should return movies that start with 'Chi'
console.log(trie.getSuggestions('Shr')) //should return movies that start with 'Shr'