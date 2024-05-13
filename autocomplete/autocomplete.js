/*
    This file will decompress our compressed trie
    and find matches based on a given prefix
*/

const fs = require('fs')
const Trie = require('./trie.js')
const fflate = require('fflate')
const pako = require('pako')


function get_tries(ascii_val){
    let trie = new Trie.Trie();
    let t1 = performance.now()
    let compressed = fs.readFileSync(`./tries/${ascii_val}_trie.txt`);
    let t2 = performance.now()
    console.log(`Call to read file took ${t2 - t1} milliseconds.`)
    let t3 = performance.now()
    let decompressed = fflate.decompressSync(compressed);
    let origText = JSON.parse(fflate.strFromU8(decompressed));
    // let origText = eval('(' + fflate.strFromU8(decompressed) + ')');
    let t4 = performance.now()
    console.log(`Call to decompress took ${t4 - t3} milliseconds.`)
    trie.root = origText;
    return trie;
}


function get_trie(){
    let trie = new Trie.Trie();
    let files = fs.readdirSync('./children_objects')
    for(let file of files){
        let compressed = fs.readFileSync(`./children_objects/${file}`)
        let decompressed = JSON.parse(pako.inflate(compressed, {to: 'string'}))
        for(let key of Object.keys(decompressed)){
            trie['root']['children'][key] = decompressed[key]
        }
    }
    console.log('finished ojk.; oloVdszc')
    console.log(trie.getSuggestions('As'))
    return trie
}

get_trie()



module.exports = {
    get_tries
}