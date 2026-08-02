(function () {
    'use strict';

    const local = 'vendor/reveal';
    const cdn = 'https://cdn.jsdelivr.net/npm/reveal.js@5.1.0';

    try {
        const savedTheme = window.localStorage.getItem('cs103-theme');
        const theme = savedTheme === 'dark' || savedTheme === 'light'
            ? savedTheme
            : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.dataset.courseTheme = theme;
        document.documentElement.style.colorScheme = theme;
    } catch (error) {
        document.documentElement.dataset.courseTheme = 'light';
    }

    function style(path, fallback, id) {
        const identity = id ? ` id="${id}"` : '';
        return `<link${identity} rel="stylesheet" href="${local}/${path}" onerror="this.onerror=null;this.href='${cdn}/${fallback}'">`;
    }

    function script(path) {
        return `<script src="${path}"></script>`;
    }

    function fallback(globalName, path) {
        return `<script>if (!window.${globalName}) document.write('<script src="${cdn}/${path}"><\\/script>');</script>`;
    }

    document.write([
        script('course-map.js'),
        script('course-concepts.js'),
        script('course-data.js'),
        script('course-progress.js'),
        script('course-schedule.js'),
        style('dist/reveal.css', 'dist/reveal.css'),
        style('dist/theme/white.css', 'dist/theme/white.css', 'theme-link'),
        style('plugin/highlight/monokai.css', 'plugin/highlight/monokai.css'),
        script(`${local}/dist/reveal.js`),
        fallback('Reveal', 'dist/reveal.js'),
        script('lecture-layout-bootstrap.js'),
        script(`${local}/plugin/markdown/markdown.js`),
        fallback('RevealMarkdown', 'plugin/markdown/markdown.js'),
        script(`${local}/plugin/highlight/highlight.js`),
        fallback('RevealHighlight', 'plugin/highlight/highlight.js'),
        script(`${local}/plugin/math/math.js`),
        fallback('RevealMath', 'plugin/math/math.js')
    ].join('\n'));
}());
