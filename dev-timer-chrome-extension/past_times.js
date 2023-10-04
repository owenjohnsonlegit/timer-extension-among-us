chrome.storage.sync.get({ pastTimes: [] }, (data) => {
  const pastTimes = data.pastTimes;
  const pastList = document.getElementById("past-list");
  pastList.innerHTML = pastTimes
    .map((time) => `<li>${time.name}: ${formatTime(time.time)}</li>`)
    .join("");
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
