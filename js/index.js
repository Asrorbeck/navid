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

const slider = document.getElementById("slider");
const container = document.getElementById("unlock-slider-container");
const overlay = document.getElementById("overlay");

let active = false;

function moveSlider(e) {
  if (!active) return;
  const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;

  let x =
    clientX - container.getBoundingClientRect().left - slider.offsetWidth / 2;

  x = Math.max(0, Math.min(x, container.offsetWidth - slider.offsetWidth));
  slider.style.left = `${x}px`;
}

function addEventListeners(element, events, handler) {
  events.forEach((event) =>
    element.addEventListener(event, handler, { passive: false })
  );
}

addEventListeners(slider, ["mousedown", "touchstart"], function (e) {
  e.preventDefault();
  active = true;
  slider.style.cursor = "grabbing";
});

addEventListeners(document, ["mousemove", "touchmove"], function (e) {
  moveSlider(e);
});

function handleRelease() {
  if (!active) return;
  active = false;
  slider.style.cursor = "pointer";
  if (
    parseInt(slider.style.left, 10) >=
    container.offsetWidth - slider.offsetWidth
  ) {
    overlay.style.display = "none";
    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.muted = false;
          })
          .catch((error) => {
            console.error("Playback failed:", error);
            // Handle or log the error
            // Optionally, inform the user that manual interaction is needed
          });
      }
    } catch (error) {
      console.error("Error attempting to play audio:", error);
    }
    musicIcon.src = "./img/unmute.svg";
    isPlaying = !isPlaying;
  } else {
    slider.style.left = "0px";
  }
}

addEventListeners(document, ["mouseup", "touchend"], handleRelease);
