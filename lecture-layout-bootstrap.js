(function () {
    'use strict';

    if (!window.Reveal || window.Reveal.__cs103LayoutBootstrap) return;

    const initialize = window.Reveal.initialize.bind(window.Reveal);
    window.Reveal.__cs103LayoutBootstrap = true;
    window.Reveal.initialize = function (configuration) {
        const normalized = Object.assign({}, configuration || {});
        normalized.markdown = Object.assign({}, normalized.markdown || {}, {
            // A horizontal rule inside one authored slide must remain content.
            // Reveal's default `---` splitter changes authored slide numbers and
            // breaks stable concept references and the 55-minute core plan.
            separator: '(?!)',
            verticalSeparator: null
        });
        return initialize(Object.assign(normalized, {
            width: 1920,
            height: 1080,
            margin: 0.018,
            minScale: 0.1,
            maxScale: 1,
            center: false,
            view: 'slide',
            controls: true,
            controlsTutorial: false,
            progress: true,
            slideNumber: 'c/t',
            touch: true,
            hash: true,
            transition: 'fade',
            backgroundTransition: 'fade',
            scrollActivationWidth: null
        }));
    };
}());
