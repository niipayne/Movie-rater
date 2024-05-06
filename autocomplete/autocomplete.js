/*
    This file will decompress our compressed trie
    and find matches based on a given prefix
*/

const fs = require('fs')
const Trie = require('./trie.js')
const fflate = require('fflate')


function get_tries(ascii_val){
    let trie = new Trie.Trie();
    let t1 = performance.now()
    let compressed = fs.readFileSync(`./tries/${ascii_val}_trie.txt`);
    let t2 = performance.now()
    console.log(`Call to read file took ${t2 - t1} milliseconds.`)
    let t3 = performance.now()
    let decompressed = fflate.decompressSync(compressed);
    let origText = JSON.parse(fflate.strFromU8(decompressed));
    let t4 = performance.now()
    console.log(`Call to decompress took ${t4 - t3} milliseconds.`)
    trie.root = origText;
    return trie;
}

const ta = performance.now();
let out = get_tries(65);
const tb = performance.now();
console.log(`Call to get tries took ${tb - ta} milliseconds.`);



// please try any prefixes you can think of
console.log(out.getSuggestions('As')) //should return movies that start with 'Chi'
console.log(out.getSuggestions('Arrival of the ')) //should return movies that start with 'Shr'

module.exports = {
    get_tries
}