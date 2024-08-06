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

window.onload = function () {
  modal.style.display = "block";
};

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

const targetDate = new Date("2024-09-28T00:00:00").getTime();

const countdown = setInterval(function () {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdown);
  } else {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }
}, 1000);
