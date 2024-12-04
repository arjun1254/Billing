function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('hidden');
    document.getElementById('main-content').classList.toggle('full-width');
}

function toggleNightMode() {
    document.body.classList.toggle('dark-mode');
}

// Save night mode preference in local storage
document.getElementById('night-mode-toggle').addEventListener('change', function() {
    if (this.checked) {
        localStorage.setItem('nightMode', 'enabled');
    } else {
        localStorage.setItem('nightMode', 'disabled');
    }
});

// Load night mode preference from local storage
window.onload = function() {
    if (localStorage.getItem('nightMode') === 'enabled') {
        document.getElementById('night-mode-toggle').checked = true;
        document.body.classList.add('dark-mode');
    }
}
