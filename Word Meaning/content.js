/**
 * Ultimate Popup v2.0 - Smooth & Modern Word Meaning Popup
 * Author: Prem Singh
 */

const suffix = "f3g7h2j9k1";

/**
 * Creates the popup dynamically and appends it to the DOM.
 */
function createPopup() {
  const popup = document.createElement("div");
  popup.id = `popup-${suffix}`;
  popup.classList.add(`popup-${suffix}`, `popup-container-${suffix}`);

  const popupContent = document.createElement("div");
  popupContent.classList.add(`popup-content-${suffix}`, `popup-box-${suffix}`);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add(`close-btn-${suffix}`);
  closeBtn.innerHTML = "&#10006;";
  closeBtn.onclick = closePopup;

  const wordTitle = document.createElement("h3");
  wordTitle.id = `wordTitle-${suffix}`;
  wordTitle.classList.add(`word-title-${suffix}`);

  const loading = document.createElement("div");
  loading.id = `loading-${suffix}`;
  loading.classList.add(`loading-${suffix}`);

  const meaning = document.createElement("p");
  meaning.id = `meaning-${suffix}`;
  meaning.classList.add(`popup-info-${suffix}`);

  const example = document.createElement("p");
  example.id = `example-${suffix}`;
  example.classList.add(`popup-info-${suffix}`);

  const errorMessage = document.createElement("p");
  errorMessage.id = `errorMessage-${suffix}`;
  errorMessage.classList.add(`error-content-${suffix}`);

  // Append all elements to popupContent
  popupContent.append(
    closeBtn,
    wordTitle,
    loading,
    meaning,
    example,
    errorMessage
  );
  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}

/**
 * Closes and removes the popup from the DOM.
 */
function closePopup() {
  const popup = document.getElementById(`popup-${suffix}`);
  if (popup) {
    popup.remove();
  }
}

/**
 * Handles the double-click event to fetch word definitions.
 */
window.addEventListener("dblclick", function () {
  let selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  selectedText = selectedText.toLowerCase();
  let popup = document.getElementById(`popup-${suffix}`);

  if (!popup) {
    createPopup();
    popup = document.getElementById(`popup-${suffix}`);
  }

  const wordTitle = document.getElementById(`wordTitle-${suffix}`);
  const meaning = document.getElementById(`meaning-${suffix}`);
  const example = document.getElementById(`example-${suffix}`);
  const loading = document.getElementById(`loading-${suffix}`);
  const errorMessage = document.getElementById(`errorMessage-${suffix}`);

  // Reset previous content
  meaning.innerText = "";
  example.innerText = "";
  errorMessage.innerText = "";

  // Update UI with selected word
  wordTitle.innerText = selectedText;
  loading.style.display = "block";
  popup.classList.add(`popup-show-${suffix}`);

  // Handle offline case
  if (!navigator.onLine) {
    loading.style.display = "none";
    errorMessage.innerText = "No Internet Connection!";
    errorMessage.style.display = "block";
    return;
  }

  // Fetch word meaning from API
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`)
    .then((response) => response.json())
    .then((data) => {
      loading.style.display = "none";
      if (data.title) {
        meaning.innerText = "Error: Word not found.";
      } else {
        meaning.innerText = data[0].meanings[0].definitions[0].definition;
        example.innerText = data[0].meanings[0].definitions[0].example
          ? "Ex: " + data[0].meanings[0].definitions[0].example
          : "";
      }
    })
    .catch((error) => {
      loading.style.display = "none";
      errorMessage.innerText = "Error fetching data.";
      errorMessage.style.display = "block";
      console.error(error);
    });
});
