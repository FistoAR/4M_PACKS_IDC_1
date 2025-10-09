const navToggle = document.getElementById('navToggle');
const tocNav = document.getElementById('tocNav');
const navOverlay = document.getElementById('navOverlay');
function openMenu() {
    navToggle.classList.add('open');
    tocNav.classList.add('show');
    navOverlay.classList.add('show');
    navToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
    navToggle.classList.remove('open');
    tocNav.classList.remove('show');
    navOverlay.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
}
navToggle.addEventListener('click', function () {
    if (tocNav.classList.contains('show')) closeMenu();
    else openMenu();
});
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.toc-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
// Keyboard: ESC to close
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") closeMenu();
});


// SHARE BUTTON LOGIC
const shareBtn = document.getElementById('shareBtn');
const shareMenu = document.getElementById('shareMenu');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const copiedMsg = document.getElementById('copiedMsg');
const shareInput = document.getElementById('shareInput');

shareInput.value = window.location.href;

shareBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const wasOpen = shareMenu.classList.contains('show');
    document.querySelectorAll('.share-menu.show').forEach(el => el.classList.remove('show'));
    if (!wasOpen) {
        shareMenu.classList.add('show');
        shareMenu.setAttribute('aria-hidden', 'false');
        try {
        shareInput.value = window.top.location.href;
        } catch (e) {
        // fallback to current window location if cross-origin blocked
        shareInput.value = window.location.href;
        }
        setTimeout(() => shareInput.select(), 90);
    } else {
        shareMenu.classList.remove('show');
        shareMenu.setAttribute('aria-hidden', 'true');
    }
});
copyLinkBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(shareInput.value).then(function () {
        copiedMsg.classList.add('show');
        setTimeout(() => copiedMsg.classList.remove('show'), 1200);
    });
    shareInput.select();
});

// hide share menu on body/overlay click or Esc
document.addEventListener('click', e => {
    if (!shareMenu.contains(e.target) && !shareBtn.contains(e.target))
        shareMenu.classList.remove('show');
});
document.addEventListener('keydown', e => {
    if (e.key === "Escape") shareMenu.classList.remove('show');
});

