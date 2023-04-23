import {EFFECTS} from './data.js';

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const imgUpload = document.querySelector('.img-upload');
const imgPreview = imgUpload.querySelector('.img-upload__preview-inner img');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');

let currentScale = DEFAULT_SCALE;

const updateScale = (scale) => {
  currentScale = scale;
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    updateScale(currentScale - SCALE_STEP);
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    updateScale(currentScale + SCALE_STEP);
  }
});

scaleControlValue.addEventListener('change', () => {
  const scale = parseInt(scaleControlValue.value, 10);
  if (scale >= MIN_SCALE && scale <= MAX_SCALE) {
    updateScale(scale);
  } else {
    scaleControlValue.value = `${currentScale}%`;
  }
});

const effectsPreview = document.querySelector('.img-upload__preview > img');
const effectsClasses = {
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
};

const slider = document.querySelector('.effect-level__slider');
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});
slider.classList.add('hidden');

let lastFilter = null;

const updateEffect = (currentFilter) => {
  effectsPreview.classList.remove(lastFilter);
  if (currentFilter !== 'none') {
    effectsPreview.classList.add(effectsClasses[currentFilter]);
    lastFilter = effectsClasses[currentFilter];
    slider.classList.remove('hidden');
    slider.noUiSlider.updateOptions({
      range: {
        min: EFFECTS[currentFilter].min,
        max: EFFECTS[currentFilter].max,
      },
      start: EFFECTS[currentFilter].start,
      step: EFFECTS[currentFilter].step,
    });
    slider.noUiSlider.on('update', () => {
      const currentValue = slider.noUiSlider.get();
      effectsPreview.style.filter = `${EFFECTS[currentFilter].filter}(${currentValue}${EFFECTS[currentFilter].size})`;
    });
  } else {
    slider.classList.add('hidden');
    effectsPreview.style.filter = '';
  }
};

const effectsList = document.querySelector('.effects__list');
effectsList.addEventListener('change', (event) => {
  const filter = event.target.value;
  updateEffect(filter);
});

export const clearSlider = () => {
  effectsPreview.className = 'img-upload__preview';
  slider.classList.add('hidden');
  effectsPreview.style.filter = '';
};
