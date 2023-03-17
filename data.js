import { getRandomInt } from './util.js';

function createPhotoArray() {
  const photoArray = [];

  for (let i = 1; i <= 25; i++) {
    const id = i;
    const url = `photos/${i}.jpg`;
    const description = `Описание фотографии №${i}`;
    const likes = getRandomInt(15, 200);
    const comments = getRandomInt(0, 200);

    const photoObj = { id, url, description, likes, comments };
    photoArray.push(photoObj);
  }

  return photoArray;
}

export { createPhotoArray };
