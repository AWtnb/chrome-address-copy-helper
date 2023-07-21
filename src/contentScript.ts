'use strict';

chrome.runtime.onMessage.addListener(function (
  request,
  _sender,
  _sendResponse
) {
  if (request.command == 'copy') {
    if (request.url.startsWith('https://')) {
      if (!request.hasPostalcode) {
        console.log(`postalcode not found in "${request.rawText}"`);
        return;
      }
      navigator.clipboard.writeText(request.text).then(
        () => {
          console.log('copied:', request.text);
        },
        () => {
          console.log('failed to copy:', request.text);
        }
      );
    } else {
      console.error('HTTP site is not supported.');
    }
  }
});
