console.log("===== CONTENT SCRIPT LOADED =====");

window.addEventListener("message", (event) => { //when recieving a message

    console.log("Message received:", event.data);

    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) { 

        try {

            chrome.runtime.sendMessage(event.data); //send using chrome runtime, send to the background.js of the chrome extension

            console.log("sendMessage succeeded");

        } 
        
        catch (error) {

            console.warn("Extension context invalidated. Please refresh the webpage.", error);

        }
    } 
    
    else {
        console.warn("Extension was reloaded or disconnected! Refresh to reconnect.");
    }
}
);