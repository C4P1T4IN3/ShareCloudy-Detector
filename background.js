// ✅ Stocke les URLs trouvées par onglet BY C4PIT4IN3
chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'SHARECLOUDY_FOUND') {
        chrome.storage.local.set({
            [`tab_${sender.tab.id}`]: {
                urls: message.urls,
                pageUrl: message.pageUrl,
                timestamp: Date.now()
            }
        });

        // Badge sur l'icône
        chrome.action.setBadgeText({
            text: message.urls.length.toString(),
            tabId: sender.tab.id
        });
        chrome.action.setBadgeBackgroundColor({
            color: '#e50914',
            tabId: sender.tab.id
        });
    }
});
