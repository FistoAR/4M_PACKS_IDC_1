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


window.addEventListener('load', function () {
    const bgmAudio = document.getElementById('bgmAudio');
    bgmAudio.volume = 0.15;
    const bgmButton = document.getElementById('bgmButton');
    let musicOn = true;

    function toggleMusic() {
        if (musicOn) {
            bgmAudio.pause();
            bgmButton.textContent = '🎵 OFF';
            bgmButton.classList.add('off');
            musicOn = false;
        } else {
            bgmAudio.play().then(function () {
                bgmButton.textContent = '🎵 ON';
                bgmButton.classList.remove('off');
                musicOn = true;
            }).catch(function (error) {
                console.log('Could not play music:', error);
            });
        }
    }

    bgmButton.onclick = toggleMusic;

    setTimeout(function () {
        bgmAudio.play().catch(function (error) {
            musicOn = false;
            bgmButton.textContent = '🎵 OFF';
            bgmButton.classList.add('off');
        });
    }, 500);

    const goToPage1 = document.getElementById("goToPage1");

    goToPage1.addEventListener("click", function () {
        if ($("#flipbook").turn) {
            $("#flipbook").turn("page", 1);
        }

        const audioPath = goToPage1.dataset.audioPath;
        if (audioPath) {
            const audio = new Audio(audioPath);
            audio.play();
        }
    });

     document.getElementById("whatsappShareBtn").addEventListener("click", function () {
      const pageUrl = document.getElementById("shareInput").value || window.location.href;
      const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(pageUrl);
      window.open(whatsappUrl, "_blank");
    });
});