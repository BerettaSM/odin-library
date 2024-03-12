searchForm.addEventListener('submit', async function onSearchBook(evt) {
    evt.preventDefault();
    var formData = new FormData(evt.target);
    var searchTerm = formData.get('search-term')?.trim();
    var books = await BookService.searchBooks(searchTerm);
    booksList.innerHTML = '';
    if (books.length > 0) {
        renderBookCards(books, [
            {
                label: 'Add to library',
                classes: ['warning'],
                onClick: function onBookAdd(book, evt) {
                    BookService.addBookToLibrary(book);
                    closeModal();
                },
            },
        ]);
    } else {
        var message =
            searchTerm === ''
                ? 'No results for your query.'
                : `No results for query: "${searchTerm}".`;
        booksList.innerHTML = `<p class="message">${message}</p>`;
    }
});

exploreButton.addEventListener('click', function onExploreBooksClick(evt) {
    toggleView();
    searchInput.focus();
    booksList.innerHTML = '<p class="message">Search for a book.</p>';
});

myBooksButton.addEventListener('click', function onMyBooksClick(evt) {
    toggleView();
    var { myLibrary } = BookService;
    booksList.innerHTML = '';
    if (myLibrary.length > 0) {
        renderBookCards(myLibrary, [
            {
                label: ({ read }) => read ? 'Mark as unread' : 'Mark as read',
                classes: ({ read }) => read ? ['warning', 'ghost'] : ['warning'],
                onClick: function toggleRead(book, evt) {
                    var isRead = book.toggleRead();
                    if(isRead) {
                        this.classList.add('ghost');
                        this.textContent = 'Mark as unread';
                    } else {
                        this.classList.remove('ghost')
                        this.textContent = 'Mark as read';
                    }
                    writeToStorage('my-library', myLibrary);
                },
            },
            {
                label: 'Delete',
                classes: ['danger'],
                onClick: function deleteBook(book, evt) {
                    closeModal();
                    BookService.removeBookFromLibrary(book.id);
                    document.getElementById(book.id).remove();
                    if(myLibrary.length === 0) {
                        booksList.innerHTML =
                            '<p class="message">You haven\'t added books yet!</p>'
                    }
                },
            }
        ]);
    } else {
        booksList.innerHTML =
            '<p class="message">You haven\'t added books yet!</p>';
    }
});

function renderBookCards(books, buttonDescriptions) {
    books.forEach(function renderBook(book) {
        var card = UI.createBookCard(book, function onBookView(evt) {
            UI.renderBookDetails(modalRenderTarget, book, buttonDescriptions);
            openModal();
        });
        booksList.appendChild(card);
    });
}

function toggleView() {
    exploreButton.disabled = !exploreButton.disabled;
    myBooksButton.disabled = !myBooksButton.disabled;

    if (exploreButton.disabled) {
        searchForm.style.display = null;
    } else {
        searchForm.style.display = 'none';
    }
}

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
