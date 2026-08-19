chrome.runtime.onMessage.addListener((message) => {

    console.log(chrome.runtime);
    console.log(chrome.runtime.id);
    
    const data = message.data;

    chrome.storage.local.set(data).then(
        chrome.windows.create({
        url: "/InbetweenWindow/youGotMail.html",
        type: "popup",
        focused: true,
    })
    );

    console.log("Background received:", message);
    
});
