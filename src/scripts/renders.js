function createCardMarkup(hits) {
  return `
    <div class="photo-card" data-src="${hits.largeImageURL}">
        <img src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${hits.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${hits.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${hits.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${hits.downloads}</span>
          </p>
        </div>
    </div>`;
}

export default createCardMarkup;