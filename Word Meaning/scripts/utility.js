/**
 * Ultimate Popup v2.1 - Smooth & Modern Word Meaning Popup
 * Author: Prem Singh
 */

function openPopup(selectedText) {
  let popup = getPopupElement();
  if (!popup) {
    createPopup();
    popup = getPopupElement();
  }

  updatePopupUI(selectedText);
  showPopup();
  fetchWordMeaning(selectedText);
}

function getPopupElement() {
  return document.getElementById("popup-f3g7h2j9k1");
}

function updatePopupUI(selectedText) {
  document.getElementById("wordTitle-f3g7h2j9k1").innerText = selectedText;
  document.getElementById("meaning-f3g7h2j9k1").innerText = "";
  document.getElementById("example-f3g7h2j9k1").innerText = "";
  document.getElementById("errorMessage-f3g7h2j9k1").innerText = "";
  document.getElementById("loading-f3g7h2j9k1").style.display = "block";
}

function showPopup() {
  getPopupElement().classList.add("popup-show-f3g7h2j9k1");
}

function fetchWordMeaning(selectedText) {
  if (!navigator.onLine) {
    displayError("No Internet Connection!");
    return;
  }

  fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((data) => displayWordMeaning(data))
    .catch(() => displayError("Error fetching data."));
}

function displayWordMeaning(data) {
  document.getElementById("loading-f3g7h2j9k1").style.display = "none";
  if (data.title) {
    displayError("Error: Word not found.");
  } else {
    document.getElementById("meaning-f3g7h2j9k1").innerText =
      data[0].meanings[0].definitions[0].definition;
    document.getElementById("example-f3g7h2j9k1").innerText = data[0]
      .meanings[0].definitions[0].example
      ? "Ex: " + data[0].meanings[0].definitions[0].example
      : "";
  }
}

function displayError(message) {
  document.getElementById("loading-f3g7h2j9k1").style.display = "none";
  const errorMessage = document.getElementById("errorMessage-f3g7h2j9k1");
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
}

function createPopup() {
  const popup = document.createElement("div");
  popup.id = "popup-f3g7h2j9k1";
  popup.classList.add("popup-f3g7h2j9k1", "popup-container-f3g7h2j9k1");

  const popupContent = document.createElement("div");
  popupContent.classList.add(
    "popup-content-f3g7h2j9k1",
    "popup-box-f3g7h2j9k1"
  );

  popupContent.append(
    createCloseButton(),
    createElement("h3", "wordTitle-f3g7h2j9k1", "word-title-f3g7h2j9k1"),
    createElement("div", "loading-f3g7h2j9k1", "loading-f3g7h2j9k1"),
    createElement("p", "meaning-f3g7h2j9k1", "popup-info-f3g7h2j9k1"),
    createElement("p", "example-f3g7h2j9k1", "popup-info-f3g7h2j9k1"),
    createElement("p", "errorMessage-f3g7h2j9k1", "error-content-f3g7h2j9k1")
  );

  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}

function createElement(tag, id, className) {
  const element = document.createElement(tag);
  element.id = id;
  element.classList.add(className);
  return element;
}

function createCloseButton() {
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn-f3g7h2j9k1");
  closeBtn.innerHTML = "&#10006;";
  closeBtn.onclick = closePopup;
  return closeBtn;
}

function closePopup() {
  const popup = getPopupElement();
  if (popup) popup.remove();
}
