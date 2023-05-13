import {closeImgUploadWithError} from './open-picture.js';

const getData = () => {
  const error = document.querySelector('#error').content.cloneNode(true);
  const body = document.querySelector('body');
  const errorButton = error.querySelector('.error__button');
  const errorElement = document.querySelector('.error');
  return {
    errorButton,
    body,
    error,
    errorElement
  };
};


const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    hideError();
  }
};

const closeClickOut = (evt) => {
  const data = getData();
  const errorSection = data.errorElement.querySelector('.error__inner');
  if (!errorSection.contains(evt.target)) {
    hideError();
  }
};

const newFile = () => {
  hideError();
  document.querySelector('.img-upload__input').click();
};

function hideError () {
  const data = getData();
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('click', closeClickOut);
  data.errorButton.removeEventListener('click', newFile);
  data.body.removeChild(data.errorElement);
}

export const showError = () => {
  closeImgUploadWithError();
  const data = getData();
  data.body.append(data.error);
  data.errorButton.addEventListener('click', newFile);
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeClickOut);
};
