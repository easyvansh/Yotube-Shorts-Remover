# YOUTUBE SHORTS BLOCKER

A Chrome extension that eliminates YouTube Shorts from your YouTube browsing experience.

### Purpose

For those who find YouTube Shorts distracting or simply prefer not to see them, this extension provides a solution by hiding them from view.

## Setup

1. Download the source code from this repository.

2. Navigate to [chrome://extensions](chrome://extensions) in your Chrome browser.

3. Turn on the developer mode.

4. Select "Load unpacked" and choose the directory where you downloaded the source code.

5. To activate or deactivate the extension, click its icon in the browser toolbar.

## Functionality

The extension operates by injecting a CSS stylesheet into YouTube pages that targets and hides Shorts using the `:has` CSS selector.