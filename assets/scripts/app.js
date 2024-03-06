const searchForm = document.getElementById('search-form');
const booksList = document.querySelector('.book-list');

function addBookToLibrary() {
    // do stuff here
}

searchForm.addEventListener('submit', async function onSearchBook(evt) {
    evt.preventDefault();
    var formData = new FormData(evt.target);
    var searchTerm = formData.get('search-term')?.trim();
    var books = await BookService.searchBooks(searchTerm);
    
    booksList.innerHTML = ''

    books.forEach(function renderBook(book) {
        var card = UI.createBookCard(book);
        booksList.appendChild(card);
    });
});
