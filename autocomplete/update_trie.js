 /*
    This file will update our list of movies
    We need to first get the dataset from imdb and extract it into a file called 'primarytitles.txt'.
    This code will not work unless you increase the memory space allocated to nodeJS
    Type in `node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))' to check how much space is allocated
    Around 12000 mb is sufficient
    Type in `$env:NODE_OPTIONS="--max-old-space-size=12000"` to increase. size is in MB
    My idea is that we're gonna have to do this periodically
*/

const fs = require('fs')
const Trie = require('./trie.js')
const Pako = require('pako')
const fflate = require('fflate')

var titlesArr = fs.readFileSync("primarytitles.txt", { encoding:"utf-8" }).split("\n")

var titlesDict = {}
for(let item of titlesArr){
    if(item.startsWith('Episode')){continue;}
    if (titlesDict[item[0]] == undefined){
        titlesDict[item[0]] = [item]
    }else{
        titlesDict[item[0]].push(item)
    }
}

for(let key of Object.keys(titlesDict)){
    let filepath = `./tries/${key.charCodeAt(0)}_trie.txt`
    let trie = new Trie.Trie();
    for(let t of titlesDict[key]){
        trie.insert(t)
    }
    // fs.writeFileSync(filepath, Pako.deflate(JSON.stringify(trie.root)))
    let buf = fflate.strToU8(JSON.stringify(trie.root))
    fs.writeFileSync(filepath, fflate.compressSync(buf, { level: 6, mem: 8 }))
    // // const notSoMassive = fflate.zlibSync(massiveFile, { level: 9 })
}
