chrome.runtime.onMessage.addListener((message) => {

    console.log("Background received:", message);
    chrome.windows.create({
    url: "popup.html",
    type: "popup",
    focused: true,
    
});
});

