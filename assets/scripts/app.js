searchForm.addEventListener('submit', async function onSearchBook(evt) {
    evt.preventDefault();
    var formData = new FormData(evt.target);
    var searchTerm = formData.get('search-term')?.trim();
    var books = await BookService.searchBooks(searchTerm);
    booksList.innerHTML = '';
    if(books.length > 0) {
        books.forEach(function renderBook(book) {
            var card = UI.createBookCard(book, function onBookView(evt) {
                UI.renderBookDetails(modalRenderTarget, book, function onBookAdd(evt) {
                    BookService.addBookToLibrary(book);
                    closeModal();
                });
                openModal();
            });
            booksList.appendChild(card);
        });
    } else {
        var message = searchTerm === ''
            ? 'No results for your query.'
            : `No results for query: "${searchTerm}".`;
        booksList.innerHTML = `<p class="message">${message}</p>`
    }
});

modalCloseButton.addEventListener('click', closeModal);

backdrop.addEventListener('click', closeModal);

searchInput.focus();

function openModal() {
    modal.classList.add('visible');
    backdrop.classList.add('visible');
    document.documentElement.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('visible');
    backdrop.classList.remove('visible');
    modalRenderTarget.innerHTML = '';
    document.documentElement.style.overflow = null;
}
