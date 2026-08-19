const seeRequest = document.getElementById("seeRequest");
const closeWindow = document.getElementById("closeWindow");

function SeeRequest(){

    chrome.windows.create({
        url: "index.html",
        type: "popup",
        focused: true,
    });
    window.close(); //close the window

}

seeRequest.onclick = SeeRequest;

function CloseWindow(){

    window.close(); //close the window

}

closeWindow.onclick = CloseWindow;