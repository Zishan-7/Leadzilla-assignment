(() => {
  let people = document.getElementsByClassName(
    "reusable-search__result-container"
  );
  let count = 1;

  chrome.runtime.sendMessage({ status: "Connecting" });
  for (let index = 0; index < people.length; index++) {
    setTimeout(async () => {
      const btn = people[index].getElementsByTagName("button")[0];

      if (btn.innerText == "Connect") {
        btn.click();
        let dialog = await waitForElm(".artdeco-modal");
        let sendButton = dialog.getElementsByTagName("button");
        sendButton[2].click(); // Send Request Button
        sendButton[0].click(); // Close Note Dialog
        chrome.runtime.sendMessage({ count });
        count++;
      }
      if (index == people.length - 1) {
        chrome.runtime.sendMessage({ status: "Finished" });
        console.log("object");
      }
    }, 1000 * index);
  }
})();

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
