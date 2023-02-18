import Notiflix from 'notiflix';
import LoadMoreBtn from './LoadMoreBtn.js';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const API_KEY = '33716265-9e8882647bb4a3033c82cecb5';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.searchQuery = '';
    // this.maxPage = Math.ceil(500 / this.per_page);
    this.foundPage = 0;
  }

  getPhotos() {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${this.per_page}&page=${this.page}`;

    return fetch(URL)
      .then(response => response.json())
      .then(hits => {
        this.foundPage = Math.ceil(hits.totalHits / this.per_page);

        if (this.page === 1) {
          Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`);
          console.log(hits.totalHits);
          console.log(hits);
          console.log(this.foundPage);
        }
        if (this.page === this.foundPage) {
          loadMoreBtn.hide();
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
        return hits;
      })
      .then(({ hits }) => {
        this.nextPage();
        return hits;
      })
      .catch(error =>
        console.log(
          "We're sorry, but you've reached the end of search results."
        )
      );
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
