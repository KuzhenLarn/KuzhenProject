const mapLayer = document.getElementById('map-layer');
const svgMap = document.getElementById('shofia-svg');
const mapContainer = document.getElementById('map-container');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const backBtn = document.getElementById('back-btn');

let currentLevel = 'continent';

function updateInfo(title, desc) {
    infoTitle.innerHTML = title || "Материк Шофія";
    infoDesc.innerHTML = desc || "Оберіть країну, щоб розпочати дослідження.";
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
    svgMap.classList.remove('country-active', 'region-active', 'city-active');
    
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.visible').forEach(el => el.classList.remove('visible'));
    document.querySelectorAll('.dimmed').forEach(el => el.classList.remove('dimmed'));
    
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
        if (!region.closest('.country').classList.contains('active')) return; 
        e.stopPropagation();

        document.querySelectorAll('.region.active').forEach(el => el.classList.remove('active'));
        region.classList.add('active');
        svgMap.classList.add('region-active');

        document.querySelectorAll('.city.town, .city.village').forEach(c => c.classList.remove('visible'));
        const regionId = region.getAttribute('id');
        document.querySelectorAll(`.city[data-region="${regionId}"]`).forEach(c => {
            if (c.classList.contains('town') || c.classList.contains('village')) {
                c.classList.add('visible'); 
            }
        });

        document.querySelectorAll('.city.capital, .city.center').forEach(c => {
            if (c.getAttribute('data-region') && c.getAttribute('data-region') !== regionId) {
                c.classList.add('dimmed');
            } else {
                c.classList.remove('dimmed');
            }
        });

        currentLevel = 'region';
        updateInfo(region.dataset.title, region.dataset.desc);
        zoomToElement(region, 2.5); 
    });
});

// 3. КЛІК ПО МІСТАХ
document.querySelectorAll('.city').forEach(city => {
    city.addEventListener('click', (e) => {
        if (!city.closest('.country').classList.contains('active')) return; 
        if (city.classList.contains('dimmed')) return; 

        e.stopPropagation();
        
        // Знімаємо виділення з інших міст
        document.querySelectorAll('.city.active').forEach(c => c.classList.remove('active'));
        city.classList.add('active');
        
        // Вмикаємо режим "Фокус на місті" для затемнення області
        svgMap.classList.add('city-active');

        const prevLevel = currentLevel;
        currentLevel = 'city';
        city.dataset.prevLevel = prevLevel;

        updateInfo(city.dataset.title, city.dataset.desc);
        
        // ЗУМ 7.5 для детального огляду міста
        zoomToElement(city, 7.5); 
    });
});

// 4. КНОПКА НАЗАД
backBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (currentLevel === 'city') {
        svgMap.classList.remove('city-active'); // Вимикаємо затемнення області
        const activeCity = document.querySelector('.city.active');
        const targetLevel = activeCity ? activeCity.dataset.prevLevel : 'region';
        
        if (activeCity) {
            activeCity.classList.remove('active');
            delete activeCity.dataset.prevLevel;
        }
        
        if (targetLevel === 'region') {
            const reg = document.querySelector('.region.active');
            currentLevel = 'region';
            updateInfo(reg.dataset.title, reg.dataset.desc);
            zoomToElement(reg, 2.5);
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
        
        document.querySelectorAll('.city.town, .city.village').forEach(el => el.classList.remove('visible'));
        document.querySelectorAll('.dimmed').forEach(el => el.classList.remove('dimmed'));
        
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