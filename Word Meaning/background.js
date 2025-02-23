/**
 * Ultimate Popup v2.1 - Smooth & Modern Word Meaning Popup
 * Author: Prem Singh
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "showMeaningf3g7h2j9k1",
    title: "Show Meaning",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "showMeaningf3g7h2j9k1") {
    chrome.tabs.sendMessage(tab.id, {
      action: "showPopup",
      text: info.selectionText,
    });
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "showPopup" });
});
