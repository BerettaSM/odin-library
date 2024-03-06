var BookService = (function() {
    var myLibrary = [];
    
    var searchURL = 'https://openlibrary.org/search.json';
    var authorImaageURL = 'https://covers.openlibrary.org/a/olid/' // {author_key (array)}-M.jpg
    var bookCoverURL = 'https://covers.openlibrary.org/b/olid/'

    var fields = [
        'key',
        'title',
        'author_name',
        'number_of_pages_median',
        'first_sentence',
        'ratings_average',
        'author_key',
        'cover_edition_key'
    ].join(',');

    var publicAPI = {
        myLibrary,
        searchBooks
    }

    return publicAPI;

    // ==========================

    function Book(id, title, author, pages, firstSentence, rating, coverImage, authorImage, read = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.firstSentence = firstSentence;
        this.rating = rating;
        this.coverImage = coverImage;
        this.authorImage = authorImage;
        this.read = read;
    }

    function createBook(json) {
        var { author_name, author_key, first_sentence, cover_edition_key } = json;
        return new Book(
            json.key,
            json.title,
            author_name ? author_name[0] : 'Unknown',
            json.number_of_pages_median,
            first_sentence ? first_sentence[0] : null,
            json.ratings_average,
            `${bookCoverURL}${cover_edition_key}-M.jpg`,
            `${authorImaageURL}${author_key}-M.jpg`,
        );
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
