const mapLayer = document.getElementById('map-layer');
const svgMap = document.getElementById('shofia-svg');
const mapContainer = document.getElementById('map-container');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const backBtn = document.getElementById('back-btn');

let currentLevel = 'continent'; // continent, country, region, city

function updateInfo(title, desc) {
    infoTitle.innerText = title || "Материк Шофія";
    // Замінюємо innerText на innerHTML, щоб теги <br> працювали
    infoDesc.innerHTML = desc || "Оберіть країну, щоб розпочати.";
}

function zoomToElement(element, zoomLevel) {
    const containerRect = mapContainer.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    const layerRect = mapLayer.getBoundingClientRect();

    const currentTransform = getComputedStyle(mapLayer).transform;
    let currentScale = 1;
    if (currentTransform !== 'none') {
        currentScale = parseFloat(currentTransform.split(',')[0].replace('matrix(', ''));
    }

    const elCenterX = (elRect.left - layerRect.left) / currentScale + (elRect.width / currentScale / 2);
    const elCenterY = (elRect.top - layerRect.top) / currentScale + (elRect.height / currentScale / 2);

    const translateX = (containerRect.width / 2) - (elCenterX * zoomLevel);
    const translateY = (containerRect.height / 2) - (elCenterY * zoomLevel);

    mapLayer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
}

function resetToContinent() {
    mapLayer.style.transform = `translate(0px, 0px) scale(1)`;
    svgMap.classList.remove('country-active', 'region-active');
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.visible').forEach(el => el.classList.remove('visible'));
    
    currentLevel = 'continent';
    updateInfo();
    backBtn.classList.add('hidden');
}

// 1. КЛІК ПО КРАЇНІ
document.querySelectorAll('.country').forEach(country => {
    country.addEventListener('click', (e) => {
        if (currentLevel !== 'continent') return;
        e.stopPropagation();

        country.classList.add('active');
        svgMap.classList.add('country-active');
        
        currentLevel = 'country';
        updateInfo(country.dataset.title, country.dataset.desc);
        zoomToElement(country, 1.5);
        backBtn.classList.remove('hidden');
    });
});

// 2. КЛІК ПО ОБЛАСТІ
document.querySelectorAll('.region').forEach(region => {
    region.addEventListener('click', (e) => {
        if (currentLevel !== 'country' && currentLevel !== 'region') return;
        
        // БЛОКУВАННЯ: Якщо область належить до НЕАКТИВНОЇ країни - ігноруємо клік
        if (!region.closest('.country').classList.contains('active')) return;

        e.stopPropagation();

        document.querySelectorAll('.region.active').forEach(el => el.classList.remove('active'));
        region.classList.add('active');
        svgMap.classList.add('region-active');

        // Показуємо села цієї області
        document.querySelectorAll('.city.village').forEach(v => v.classList.remove('visible'));
        const regionId = region.getAttribute('id');
        document.querySelectorAll(`.city.village[data-region="${regionId}"]`).forEach(v => v.classList.add('visible'));

        currentLevel = 'region';
        updateInfo(region.dataset.title, region.dataset.desc);
        zoomToElement(region, 2.8);
    });
});

// 3. КЛІК ПО МІСТАХ
document.querySelectorAll('.city').forEach(city => {
    city.addEventListener('click', (e) => {
        // БЛОКУВАННЯ: Якщо місто належить до НЕАКТИВНОЇ країни - ігноруємо клік
        if (!city.closest('.country').classList.contains('active')) return;

        e.stopPropagation();
        const prevLevel = currentLevel;
        currentLevel = 'city';
        city.dataset.prevLevel = prevLevel;

        updateInfo(city.dataset.title, city.dataset.desc);
        zoomToElement(city, 4.5);
    });
});

// 4. КНОПКА НАЗАД
backBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (currentLevel === 'city') {
        const activeCity = document.querySelector('.city.active') || {dataset: {prevLevel: 'region'}};
        const targetLevel = activeCity.dataset.prevLevel || 'region';
        
        if (targetLevel === 'region') {
            const reg = document.querySelector('.region.active');
            currentLevel = 'region';
            updateInfo(reg.dataset.title, reg.dataset.desc);
            zoomToElement(reg, 2.8);
        } else {
            const cnt = document.querySelector('.country.active');
            currentLevel = 'country';
            updateInfo(cnt.dataset.title, cnt.dataset.desc);
            zoomToElement(cnt, 1.5);
        }
    } 
    else if (currentLevel === 'region') {
        svgMap.classList.remove('region-active');
        document.querySelectorAll('.region.active').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.city.village.visible').forEach(el => el.classList.remove('visible'));
        
        const cnt = document.querySelector('.country.active');
        currentLevel = 'country';
        updateInfo(cnt.dataset.title, cnt.dataset.desc);
        zoomToElement(cnt, 1.5);
    } 
    else if (currentLevel === 'country') {
        resetToContinent();
    }
});

mapContainer.addEventListener('click', resetToContinent);