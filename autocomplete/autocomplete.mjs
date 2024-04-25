import Trie from "./trie.mjs";
import fs from 'fs'

var trie = new Trie();
var wordsArr = fs.readFileSync("primarytitles.txt", { encoding:"utf-8"}).split("\n")

for(let word of wordsArr.slice(0, 500001)){ // you can slice the array
    // console.log(word)
    trie.insert(word)
}

console.log(trie.getSuggestions('Chi')) //should return movies that start with 'Chi'
console.log(trie.getSuggestions('Shr')) //should return movies that start with 'Shr'