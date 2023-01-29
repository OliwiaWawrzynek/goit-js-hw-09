const color = document.querySelector("body");
const buttonStart = document.querySelector("[data-start]")
const buttonStop = document.querySelector("[data-stop]")
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener("click", e => {
    e.preventDefault();
    timerId = setInterval(() => {
      color.style.backgroundColor = getRandomHexColor();
      buttonStart.disabled = true;
      buttonStop.disabled = false;
    }, 1000);
}
);

buttonStop.addEventListener("click", () => {
    clearInterval(timerId);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
});