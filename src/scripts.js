const fileInput = document.querySelector('#file-input');
const previewImage = document.querySelector('#preview-image');

const filterOptions = [
    document.querySelector('#brightness-btn'),
    document.querySelector('#saturation-btn'),
    document.querySelector('#inversion-btn'),
    document.querySelector('#grayscale-btn'),
];

const rotateOptions = [
    document.querySelector('#rotate-left-btn'),
    document.querySelector('#rotate-right-btn'),
    document.querySelector('#flip-horizontal-btn'),
    document.querySelector('#flip-vertical-btn'),
]

const filterLabel = document.querySelector('#filter-label');
const filterPercent = document.querySelector('#filter-percent');
const filterSlider = document.querySelector('#filter-slider');

const resetBtn = document.querySelector('#reset-btn'),
    saveImageBtn = document.querySelector('#save-image-btn');


let brightness = 50, saturation = 50, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


const enableEditing = () => {
    document.querySelector('#controllers').classList.remove('pointer-events-none', 'opacity-60');
    saveImageBtn.classList.remove('pointer-events-none', 'opacity-60');
    resetBtn.classList.remove('pointer-events-none', 'opacity-60');
}

const loadImage = () => {
    let image = fileInput.files[0];
    if (!image) return;

    previewImage.src = URL.createObjectURL(image);
    previewImage.addEventListener('load', enableEditing)
}

const applyFilter = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImage.style.filter = `brightness(${brightness * 2}%) saturate(${saturation * 2}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const updateFilter = () => {
    if (filterSlider.value > 100 || filterSlider.value < 0) {
        return;
    };

    filterPercent.innerText = `${filterSlider.value}%`;

    const currentFilter = document.querySelector('.active-filter');

    switch (currentFilter.id) {
        case 'brightness-btn':
            brightness = filterSlider.value;
            break;
        case 'saturation-btn':
            saturation = filterSlider.value;
            break;
        case 'inversion-btn':
            inversion = filterSlider.value;
            break;
        case 'grayscale-btn':
            grayscale = filterSlider.value;
            break;
    }

    applyFilter();
}

const resetFilters = () => {
    brightness = 50;
    saturation = 50;
    inversion = 0;
    grayscale = 0;
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;

    filterSlider.value = 50;
    filterPercent.innerText = `${filterSlider.value}%`;

    applyFilter();

    filterOptions[0].click();

}

const savePic = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImage.width;
    canvas.height = previewImage.height;

    ctx.filter = `brightness(${brightness * 2}%) saturate(${saturation * 2}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.scale(flipHorizontal, flipVertical);
    
    ctx.drawImage(previewImage,
        -canvas.width/2, -canvas.height/2,
        previewImage.width, previewImage.height,
    );

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'madeWithLoveByMahmoudAshraf.png';
    link.click();

}

fileInput.addEventListener('change', loadImage)
filterSlider.addEventListener('input', updateFilter)
resetBtn.addEventListener('click', resetFilters)
saveImageBtn.addEventListener('click', savePic)

filterOptions.forEach(option => option.addEventListener('click', () => {

    document.querySelector('.active-filter').classList.remove('active-filter');
    option.classList.add('active-filter');
    filterLabel.innerText = option.innerText;

    switch (option.id) {
        case 'brightness-btn':
            filterSlider.value = brightness;
            filterPercent.innerHTML = `${brightness}%`;
            break;
        case 'saturation-btn':
            filterSlider.value = saturation;
            filterPercent.innerHTML = `${saturation}%`;
            break;
        case 'inversion-btn':
            filterSlider.value = inversion;
            filterPercent.innerHTML = `${inversion}%`;
            break;
        case 'grayscale-btn':
            filterSlider.value = grayscale;
            filterPercent.innerHTML = `${grayscale}%`;
            break;
    }

}))

rotateOptions.forEach(option => option.addEventListener('click', () => {
    switch (option.id) {
        case 'rotate-left-btn':
            rotate -= 90;
            break;
        case 'rotate-right-btn':
            rotate += 90;
            break;
        case 'flip-horizontal-btn':
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
            break;
        case 'flip-vertical-btn':
            flipVertical = flipVertical === 1 ? -1 : 1;
            break;
    }
    applyFilter();
}))