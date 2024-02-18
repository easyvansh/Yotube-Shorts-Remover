// Save options to storage
function saveOptions() {
    const hideShorts = document.getElementById('hideShorts').checked;
    const hideReels = document.getElementById('hideReels').checked;
    chrome.storage.sync.set({ hideShorts, hideReels }, () => {
        console.log('Options saved.');
    });
}

// Load options from storage
function loadOptions() {
    chrome.storage.sync.get(['hideShorts', 'hideReels'], (result) => {
        document.getElementById('hideShorts').checked = result.hideShorts ?? true;
        document.getElementById('hideReels').checked = result.hideReels ?? true;
    });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('optionsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    saveOptions();
});
