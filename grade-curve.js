(function () {
    'use strict';

    const wrapper = document.getElementById('grade-curve-wrap');
    const svg = document.getElementById('grade-curve');
    if (!wrapper || !svg) return;

    const namespace = 'http://www.w3.org/2000/svg';
    const bands = [
        { grade: 'F', percentile: '0–12%', z0: -2.7, z1: -1.175 },
        { grade: 'DD', percentile: '12–24%', z0: -1.175, z1: -0.706 },
        { grade: 'CD', percentile: '24–36%', z0: -0.706, z1: -0.358 },
        { grade: 'CC', percentile: '36–48%', z0: -0.358, z1: -0.05 },
        { grade: 'BC', percentile: '48–60%', z0: -0.05, z1: 0.253 },
        { grade: 'BB', percentile: '60–72%', z0: 0.253, z1: 0.583 },
        { grade: 'AB', percentile: '72–84%', z0: 0.583, z1: 0.994 },
        { grade: 'AA', percentile: '84–99%', z0: 0.994, z1: 2.326 },
        { grade: 'AS', percentile: '99–100%', z0: 2.326, z1: 2.8 }
    ];
    const zMin = -2.7;
    const zMax = 2.8;

    function element(name, attributes = {}) {
        const node = document.createElementNS(namespace, name);
        Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
        return node;
    }

    function render() {
        const width = Math.max(300, Math.round(wrapper.clientWidth));
        const compact = width < 480;
        const height = compact ? 270 : 300;
        const margin = { top: compact ? 48 : 42, right: 12, bottom: 62, left: 12 };
        const baseline = height - margin.bottom;
        const amplitude = baseline - margin.top;
        const plotWidth = width - margin.left - margin.right;
        const x = (z) => margin.left + ((z - zMin) / (zMax - zMin)) * plotWidth;
        const y = (z) => baseline - Math.exp(-0.5 * z * z) * amplitude;

        while (svg.firstChild) svg.removeChild(svg.firstChild);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        const title = element('title', { id: 'grade-curve-title' });
        title.textContent = 'Relative grade percentile curve';
        const description = element('desc', { id: 'grade-curve-description' });
        description.textContent = 'A bell curve divided from F to AS. AS is the top one percent. AA is the next fifteen percent. Mean plus two standard deviations is marked as an AA reference.';
        svg.append(title, description);

        bands.forEach((band, index) => {
            const points = [];
            const samples = 32;
            for (let sample = 0; sample <= samples; sample += 1) {
                const z = band.z0 + (band.z1 - band.z0) * (sample / samples);
                points.push([x(z), y(z)]);
            }
            const path = [
                `M ${x(band.z0).toFixed(2)} ${baseline}`,
                ...points.map((point) => `L ${point[0].toFixed(2)} ${point[1].toFixed(2)}`),
                `L ${x(band.z1).toFixed(2)} ${baseline}`,
                'Z'
            ].join(' ');
            svg.appendChild(element('path', { d: path, class: `grade-curve-area grade-tone-${index}` }));

            if (index > 0) {
                svg.appendChild(element('line', {
                    x1: x(band.z0), y1: y(band.z0), x2: x(band.z0), y2: baseline,
                    class: 'grade-boundary'
                }));
            }

            const label = element('text', {
                x: x((band.z0 + band.z1) / 2),
                y: baseline + 21,
                'text-anchor': 'middle',
                class: 'grade-chart-label'
            });
            label.textContent = band.grade;
            svg.appendChild(label);

            if (!compact && (band.grade === 'F' || band.grade === 'AA' || band.grade === 'AS')) {
                const percentile = element('text', {
                    x: x((band.z0 + band.z1) / 2),
                    y: baseline + 38,
                    'text-anchor': 'middle',
                    class: 'grade-axis-label'
                });
                percentile.textContent = band.percentile;
                svg.appendChild(percentile);
            }
        });

        const outlinePoints = [];
        for (let sample = 0; sample <= 140; sample += 1) {
            const z = zMin + (zMax - zMin) * (sample / 140);
            outlinePoints.push(`${sample === 0 ? 'M' : 'L'} ${x(z).toFixed(2)} ${y(z).toFixed(2)}`);
        }
        svg.appendChild(element('path', { d: outlinePoints.join(' '), class: 'grade-curve-outline' }));
        svg.appendChild(element('line', { x1: margin.left, y1: baseline, x2: width - margin.right, y2: baseline, class: 'grade-axis' }));

        const referenceX = x(2);
        svg.appendChild(element('line', { x1: referenceX, y1: margin.top - 3, x2: referenceX, y2: baseline, class: 'grade-reference' }));
        const referenceLabel = element('text', {
            x: referenceX - 5,
            y: margin.top - 19,
            'text-anchor': 'end',
            class: 'grade-reference-label'
        });
        const referenceTop = element('tspan', { x: referenceX - 5, dy: 0 });
        referenceTop.textContent = 'μ + 2σ';
        const referenceBottom = element('tspan', { x: referenceX - 5, dy: 12 });
        referenceBottom.textContent = 'AA reference';
        referenceLabel.append(referenceTop, referenceBottom);
        svg.appendChild(referenceLabel);

        const lowLabel = element('text', { x: margin.left, y: height - 8, class: 'grade-axis-label' });
        lowLabel.textContent = 'lower percentile';
        const highLabel = element('text', { x: width - margin.right, y: height - 8, 'text-anchor': 'end', class: 'grade-axis-label' });
        highLabel.textContent = 'higher percentile';
        svg.append(lowLabel, highLabel);
    }

    let frame;
    const scheduleRender = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
    };

    render();
    if ('ResizeObserver' in window) new ResizeObserver(scheduleRender).observe(wrapper);
    else window.addEventListener('resize', scheduleRender);
}());
