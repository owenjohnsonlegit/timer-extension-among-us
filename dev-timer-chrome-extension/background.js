// Set up a listener for changes to storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.pastTimes) {
    // Do something when pastTimes changes
    console.log("Past times updated:", changes.pastTimes.newValue);
  }
});
