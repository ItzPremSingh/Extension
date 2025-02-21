// Static unique identifier suffix
const suffix = "asdfkla45fsa";

// Dynamically create the popup HTML structure
function createPopup() {
  const popup = document.createElement("div");
  popup.id = `popup-${suffix}`;
  popup.classList.add(`popup-${suffix}`);

  const popupContent = document.createElement("div");
  popupContent.classList.add(`popup-content-${suffix}`);

  const wordTitle = document.createElement("h3");
  wordTitle.id = `wordTitle-${suffix}`;
  wordTitle.classList.add(`word-title-${suffix}`);

  const closeBtn = document.createElement("span");
  closeBtn.classList.add(`close-btn-${suffix}`);
  closeBtn.innerText = "×";
  closeBtn.onclick = closePopup;

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

  // Append elements to popupContent
  popupContent.appendChild(wordTitle);
  popupContent.appendChild(closeBtn);
  popupContent.appendChild(loading);
  popupContent.appendChild(meaning);
  popupContent.appendChild(example);
  popupContent.appendChild(errorMessage);

  // Append popupContent to popup
  popup.appendChild(popupContent);

  // Append popup to the body
  document.body.appendChild(popup);
}

// Close the popup
function closePopup() {
  const popup = document.getElementById(`popup-${suffix}`);
  popup.classList.remove(`popup-${suffix}-show`);
  document.body.removeChild(popup); // Remove the popup from the body
}

// Add event listener for double-click
window.addEventListener("dblclick", function () {
  let selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  selectedText = selectedText.toLowerCase();

  let popup = document.getElementById(`popup-${suffix}`);

  // If popup doesn't exist, create it
  if (!popup) {
    createPopup();
    popup = document.getElementById(`popup-${suffix}`);
  }

  const wordTitle = document.getElementById(`wordTitle-${suffix}`);
  const meaning = document.getElementById(`meaning-${suffix}`);
  const example = document.getElementById(`example-${suffix}`);
  const loading = document.getElementById(`loading-${suffix}`);
  const errorMessage = document.getElementById(`errorMessage-${suffix}`);

  // Clear previous content
  meaning.innerText = "";
  example.innerText = "";
  errorMessage.innerText = "";

  // Show loading animation and prepare the popup
  wordTitle.innerText = selectedText;
  loading.style.display = "block";
  popup.classList.add(`popup-${suffix}-show`);

  // Check if the user is online
  if (!navigator.onLine) {
    loading.style.display = "none";
    errorMessage.innerText = "No Internet Connection!";
    errorMessage.style.display = "block";
    return;
  }

  // Fetch the word meaning from the API
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`)
    .then((response) => response.json())
    .then((data) => {
      loading.style.display = "none"; // Hide loading animation
      if (data.title) {
        meaning.innerText = "Word not found.";
        example.innerText = "-";
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

// Create the popup when the DOM is loaded, only once
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById(`popup-${suffix}`)) {
    createPopup();
  }
});
