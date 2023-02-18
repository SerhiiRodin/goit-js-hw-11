import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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

let lightbox = new SimpleLightbox('.gallery div', {
  sourceAttr: 'data-src',
  nav: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  close: true,
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

async function fetchHits() {
  loadMoreBtn.disable();
  try {
    const hits = await pixabayApiService.getPhotos();
    // console.log(hits);

    if (hits.length === 0) {
      throw new Error();
    }

    const markup = hits.reduce((acc, hit) => {
      return acc + createCardMarkup(hit);
    }, '');

    appendCardToGallery(markup);
    loadMoreBtn.enable();
  } catch {
    noData();
  }
}

function appendCardToGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
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
