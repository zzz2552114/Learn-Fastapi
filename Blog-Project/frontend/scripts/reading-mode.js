let currentReadingMode = document.getElementById('current-reading-mode');
let readingModeButton = document.getElementById('reading-mode');

function setReadingMode(mode) {
    return fetch(`${url}/api/v1/settings/reading-mode`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(mode),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

let currentMode = localStorage.getItem('compact') || 'compact'; // 默认模式为 compact
updateReadingModeDisplay(currentMode); // 初始化显示当前模式
readingModeButton.addEventListener('click', async function() {
    currentMode = currentMode === 'compact' ? 'full' : 'compact';
    await setReadingMode(currentMode);
    localStorage.setItem("reading_mode",currentMode)
    updateReadingModeDisplay(currentMode);
    if(showingpost) fetchPost(showingpost);
});
function updateReadingModeDisplay(mode) {
    currentReadingMode.textContent = `当前阅读模式: ${mode}`;
}