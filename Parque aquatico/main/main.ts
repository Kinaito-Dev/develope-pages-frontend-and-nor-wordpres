import { ATTRACTIONS, CATEGORIES_CONFIG, PARK_COLORS } from './parkData';
import { Attraction } from './types';

// ============================================================
// APPLICATION STATE (Vanilla JS)
// ============================================================
let currentZoom = 1.0;
let panOffset = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let selectedCategory = 'all';
let searchQuery = '';
let selectedAttraction: Attraction | null = null;

// ============================================================
// DOM ELEMENT REFERENCES
// ============================================================
const mapViewport = document.getElementById('map-viewport') as HTMLElement;
const mapTransformWrapper = document.getElementById('map-transform-wrapper') as HTMLElement;
const pinsLayer = document.getElementById('interactive-pins-layer') as unknown as SVGGElement;
const categoryContainer = document.getElementById('category-filters-container') as HTMLElement;
const searchInput = document.getElementById('map-search-input') as HTMLInputElement;
const clearSearchBtn = document.getElementById('btn-clear-search') as HTMLButtonElement;
const zoomReadout = document.getElementById('zoom-readout') as HTMLElement;

// Controls
const zoomInBtn = document.getElementById('btn-zoom-in') as HTMLButtonElement;
const zoomOutBtn = document.getElementById('btn-zoom-out') as HTMLButtonElement;
const resetViewBtn = document.getElementById('btn-reset-view') as HTMLButtonElement;
const quickJumpButtons = document.querySelectorAll('.quick-jump-btn');

// Modals
const attractionModal = document.getElementById('attraction-modal') as HTMLElement;
const modalCloseBtn = document.getElementById('modal-close-btn') as HTMLButtonElement;
const modalDismissBtn = document.getElementById('modal-dismiss-btn') as HTMLButtonElement;
const modalCenterBtn = document.getElementById('modal-center-btn') as HTMLButtonElement;
const modalAccentBar = document.getElementById('modal-accent-bar') as HTMLElement;
const modalCategoryLabel = document.getElementById('modal-category-label') as HTMLElement;
const modalTitle = document.getElementById('modal-attraction-title') as HTMLElement;
const modalThrillBadge = document.getElementById('modal-thrill-badge') as HTMLElement;
const modalHeightBadge = document.getElementById('modal-height-badge') as HTMLElement;
const modalWaitBadge = document.getElementById('modal-wait-badge') as HTMLElement;
const modalDescription = document.getElementById('modal-description') as HTMLElement;
const modalHighlightsList = document.getElementById('modal-highlights-list') as HTMLElement;

const legendModal = document.getElementById('legend-modal') as HTMLElement;
const openLegendBtn = document.getElementById('btn-open-legend') as HTMLButtonElement;
const legendCloseBtn = document.getElementById('legend-close-btn') as HTMLButtonElement;
const legendDismissBtn = document.getElementById('legend-dismiss-btn') as HTMLButtonElement;

const codeModal = document.getElementById('code-modal') as HTMLElement;
const openCodeBtn = document.getElementById('btn-open-code') as HTMLButtonElement;
const codeCloseBtn = document.getElementById('code-close-btn') as HTMLButtonElement;
const codeDismissBtn = document.getElementById('code-dismiss-btn') as HTMLButtonElement;
const rawCodeTextarea = document.getElementById('raw-code-textarea') as HTMLTextAreaElement;
const copyCodeBtn = document.getElementById('btn-copy-code') as HTMLButtonElement;

// ============================================================
// MAP TRANSFORM & ZOOM LOGIC
// ============================================================
function updateMapTransform() {
  mapTransformWrapper.style.transform = `translate(${panOffset.x}px, ${panOffset.y}px) scale(${currentZoom})`;
  if (zoomReadout) {
    zoomReadout.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

function zoomIn() {
  currentZoom = Math.min(currentZoom * 1.25, 3.0);
  updateMapTransform();
}

function zoomOut() {
  currentZoom = Math.max(currentZoom * 0.8, 0.6);
  updateMapTransform();
}

function resetView() {
  currentZoom = 1.0;
  panOffset = { x: 0, y: 0 };
  updateMapTransform();
}

function centerOnCoordinates(x: number, y: number, zoom = 1.35) {
  currentZoom = zoom;
  // Center of our 1000x950 coordinate frame is (500, 475)
  panOffset = {
    x: (500 - x) * zoom,
    y: (475 - y) * zoom,
  };
  updateMapTransform();
}

// Mouse Drag Pan
mapViewport.addEventListener('mousedown', (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('.interactive-pin')) return;
  isDragging = true;
  dragStart = {
    x: e.clientX - panOffset.x,
    y: e.clientY - panOffset.y,
  };
});

window.addEventListener('mousemove', (e: MouseEvent) => {
  if (!isDragging) return;
  panOffset = {
    x: e.clientX - dragStart.x,
    y: e.clientY - dragStart.y,
  };
  updateMapTransform();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

// Touch Drag Pan
mapViewport.addEventListener('touchstart', (e: TouchEvent) => {
  if (e.touches.length === 1) {
    isDragging = true;
    dragStart = {
      x: e.touches[0].clientX - panOffset.x,
      y: e.touches[0].clientY - panOffset.y,
    };
  }
}, { passive: true });

window.addEventListener('touchmove', (e: TouchEvent) => {
  if (!isDragging || e.touches.length !== 1) return;
  panOffset = {
    x: e.touches[0].clientX - dragStart.x,
    y: e.touches[0].clientY - dragStart.y,
  };
  updateMapTransform();
}, { passive: true });

window.addEventListener('touchend', () => {
  isDragging = false;
});

// Wheel Zoom
mapViewport.addEventListener('wheel', (e: WheelEvent) => {
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
  currentZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.6), 3.0);
  updateMapTransform();
}, { passive: false });

// Controls Event Listeners
zoomInBtn?.addEventListener('click', zoomIn);
zoomOutBtn?.addEventListener('click', zoomOut);
resetViewBtn?.addEventListener('click', resetView);

quickJumpButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const zone = btn.getAttribute('data-zone');
    if (zone === 'slides') centerOnCoordinates(580, 520, 1.4);
    if (zone === 'waves') centerOnCoordinates(350, 470, 1.4);
    if (zone === 'kids') centerOnCoordinates(485, 300, 1.4);
    if (zone === 'lagoon') centerOnCoordinates(640, 730, 1.4);
  });
});

// ============================================================
// RENDER CATEGORY FILTERS
// ============================================================
function renderCategoryFilters() {
  if (!categoryContainer) return;
  categoryContainer.innerHTML = '';

  // Calculate counts
  const counts: Record<string, number> = { all: ATTRACTIONS.length };
  ATTRACTIONS.forEach((attr) => {
    counts[attr.category] = (counts[attr.category] || 0) + 1;
  });

  CATEGORIES_CONFIG.forEach((cat) => {
    const btn = document.createElement('button');
    const isActive = selectedCategory === cat.id;
    const count = counts[cat.id] || 0;

    btn.className = `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${isActive
        ? 'text-white shadow-md scale-102'
        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
      }`;
    if (isActive) {
      btn.style.backgroundColor = cat.color;
    }

    btn.innerHTML = `
      <span>${cat.label}</span>
      <span class="text-[10px] px-1.5 py-0.2 rounded-full font-black ${isActive ? 'bg-black/20 text-white' : 'bg-slate-200 text-slate-600'
      }">${count}</span>
    `;

    btn.addEventListener('click', () => {
      selectedCategory = cat.id;
      renderCategoryFilters();
      renderPins();
    });

    categoryContainer.appendChild(btn);
  });
}

// ============================================================
// RENDER SVG INTERACTIVE PINS
// ============================================================
function renderPins() {
  if (!pinsLayer) return;
  pinsLayer.innerHTML = '';

  const svgNS = 'http://www.w3.org/2000/svg';

  const visibleAttractions = ATTRACTIONS.filter((attr) => {
    if (selectedCategory !== 'all' && attr.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        attr.name.toLowerCase().includes(q) ||
        attr.description.toLowerCase().includes(q) ||
        attr.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  visibleAttractions.forEach((attr) => {
    const pinGroup = document.createElementNS(svgNS, 'g');
    pinGroup.setAttribute('class', 'interactive-pin cursor-pointer transition-all duration-200');
    pinGroup.setAttribute('transform', `translate(${attr.x}, ${attr.y})`);
    pinGroup.setAttribute('id', `pin-${attr.id}`);

    const isSelected = selectedAttraction?.id === attr.id;

    // Determine Pin Color
    let pinColor = attr.color || PARK_COLORS.oceanBlue;
    if (attr.category === 'slides') pinColor = PARK_COLORS.oceanBlue;
    if (attr.category === 'food') pinColor = PARK_COLORS.magenta;
    if (attr.category === 'kids') pinColor = PARK_COLORS.oceanBlue;

    // Selection pulse halo
    if (isSelected) {
      const pulseCircle = document.createElementNS(svgNS, 'circle');
      pulseCircle.setAttribute('cx', '0');
      pulseCircle.setAttribute('cy', '0');
      pulseCircle.setAttribute('r', '24');
      pulseCircle.setAttribute('fill', pinColor);
      pulseCircle.setAttribute('opacity', '0.4');
      pulseCircle.setAttribute('class', 'animate-ping-slow');
      pinGroup.appendChild(pulseCircle);
    }

    // Main Circle
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', isSelected ? '18' : '14');
    circle.setAttribute('fill', pinColor);
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', isSelected ? '3' : '2');
    circle.setAttribute('filter', 'url(#pinShadow)');
    pinGroup.appendChild(circle);

    // Pin Icon
    if (attr.category === 'pools' || attr.category === 'slides' || attr.category === 'river' || attr.category === 'kids') {
      const wavePath = document.createElementNS(svgNS, 'path');
      wavePath.setAttribute('d', 'M -6,1 Q -3,-4 0,1 Q 3,6 6,1');
      wavePath.setAttribute('stroke', '#ffffff');
      wavePath.setAttribute('stroke-width', '2.5');
      wavePath.setAttribute('stroke-linecap', 'round');
      wavePath.setAttribute('fill', 'none');
      pinGroup.appendChild(wavePath);
    } else if (attr.iconType === 'burger') {
      const burgerText = document.createElementNS(svgNS, 'text');
      burgerText.setAttribute('x', '0');
      burgerText.setAttribute('y', '4');
      burgerText.setAttribute('text-anchor', 'middle');
      burgerText.setAttribute('font-size', '10');
      burgerText.textContent = '🍔';
      pinGroup.appendChild(burgerText);
    } else if (attr.iconType === 'pizza') {
      const pizzaText = document.createElementNS(svgNS, 'text');
      pizzaText.setAttribute('x', '0');
      pizzaText.setAttribute('y', '4');
      pizzaText.setAttribute('text-anchor', 'middle');
      pizzaText.setAttribute('font-size', '10');
      pizzaText.textContent = '🍕';
      pinGroup.appendChild(pizzaText);
    } else if (attr.iconType === 'icecream') {
      const iceText = document.createElementNS(svgNS, 'text');
      iceText.setAttribute('x', '0');
      iceText.setAttribute('y', '4');
      iceText.setAttribute('text-anchor', 'middle');
      iceText.setAttribute('font-size', '10');
      iceText.textContent = '🍦';
      pinGroup.appendChild(iceText);
    } else if (attr.iconType === 'cross') {
      const crossG = document.createElementNS(svgNS, 'g');
      crossG.setAttribute('fill', '#ffffff');
      crossG.innerHTML = '<rect x="-2" y="-6" width="4" height="12" rx="1" /><rect x="-6" y="-2" width="12" height="4" rx="1" />';
      pinGroup.appendChild(crossG);
    } else if (attr.iconType === 'parking') {
      const pText = document.createElementNS(svgNS, 'text');
      pText.setAttribute('x', '0');
      pText.setAttribute('y', '4');
      pText.setAttribute('text-anchor', 'middle');
      pText.setAttribute('fill', '#ffffff');
      pText.setAttribute('font-size', '11');
      pText.setAttribute('font-weight', '900');
      pText.textContent = 'P';
      pinGroup.appendChild(pText);
    } else if (attr.iconType === 'info') {
      const iText = document.createElementNS(svgNS, 'text');
      iText.setAttribute('x', '0');
      iText.setAttribute('y', '4');
      iText.setAttribute('text-anchor', 'middle');
      iText.setAttribute('fill', '#ffffff');
      iText.setAttribute('font-size', '12');
      iText.setAttribute('font-weight', 'bold');
      iText.textContent = 'i';
      pinGroup.appendChild(iText);
    } else {
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', '0');
      dot.setAttribute('cy', '0');
      dot.setAttribute('r', '3');
      dot.setAttribute('fill', '#ffffff');
      pinGroup.appendChild(dot);
    }

    // Click handler
    pinGroup.addEventListener('click', (e) => {
      e.stopPropagation();
      openAttractionDetails(attr);
    });

    pinsLayer.appendChild(pinGroup);
  });
}

// ============================================================
// ATTRACTION DETAILS MODAL
// ============================================================
function openAttractionDetails(attr: Attraction) {
  selectedAttraction = attr;
  renderPins();

  modalAccentBar.style.backgroundColor = attr.color || PARK_COLORS.oceanBlue;
  modalCategoryLabel.textContent = getCategoryFriendlyName(attr.category);
  modalTitle.textContent = attr.name;
  modalDescription.textContent = attr.description;

  // Thrill level badge
  modalThrillBadge.innerHTML = getThrillBadgeHtml(attr.thrillLevel);

  // Height badge
  if (attr.minHeight) {
    modalHeightBadge.style.display = 'inline-flex';
    modalHeightBadge.textContent = `📏 ${attr.minHeight}`;
  } else {
    modalHeightBadge.style.display = 'none';
  }

  // Wait time badge
  if (attr.waitTimeMinutes !== undefined) {
    modalWaitBadge.style.display = 'inline-flex';
    modalWaitBadge.textContent = attr.waitTimeMinutes === 0 ? '⏱️ Sin espera' : `⏱️ ${attr.waitTimeMinutes} min de espera`;
  } else {
    modalWaitBadge.style.display = 'none';
  }

  // Highlights list
  modalHighlightsList.innerHTML = '';
  if (attr.highlights && attr.highlights.length > 0) {
    attr.highlights.forEach((h) => {
      const row = document.createElement('div');
      row.className = 'flex items-center gap-2 text-xs font-semibold text-slate-700';
      row.innerHTML = `<span class="text-[#0092c4] font-black">✓</span> <span>${h}</span>`;
      modalHighlightsList.appendChild(row);
    });
  }

  attractionModal.classList.remove('hidden');
}

function closeAttractionDetails() {
  selectedAttraction = null;
  attractionModal.classList.add('hidden');
  renderPins();
}

modalCloseBtn?.addEventListener('click', closeAttractionDetails);
modalDismissBtn?.addEventListener('click', closeAttractionDetails);
modalCenterBtn?.addEventListener('click', () => {
  if (selectedAttraction) {
    centerOnCoordinates(selectedAttraction.x, selectedAttraction.y, 1.45);
  }
});

function getCategoryFriendlyName(cat: string): string {
  switch (cat) {
    case 'slides': return 'Toboganes de Alta Velocidad';
    case 'pools': return 'Piscinas & Zona de Relax';
    case 'river': return 'Río Lento Circuito Fluvial';
    case 'kids': return 'Zonas Infantiles & Splash';
    case 'theme': return 'Parque Temático Aventura';
    case 'food': return 'Zona de Comida & Restauración';
    case 'service': return 'Servicios e Instalaciones';
    default: return 'Atracción AquaJoy';
  }
}

function getThrillBadgeHtml(level: string): string {
  switch (level) {
    case 'extremo':
      return '🔥 Adrenalina Extrema';
    case 'moderado':
      return '⚡ Emoción Moderada';
    case 'familiar':
      return '🌊 Toda la Familia';
    default:
      return '🌴 Relax & Confort';
  }
}

// ============================================================
// SEARCH INPUT HANDLING
// ============================================================
searchInput?.addEventListener('input', (e) => {
  searchQuery = (e.target as HTMLInputElement).value;
  if (clearSearchBtn) {
    if (searchQuery) clearSearchBtn.classList.remove('hidden');
    else clearSearchBtn.classList.add('hidden');
  }
  renderPins();
});

clearSearchBtn?.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  clearSearchBtn.classList.add('hidden');
  renderPins();
});

// ============================================================
// LEGEND MODAL HANDLING
// ============================================================
openLegendBtn?.addEventListener('click', () => {
  legendModal.classList.remove('hidden');
});

legendCloseBtn?.addEventListener('click', () => {
  legendModal.classList.add('hidden');
});

legendDismissBtn?.addEventListener('click', () => {
  legendModal.classList.add('hidden');
});

// ============================================================
// CODE EXPORT MODAL HANDLING
// ============================================================
openCodeBtn?.addEventListener('click', () => {
  codeModal.classList.remove('hidden');
  rawCodeTextarea.value = `<!-- Mapa del Parque Acuático AquaJoy en HTML - CSS - JavaScript Puro -->
<!-- Paleta de colores solicitada: -->
/*
--ocean-blue: #0092c4;
--bright-amber: #f5c921;
--vibrant-coral: #fe6f5e;
--magenta: #ff00ff;
--ash-brown: #645244;
--white: #ffffff;
--silver: #cccccc;
*/

<!-- Todo el mapa vectorial, zonas, piscinas, toboganes y servicios están embebidos en el archivo index.html y se controlan de forma 100% nativa con JavaScript estándar (sin React). -->`;
});

codeCloseBtn?.addEventListener('click', () => {
  codeModal.classList.add('hidden');
});

codeDismissBtn?.addEventListener('click', () => {
  codeModal.classList.add('hidden');
});

copyCodeBtn?.addEventListener('click', () => {
  navigator.clipboard.writeText(rawCodeTextarea.value);
  copyCodeBtn.textContent = '¡Copiado!';
  setTimeout(() => {
    copyCodeBtn.textContent = 'Copiar Código';
  }, 2000);
});

// Close modals on Escape key
window.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeAttractionDetails();
    legendModal?.classList.add('hidden');
    codeModal?.classList.add('hidden');
  }
});

// ============================================================
// INITIALIZATION
// ============================================================
renderCategoryFilters();
renderPins();
updateMapTransform();
