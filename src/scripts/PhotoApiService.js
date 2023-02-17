const API_KEY = '33716265-9e8882647bb4a3033c82cecb5';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  getPhotos() {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type="photo"&orientation="horizontal"&safesearch="true"&per_page=40&page=${this.page}`;

    return fetch(URL)
      .then(response => response.json())
      .then()
      .then(({ hits }) => {
        this.nextPage();
        return hits;
      })
      .catch(error => console.log(error));
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
