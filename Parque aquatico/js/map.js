

(function () {
    'use strict';

    // ==========================================================
    // BASE DE DATOS DE ATRACCIONES (AQUAJOY)
    // ==========================================================
    const PARK_COLORS = {
        oceanBlue: '#0092c4',
        brightAmber: '#f5c921',
        vibrantCoral: '#fe6f5e',
        magenta: '#ff00ff',
        ashBrown: '#645244',
        white: '#ffffff',
        silver: '#cccccc'
    };

    const CATEGORIES = [
        { id: 'all', label: 'Todos', color: PARK_COLORS.oceanBlue },
        { id: 'slides', label: 'Toboganes', color: PARK_COLORS.oceanBlue },
        { id: 'pools', label: 'Piscinas', color: PARK_COLORS.oceanBlue },
        { id: 'river', label: 'Río Lento', color: PARK_COLORS.oceanBlue },
        { id: 'kids', label: 'Infantil', color: PARK_COLORS.oceanBlue },
        { id: 'theme', label: 'Temático', color: PARK_COLORS.brightAmber },
        { id: 'food', label: 'Comida', color: PARK_COLORS.magenta },
        { id: 'service', label: 'Servicios', color: PARK_COLORS.ashBrown }
    ];

    const ATTRACTIONS = [
        // TOBOGANES
        {
            id: 'kamikaze',
            name: 'Kamikaze & Tornado Gemelo',
            category: 'slides',
            x: 770,
            y: 440,
            thrillLevel: 'extremo',
            minHeight: '1.40 m',
            waitTimeMinutes: 20,
            color: PARK_COLORS.vibrantCoral,
            iconType: 'wave',
            description: 'Toboganes de caída vertical extrema de más de 20 metros de altura directa al agua.',
            highlights: ['Caída libre a 60 km/h', 'Doble pista en paralelo', 'Frenado seguro hidrocinético']
        },
        {
            id: 'tornado-bowl',
            name: 'Tornado Vortex Bowl',
            category: 'slides',
            x: 780,
            y: 560,
            thrillLevel: 'extremo',
            minHeight: '1.30 m',
            waitTimeMinutes: 25,
            color: PARK_COLORS.brightAmber,
            iconType: 'wave',
            description: 'Embudo centrífugo gigante multicolor en el que giras a gran velocidad antes del clavado.',
            highlights: ['Embudo centrífugo de 18 metros', 'Flotadores dobles', 'Sensación de ingravidez']
        },
        {
            id: 'multi-race',
            name: 'Pista Multi-Carrera 4 Calles',
            category: 'slides',
            x: 520,
            y: 470,
            thrillLevel: 'moderado',
            minHeight: '1.20 m',
            waitTimeMinutes: 10,
            color: PARK_COLORS.vibrantCoral,
            iconType: 'wave',
            description: 'Desciende sobre esterillas acolchadas compitiendo con hasta 3 amigos por ver quién llega antes.',
            highlights: ['4 carriles paralelos', 'Marcador de tiempos', 'Apto para competiciones']
        },
        {
            id: 'anaconda-negra',
            name: 'Anaconda Negra (Black Hole)',
            category: 'slides',
            x: 585,
            y: 215,
            thrillLevel: 'extremo',
            minHeight: '1.30 m',
            waitTimeMinutes: 15,
            color: '#2c3e50',
            iconType: 'wave',
            description: 'Tubo oscuro cerrado con efectos lumínicos fosforescentes intermitentes en su interior.',
            highlights: ['150 metros en oscuridad', 'Luces estroboscópicas suaves', 'Curvas imprevistas']
        },
        {
            id: 'twister-flumes',
            name: 'Twister Blanco & Verde',
            category: 'slides',
            x: 620,
            y: 380,
            thrillLevel: 'moderado',
            minHeight: '1.20 m',
            waitTimeMinutes: 12,
            color: PARK_COLORS.silver,
            iconType: 'wave',
            description: 'Tubos abiertos y semicerrados que se entrelazan formando una espiral vertiginosa.',
            highlights: ['Espirales peraltadas', 'Salpicadura final refrescante', 'Apto para jóvenes y adultos']
        },

        // PISCINAS
        {
            id: 'wave-pool',
            name: 'Gran Piscina de Olas',
            category: 'pools',
            x: 350,
            y: 450,
            thrillLevel: 'familiar',
            waitTimeMinutes: 0,
            color: PARK_COLORS.oceanBlue,
            iconType: 'wave',
            description: 'Enorme piscina con olas artificiales que se activan cada 20 minutos, simulando una playa tropical.',
            highlights: ['Olas de hasta 1.5 metros', 'Entrada gradual tipo playa', 'Vigilancia continua']
        },
        {
            id: 'laguna-tropical',
            name: 'Laguna Tropical & Spa',
            category: 'pools',
            x: 640,
            y: 760,
            thrillLevel: 'familiar',
            waitTimeMinutes: 0,
            color: PARK_COLORS.oceanBlue,
            iconType: 'wave',
            description: 'Zona de relajación con aguas templadas, chorros de hidroterapia, cascadas y tumbonas acuáticas.',
            highlights: ['Chorros lumbares y cervicales', 'Zona libre de ruido', 'Camas de hidromasaje']
        },
        {
            id: 'splash-bucket',
            name: 'Castillo Splash & Cubo Volcador',
            category: 'pools',
            x: 300,
            y: 370,
            thrillLevel: 'familiar',
            waitTimeMinutes: 5,
            color: PARK_COLORS.vibrantCoral,
            iconType: 'wave',
            description: 'Estructura interactiva con pasarelas, cañones de agua y dos cubos gigantes que vuelcan 1.000 litros.',
            highlights: ['Cubo volcador de 1.000 L', 'Cañones de agua a presión', 'Suelo antideslizante']
        },

        // RÍO LENTO
        {
            id: 'lazy-river',
            name: 'Río Lento Circuito Fluvial',
            category: 'river',
            x: 580,
            y: 270,
            thrillLevel: 'familiar',
            waitTimeMinutes: 5,
            color: PARK_COLORS.oceanBlue,
            iconType: 'wave',
            description: 'Circuito circular de agua cristalina para dejarse llevar relajadamente a bordo de un flotador.',
            highlights: ['Flotadores individuales y dobles', 'Paso bajo cascadas y puentes', 'Longitud de 450 metros']
        },

        // INFANTIL
        {
            id: 'isla-pulpo',
            name: 'La Isla del Pulpo Gigante',
            category: 'kids',
            x: 455,
            y: 260,
            thrillLevel: 'familiar',
            minHeight: 'Hasta 1.20 m',
            waitTimeMinutes: 5,
            color: PARK_COLORS.magenta,
            iconType: 'wave',
            description: 'Zona infantil con un simpático pulpo rosa gigante cuyos tentáculos son toboganes suaves.',
            highlights: ['Toboganes en los tentáculos', 'Poco fondo (30 cm)', 'Monitores infantiles']
        },
        {
            id: 'barco-pirata',
            name: 'Barco Pirata Corsario',
            category: 'kids',
            x: 360,
            y: 260,
            thrillLevel: 'familiar',
            minHeight: 'Hasta 1.30 m',
            waitTimeMinutes: 5,
            color: PARK_COLORS.brightAmber,
            iconType: 'wave',
            description: 'Galeón pirata temático con toboganes infantiles, cañones de agua y pasarelas de madera.',
            highlights: ['Timón interactivo', 'Mini tobogán de popa', 'Juegos de puntería con agua']
        },
        {
            id: 'baby-bay',
            name: 'Bahía Bebé & Mini-Splash',
            category: 'kids',
            x: 690,
            y: 810,
            thrillLevel: 'familiar',
            minHeight: 'Hasta 1.00 m',
            waitTimeMinutes: 0,
            color: '#38bdf8',
            iconType: 'wave',
            description: 'Piscina de chapoteo con profundidad de 15 cm para los más pequeños, con mini tobogán arcoíris.',
            highlights: ['Profundidad 15 cm', 'Figuras de animales con chorritos', 'Zona de sombraje']
        },

        // TEMÁTICO
        {
            id: 'croc-swamp',
            name: 'El Pantano del Cocodrilo',
            category: 'theme',
            x: 525,
            y: 735,
            thrillLevel: 'familiar',
            waitTimeMinutes: 0,
            color: '#22c55e',
            iconType: 'dot',
            description: 'Área temática con esculturas de cocodrilos que expulsan vapor refrescante y chorros ocultos.',
            highlights: ['Efectos de niebla fría', 'Rocas trepadoras seguras', 'Foto-punto oficial']
        },
        {
            id: 'torre-mirador',
            name: 'Torre Mirador 360°',
            category: 'theme',
            x: 448,
            y: 700,
            thrillLevel: 'familiar',
            waitTimeMinutes: 0,
            color: PARK_COLORS.brightAmber,
            iconType: 'dot',
            description: 'Punto más alto del parque desde donde contemplar todas las piscinas y la panorámica completa.',
            highlights: ['Vistas panorámicas 360°', 'Banderas de viento', 'Punto de encuentro seguro']
        },

        // COMIDA
        {
            id: 'aquaburger',
            name: 'Restaurante AquaBurger',
            category: 'food',
            x: 395,
            y: 340,
            thrillLevel: 'familiar',
            waitTimeMinutes: 10,
            color: PARK_COLORS.magenta,
            iconType: 'burger',
            description: 'Hamburguesas gourmet, patatas crujientes, menús infantiles y bebidas frías.',
            highlights: ['Menús sin gluten disponibles', 'Terraza con sombrillas', 'Bebidas ilimitadas']
        },
        {
            id: 'pizzeria-la-ola',
            name: 'Pizzería La Ola',
            category: 'food',
            x: 388,
            y: 745,
            thrillLevel: 'familiar',
            waitTimeMinutes: 15,
            color: PARK_COLORS.magenta,
            iconType: 'pizza',
            description: 'Pizzas al horno de piedra recién horneadas y ensaladas mediterráneas frescas.',
            highlights: ['Masa madre artesana', 'Porciones individuales o enteras', 'Refrescos helados']
        },
        {
            id: 'heladeria-marina',
            name: 'Kiosko Helados & Granizados',
            category: 'food',
            x: 785,
            y: 735,
            thrillLevel: 'familiar',
            waitTimeMinutes: 5,
            color: PARK_COLORS.magenta,
            iconType: 'icecream',
            description: 'Helados artesanos, polos de frutas naturales, batidos frappé y gofres recién hechos.',
            highlights: ['Más de 20 sabores', 'Opciones veganas y sin azúcar', 'Granizados de sabores tropicales']
        },

        // SERVICIOS
        {
            id: 'primeros-auxilios',
            name: 'Puesto de Primeros Auxilios',
            category: 'service',
            x: 235,
            y: 820,
            thrillLevel: 'familiar',
            waitTimeMinutes: 0,
            color: PARK_COLORS.oceanBlue,
            iconType: 'cross',
            description: 'Centro médico permanente con enfermeros y médicos disponibles para cualquier eventualidad.',
            highlights: ['Médico de guardia', 'Zona de descanso climatizada', 'Suministro de protección solar']
        },
        {
            id: 'taquillas-oeste',
            name: 'Taquillas & Vestuarios Oeste',
            category: 'service',
            x: 215,
            y: 185,
            thrillLevel: 'familiar',
            waitTimeMinutes: 2,
            color: PARK_COLORS.ashBrown,
            iconType: 'dot',
            description: 'Consignas electrónicas seguras con pulsera RFID, cabinas de cambio y duchas de agua caliente.',
            highlights: ['Apertura por pulsera RFID', 'Duchas con agua caliente', 'Cambiadores para bebés']
        },
        {
            id: 'parking-principal',
            name: 'Aparcamiento Principal Oeste',
            category: 'service',
            x: 100,
            y: 470,
            thrillLevel: 'familiar',
            waitTimeMinutes: 0,
            color: PARK_COLORS.oceanBlue,
            iconType: 'parking',
            description: 'Aparcamiento vigilado con plazas reservadas para PMR, coches eléctricos y autobuses escolares.',
            highlights: ['800 plazas de coches', 'Carga para vehículos eléctricos', 'Acceso directo a taquillas']
        }
    ];

    // ==========================================================
    // ESTADO DE LA APLICACIÓN
    // ==========================================================
    let currentZoom = 1.0;
    let panOffset = { x: 0, y: 0 };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let activeCategory = 'all';
    let searchQuery = '';
    let selectedAttraction = null;

    // Elementos del DOM
    const mapViewport = document.getElementById('map-viewport');
    const mapWrapper = document.getElementById('map-wrapper');
    const pinsLayer = document.getElementById('interactive-pins-layer');
    const categoriesBar = document.getElementById('categories-bar');
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const zoomReadout = document.getElementById('zoom-readout');

    // Modales & Ficha
    const attractionCard = document.getElementById('attraction-card');
    const cardColorBar = document.getElementById('card-color-bar');
    const cardCategoryLabel = document.getElementById('card-category-label');
    const cardTitle = document.getElementById('card-title');
    const badgeThrill = document.getElementById('badge-thrill');
    const badgeHeight = document.getElementById('badge-height');
    const badgeWait = document.getElementById('badge-wait');
    const cardDesc = document.getElementById('card-desc');
    const cardHighlights = document.getElementById('card-highlights');
    const btnCenterMap = document.getElementById('btn-center-map');
    const btnCloseCard = document.getElementById('btn-close-card');
    const cardCloseX = document.getElementById('card-close-x');

    const legendModal = document.getElementById('legend-modal');
    const btnOpenLegend = document.getElementById('btn-open-legend');
    const legendCloseX = document.getElementById('legend-close-x');
    const legendDismissBtn = document.getElementById('legend-dismiss-btn');

    // Botones de acción
    const btnCopyStandalone = document.getElementById('btn-copy-standalone');
    const btnDownloadFile = document.getElementById('btn-download-file');

    // ==========================================================
    // CONTROL DE ZOOM Y NAVEGACIÓN (PANNING)
    // ==========================================================
    function updateMapTransform() {
        mapWrapper.style.transform = `translate(${panOffset.x}px, ${panOffset.y}px) scale(${currentZoom})`;
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

    function centerCoordinates(x, y, zoom = 1.4) {
        currentZoom = zoom;
        // El centro del SVG 1000x950 es (500, 475)
        panOffset = {
            x: (500 - x) * zoom,
            y: (475 - y) * zoom
        };
        updateMapTransform();
    }

    // Eventos de arrastre con Ratón
    mapViewport.addEventListener('mousedown', function (e) {
        if (e.target.closest('.interactive-pin')) return;
        isDragging = true;
        dragStart = {
            x: e.clientX - panOffset.x,
            y: e.clientY - panOffset.y
        };
    });

    window.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        panOffset = {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        };
        updateMapTransform();
    });

    window.addEventListener('mouseup', function () {
        isDragging = false;
    });

    // Eventos táctiles para móviles y tablets
    mapViewport.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            isDragging = true;
            dragStart = {
                x: e.touches[0].clientX - panOffset.x,
                y: e.touches[0].clientY - panOffset.y
            };
        }
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
        if (!isDragging || e.touches.length !== 1) return;
        panOffset = {
            x: e.touches[0].clientX - dragStart.x,
            y: e.touches[0].clientY - dragStart.y
        };
        updateMapTransform();
    }, { passive: true });

    window.addEventListener('touchend', function () {
        isDragging = false;
    });

    // Rueda del ratón para zoom
    mapViewport.addEventListener('wheel', function (e) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.15 : 0.87;
        currentZoom = Math.min(Math.max(currentZoom * factor, 0.6), 3.0);
        updateMapTransform();
    }, { passive: false });

    // Botones de Zoom
    document.getElementById('btn-zoom-in')?.addEventListener('click', zoomIn);
    document.getElementById('btn-zoom-out')?.addEventListener('click', zoomOut);
    document.getElementById('btn-reset-view')?.addEventListener('click', resetView);

    // Botones de salto a zonas
    document.querySelectorAll('.zone-jump-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const x = parseFloat(btn.getAttribute('data-x'));
            const y = parseFloat(btn.getAttribute('data-y'));
            const z = parseFloat(btn.getAttribute('data-zoom'));
            centerCoordinates(x, y, z);
        });
    });

    // ==========================================================
    // RENDERIZADO DE FILTROS POR CATEGORÍA
    // ==========================================================
    function renderCategories() {
        if (!categoriesBar) return;
        categoriesBar.innerHTML = '';

        // Contar elementos
        const counts = { all: ATTRACTIONS.length };
        ATTRACTIONS.forEach(function (attr) {
            counts[attr.category] = (counts[attr.category] || 0) + 1;
        });

        CATEGORIES.forEach(function (cat) {
            const chip = document.createElement('button');
            const isActive = activeCategory === cat.id;
            chip.className = 'filter-chip' + (isActive ? ' active' : '');
            if (isActive) {
                chip.style.backgroundColor = cat.color;
            }

            chip.innerHTML = `
            <span>${cat.label}</span>
            <span class="filter-chip-count">${counts[cat.id] || 0}</span>
          `;

            chip.addEventListener('click', function () {
                activeCategory = cat.id;
                renderCategories();
                renderPins();
            });

            categoriesBar.appendChild(chip);
        });
    }

    // ==========================================================
    // RENDERIZADO DE PINES INTERACTIVOS (SVG)
    // ==========================================================
    function renderPins() {
        if (!pinsLayer) return;
        pinsLayer.innerHTML = '';

        const svgNS = 'http://www.w3.org/2000/svg';

        const filtered = ATTRACTIONS.filter(function (attr) {
            if (activeCategory !== 'all' && attr.category !== activeCategory) return false;
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

        filtered.forEach(function (attr) {
            const isSelected = selectedAttraction && selectedAttraction.id === attr.id;
            const group = document.createElementNS(svgNS, 'g');
            group.setAttribute('class', 'interactive-pin');
            group.setAttribute('transform', `translate(${attr.x}, ${attr.y})`);
            group.setAttribute('id', `pin-${attr.id}`);

            let pinColor = attr.color || PARK_COLORS.oceanBlue;
            if (attr.category === 'food') pinColor = PARK_COLORS.magenta;
            if (attr.category === 'slides') pinColor = PARK_COLORS.oceanBlue;

            // Anillo pulsante si está seleccionado
            if (isSelected) {
                const pulse = document.createElementNS(svgNS, 'circle');
                pulse.setAttribute('cx', '0');
                pulse.setAttribute('cy', '0');
                pulse.setAttribute('r', '22');
                pulse.setAttribute('fill', pinColor);
                pulse.setAttribute('class', 'pulse-circle');
                group.appendChild(pulse);
            }

            // Círculo principal del Pin
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', '0');
            circle.setAttribute('cy', '0');
            circle.setAttribute('r', isSelected ? '18' : '14');
            circle.setAttribute('fill', pinColor);
            circle.setAttribute('stroke', '#ffffff');
            circle.setAttribute('stroke-width', isSelected ? '3' : '2');
            circle.setAttribute('filter', 'url(#pinShadow)');
            group.appendChild(circle);

            // Ícono interno del Pin
            if (attr.category === 'pools' || attr.category === 'slides' || attr.category === 'river' || attr.category === 'kids') {
                const wave = document.createElementNS(svgNS, 'path');
                wave.setAttribute('d', 'M -6,1 Q -3,-4 0,1 Q 3,6 6,1');
                wave.setAttribute('stroke', '#ffffff');
                wave.setAttribute('stroke-width', '2.5');
                wave.setAttribute('stroke-linecap', 'round');
                wave.setAttribute('fill', 'none');
                group.appendChild(wave);
            } else if (attr.iconType === 'burger') {
                const t = document.createElementNS(svgNS, 'text');
                t.setAttribute('x', '0'); t.setAttribute('y', '4');
                t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '10');
                t.textContent = '🍔';
                group.appendChild(t);
            } else if (attr.iconType === 'pizza') {
                const t = document.createElementNS(svgNS, 'text');
                t.setAttribute('x', '0'); t.setAttribute('y', '4');
                t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '10');
                t.textContent = '🍕';
                group.appendChild(t);
            } else if (attr.iconType === 'icecream') {
                const t = document.createElementNS(svgNS, 'text');
                t.setAttribute('x', '0'); t.setAttribute('y', '4');
                t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '10');
                t.textContent = '🍦';
                group.appendChild(t);
            } else if (attr.iconType === 'cross') {
                const cross = document.createElementNS(svgNS, 'g');
                cross.setAttribute('fill', '#ffffff');
                cross.innerHTML = '<rect x="-2" y="-6" width="4" height="12" rx="1" /><rect x="-6" y="-2" width="12" height="4" rx="1" />';
                group.appendChild(cross);
            } else if (attr.iconType === 'parking') {
                const t = document.createElementNS(svgNS, 'text');
                t.setAttribute('x', '0'); t.setAttribute('y', '4');
                t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#ffffff');
                t.setAttribute('font-size', '11'); t.setAttribute('font-weight', '900');
                t.textContent = 'P';
                group.appendChild(t);
            } else {
                const dot = document.createElementNS(svgNS, 'circle');
                dot.setAttribute('cx', '0'); dot.setAttribute('cy', '0');
                dot.setAttribute('r', '3'); dot.setAttribute('fill', '#ffffff');
                group.appendChild(dot);
            }

            // Clic en el pin
            group.addEventListener('click', function (e) {
                e.stopPropagation();
                showAttractionDetails(attr);
            });

            pinsLayer.appendChild(group);
        });
    }

    // ==========================================================
    // FICHA DE DETALLES DE ATRACCIÓN
    // ==========================================================
    function showAttractionDetails(attr) {
        selectedAttraction = attr;
        renderPins();

        cardColorBar.style.backgroundColor = attr.color || PARK_COLORS.oceanBlue;
        cardCategoryLabel.textContent = getCategoryName(attr.category);
        cardTitle.textContent = attr.name;
        cardDesc.textContent = attr.description;

        // Badges
        badgeThrill.textContent = attr.thrillLevel === 'extremo' ? '🔥 Extremo' :
            attr.thrillLevel === 'moderado' ? '⚡ Moderado' : '🌊 Familiar';

        if (attr.minHeight) {
            badgeHeight.style.display = 'inline-flex';
            badgeHeight.textContent = `📏 ${attr.minHeight}`;
        } else {
            badgeHeight.style.display = 'none';
        }

        if (attr.waitTimeMinutes !== undefined) {
            badgeWait.style.display = 'inline-flex';
            badgeWait.textContent = attr.waitTimeMinutes === 0 ? '⏱️ Sin espera' : `⏱️ ${attr.waitTimeMinutes} min`;
        } else {
            badgeWait.style.display = 'none';
        }

        // Lista de destacados
        cardHighlights.innerHTML = '';
        if (attr.highlights && attr.highlights.length) {
            attr.highlights.forEach(function (h) {
                const item = document.createElement('div');
                item.className = 'highlight-item';
                item.innerHTML = `<span style="color: var(--ocean-blue); font-weight: bold;">✓</span> <span>${h}</span>`;
                cardHighlights.appendChild(item);
            });
        }

        attractionCard.classList.add('open');
    }

    function hideAttractionDetails() {
        selectedAttraction = null;
        attractionCard.classList.remove('open');
        renderPins();
    }

    function getCategoryName(cat) {
        switch (cat) {
            case 'slides': return 'Toboganes de Alta Velocidad';
            case 'pools': return 'Piscinas & Zona Acuática';
            case 'river': return 'Río Lento Circuito';
            case 'kids': return 'Área Infantil & Splash';
            case 'theme': return 'Atracción Temática';
            case 'food': return 'Restauración & Kioskos';
            case 'service': return 'Servicios e Instalaciones';
            default: return 'Atracción AquaJoy';
        }
    }

    btnCenterMap?.addEventListener('click', function () {
        if (selectedAttraction) {
            centerCoordinates(selectedAttraction.x, selectedAttraction.y, 1.5);
        }
    });

    btnCloseCard?.addEventListener('click', hideAttractionDetails);
    cardCloseX?.addEventListener('click', hideAttractionDetails);

    // ==========================================================
    // BÚSQUEDA EN TIEMPO REAL
    // ==========================================================
    searchInput?.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        if (searchClearBtn) {
            searchClearBtn.style.display = searchQuery ? 'block' : 'none';
        }
        renderPins();
    });

    searchClearBtn?.addEventListener('click', function () {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderPins();
    });

    // ==========================================================
    // MODAL DE LEYENDA Y GUÍA
    // ==========================================================
    btnOpenLegend?.addEventListener('click', function () {
        legendModal.classList.add('open');
    });

    legendCloseX?.addEventListener('click', function () {
        legendModal.classList.remove('open');
    });

    legendDismissBtn?.addEventListener('click', function () {
        legendModal.classList.remove('open');
    });

    legendModal?.addEventListener('click', function (e) {
        if (e.target === legendModal) {
            legendModal.classList.remove('open');
        }
    });

    // ==========================================================
    // COPIAR TODO EL HTML Y DESCARGAR ARCHIVO
    // ==========================================================
    btnCopyStandalone?.addEventListener('click', function () {
        // Obtenemos el documento HTML completo
        const fullHtml = '<!doctype html>\n' + document.documentElement.outerHTML;
        navigator.clipboard.writeText(fullHtml).then(function () {
            const originalText = btnCopyStandalone.innerHTML;
            btnCopyStandalone.innerHTML = '<span>✅ ¡HTML Copiado!</span>';
            btnCopyStandalone.style.backgroundColor = '#10b981';
            setTimeout(function () {
                btnCopyStandalone.innerHTML = originalText;
                btnCopyStandalone.style.backgroundColor = '';
            }, 2500);
        }).catch(function () {
            alert('No se pudo copiar automáticamente. Puedes usar el botón "Descargar .html".');
        });
    });

    btnDownloadFile?.addEventListener('click', function () {
        const fullHtml = '<!doctype html>\n' + document.documentElement.outerHTML;
        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'aquajoy-mapa-parque-acuatico.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Tecla Escape para cerrar modales
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideAttractionDetails();
            legendModal?.classList.remove('open');
        }
    });

    // Clic fuera para deseleccionar pin
    mapViewport.addEventListener('click', function (e) {
        if (!e.target.closest('.interactive-pin') && !e.target.closest('#attraction-card')) {
            hideAttractionDetails();
        }
    });

    // ==========================================================
    // INICIALIZACIÓN
    // ==========================================================
    renderCategories();
    renderPins();
    updateMapTransform();

})();
