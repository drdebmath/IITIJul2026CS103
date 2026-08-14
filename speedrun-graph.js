(function () {
    'use strict';

    const courseTree = window.CS103ConceptTree;
    if (!Array.isArray(courseTree)) return;

    const allModules = courseTree.flatMap((phase) => phase.modules.map((module) => ({ ...module, phaseId: phase.id, phaseTitle: phase.title })));
    const allConcepts = allModules.flatMap((module, moduleOrder) => module.concepts.map((item, conceptOrder) => ({
        ...item,
        moduleId: module.id,
        moduleTitle: module.title,
        moduleNumber: module.number,
        moduleOrder,
        conceptOrder,
        phaseId: module.phaseId
    })));
    const moduleById = new Map(allModules.map((module) => [module.id, module]));
    const conceptById = new Map(allConcepts.map((item) => [item.id, item]));

    const dependencyOverrides = {
        'm1-programming': [],
        'm1-solving': ['m1-programming'],
        'm1-computers': ['m1-programming'],
        'm1-levels': ['m1-computers'],
        'm1-hello': ['m1-programming', 'm1-levels'],
        'm1-toolchain': ['m1-hello'],
        'm1-history': ['m1-programming'],
        'm1-why-cpp': ['m1-levels'],

        'm1-comments': ['m1-hello'],
        'm2-types': ['m2-variables'],
        'm2-primitives': ['m2-types'],
        'm2-modifiers': ['m2-primitives'],
        'm2-variables': ['m1-comments'],
        'm2-const': ['m2-variables'],
        'm2-inference': ['m2-types', 'm2-variables'],
        'm2-casting': ['m2-primitives', 'm2-variables'],
        'm2-operators': ['m2-primitives', 'm2-variables'],
        'm2-precedence': ['m2-operators'],
        'm2-namespaces': ['m1-hello'],
        'm2-scope': ['m2-variables'],
        'm2-storage': ['m2-scope'],

        'm3-conditionals': ['m2-operators', 'm2-variables'],
        'm3-if-else': ['m3-conditionals'],
        'm3-switch': ['m3-conditionals', 'm2-primitives'],
        'm3-short-circuit': ['m3-if-else', 'm2-operators'],
        'm3-comparison': ['m3-if-else', 'm2-casting'],
        'm3-while': ['m3-conditionals'],
        'm3-for': ['m3-conditionals', 'm2-variables'],
        'm3-do-while': ['m3-while'],
        'm3-loop-choice': ['m3-while', 'm3-for', 'm3-do-while'],
        'm3-loop-pitfalls': ['m3-loop-choice', 'm3-comparison'],

        'm4-function-anatomy': ['m2-variables', 'm2-scope'],
        'm4-parameters': ['m4-function-anatomy'],
        'm4-reference': ['m4-parameters', 'm2-variables'],
        'm4-const-reference': ['m4-reference', 'm2-const'],
        'm4-overloading': ['m4-function-anatomy', 'm2-types'],
        'm4-lambdas': ['m4-function-anatomy', 'm2-scope'],
        'm4-call-stack': ['m4-function-anatomy', 'm2-scope'],
        'm4-recursion': ['m4-call-stack', 'm3-conditionals'],
        'm4-recursive-design': ['m4-recursion', 'm3-loop-choice'],
        'm4-complexity': ['m4-recursive-design', 'm3-loop-pitfalls'],

        'm4-arrays': ['m2-types', 'm3-for'],
        'm4-array-access': ['m4-arrays', 'm2-operators'],
        'm5-multidimensional': ['m4-array-access', 'm3-for'],
        'm4-vector': ['m4-arrays'],
        'm4-cstrings': ['m4-arrays', 'm2-primitives'],
        'm4-cstring-lib': ['m4-cstrings', 'm4-function-anatomy'],
        'm4-std-string': ['m4-cstrings', 'm2-types'],
        'm4-string-ops': ['m4-std-string'],
        'm4-string-io': ['m4-std-string', 'm1-toolchain'],
        'm4-cctype': ['m4-string-ops', 'm2-primitives'],
        'm4-string-safety': ['m4-cstrings', 'm4-array-access', 'm4-string-io'],
        'm4-linear-search': ['m4-array-access', 'm3-for'],
        'm4-bubble-sort': ['m4-array-access', 'm3-for'],
        'm4-binary-search': ['m4-linear-search', 'm4-bubble-sort', 'm3-conditionals'],
        'm4-merge-sort': ['m4-arrays', 'm4-recursion'],

        'm4-structs': ['m2-types', 'm2-variables'],
        'm4-struct-layout': ['m4-structs', 'm4-arrays'],
        'm6-array-records': ['m4-structs', 'm4-arrays', 'm3-for'],
        'm5-pointers': ['m2-variables', 'm4-arrays'],
        'm5-dereference': ['m5-pointers', 'm4-structs'],
        'm5-arithmetic': ['m5-pointers', 'm4-array-access'],
        'm6-pointer-safety': ['m5-dereference', 'm4-array-access'],
        'm5-static-dynamic': ['m5-pointers', 'm2-storage'],
        'm5-malloc': ['m5-static-dynamic', 'm2-casting'],
        'm5-new-delete': ['m5-static-dynamic', 'm2-types'],
        'm6-allocation-failure': ['m5-malloc', 'm5-new-delete', 'm3-conditionals'],
        'm5-leaks': ['m5-malloc', 'm5-new-delete', 'm6-pointer-safety'],
        'm5-smart': ['m5-new-delete', 'm5-leaks'],

        'm7-abstraction': ['m4-arrays', 'm4-structs'],
        'm5-linked': ['m4-structs', 'm5-dereference', 'm5-new-delete'],
        'm7-linked-ops': ['m5-linked', 'm3-loop-choice'],
        'm5-stack': ['m7-abstraction', 'm4-arrays'],
        'm5-queue': ['m7-abstraction', 'm7-linked-ops'],
        'm8-bst': ['m7-linked-ops', 'm4-binary-search', 'm4-recursion'],
        'm7-bst-insert': ['m8-bst', 'm3-conditionals'],
        'm8-heap': ['m7-abstraction', 'm4-arrays'],
        'm7-heap-ops': ['m8-heap', 'm3-loop-choice'],
        'm7-heap-sort': ['m7-heap-ops', 'm4-bubble-sort'],
        'm5-reversal': ['m7-linked-ops', 'm4-recursion'],

        'm6-oop': ['m4-structs', 'm4-function-anatomy'],
        'm6-classes': ['m6-oop', 'm4-structs'],
        'm6-access': ['m6-classes'],
        'm6-encapsulation': ['m6-access'],
        'm6-constructors': ['m6-classes', 'm4-parameters'],
        'm8-constructor-types': ['m6-constructors', 'm4-overloading'],
        'm7-overload-ctor': ['m8-constructor-types'],
        'm6-destructors': ['m6-constructors', 'm5-static-dynamic'],
        'm8-raii': ['m6-destructors', 'm5-smart'],
        'm7-copy': ['m8-constructor-types', 'm5-pointers'],
        'm7-operators': ['m6-classes', 'm4-overloading'],
        'm7-stream': ['m7-operators', 'm7-friend'],
        'm7-comparison': ['m7-operators'],
        'm7-assignment': ['m7-copy', 'm7-operators'],
        'm7-friend': ['m6-access', 'm7-operators'],

        'm8-inheritance': ['m6-classes', 'm6-access'],
        'm8-hierarchy': ['m8-inheritance'],
        'm8-access-inheritance': ['m8-inheritance', 'm6-access'],
        'm8-multiple': ['m8-hierarchy'],
        'm8-diamond': ['m8-multiple'],
        'm8-virtual': ['m8-inheritance', 'm6-destructors'],
        'm8-polymorphism': ['m8-virtual', 'm5-pointers'],
        'm8-factory': ['m8-polymorphism', 'm6-constructors'],
        'm8-container': ['m8-polymorphism', 'm4-vector', 'm5-smart'],
        'm8-graph': ['m8-polymorphism', 'm7-linked-ops'],
        'm9-system-design': ['m6-encapsulation', 'm4-function-anatomy'],
        'm9-flight': ['m9-system-design'],
        'm9-domain-classes': ['m9-flight', 'm8-hierarchy'],
        'm9-search': ['m9-domain-classes', 'm4-linear-search', 'm4-binary-search'],
        'm9-sort': ['m9-domain-classes', 'm4-bubble-sort', 'm4-merge-sort'],
        'm9-routing': ['m8-graph', 'm9-search'],
        'm9-patterns': ['m8-factory', 'm9-system-design'],
        'm4-permutations': ['m4-recursion', 'm4-arrays'],
        'm4-lcs': ['m4-recursion', 'm4-std-string'],
        'm4-radix': ['m4-vector', 'm4-cctype', 'm5-queue'],
        'm4-matrix': ['m4-recursion', 'm5-multidimensional'],
        'm8-invert': ['m7-bst-insert', 'm4-recursion'],
        'm9-chess': ['m8-polymorphism', 'm8-hierarchy']
    };

    const dependencies = new Map();
    allModules.forEach((module) => {
        module.concepts.forEach((item, index) => {
            const fallback = index > 0 ? [module.concepts[index - 1].id] : [];
            const values = dependencyOverrides[item.id] || fallback;
            dependencies.set(item.id, values.filter((id) => conceptById.has(id)));
        });
    });

    const dependents = new Map(allConcepts.map((item) => [item.id, []]));
    dependencies.forEach((requirements, targetId) => {
        requirements.forEach((sourceId) => dependents.get(sourceId).push(targetId));
    });

    const viewport = document.getElementById('dependency-viewport');
    const surface = document.getElementById('dependency-surface');
    const content = document.getElementById('dependency-content');
    const canvas = document.getElementById('dependency-edges');
    const nodeLayer = document.getElementById('dependency-nodes');
    const loadingElement = document.getElementById('tree-loading');
    const moduleFilter = document.getElementById('graph-module-filter');
    const searchInput = document.getElementById('concept-search');
    const indexContainer = document.getElementById('concept-index');
    const resultCount = document.getElementById('result-count');
    const selectionKicker = document.getElementById('selection-kicker');
    const selectionTitle = document.getElementById('selection-title');
    const selectionCopy = document.getElementById('selection-copy');
    const selectionLink = document.getElementById('selection-link');
    const selectionIframe = document.getElementById('selection-iframe');
    const zoomSlider = document.getElementById('graph-zoom');
    const zoomValue = document.getElementById('graph-zoom-value');
    const zoomInButton = document.getElementById('graph-zoom-in');
    const zoomOutButton = document.getElementById('graph-zoom-out');
    const fitButton = document.getElementById('graph-fit');

    let activePhase = 'all';
    let activeModule = 'all';
    let activeIndexFilter = 'all';
    let selectedConceptId = null;
    let selectedPathIds = new Set();
    let visibleIds = new Set(allConcepts.map((item) => item.id));
    let contextIds = new Set();
    let positions = new Map();
    let surfaceWidth = 0;
    let surfaceHeight = 0;
    let zoomScale = 1;
    let zoomMode = 'fit';
    let contentOffsetX = 0;
    let contentOffsetY = 0;

    let nodeWidth = 220;
    const nodeHeight = 76;
    const horizontalGap = 24;
    const verticalGap = 88;
    const rowGap = 22;
    const graphPadding = 42;
    const zoomPadding = 12;
    const minimumZoom = 0.05;
    const maximumZoom = 2;

    document.getElementById('concept-total').textContent = allConcepts.length;
    document.getElementById('module-total').textContent = allModules.length;

    function escapeHTML(value) {
        return String(value).replace(/[&<>'"]/g, (character) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        })[character]);
    }

    function isStudied(item) {
        if (!window.CS103Progress) return false;
        const lectureId = window.CS103Progress.lectureIdFromPath(item.href);
        return lectureId ? window.CS103Progress.isComplete(lectureId) : false;
    }

    function collectAncestors(ids) {
        const collected = new Set();
        const visit = (id) => {
            (dependencies.get(id) || []).forEach((requirement) => {
                if (!collected.has(requirement)) {
                    collected.add(requirement);
                    visit(requirement);
                }
            });
        };
        ids.forEach(visit);
        return collected;
    }

    function calculateVisibleIds() {
        const phaseMatches = allConcepts.filter((item) => activePhase === 'all' || item.phaseId === activePhase);
        if (activeModule === 'all') {
            contextIds = new Set();
            return new Set(phaseMatches.map((item) => item.id));
        }

        const moduleIds = new Set(allConcepts.filter((item) => item.moduleId === activeModule).map((item) => item.id));
        const ancestors = collectAncestors(moduleIds);
        contextIds = new Set([...ancestors].filter((id) => !moduleIds.has(id)));
        return new Set([...moduleIds, ...ancestors]);
    }

    function depthFor(id, allowed, memo, stack = new Set()) {
        if (memo.has(id)) return memo.get(id);
        if (stack.has(id)) return 0;
        stack.add(id);
        const required = (dependencies.get(id) || []).filter((dependency) => allowed.has(dependency));
        const depth = required.length ? Math.max(...required.map((dependency) => depthFor(dependency, allowed, memo, new Set(stack)))) + 1 : 0;
        memo.set(id, depth);
        return depth;
    }

    function buildLayout() {
        visibleIds = calculateVisibleIds();
        const memo = new Map();
        const levels = new Map();

        allConcepts.filter((item) => visibleIds.has(item.id)).forEach((item) => {
            const depth = depthFor(item.id, visibleIds, memo);
            if (!levels.has(depth)) levels.set(depth, []);
            levels.get(depth).push(item);
        });

        levels.forEach((items) => items.sort((left, right) => left.moduleOrder - right.moduleOrder || left.conceptOrder - right.conceptOrder));

        // Width-aware layout: size nodes to the viewport and wrap wide depth
        // levels into sub-rows, so the graph stays near viewport width and the
        // fit view remains readable instead of shrinking to a sliver.
        nodeWidth = viewport.clientWidth < 620 ? 168 : 220;
        const availableWidth = Math.max(nodeWidth, viewport.clientWidth - 2 - graphPadding * 2);
        const maxColumns = Math.max(2, Math.floor((availableWidth + horizontalGap) / (nodeWidth + horizontalGap)));
        const widestRow = Math.min(maxColumns, Math.max(1, ...Array.from(levels.values()).map((items) => items.length)));
        surfaceWidth = Math.max(viewport.clientWidth - 2, graphPadding * 2 + widestRow * nodeWidth + (widestRow - 1) * horizontalGap);
        positions = new Map();

        let y = graphPadding;
        Array.from(levels.keys()).sort((a, b) => a - b).forEach((depth) => {
            const items = levels.get(depth);
            for (let start = 0; start < items.length; start += maxColumns) {
                const row = items.slice(start, start + maxColumns);
                const rowWidth = row.length * nodeWidth + (row.length - 1) * horizontalGap;
                const startX = Math.max(graphPadding, (surfaceWidth - rowWidth) / 2);
                row.forEach((item, column) => {
                    positions.set(item.id, {
                        x: startX + column * (nodeWidth + horizontalGap),
                        y
                    });
                });
                y += nodeHeight + rowGap;
            }
            y += verticalGap - rowGap;
        });
        surfaceHeight = Math.max(520, y - verticalGap + graphPadding);

        content.style.width = `${surfaceWidth}px`;
        content.style.height = `${surfaceHeight}px`;
    }

    function renderNodes() {
        const query = searchInput.value.trim().toLowerCase();
        nodeLayer.innerHTML = allConcepts.filter((item) => visibleIds.has(item.id)).map((item) => {
            const position = positions.get(item.id);
            const matches = !query || `${item.title} ${item.term} ${item.definition} ${item.keywords} ${item.moduleTitle}`.toLowerCase().includes(query);
            const classes = [
                'dependency-node',
                item.application ? 'is-application' : '',
                contextIds.has(item.id) ? 'is-context' : '',
                selectedConceptId === item.id ? 'is-selected' : '',
                selectedConceptId !== item.id && selectedPathIds.has(item.id) ? 'is-on-path' : '',
                isStudied(item) ? 'is-studied' : '',
                query && matches ? 'is-search-match' : '',
                query && !matches ? 'is-search-dimmed' : ''
            ].filter(Boolean).join(' ');
            const prerequisiteCount = (dependencies.get(item.id) || []).length;
            return `<button class="${classes}" type="button" data-graph-concept="${item.id}" data-phase="${item.phaseId}" style="left:${position.x}px;top:${position.y}px;width:${nodeWidth}px">
                <span class="dependency-node-number">${item.moduleNumber}</span>
                <span class="dependency-node-copy">
                    <small>${escapeHTML(item.reference)} · ${item.application ? 'Application' : `Module ${item.moduleNumber}`}</small>
                    <strong>${escapeHTML(item.title)}</strong>
                </span>
                <span class="dependency-count" title="${prerequisiteCount} prerequisites">${prerequisiteCount}</span>
            </button>`;
        }).join('');
    }

    function edgeColor(target) {
        if (target.application) return 'rgba(85, 216, 199, 0.62)';
        return target.phaseId === 'pre' ? 'rgba(142, 162, 255, 0.42)' : 'rgba(85, 216, 199, 0.42)';
    }

    function drawEdges() {
        // A full-course vertical DAG is tall and wide. Bound the backing-store
        // pixel count so Retina displays do not turn one static edge canvas
        // into a very large memory allocation. HTML nodes remain fully crisp.
        const pixelBudget = 6_000_000;
        const budgetRatio = Math.sqrt(pixelBudget / Math.max(1, surfaceWidth * surfaceHeight));
        const ratio = Math.max(0.5, Math.min(window.devicePixelRatio || 1, 2, budgetRatio));
        canvas.width = Math.round(surfaceWidth * ratio);
        canvas.height = Math.round(surfaceHeight * ratio);
        canvas.style.width = `${surfaceWidth}px`;
        canvas.style.height = `${surfaceHeight}px`;
        const context = canvas.getContext('2d');
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, surfaceWidth, surfaceHeight);
        const overviewCorrection = 1 / Math.min(1, zoomScale);
        const arrowHalfWidth = 4 * overviewCorrection;
        const arrowLength = 8 * overviewCorrection;
        const targetGap = 7 * overviewCorrection;

        allConcepts.filter((item) => visibleIds.has(item.id)).forEach((target) => {
            const targetPosition = positions.get(target.id);
            (dependencies.get(target.id) || []).filter((sourceId) => visibleIds.has(sourceId)).forEach((sourceId) => {
                const sourcePosition = positions.get(sourceId);
                const startX = sourcePosition.x + nodeWidth / 2;
                const startY = sourcePosition.y + nodeHeight;
                const endX = targetPosition.x + nodeWidth / 2;
                const endY = targetPosition.y - targetGap;
                const distance = Math.max(35, (endY - startY) * 0.46);
                const isSelectedEdge = selectedConceptId === target.id
                    || (selectedPathIds.has(target.id) && selectedPathIds.has(sourceId));

                context.beginPath();
                context.moveTo(startX, startY);
                context.bezierCurveTo(startX, startY + distance, endX, endY - distance, endX, endY);
                context.strokeStyle = isSelectedEdge ? 'rgba(255, 201, 111, 0.92)' : edgeColor(target);
                context.lineWidth = (isSelectedEdge ? 2.2 : 1.25) * overviewCorrection;
                context.stroke();

                context.beginPath();
                context.moveTo(endX, endY + 1);
                context.lineTo(endX - arrowHalfWidth, endY - arrowLength);
                context.lineTo(endX + arrowHalfWidth, endY - arrowLength);
                context.closePath();
                context.fillStyle = isSelectedEdge ? 'rgba(255, 201, 111, 0.95)' : edgeColor(target);
                context.fill();
            });
        });
    }

    function clampZoom(value) {
        return Math.min(maximumZoom, Math.max(minimumZoom, value));
    }

    function updateZoomControls() {
        const percentage = Math.round(zoomScale * 100);
        const overview = zoomScale < 0.42;
        zoomSlider.value = String(percentage);
        zoomValue.textContent = `${percentage}%`;
        zoomOutButton.disabled = zoomScale <= minimumZoom + 0.001;
        zoomInButton.disabled = zoomScale >= maximumZoom - 0.001;
        fitButton.classList.toggle('is-active', zoomMode === 'fit');
        fitButton.setAttribute('aria-pressed', String(zoomMode === 'fit'));
        viewport.classList.toggle('is-graph-overview', overview);
        content.style.setProperty('--inverse-graph-zoom', String(Math.min(12, 1 / zoomScale)));
    }

    function sizeZoomedSurface() {
        const scaledWidth = surfaceWidth * zoomScale;
        const scaledHeight = surfaceHeight * zoomScale;
        const layoutWidth = Math.max(viewport.clientWidth - 2, scaledWidth + zoomPadding * 2);
        const layoutHeight = Math.max(viewport.clientHeight - 2, scaledHeight + zoomPadding * 2);
        contentOffsetX = Math.max(0, (layoutWidth - scaledWidth) / 2);
        contentOffsetY = Math.max(0, (layoutHeight - scaledHeight) / 2);
        surface.style.width = `${layoutWidth}px`;
        surface.style.height = `${layoutHeight}px`;
        content.style.left = `${contentOffsetX}px`;
        content.style.top = `${contentOffsetY}px`;
        content.style.transform = `scale(${zoomScale})`;
        updateZoomControls();
    }

    function setGraphZoom(value, { mode = 'custom', anchorX = viewport.clientWidth / 2, anchorY = viewport.clientHeight / 2, behavior = 'auto' } = {}) {
        const graphX = (viewport.scrollLeft + anchorX - contentOffsetX) / zoomScale;
        const graphY = (viewport.scrollTop + anchorY - contentOffsetY) / zoomScale;
        zoomScale = clampZoom(value);
        zoomMode = mode;
        sizeZoomedSurface();
        drawEdges();
        viewport.scrollTo({
            left: Math.max(0, contentOffsetX + graphX * zoomScale - anchorX),
            top: Math.max(0, contentOffsetY + graphY * zoomScale - anchorY),
            behavior
        });
    }

    function fitGraph(behavior = 'auto') {
        // Fit to width: the graph reads top-to-bottom, so keep nodes legible
        // and let the viewport scroll vertically rather than shrinking
        // everything into one unreadable overview.
        const availableWidth = Math.max(1, viewport.clientWidth - zoomPadding * 2);
        zoomScale = clampZoom(Math.min(1, availableWidth / surfaceWidth));
        zoomMode = 'fit';
        sizeZoomedSurface();
        drawEdges();
        viewport.scrollTo({ left: 0, top: 0, behavior });
    }

    function zoomBy(factor) {
        setGraphZoom(zoomScale * factor, {
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    }

    function renderGraph({ preserveScroll = true } = {}) {
        const previousLeft = viewport.scrollLeft;
        const previousTop = viewport.scrollTop;
        const previousCenterX = (previousLeft + viewport.clientWidth / 2 - contentOffsetX) / zoomScale;
        const previousCenterY = (previousTop + viewport.clientHeight / 2 - contentOffsetY) / zoomScale;
        buildLayout();
        renderNodes();
        drawEdges();
        if (preserveScroll && zoomMode !== 'fit') {
            sizeZoomedSurface();
            viewport.scrollLeft = Math.max(0, contentOffsetX + previousCenterX * zoomScale - viewport.clientWidth / 2);
            viewport.scrollTop = Math.max(0, contentOffsetY + previousCenterY * zoomScale - viewport.clientHeight / 2);
        } else {
            fitGraph();
        }
    }

    function setSelection(item) {
        const module = moduleById.get(item.moduleId);
        selectedConceptId = item.id;
        selectedPathIds = collectAncestors([item.id]);
        selectedPathIds.add(item.id);
        selectionKicker.textContent = `${item.reference} · Module ${module.number} · ${(dependencies.get(item.id) || []).length} prerequisite${(dependencies.get(item.id) || []).length === 1 ? '' : 's'}`;
        selectionTitle.textContent = item.title;
        selectionCopy.textContent = item.definition;
        selectionLink.href = item.href;
        selectionLink.innerHTML = `Open ${escapeHTML(item.reference)} <span aria-hidden="true">↗</span>`;
        if (selectionIframe.getAttribute('src') !== item.href) selectionIframe.setAttribute('src', item.href);
        renderNodes();
        drawEdges();
    }

    function focusGraphConcept(conceptId, scrollToNode = true) {
        const item = conceptById.get(conceptId);
        if (!item) return;

        if (!visibleIds.has(conceptId)) {
            activePhase = 'all';
            activeModule = item.moduleId;
            moduleFilter.value = item.moduleId;
            setPhaseButtons('all');
            renderGraph({ preserveScroll: false });
        }

        setSelection(item);
        if (scrollToNode) {
            const position = positions.get(conceptId);
            if (position) {
                viewport.scrollTo({
                    left: Math.max(0, contentOffsetX + (position.x + nodeWidth / 2) * zoomScale - viewport.clientWidth / 2),
                    top: Math.max(0, contentOffsetY + (position.y + nodeHeight / 2) * zoomScale - viewport.clientHeight / 2),
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
            }
        }
    }

    function setPhaseButtons(phase) {
        document.querySelectorAll('[data-phase-filter]').forEach((button) => {
            const active = button.dataset.phaseFilter === phase;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }

    function populateModuleFilter() {
        moduleFilter.insertAdjacentHTML('beforeend', allModules.map((module) => `<option value="${module.id}">${module.number} · ${escapeHTML(module.title)}</option>`).join(''));
    }

    function renderConceptIndex() {
        indexContainer.innerHTML = allModules.map((module) => `
            <article class="index-module" data-index-module="${module.id}" data-phase="${module.phaseId}">
                <header class="index-module-header">
                    <span class="index-module-number">${module.number}</span>
                    <div><h3>${escapeHTML(module.title)}</h3><p>${module.concepts.length} concepts · ${escapeHTML(module.phaseTitle)}</p></div>
                    <button class="locate-module" type="button" data-locate-module="${module.id}">Show dependencies</button>
                </header>
                <ul class="index-concepts">
                    ${module.concepts.map((item) => `
                        <li class="index-concept${item.application ? ' is-application' : ''}${isStudied(item) ? ' is-studied' : ''}" data-index-concept="${item.id}" data-search="${escapeHTML(`${item.title} ${item.term} ${item.definition} ${item.keywords} ${module.title}`.toLowerCase())}">
                            <span class="concept-name">${item.application ? '<b>Application</b>' : ''}${escapeHTML(item.title)}<small class="concept-reference">${escapeHTML(item.reference)}</small></span>
                            <button class="locate-concept" type="button" data-locate-concept="${item.id}">Graph</button>
                            <a class="open-concept" href="${item.href}" aria-label="Open ${escapeHTML(item.title)} at ${escapeHTML(item.reference)}">${escapeHTML(item.reference)} ↗</a>
                        </li>
                    `).join('')}
                </ul>
            </article>
        `).join('') + '<p class="empty-results" id="empty-results" hidden>No concepts match this search.</p>';
    }

    function filterConceptIndex() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleConcepts = 0;
        document.querySelectorAll('[data-index-module]').forEach((moduleElement) => {
            const phaseMatches = activeIndexFilter === 'all' || moduleElement.dataset.phase === activeIndexFilter;
            let matches = 0;
            moduleElement.querySelectorAll('[data-index-concept]').forEach((element) => {
                const visible = phaseMatches && (!query || element.dataset.search.includes(query));
                element.hidden = !visible;
                if (visible) { matches += 1; visibleConcepts += 1; }
            });
            moduleElement.hidden = matches === 0;
        });
        document.getElementById('empty-results').hidden = visibleConcepts !== 0;
        resultCount.textContent = `${visibleConcepts} ${visibleConcepts === 1 ? 'concept' : 'concepts'}`;
        renderNodes();
    }

    function updateContinueLink() {
        if (!window.CS103Progress) return;
        const next = window.CS103Progress.getNextLecture();
        const link = document.getElementById('continue-learning');
        if (next) {
            link.href = next.file;
            link.textContent = `Continue · ${next.title}`;
        } else {
            link.href = '#tree';
            link.textContent = 'Course complete · revisit the graph';
        }
    }

    populateModuleFilter();
    renderConceptIndex();
    renderGraph({ preserveScroll: false });
    filterConceptIndex();
    updateContinueLink();
    focusGraphConcept('m1-programming', false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        fitGraph();
        loadingElement.classList.add('is-hidden');
    }));

    nodeLayer.addEventListener('click', (event) => {
        const node = event.target.closest('[data-graph-concept]');
        if (node) focusGraphConcept(node.dataset.graphConcept, false);
    });

    document.querySelectorAll('[data-phase-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            activePhase = button.dataset.phaseFilter;
            activeModule = 'all';
            moduleFilter.value = 'all';
            setPhaseButtons(activePhase);
            renderGraph({ preserveScroll: false });
        });
    });

    moduleFilter.addEventListener('change', () => {
        activeModule = moduleFilter.value;
        activePhase = 'all';
        setPhaseButtons('all');
        renderGraph({ preserveScroll: false });
    });

    document.getElementById('reset-view').addEventListener('click', () => {
        activeModule = 'all';
        activePhase = 'all';
        selectedConceptId = null;
        selectedPathIds = new Set();
        moduleFilter.value = 'all';
        setPhaseButtons('all');
        searchInput.value = '';
        renderGraph({ preserveScroll: false });
        filterConceptIndex();
        fitGraph('smooth');
    });

    fitButton.addEventListener('click', () => fitGraph(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'));
    zoomOutButton.addEventListener('click', () => zoomBy(0.8));
    zoomInButton.addEventListener('click', () => zoomBy(1.25));
    zoomSlider.addEventListener('input', () => setGraphZoom(Number(zoomSlider.value) / 100));

    viewport.addEventListener('wheel', (event) => {
        if (!event.ctrlKey && !event.metaKey) return;
        event.preventDefault();
        const bounds = viewport.getBoundingClientRect();
        setGraphZoom(zoomScale * Math.exp(-event.deltaY * 0.002), {
            anchorX: event.clientX - bounds.left,
            anchorY: event.clientY - bounds.top
        });
    }, { passive: false });

    viewport.addEventListener('keydown', (event) => {
        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            zoomBy(1.25);
        } else if (event.key === '-') {
            event.preventDefault();
            zoomBy(0.8);
        } else if (event.key === '0') {
            event.preventDefault();
            fitGraph();
        }
    });

    searchInput.addEventListener('input', filterConceptIndex);

    indexContainer.addEventListener('click', (event) => {
        const moduleButton = event.target.closest('[data-locate-module]');
        const conceptButton = event.target.closest('[data-locate-concept]');
        if (moduleButton) {
            activeModule = moduleButton.dataset.locateModule;
            activePhase = 'all';
            moduleFilter.value = activeModule;
            setPhaseButtons('all');
            renderGraph({ preserveScroll: false });
            document.getElementById('tree').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (conceptButton) {
            document.getElementById('tree').scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.setTimeout(() => focusGraphConcept(conceptButton.dataset.locateConcept, true), 180);
        }
    });

    document.querySelectorAll('[data-index-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            activeIndexFilter = button.dataset.indexFilter;
            document.querySelectorAll('[data-index-filter]').forEach((item) => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            filterConceptIndex();
        });
    });

    window.addEventListener('cs103:progresschange', () => {
        renderNodes();
        renderConceptIndex();
        filterConceptIndex();
        updateContinueLink();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => renderGraph({ preserveScroll: true }), 120);
    });
}());
