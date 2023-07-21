'use strict';

import { JpAddress } from './addressParser';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'executeCopy',
    title: chrome.i18n.getMessage("menu_title"),
    contexts: ['selection'],
    documentUrlPatterns: ['https://*/*'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) {
    return;
  }
  if (info.menuItemId == 'executeCopy' && info.selectionText) {
    const address = new JpAddress(info.selectionText);
    const postalcode = address.getPostalcode();
    const fmt = postalcode + '\t' + address.trimPostalcode();
    chrome.tabs.sendMessage(tab.id, {
      url: info.pageUrl,
      hasPostalcode: 0 < postalcode.length,
      command: 'copy',
      rawText: info.selectionText,
      text: fmt,
    });
  }
});
