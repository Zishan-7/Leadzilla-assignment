function injectTheScript() {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content_script.js"],
    });
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const button = document.getElementById("btn");

  if (request.status == "Connecting") {
    button.innerText = "Connecting...";
    button.disabled = true;
  }

  if (request.status == "Finished") {
    button.innerText = "Start Connecting";
    button.disabled = false;
  }

  if (request.count) {
    const countText = document.getElementById("count");
    countText.innerText = `Connection request sent to ${request.count} people`;
  }
});

document.getElementById("btn").addEventListener("click", injectTheScript);
