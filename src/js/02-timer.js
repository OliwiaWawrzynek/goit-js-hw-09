import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputPickerDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
let dataDays = document.querySelector('[data-days]');
let dataHours = document.querySelector('[data-hours]');
let dataMinutes = document.querySelector('[data-minutes]');
let dataSeconds = document.querySelector('[data-seconds]');
let userDate = null;
const actualDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < actualDate) { 
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else if (selectedDates[0] > actualDate) {
      buttonStart.disabled = false;
      userDate = selectedDates[0].getTime();
    }
  },
};

const datePicker = flatpickr(inputPickerDate, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

buttonStart.addEventListener('click', () => {
    let counter = setInterval(() => {
        let currentTime = new Date().getTime();
        let msCount = datePicker.selectedDates[0].getTime() - currentTime;
        let timer = convertMs(msCount);

        dataDays.textContent = addLeadingZero(timer.days);
        dataHours.textContent = addLeadingZero(timer.hours);
        dataMinutes.textContent = addLeadingZero(timer.minutes);
        dataSeconds.textContent = addLeadingZero(timer.seconds);

        if (msCount < 1000) {
            clearInterval(counter);
        }
    }, 1000);
 });
