console.log("===== CONTENT SCRIPT LOADED =====");

window.addEventListener("message", (event) => {
    console.log("Message received:", event.data);
    try {
        chrome.runtime.sendMessage({
            test: true
        });
        console.log("sendMessage succeeded");
    } catch (e) {
        console.error(e);
    }
});