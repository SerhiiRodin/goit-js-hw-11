import Notiflix from 'notiflix';

import PixabayApiService from './scripts/PhotoApiService.js';
import LoadMoreBtn from './scripts/LoadMoreBtn.js';
import createCardMarkup from './scripts/renders.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const pixabayApiService = new PixabayApiService();
// const loadMoreBtn = document.querySelector('.load-more');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
// console.log(pixabayApiService);
// console.log(loadMoreBtn);

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchHits);

function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  //   console.dir(value);
  pixabayApiService.searchQuery = value;

  if (!pixabayApiService.searchQuery) {
    form.reset();
    return;
  }

  pixabayApiService.resetPage();
  clearGallery();
  loadMoreBtn.show();

  fetchHits();
  // .finally(() => form.reset());
}

function fetchHits() {
  loadMoreBtn.disable();

  return pixabayApiService
    .getPhotos()
    .then(hits => {
      if (hits.length === 0) {
        throw new Error();
      }

      return hits.reduce((acc, hit) => {
        return acc + createCardMarkup(hit);
      }, '');
    })
    .then(markup => {
      appendCardToGallery(markup);
      loadMoreBtn.enable();
    })

    .catch(noData);
}

function appendCardToGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = '';
}

function noData() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  loadMoreBtn.hide();
}
