chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ state: 'HIDDEN', hideShorts: true, hideReels: true });
  chrome.action.setBadgeText({ text: '2' }); // Assuming 2 elements are being hidden initially
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    await chrome.storage.sync.get(['state', 'hideShorts', 'hideReels'], (result) => {
      if (result.state === 'HIDDEN') {
        toggleInjection(tabId, 'HIDDEN', result.hideShorts, result.hideReels);
      } else {
        console.log('VISIBLE');
        toggleInjection(tabId, 'VISIBLE', result.hideShorts, result.hideReels);
      }
    });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'HIDDEN' ? 'VISIBLE' : 'HIDDEN';

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  chrome.storage.sync.set({ state: nextState });

  chrome.storage.sync.get(['hideShorts', 'hideReels'], (result) => {
    toggleInjection(tab.id, nextState, result.hideShorts, result.hideReels);
  });
});

async function toggleInjection(tabId, state, hideShorts, hideReels) {
  const css = 'injectable.css';

  if (state === 'HIDDEN') {
    await chrome.scripting.insertCSS({
      files: [css],
      target: { tabId },
    });

    let count = 0;
    if (hideShorts) count++;
    if (hideReels) count++;
    chrome.action.setBadgeText({
      tabId: tabId,
      text: String(count),
    });
  } else {
    await chrome.scripting.removeCSS({
      files: [css],
      target: { tabId },
    });
    chrome.action.setBadgeText({
      tabId: tabId,
      text: '',
    });
  }
}
