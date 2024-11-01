function applyTheme() {
    chrome.storage.sync.get(['linkColor', 'bgColor', 'textColor'], (data) => {
        const style = document.createElement('style');
        style.textContent = `
            body, * { 
                background-color: ${data.bgColor || '#000000'} !important; 
            }

            a { 
                background-color: transparent !important;
                color: ${data.linkColor || '#00ff00'} !important;
            }

            p, span, div, h1, h2, h3, h4, h5, h6,
            td.rptdata,
            td[style*="color"],
            [style*="color: #060606"],
            .rptdata { 
                color: ${data.textColor || '#ffffff'} !important; 
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

// Apply theme initially
applyTheme();

// Create observer to reapply theme when DOM changes
const observer = new MutationObserver(() => {
    applyTheme();
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});