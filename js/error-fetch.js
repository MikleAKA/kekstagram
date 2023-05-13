const getData = () => {
  const error = document.querySelector('#error_fetch').content.cloneNode(true);
  const body = document.querySelector('body');
  const errorButton = error.querySelector('.error_fetch__button');
  const errorElement = document.querySelector('.error_fetch');
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
  const errorSection = data.errorElement.querySelector('.error_fetch__inner');
  if (!errorSection.contains(evt.target)) {
    hideError();
  }
};

const reloadPage = () => {
  hideError();
  location.reload();
};

function hideError () {
  const data = getData();
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('click', closeClickOut);
  data.errorButton.removeEventListener('click', reloadPage);
  data.body.removeChild(data.errorElement);
}

export const showErrorFetch = () => {
  const data = getData();
  data.body.append(data.error);
  data.errorButton.addEventListener('click', reloadPage);
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeClickOut);
};
