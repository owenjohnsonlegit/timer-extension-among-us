document.addEventListener("DOMContentLoaded", function () {
  let timer;
  let startTime;
  let pausedTime = 0;
  let timerDisplay = document.getElementById("timer-display");

  const timerNameInput = document.getElementById("timer-name");
  const startBtn = document.getElementById("start-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const finishBtn = document.getElementById("finish-btn");
  const viewPastBtn = document.getElementById("view-past-btn");
  const pastList = document.getElementById("past-list");

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  finishBtn.addEventListener("click", finishTimer);
  viewPastBtn.addEventListener("click", viewPastTimes);

  function startTimer() {
    startTime = Date.now() - pausedTime;
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.innerText = formatTime(elapsedTime);
  }

  function pauseTimer() {
    clearInterval(timer);
    pausedTime = Date.now() - startTime;
  }

  function finishTimer() {
    clearInterval(timer);
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const timerName = timerNameInput.value || "Unnamed Timer";

    // Save the past time
    chrome.storage.sync.get({ pastTimes: [] }, (data) => {
      const pastTimes = data.pastTimes;
      pastTimes.push({ name: timerName, time: elapsedSeconds });
      chrome.storage.sync.set({ pastTimes });
      updatePastTimes();
    });

    // Reset variables
    timerNameInput.value = "";
    pausedTime = 0;
    timerDisplay.innerText = "00:00";
  }

  function updatePastTimes() {
    chrome.storage.sync.get({ pastTimes: [] }, (data) => {
      const pastTimes = data.pastTimes;
      pastList.innerHTML = pastTimes
        .map((time) => `<li>${time.name}: ${formatTime(time.time)}</li>`)
        .join("");
    });
  }

  function viewPastTimes() {
    // Open a new tab with past times
    chrome.tabs.create({ url: "past_times.html" });
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  // Initial update of past times
  updatePastTimes();
});
