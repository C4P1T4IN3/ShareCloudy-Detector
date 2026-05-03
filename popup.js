chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.storage.local.get(`tab_${tabId}`, (result) => {
        const data = result[`tab_${tabId}`];
        const content = document.getElementById('content');

        if (!data || !data.urls || data.urls.length === 0) {
            content.innerHTML = `
                <div class="empty">
                    <div style="font-size:40px;margin-bottom:10px">😴</div>
                    Aucun lien ShareCloudy<br>détecté sur cette page
                </div>
            `;
            return;
        }

        content.innerHTML = `
            <p style="color:#999;font-size:12px;margin-bottom:15px">
                ✅ ${data.urls.length} lien(s) trouvé(s)
            </p>
            ${data.urls.map((url, i) => `
                <div class="url-card">
                    <div style="color:#999;font-size:10px;margin-bottom:5px">🔗 Lien ${i + 1}</div>
                    <div class="url-text">${url}</div>
                    <div class="btn-row">
                        <button class="btn-copy" onclick="copyUrl('${url}')">📋 Copier</button>
                        <a href="${url}" target="_blank" class="btn-open">🔗 Ouvrir</a>
                    </div>
                </div>
            `).join('')}
        `;
    });
});

function copyUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        const btn = event.target;
        btn.textContent = '✅ Copié ! Merci C4PIT4IN3';
        setTimeout(() => btn.textContent = '📋 Copier', 2000);
    });
}
