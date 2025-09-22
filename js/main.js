'use strict';

const grid = document.getElementById('projects-grid');

(() => {
  const cs = getComputedStyle(grid);
  if (cs.display.includes('grid')) {
    grid.style.gridAutoFlow = 'column';
    grid.style.gridAutoColumns = 'max-content';
  } else {
    grid.style.display = 'flex';
    grid.style.flexWrap = 'nowrap';
  }
  grid.style.overflowX = 'auto';
  grid.style.scrollBehavior = 'auto';
})();

const originals = Array.from(grid.querySelectorAll('.project__img-container'));
const L = originals.length;
let index = Math.floor(L / 2);

const IO_THRESHOLD = 0.8;
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const info = entry.target.querySelector('.project__info');
      if (!info) return;
      if (entry.isIntersecting) info.classList.add('show');
      else info.classList.remove('show');
    });
  },
  {
    root: grid,
    threshold: IO_THRESHOLD,
  }
);

let allItems = Array.from(grid.querySelectorAll('.project__img-container'));
allItems.forEach(item => observer.observe(item));

function measureOriginalWidth() {
  if (!originals.length) return 0;
  const first = originals[0];
  const last = originals[originals.length - 1];
  return last.offsetLeft + last.offsetWidth - first.offsetLeft;
}
let ORIGINAL_STRIP_WIDTH = 0;
function recalc() {
  ORIGINAL_STRIP_WIDTH = measureOriginalWidth();
}

function refreshVisibilityImmediate(el) {
  const gridRect = grid.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const overlap =
    Math.min(r.right, gridRect.right) - Math.max(r.left, gridRect.left);
  const visibleRatio = r.width > 0 ? Math.max(0, overlap) / r.width : 0;
  const info = el.querySelector('.project__info');
  if (!info) return;
  if (visibleRatio >= IO_THRESHOLD) info.classList.add('show');
  else info.classList.remove('show');
}

function appendStripSync() {
  const frag = document.createDocumentFragment();
  const clones = [];
  originals.forEach(el => {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
    clone.setAttribute('aria-hidden', 'true');
    frag.appendChild(clone);
    clones.push(clone);
  });
  grid.appendChild(frag);

  allItems = Array.from(grid.querySelectorAll('.project__img-container'));
  clones.forEach(item => observer.observe(item));

  clones.forEach(item => refreshVisibilityImmediate(item));

  recalc();
}

let pendingAppend = false;
function appendStripAsync() {
  if (pendingAppend) return;
  pendingAppend = true;
  const schedule = window.requestIdleCallback ?? (cb => setTimeout(cb, 60));
  schedule(() => {
    appendStripSync();
    pendingAppend = false;
  });
}

const INITIAL_BUFFER_STRIPS = 6;
function ensureInitialBuffer() {
  for (let i = 0; i < INITIAL_BUFFER_STRIPS; i++) {
    appendStripSync();
  }
}

const BUFFER_SCREENS_AHEAD = 5;
function ensureCopies() {
  const visibleWidth = grid.clientWidth;
  if (
    grid.scrollWidth - grid.scrollLeft <
    visibleWidth * BUFFER_SCREENS_AHEAD
  ) {
    appendStripAsync();
  }
}

function centerItem(i, duration = 600) {
  let tries = 0;
  while (i >= allItems.length && tries < 3) {
    appendStripSync();
    tries++;
  }

  allItems = Array.from(grid.querySelectorAll('.project__img-container'));
  if (i < 0 || i >= allItems.length) return;

  const targetEl = allItems[i];
  const containerCenter = grid.clientWidth / 2;
  const itemCenter = targetEl.offsetLeft + targetEl.offsetWidth / 2;
  const target = itemCenter - containerCenter;

  smoothScrollTo(grid, target, duration);

  ensureCopies();
}

function smoothScrollTo(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  if (duration <= 0 || change === 0) {
    element.scrollLeft = target;
    return;
  }
  const startTime = performance.now();
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollLeft = start + change * progress;
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
  recalc();
  ensureInitialBuffer();
  centerItem(index, 0);
});

setInterval(() => {
  index++;
  centerItem(index);
}, 3000);

const ro = new ResizeObserver(() => {
  recalc();
});
ro.observe(grid);

originals.forEach(imgContain => {
  const imgs = imgContain.querySelectorAll('img');
  imgs.forEach(img => img.addEventListener('load', () => recalc()));
});
