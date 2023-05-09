import {closeImgUpload} from './openPict.js';

const getData = () => {
  const success = document.querySelector('#success').content.cloneNode(true);
  const body = document.querySelector('body');
  const successButton = success.querySelector('.success__button');
  const successElement = document.querySelector('.success');
  return {
    successButton,
    body,
    success,
    successElement
  };
};

const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    hideSuccess();
  }
};

const closeClickOut = (evt) => {
  const data = getData();
  const successSection = data.successElement.querySelector('.success__inner');
  if (!successSection.contains(evt.target)) {
    hideSuccess();
  }
};

const closeButton = () => {
  hideSuccess();
};

function hideSuccess () {
  const data = getData();
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('click', closeClickOut);
  data.successButton.removeEventListener('click', closeButton);
  data.body.removeChild(data.successElement);
}

export const showSuccess = () => {
  closeImgUpload();
  const data = getData();
  data.body.append(data.success);
  data.successButton.addEventListener('click', closeButton);
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeClickOut);
};
