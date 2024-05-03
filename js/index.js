const musicControl = document.getElementById("navbar__btn");
const audio = document.getElementById("background-music");
const musicIcon = document.getElementById("music-icon");

let isPlaying = true;

var modal = document.getElementById("myModal");
var yesBtn = document.getElementById("yesBtn");
var noBtn = document.getElementById("noBtn");

function closeModal() {
  modal.style.display = "none";
}

yesBtn.addEventListener("click", function () {
  audio.muted = false;
  audio.play();
  musicIcon.src = "./img/unmute.svg";
  closeModal();

  isPlaying = !isPlaying;
});

noBtn.addEventListener("click", function () {
  audio.pause();
  musicIcon.src = "./img/mute.svg";
  closeModal();
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// window.onload = function () {
//   modal.style.display = "block";
// };

musicControl.addEventListener("click", function () {
  if (isPlaying) {
    audio.muted = false;
    audio.play();
    musicIcon.src = "./img/unmute.svg";
  } else {
    audio.pause();
    musicIcon.src = "./img/mute.svg";
  }

  isPlaying = !isPlaying;
});

// Get elements from the DOM
const slider = document.getElementById("slider");
const container = document.getElementById("unlock-slider-container");
const overlay = document.getElementById("overlay"); // Ensure you have an audio element with this ID

// Variable to track if the slider is being dragged
let active = false;

// Function to handle slider movement
function moveSlider(e) {
  if (!active) return; // Add this line to ensure function only runs when active

  // Determine if the event is a mouse or touch event and get the clientX accordingly
  const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  // Calculate new position for the slider
  let x =
    clientX - container.getBoundingClientRect().left - slider.offsetWidth / 2; // Use getBoundingClientRect for more accurate positioning
  // Prevent the slider from moving outside the container bounds
  x = Math.max(0, Math.min(x, container.offsetWidth - slider.offsetWidth)); // Simplify bounds check
  slider.style.left = `${x}px`;
}

// Add event listeners for mouse and touch events to handle dragging
function addEventListeners(element, events, handler) {
  events.forEach((event) =>
    element.addEventListener(event, handler, { passive: false })
  );
}

addEventListeners(slider, ["mousedown", "touchstart"], function (e) {
  e.preventDefault(); // Prevent default behavior to ensure smooth dragging
  active = true; // Set active to true to start tracking movement
  slider.style.cursor = "grabbing"; // Change cursor to grabbing
});

// Listen for mouse and touch movements on the document
addEventListeners(document, ["mousemove", "touchmove"], function (e) {
  moveSlider(e);
});

// Function to handle releasing the mouse or ending the touch
function handleRelease() {
  if (!active) return; // Ensure function only runs when dragging was active
  active = false; // Set active to false to stop tracking movement
  slider.style.cursor = "pointer"; // Reset the cursor to pointer

  // Check if the slider has been moved to the end of the container
  if (
    parseInt(slider.style.left, 10) >=
    container.offsetWidth - slider.offsetWidth
  ) {
    overlay.style.display = "none"; // Hide the overlay

    // Play the audio muted initially to comply with browser autoplay policies
    audio.muted = true;
    audio
      .play()
      .then(() => {
        audio.muted = false; // Unmute the audio after playback has started
      })
      .catch((e) => {
        console.error("Error when attempting to play music after sliding:", e);
      });
    musicIcon.src = "./img/unmute.svg";
  } else {
    slider.style.left = "0px"; // Reset the slider position if not fully slid
  }
}

addEventListeners(document, ["mouseup", "touchend"], handleRelease);
