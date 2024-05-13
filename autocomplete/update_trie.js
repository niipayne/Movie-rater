 /*
    This file will update our list of movies
    We need to first get the dataset from imdb and extract it into a file called 'primarytitles.txt'.
    My idea is that we're gonna have to do this periodically
*/

const fs = require('fs')
const Trie = require('./trie.js')
const fflate = require('fflate')
const { Readable } = require('stream')
const pako = require('pako')

var titlesArr = fs.readFileSync("primarytitles.txt", { encoding:"utf-8" }).split("\n")
const readableStream = Readable.from(titlesArr)
var test_trie = new Trie.Trie();

readableStream.on("data", (item) => {
    if(!item.startsWith('Episode')){
        test_trie.insert(item)
    }
})

readableStream.on("end", () => {
    console.log("All titles have been inserted into the Trie.");
    console.log(test_trie.getSuggestions('Arrival of the '))
    stringify_large_obj(test_trie.root.children)
});
// readableStream.push(null)

function stringify_large_obj(object){
    // split the object into small chunks
    var values = Object.values(object);
    var final = [];
    var counter = 0;
    var portion = {};

    for (var key in object) {
        if (counter !== 0) {
            final.push(portion);
            portion = {};
        }
        portion[key] = values[counter];
        counter++
    }
    final.push(portion);

    console.log(final)
    console.log(final.length)

    // stream chunks and compress each chunk before writing to file
    let out = ''
    let count = 0
    const rs = Readable.from(final)
    rs.on("data", (item) => {
        fs.writeFileSync(`./children_objects/child_${count}.txt`, pako.deflate(JSON.stringify(item)))
        count += 1
    })
    rs.on("end", () => (
        console.log('finished') 
    ))
}

//-------------------------------------------------------------

// console.log(test_trie.getSuggestions('Arrival of the '))
// console.log(test_trie)
// var titlesDict = {}
// for(let item of titlesArr){
//     if(item.startsWith('Episode')){continue;}
//     test_trie.insert(item)
//     // if (titlesDict[item[0]] == undefined){
//     //     titlesDict[item[0]] = [item]
//     // }else{
//     //     titlesDict[item[0]].push(item)
//     // }
// }

// for(let key of Object.keys(titlesDict)){
//     let filepath = `./tries/${key.charCodeAt(0)}_trie.txt`
//     let trie = new Trie.Trie();
//     for(let t of titlesDict[key]){
//         trie.insert(t)
//     }
//     // fs.writeFileSync(filepath, Pako.deflate(JSON.stringify(trie.root)))
//     let buf = fflate.strToU8(JSON.stringify(trie.root))
//     fs.writeFileSync(filepath, fflate.compressSync(buf, { level: 6, mem: 8 }))
//     // // const notSoMassive = fflate.zlibSync(massiveFile, { level: 9 })
// }
