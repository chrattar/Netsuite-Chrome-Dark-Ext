document.addEventListener('DOMContentLoaded', () => {
    const linkColor = document.getElementById('linkColor');
    const bgColor = document.getElementById('bgColor');
    const textColor = document.getElementById('textColor');
    const smallGreyTextNoLink = document.getElementById('smallGreyTextNoLink');
    const saveButton = document.getElementById('save');

    // Load saved colors
    chrome.storage.sync.get(['linkColor', 'bgColor', 'textColor', 'smallGreyTextNoLink'], (data) => {
        linkColor.value = data.linkColor || '#00ff00';
        bgColor.value = data.bgColor || '#000000';
        textColor.value = data.textColor || '#ffffff';
        smallGreyTextNoLink.value = data.smallGreyTextNoLink || '#38b5ab';  // Fixed this line
    });

    // Save colors
    saveButton.addEventListener('click', () => {
        chrome.storage.sync.set({
            linkColor: linkColor.value,
            bgColor: bgColor.value,
            textColor: textColor.value,
            smallGreyTextNoLink: smallGreyTextNoLink.value,
        }, () => {
            alert('Colors saved!');
        });
    });
});
