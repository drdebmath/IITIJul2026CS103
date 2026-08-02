(function () {
    'use strict';

    const key = (r, c) => `${r},${c}`;
    const parseKey = (value) => value.split(',').map(Number);
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    function setupTheme() {
        const root = document.documentElement;
        const button = document.getElementById('theme-toggle');
        const saved = window.localStorage.getItem('cs103-theme');
        root.dataset.theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const update = () => {
            const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            button.textContent = `${next === 'dark' ? '◐' : '☀'} ${next === 'dark' ? 'Dark' : 'Light'}`;
            button.setAttribute('aria-label', `Use ${next} mode`);
        };
        button.addEventListener('click', () => {
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            window.localStorage.setItem('cs103-theme', root.dataset.theme);
            update();
        });
        update();
    }

    class Demo {
        constructor(root, rows, cols) {
            this.root = root;
            this.rows = rows;
            this.cols = cols;
            this.board = root.querySelector('[data-board]');
            this.status = root.querySelector('[data-status]');
            this.speed = root.querySelector('[data-speed]');
            this.timer = 0;
            this.running = false;
            this.board.style.setProperty('--cols', cols);
            this.cells = Array.from({ length: rows * cols }, (_, index) => {
                const cell = document.createElement('span');
                cell.className = 'cell';
                cell.setAttribute('role', 'gridcell');
                cell.dataset.row = String(Math.floor(index / cols));
                cell.dataset.col = String(index % cols);
                this.board.appendChild(cell);
                return cell;
            });
            root.addEventListener('click', (event) => {
                const action = event.target.closest('[data-action]')?.dataset.action;
                if (action === 'step') { this.stop(); this.step(); }
                if (action === 'run') this.toggle();
                if (action === 'reset') { this.stop(); this.reset(); }
            });
        }

        cell(r, c) { return this.cells[r * this.cols + c]; }
        inside(r, c) { return r >= 0 && r < this.rows && c >= 0 && c < this.cols; }
        delay() { return 940 - Number(this.speed.value); }
        setStatus(text) { this.status.textContent = text; }
        toggle() { this.running ? this.stop() : this.run(); }
        run() {
            if (this.running) return;
            this.running = true;
            const button = this.root.querySelector('[data-action="run"]');
            button.textContent = 'Pause';
            const tick = () => {
                if (!this.running) return;
                const keepGoing = this.step();
                if (keepGoing === false) { this.stop(); return; }
                this.timer = window.setTimeout(tick, this.delay());
            };
            tick();
        }
        stop() {
            this.running = false;
            window.clearTimeout(this.timer);
            const button = this.root.querySelector('[data-action="run"]');
            if (button) button.textContent = this.root.dataset.demo === 'snake' ? 'Play' : 'Run';
        }
        clear() { this.cells.forEach((cell) => { cell.className = 'cell'; cell.removeAttribute('aria-label'); }); }
    }

    class Cleaner extends Demo {
        constructor(root) { super(root, 9, 14); this.reset(); }
        reset() {
            this.robot = [7, 1];
            this.walls = new Set(['1,4','2,4','3,4','3,5','3,6','5,2','5,3','5,4','5,8','5,9','5,10','6,10','7,10','2,11','3,11']);
            this.dirt = new Set(['1,1','1,7','1,12','3,2','4,7','4,12','6,6','7,4','7,8','7,12']);
            this.trail = new Set([key(...this.robot)]);
            this.cleaned = 0;
            this.route = [];
            this.setStatus('Ready: 10 dirty cells. Predict the first action.');
            this.render();
        }
        routeToNearest() {
            const start = key(...this.robot);
            const queue = [start];
            const parent = new Map([[start, null]]);
            let target = null;
            for (let head = 0; head < queue.length && target === null; ++head) {
                const current = queue[head];
                if (this.dirt.has(current)) { target = current; break; }
                const [r, c] = parseKey(current);
                directions.forEach(([dr, dc]) => {
                    const next = key(r + dr, c + dc);
                    if (this.inside(r + dr, c + dc) && !this.walls.has(next) && !parent.has(next)) {
                        parent.set(next, current); queue.push(next);
                    }
                });
            }
            if (target === null) return [];
            const route = [];
            for (let at = target; at !== start; at = parent.get(at)) route.push(parseKey(at));
            return route.reverse();
        }
        step() {
            const here = key(...this.robot);
            if (this.dirt.has(here)) {
                this.dirt.delete(here); this.cleaned += 1; this.route = [];
                this.setStatus(`Cleaned cell ${here}. ${this.dirt.size} remain.`);
            } else {
                if (!this.route.length) this.route = this.routeToNearest();
                if (!this.route.length) {
                    this.setStatus(`Complete: ${this.cleaned} cells cleaned; no reachable dirt remains.`);
                    return false;
                }
                this.robot = this.route.shift();
                this.trail.add(key(...this.robot));
                this.setStatus(`Moved one edge along a shortest route. Route has ${this.route.length} step(s) left.`);
            }
            this.render();
            return this.dirt.size > 0 || this.route.length > 0;
        }
        render() {
            this.clear();
            this.walls.forEach((item) => this.cell(...parseKey(item)).classList.add('wall'));
            this.trail.forEach((item) => this.cell(...parseKey(item)).classList.add('trail'));
            this.dirt.forEach((item) => this.cell(...parseKey(item)).classList.add('dirt'));
            const robot = this.cell(...this.robot); robot.classList.add('robot'); robot.setAttribute('aria-label', 'Robot');
        }
    }

    class Pathfinder extends Demo {
        constructor(root) { super(root, 9, 14); this.reset(); }
        reset() {
            this.start = '7,1'; this.goal = '1,12';
            this.walls = new Set(['1,4','2,4','3,4','4,4','5,4','5,5','5,6','5,7','3,8','3,9','3,10','4,10','5,10','6,10','7,10']);
            this.queue = [this.start]; this.head = 0;
            this.parent = new Map([[this.start, null]]);
            this.distance = new Map([[this.start, 0]]);
            this.done = false; this.path = new Set(); this.expanded = new Set();
            this.setStatus('Frontier contains the start at distance 0.');
            this.render();
        }
        finish() {
            for (let at = this.goal; at !== null; at = this.parent.get(at)) this.path.add(at);
            this.done = true;
            this.setStatus(`Shortest path found: ${this.distance.get(this.goal)} edges after ${this.expanded.size} expansions.`);
        }
        step() {
            if (this.done) return false;
            if (this.head >= this.queue.length) {
                this.done = true; this.setStatus('Goal is unreachable: the frontier is empty.'); return false;
            }
            const current = this.queue[this.head++];
            this.expanded.add(current);
            if (current === this.goal) { this.finish(); this.render(); return false; }
            const [r, c] = parseKey(current);
            directions.forEach(([dr, dc]) => {
                const nr = r + dr, nc = c + dc, next = key(nr, nc);
                if (this.inside(nr, nc) && !this.walls.has(next) && !this.parent.has(next)) {
                    this.parent.set(next, current);
                    this.distance.set(next, this.distance.get(current) + 1);
                    this.queue.push(next);
                }
            });
            if (this.parent.has(this.goal)) {
                this.finish(); this.render(); return false;
            }
            this.setStatus(`Expanded ${current} at distance ${this.distance.get(current)}. Frontier size: ${this.queue.length - this.head}.`);
            this.render(); return true;
        }
        render() {
            this.clear();
            this.walls.forEach((item) => this.cell(...parseKey(item)).classList.add('wall'));
            this.expanded.forEach((item) => this.cell(...parseKey(item)).classList.add('visited'));
            for (let index = this.head; index < this.queue.length; ++index) this.cell(...parseKey(this.queue[index])).classList.add('frontier');
            this.path.forEach((item) => this.cell(...parseKey(item)).classList.add('path'));
            this.cell(...parseKey(this.start)).classList.add('start');
            this.cell(...parseKey(this.goal)).classList.add('goal');
        }
    }

    class Snake extends Demo {
        constructor(root) {
            super(root, 12, 20);
            root.querySelectorAll('[data-direction]').forEach((button) => button.addEventListener('click', () => this.turn(button.dataset.direction)));
            this.board.addEventListener('keydown', (event) => {
                const map = { ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down', ArrowLeft: 'left' };
                if (map[event.key]) { event.preventDefault(); this.turn(map[event.key]); }
                if (event.key === ' ') { event.preventDefault(); this.toggle(); }
            });
            this.reset();
        }
        reset() {
            this.body = [[6, 5], [6, 4], [6, 3], [6, 2]];
            this.direction = [0, 1]; this.nextDirection = [0, 1];
            this.foodIndex = 0; this.foodSequence = [[3,9],[8,13],[2,16],[9,5],[5,17],[1,2],[10,10]];
            this.food = this.foodSequence[this.foodIndex]; this.score = 0; this.over = false;
            this.setStatus('Use arrow keys or direction buttons. Space toggles play.'); this.render();
        }
        turn(name) {
            const map = { up: [-1,0], right: [0,1], down: [1,0], left: [0,-1] };
            const next = map[name];
            if (next[0] !== -this.direction[0] || next[1] !== -this.direction[1]) this.nextDirection = next;
            this.board.focus({ preventScroll: true });
        }
        nextFood() {
            const occupied = new Set(this.body.map((part) => key(...part)));
            do { this.foodIndex = (this.foodIndex + 1) % this.foodSequence.length; this.food = this.foodSequence[this.foodIndex]; }
            while (occupied.has(key(...this.food)));
        }
        step() {
            if (this.over) return false;
            this.direction = this.nextDirection;
            const head = this.body[0];
            const next = [head[0] + this.direction[0], head[1] + this.direction[1]];
            const ate = key(...next) === key(...this.food);
            const occupied = new Set(this.body.slice(0, ate ? this.body.length : -1).map((part) => key(...part)));
            if (!this.inside(...next) || occupied.has(key(...next))) {
                this.over = true; this.setStatus(`Game over. Score ${this.score}. Reset to try another strategy.`); return false;
            }
            this.body.unshift(next);
            if (ate) { this.score += 1; this.nextFood(); }
            else this.body.pop();
            this.setStatus(`${ate ? 'Food found; the tail stayed.' : 'New head added; old tail removed.'} Score ${this.score}.`);
            this.render(); return true;
        }
        render() {
            this.clear();
            this.body.forEach((part, index) => this.cell(...part).classList.add(index === 0 ? 'snake-head' : 'snake-body'));
            this.cell(...this.food).classList.add('food');
        }
    }

    setupTheme();
    document.querySelectorAll('[data-demo="cleaner"]').forEach((root) => new Cleaner(root));
    document.querySelectorAll('[data-demo="pathfinder"]').forEach((root) => new Pathfinder(root));
    document.querySelectorAll('[data-demo="snake"]').forEach((root) => new Snake(root));
}());
