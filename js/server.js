import {showError} from './error.js';
import {showSuccess} from './success.js';
import {showErrorFetch} from './errorFetch.js';

const SERVER_URL = 'https://27.javscript.pages.academy/kekstagram-simple';


export const fetchData = (onSuccess) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showErrorFetch();
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      showErrorFetch();
    });
};

export const sendData = (onSuccess, body) => {
  fetch(`${SERVER_URL}`, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showError();
    })
    .then((data) => {
      onSuccess(data);
      showSuccess();
    })
    .catch(() => {
      showError();
    });
};

