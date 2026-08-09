console.log("===== CONTENT SCRIPT LOADED =====");

window.addEventListener("message", (event) => {
    console.log("Message received:", event.data);
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) {
        try {
            chrome.runtime.sendMessage(event.data);
            console.log("sendMessage succeeded");
        } catch (error) {
            console.warn("Extension context invalidated. Please refresh the webpage.", error);
        }
    } else {
        console.warn("Extension was reloaded or disconnected! Refresh to reconnect.");
    }
    console.log("sendMessage succeeded");
    
});