const appContainer = document.querySelector('.app');
const searchForm = document.getElementById('search-form');
const searchInput = searchForm.querySelector('input[type="search"]');
const exploreButton = document.getElementById('explore-books');
const myBooksButton = document.getElementById('my-books');
const booksList = document.querySelector('.book-list');
const modalRoot = document.getElementById('modal-root');
const modal = modalRoot.querySelector('dialog');
const modalRenderTarget = modalRoot.querySelector('.book-details');
const modalCloseButton = document.getElementById('close-button');
const backdrop = document.querySelector('.backdrop');
