var BookService = (function() {
    var myLibrary = loadBooksFromLocalStorage();
    
    var searchURL = 'https://openlibrary.org/search.json';
    var bookCoverURL = 'https://covers.openlibrary.org/b/olid/'

    var fields = [
        'key',
        'title',
        'author_name',
        'number_of_pages_median',
        'first_sentence',
        'ratings_average',
        'cover_edition_key'
    ].join(',');

    var publicAPI = {
        myLibrary,
        searchBooks,
        addBookToLibrary,
        removeBookFromLibrary
    }

    Book.prototype.toggleRead = function() {
        return (this.read = !this.read)
    }

    return publicAPI;

    // ==========================

    function Book(id, title, author, pages, firstSentence, rating, coverImage,  read = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.firstSentence = firstSentence;
        this.rating = rating;
        this.coverImage = coverImage;
        this.read = read;
    }

    function addBookToLibrary(book) {
        if(!myLibrary.some(b => b.id === book.id)) {
            myLibrary.push(book);
            writeToStorage('my-library', myLibrary);
        }
    }

    function removeBookFromLibrary(bookId) {
        var bookIndex = myLibrary.findIndex(b => b.id === bookId);
        if(bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            writeToStorage('my-library', myLibrary);
        }
    }

    function createBook(json) {
        var { author_name, first_sentence, cover_edition_key } = json;
        return new Book(
            json.key,
            json.title ?? 'Mystery book',
            author_name ? author_name[0] : 'Unknown author',
            json.number_of_pages_median ?? 'Pages info not provided',
            first_sentence ? first_sentence[0] : 'A description/first sentence was not provided.',
            json.ratings_average != undefined ? json.ratings_average.toFixed(1) : 'Unknown rating',
            cover_edition_key != undefined ? `${bookCoverURL}${cover_edition_key}-M.jpg` : 'assets/images/not-found.jpg',
        );
    }

    function loadBooksFromLocalStorage() {
        var books = readFromStorage('my-library')

        console.log(books)

        return books == null
            ? []
            : books.map(b => {
                var book = { ...b };
                Object.setPrototypeOf(book, Book.prototype);
                return book;
            });
    }

    async function sendRequest(url, options = {}) {
        var response = await fetch(url, options);
        var json = await response.json();
        if(!response.ok) {
            throw new Error('Failed to fetch.');
        }
        return json;
    }

    async function searchBooks(query = '', page = 1, limit = 20) {
        var fullURL = `${searchURL}?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&fields=${encodeURIComponent(fields)}`;
        var data = await sendRequest(fullURL);
        return data.docs.map(createBook)
    }

})()
