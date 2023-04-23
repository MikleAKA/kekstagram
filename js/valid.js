import { closeImgUpload } from './openPict.js';
import {sendData} from './server.js';

const form = document.querySelector('.img-upload__form');
const regex = new RegExp('^#[а-яa-zA-ZА-ЯёЁ0-9]{1,19}$');

const pristine  = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form--invalid',
  successClass: 'form--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateComment = (value) => value.length >= 20 && value.length <= 140;

const validateHashTag = (value) => regex.test(value) && value.length >= 2;

pristine.addValidator(
  form.querySelector('.text__description'),
  validateComment,
  'Комментарий должен быть от 20 до 140 символов',
  10
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashTag,
  'Хэштег должен начинаться с # и быть от 1 до 19 символов',
  0
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(!pristine.validate()) {
    return;
  }
  evt.target.querySelector('.img-upload__submit').disabled = true;
  sendData( () => {
    evt.target.querySelector('.img-upload__submit').disabled = false;
  },
  new FormData(evt.target)
  );
  closeImgUpload();
});
