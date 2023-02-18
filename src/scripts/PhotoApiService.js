import Notiflix from 'notiflix';
import LoadMoreBtn from './LoadMoreBtn.js';
import axios from 'axios';

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
    this.foundPage = 0;
  }

  async getPhotos() {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${this.per_page}&page=${this.page}`;

    try {
      const response = await axios.get(URL);
      const data = response.data;
      const hits = data.hits;
      const totalHits = data.totalHits;

      //   console.log(hits);
      //   console.log(totalHits);

      this.foundPage = Math.ceil(totalHits / this.per_page);

      if (this.page === 1) {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      }
      if (this.page === this.foundPage) {
        loadMoreBtn.hide();
        Notiflix.Notify.success(
          "We're sorry, but you've reached the end of search results."
        );
      }
      this.nextPage();
      return hits;
    } catch {
      console.log('Something went wrong!!!');
    }
  }

  //   getPhotos() {
  //     const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=${this.per_page}&page=${this.page}`;

  //     return fetch(URL)
  //       .then(response => response.json())
  //       .then(hits => {
  //         this.foundPage = Math.ceil(hits.totalHits / this.per_page);

  //         if (this.page === 1) {
  //           Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`);
  //           console.log(hits.totalHits);
  //           console.log(hits);
  //           console.log(this.foundPage);
  //         }
  //         if (this.page === this.foundPage) {
  //           loadMoreBtn.hide();
  //           Notiflix.Notify.success(
  //             "We're sorry, but you've reached the end of search results."
  //           );
  //         }
  //         return hits;
  //       })
  //       .then(({ hits }) => {
  //         this.nextPage();
  //         return hits;
  //       })
  //       .catch(error =>
  //         console.log(
  //           "We're sorry, but you've reached the end of search results."
  //         )
  //       );
  //   }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
