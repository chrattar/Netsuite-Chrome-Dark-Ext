// Immediately inject initial styles
document.documentElement.style.setProperty('display', 'none');

function applyTheme() {
    chrome.storage.sync.get(['linkColor', 'bgColor', 'textColor', 'smallGreyTextNoLink'], (data) => {
        const style = document.createElement('style');
        style.textContent = `
            html, body {
                display: block !important;
                transition: background-color 0.1s ease;
            }
            body, * {
                background-color: ${data.bgColor || '#000000'} !important;
            }
            p, span, div, h1, h2, h3, h4, h5, h6,
            td.rptdata,
            td[style*="color"],
            [style*="color: #060606"],
            .rptdata {
                color: ${data.textColor || '#ffffff'} !important;
                transition: color 0.1s ease;
            }
            a {
                background-color: transparent !important;
                color: ${data.linkColor || '#00ff00'} !important;
                transition: color 0.1s ease;
            }
            a.smallgraytextnolink.uir-no-link {
                color: ${data.smallGreyTextNoLink || '#38b5ab'} !important;
                transition: color 0.1s ease;
            }
        `;
        
        // Remove any existing theme style
        const existingStyle = document.getElementById('netsuite-theme');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Add ID to new style element
        style.id = 'netsuite-theme';
        document.head.appendChild(style);
    });
}

// Run as early as possible
if (document.documentElement) {
    applyTheme();
} else {
    document.addEventListener('DOMContentLoaded', applyTheme);
}
