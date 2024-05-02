// code modified from https://blog.javascripttoday.com/blog/trie-data-structure/

class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
      for (let i = 0; i < word.length; i++) {
        let char = word[i];
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    search(word) {
      let node = this.root;
  
      for (let i = 0; i < word.length; i++) {
        let char = word[i];
  
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return node.isEndOfWord;
    }
  
    startsWith(prefix) {
      let node = this.root;
      for (let i = 0; i < prefix.length; i++) {
        let char = prefix[i];
        if (!node.children[char]) {
          return false;
        }
        node = node.children[char];
      }
      return true;
    }

    // Get suggestions for a given prefix
    getSuggestions(prefix) {
      let suggestions = [];
      let node = this.root;

      // Traverse the trie based on the characters in the prefix
      for (let char of prefix) {
          if (!node.children[char]) {
            return suggestions; // No words with this prefix
          }
          node = node.children[char];
      }

      // Perform DFS to retrieve suggestions
      this.dfs(node, prefix, suggestions);
      return suggestions;
  }

  // Depth-first search to retrieve suggestions
  dfs(node, prefix, suggestions) {
      if (node.isEndOfWord) {
          suggestions.push(prefix);
      }
      for (let char in node.children) {
          this.dfs(node.children[char], prefix + char, suggestions);
      }
  }

    
  }
  
module.exports = {
  Trie
};
  