chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("netflix.com/")) {
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
      });
    }
  });