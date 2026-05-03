// ✅ Scan toutes les iframes de la page By C4PIT4IN3
function scanIframes() {
    const found = [];

    // Cherche dans les iframes directes
    document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src || iframe.getAttribute('src') || '';
        if (src.includes('sharecloudy.com')) {
            found.push(src);
        }
    });

    // Cherche dans les scripts/sources cachées By C4PIT4IN3
    document.querySelectorAll('script').forEach(script => {
        const content = script.textContent || '';
        const regex = /https?:\/\/sharecloudy\.com\/iframe\/[^\s"'`]+/g;
        const matches = content.match(regex);
        if (matches) found.push(...matches);
    });

    // Cherche dans tout le HTML de la page By C4PIT4IN3
    const bodyHTML = document.documentElement.innerHTML;
    const regex = /https?:\/\/sharecloudy\.com\/iframe\/[^\s"'`<>]+/g;
    const allMatches = bodyHTML.match(regex);
    if (allMatches) found.push(...allMatches);

    // Supprime les doublons By C4PIT4IN3
    const unique = [...new Set(found)];

    if (unique.length > 0) {
        // Envoie au background script By C4PIT4IN3
        chrome.runtime.sendMessage({
            type: 'SHARECLOUDY_FOUND',
            urls: unique,
            pageUrl: window.location.href
        });

        // Affiche une notification visuelle sur la page By C4PIT4IN3
        showBanner(unique);
    }
}

// ✅ Bannière visuelle sur la page By C4PIT4IN3
function showBanner(urls) {
    // Évite les doublons By C4PIT4IN3
    if (document.getElementById('sc-detector-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'sc-detector-banner';
    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        background: #1a1a2e;
        border: 2px solid #e50914;
        border-radius: 12px;
        padding: 15px 20px;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        font-family: Arial, sans-serif;
        font-size: 13px;
        color: white;
    `;

    banner.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <strong style="color:#e50914;font-size:14px">🎬 ShareCloudy détecté !</strong>
            <button id="sc-close" style="background:none;border:none;color:#999;cursor:pointer;font-size:18px;padding:0">✕</button>
        </div>
        ${urls.map((url, i) => `
            <div style="background:#0d0d1a;padding:10px;border-radius:8px;margin-bottom:8px">
                <div style="color:#999;font-size:11px;margin-bottom:5px">Lien ${i + 1}</div>
                <a href="${url}" target="_blank" 
                   style="color:#00d4ff;word-break:break-all;text-decoration:none;font-size:12px">
                    ${url}
                </a>
                <div style="margin-top:8px;display:flex;gap:8px">
                    <button onclick="navigator.clipboard.writeText('${url}').then(()=>alert('✅ Copié !'))"
                        style="background:#27ae60;color:white;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:11px">
                        📋 Copier
                    </button>
                    <a href="${url}" target="_blank"
                        style="background:#3498db;color:white;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-size:11px;text-decoration:none">
                        🔗 Ouvrir
                    </a>
                </div>
            </div>
        `).join('')}
    `;

    document.body.appendChild(banner);

    document.getElementById('sc-close').onclick = () => banner.remove();
}

// ✅ Observer les changements dynamiques (sites qui chargent le player après) By C4PIT4IN3
const observer = new MutationObserver(() => {
    scanIframes();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src']
});

// Scan initial By C4PIT4IN3
setTimeout(scanIframes, 1500);
setTimeout(scanIframes, 3000);
setTimeout(scanIframes, 5000);
