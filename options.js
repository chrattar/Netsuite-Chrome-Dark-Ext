document.addEventListener('DOMContentLoaded', () => {
    const linkColor = document.getElementById('linkColor');
    const bgColor = document.getElementById('bgColor');
    const textColor = document.getElementById('textColor');
    const saveButton = document.getElementById('save');

    // Load saved colors
    chrome.storage.sync.get(['linkColor', 'bgColor', 'textColor'], (data) => {
        linkColor.value = data.linkColor || '#00ff00';
        bgColor.value = data.bgColor || '#000000';
        textColor.value = data.textColor || '#ffffff';
    });

    // Save colors
    saveButton.addEventListener('click', () => {
        chrome.storage.sync.set({
            linkColor: linkColor.value,
            bgColor: bgColor.value,
            textColor: textColor.value
        }, () => {
            alert('Colors saved!');
        });
    });
});