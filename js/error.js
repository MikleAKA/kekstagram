import {closeImgUploadWithError} from './openPict.js';

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
  const hashtagsInput = document.querySelector('.text__hashtags');
  const hashtagsValue = hashtagsInput.value;
  const commentInput = document.querySelector('.text__description');
  const commentValue = commentInput.value;
  const scaleInput = document.querySelector('.scale__control--value');
  const scaleValue = scaleInput.value;
  closeImgUploadWithError();
  hashtagsInput.value = hashtagsValue;
  commentInput.value = commentValue;
  scaleInput.value = scaleValue;
  const data = getData();
  data.body.append(data.error);
  data.errorButton.addEventListener('click', newFile);
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeClickOut);
};
