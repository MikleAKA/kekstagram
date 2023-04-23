import {clearSlider} from './previewAndEffects.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeImgUploadButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const openImgUpload = () => {
  imgUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeyHandler);
  const img = document.querySelector('.img-upload__preview').querySelector('img');
  img.src = window.URL.createObjectURL(fileInput.files[0]);
};

export const closeImgUpload = () => {
  imgUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyHandler);
  fileInput.addEventListener('change', openImgUpload);
  form.reset();
  clearSlider();
  submitButton.disabled = false;
};

function escapeKeyHandler(evt) {
  if(evt.key === 'Escape'){
    closeImgUpload();
  }
}

fileInput.addEventListener('change', openImgUpload);
closeImgUploadButton.addEventListener('click', closeImgUpload);
