const color = document.querySelector("body");
const buttonStart = document.querySelector("[data-start]")
const buttonStop = document.querySelector("[data-stop]")

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener("click", e => {
    e.preventDefault();
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    let timerId = setInterval(() => {
        color.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
);

buttonStop.addEventListener("click", () => {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
  clearInterval(timerId);
});