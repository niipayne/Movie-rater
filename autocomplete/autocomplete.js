/*
    This file will decompress our compressed trie
    and find matches based on a given prefix
*/

// import Trie from "./trie.js";
// import fs from 'fs'
// import Pako from "pako";

const fs = require('fs')
const Trie = require('./trie.js')
const Pako = require('pako')
const json = require('big-json')

var trie = new Trie.Trie();
const compressed = fs.readFileSync("./tries/65_trie.txt")
// console.log(compressed)
const decompressed = JSON.parse(Pako.inflate(compressed, { to: 'string' }));
// console.log(decompressed)
trie.root = decompressed;

// please try any prefixes you can think of
console.log(trie.getSuggestions('As')) //should return movies that start with 'Chi'
console.log(trie.getSuggestions('Ar')) //should return movies that start with 'Shr'