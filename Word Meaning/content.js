/**
 * Ultimate Popup v2.1 - Smooth & Modern Word Meaning Popup
 * Author: Prem Singh
 */

window.addEventListener("dblclick", function () {
  let selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  openPopup(selectedText);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showPopup") {
    const text = message.text || window.getSelection().toString();
    if (!text) return;

    openPopup(text);
  }
});
