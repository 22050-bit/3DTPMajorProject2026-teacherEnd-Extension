const approve = document.getElementById("approveButton");

function testing(){
    chrome.windows.create({
    url: "popup.html",
    type: "popup",
    focused: true,
});
}

approve.onclick = testing;