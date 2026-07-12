(function () {
    'use strict';
    const themeKey = 'cs103-theme';
    const root = document.documentElement;
    const saved = window.localStorage.getItem(themeKey);
    root.dataset.theme = saved === 'dark' || saved === 'light' ? saved : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const themeButton = document.getElementById('theme-toggle');
    const updateThemeButton = () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        themeButton.textContent = `${next === 'dark' ? '◐' : '☀'} ${next === 'dark' ? 'Dark' : 'Light'}`;
        themeButton.setAttribute('aria-label', `Use ${next} mode`);
    };
    themeButton.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        window.localStorage.setItem(themeKey, root.dataset.theme);
        updateThemeButton();
    });
    updateThemeButton();

    const search = document.getElementById('example-search');
    const groups = Array.from(document.querySelectorAll('.lecture-group'));
    const cards = Array.from(document.querySelectorAll('.example-card'));
    const resultCount = document.getElementById('result-count');
    const empty = document.getElementById('empty');
    const viewer = document.getElementById('code-viewer');
    const viewerTitle = document.getElementById('code-viewer-title');
    const viewerFile = document.getElementById('code-viewer-file');
    const sourceBox = document.getElementById('code-source');
    const rawLink = document.getElementById('code-raw-link');
    const copyButton = document.getElementById('code-copy');
    const viewerStatus = document.getElementById('code-viewer-status');
    const closeViewer = document.getElementById('code-viewer-close');
    let copyResetTimer = 0;
    const lectureOrder = Array.from({ length: 23 }, (_, index) => String(index + 1).padStart(2, '0'));
    const groupContainer = document.getElementById('examples');
    groups.sort((left, right) => lectureOrder.indexOf(left.dataset.lecture) - lectureOrder.indexOf(right.dataset.lecture))
        .forEach((group) => groupContainer.appendChild(group));

    function filter() {
        const query = search.value.trim().toLowerCase();
        let visible = 0;
        groups.forEach((group) => {
            let groupVisible = 0;
            group.querySelectorAll('.example-card').forEach((card) => {
                const match = !query || card.textContent.toLowerCase().includes(query) || group.querySelector('h2').textContent.toLowerCase().includes(query);
                card.hidden = !match;
                if (match) { groupVisible += 1; visible += 1; }
            });
            group.hidden = groupVisible === 0;
        });
        resultCount.textContent = `${visible} ${visible === 1 ? 'example' : 'examples'}`;
        empty.hidden = visible !== 0;
    }

    search.addEventListener('input', filter);
    groupContainer.addEventListener('click', async (event) => {
        const card = event.target.closest('.example-card');
        if (!card) return;
        event.preventDefault();
        const sourceUrl = card.getAttribute('href');
        viewer.hidden = false;
        viewerTitle.textContent = card.querySelector('strong').textContent;
        viewerFile.textContent = sourceUrl;
        rawLink.href = sourceUrl;
        copyButton.disabled = true;
        copyButton.textContent = 'Copy';
        sourceBox.value = 'Loading source…';
        viewerStatus.textContent = `Loading ${sourceUrl}…`;
        viewer.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        try {
            const response = await fetch(sourceUrl, { cache: 'no-store' });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const source = await response.text();
            sourceBox.value = source;
            copyButton.disabled = false;
            const lineCount = source ? source.split(/\r?\n/).length : 0;
            viewerStatus.textContent = `${lineCount} lines · displayed locally in this page · use Raw to open the file URL`;
            sourceBox.focus({ preventScroll: true });
            sourceBox.setSelectionRange(0, 0);
        } catch (error) {
            sourceBox.value = '';
            copyButton.disabled = true;
            viewerStatus.textContent = `Could not load ${sourceUrl}. Use Raw to open the file directly.`;
        }
    });
    copyButton.addEventListener('click', async () => {
        if (copyButton.disabled || !sourceBox.value) return;
        window.clearTimeout(copyResetTimer);
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(sourceBox.value);
            } else {
                sourceBox.focus({ preventScroll: true });
                sourceBox.select();
                if (!document.execCommand('copy')) throw new Error('Copy command was rejected');
                sourceBox.setSelectionRange(0, 0);
            }
            copyButton.textContent = 'Copied ✓';
            viewerStatus.textContent = `${viewerFile.textContent} copied to the clipboard.`;
        } catch (error) {
            copyButton.textContent = 'Copy failed';
            viewerStatus.textContent = 'The browser blocked clipboard access. Select the source text and copy it manually.';
        }
        copyResetTimer = window.setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 1800);
    });
    closeViewer.addEventListener('click', () => {
        viewer.hidden = true;
        sourceBox.value = '';
        copyButton.disabled = true;
        copyButton.textContent = 'Copy';
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !viewer.hidden) closeViewer.click();
    });
    if (window.location.hash && document.querySelector(window.location.hash)) {
        window.requestAnimationFrame(() => document.querySelector(window.location.hash).scrollIntoView({ block: 'start' }));
    }
    resultCount.textContent = `${cards.length} examples`;
}());
