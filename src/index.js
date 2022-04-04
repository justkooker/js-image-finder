import apiServicev from './apiService';
import galleryTemplate from './template/gallery-template.hbs';

import './css/styles.css';
import 'material-design-icons/iconfont/material-icons.css';

const body = document.querySelector('body');
const form = document.querySelector('#search-form');
const input = document.querySelector('input[name = "query"');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const modalImage = document.querySelector('.modal-image');
const modal = document.querySelector('.modal-container');
const query = {
  baseURL: 'https://pixabay.com/api/',
  page: 1,
  per_page: 12,
  key: '16192895-b30e865bfa1f0fc43dcc0dc3e',
};
const formRes = function (e) {
  e.preventDefault();
  gallery.innerHTML = '';
  apiServicev(input.value);
  query.page = 1;
};
const createGallery = function (data) {
  const markup = data.map(item => galleryTemplate(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  if (data.length === 0) {
    loadMoreBtn.style.visibility = 'hidden';
  } else {
    loadMoreBtn.style.visibility = 'visible';
  }
};
const loadMoreImages = async function () {
  query.page += 1;
  await apiServicev(input.value);
  scrollPage();
};

const scrollPage = function () {
  gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

const openModal = function (e) {
  if (e.target.nodeName === 'IMG') {
    modal.style.display = 'flex';
    const modalImageSrc = e.target.getAttribute('data-src');
    console.log(modalImageSrc);
    modalImage.setAttribute('src', modalImageSrc);
  }
};
const closeModalEsc = function (e) {
  console.log(e.target);
  console.log(e.code);
  if (e.code === 'Escape') {
    console.log(e.target);
    console.log(e.code);
    modal.style.display = 'none';
  }
};
const closeModal = function (e) {
  console.log(e.target);
  if (e.target.nodeName !== 'IMG') {
    modal.style.display = 'none';
  }
  
};
loadMoreBtn.addEventListener('click', loadMoreImages);
form.addEventListener('submit', formRes);
gallery.addEventListener('click', openModal);
body.addEventListener('keydown', closeModalEsc);
modal.addEventListener('click', closeModal);

export { createGallery, query };
