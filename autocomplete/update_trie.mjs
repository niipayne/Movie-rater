 /*
    This file will update our list of movies
    We need to first get the dataset from imdb and extract it into a file called 'primarytitles.txt'.
    This code will not work unless you increase the memory space allocated to nodeJS
    Type in `node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))' to check how much space is allocated
    Around 8000 mb is sufficient
    Type in `$env:NODE_OPTIONS="--max-old-space-size=8192"` to increase. size is in MB
    My idea is that we're gonna have to do this periodically
*/

import fs from 'fs'
import Trie from "./trie.mjs";
import Pako from 'pako';

var trie = new Trie();
var titlesArr = fs.readFileSync("primarytitles.txt", { encoding:"utf-8" }).split("\n")

for(let i = 0; i < 500000; i+=50000){
    for (let title of titlesArr.slice(i, i+50000)){
        trie.insert(title)
    }
}

console.log(trie.root)


fs.writeFileSync('titles_trie.emmanuel', Pako.deflate(JSON.stringify(trie.root)))
