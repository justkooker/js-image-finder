import 'regenerator-runtime/runtime';
import {createGallery, query} from './index';
const apiService = async function (searchQuery) {
  await fetch(
    `${query.baseURL}?key=${query.key}&q=${searchQuery}&page=${query.page}&per_page=${query.per_page}`,
  )
    .then(response => response.json())
    .then(data => createGallery(data.hits));
};

export default apiService;
