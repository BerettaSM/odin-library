var UI = (function() {

    var bookCardTemplateID = 'book-card';

    var publicAPI = {
        createBookCard
    }

    return publicAPI;

    // ==========================

    function createBookCard(book) {
        var template = document.getElementById(bookCardTemplateID).content.cloneNode(true);
        var coverImage = template.querySelector('img')
        coverImage.src = book.coverImage
        coverImage.alt = `Cover for book: ${book.title}`;
        var info = template.querySelector('.book-list__item-info');
        info.querySelector('h3').textContent = book.title;
        info.querySelector('p').textContent = book.firstSentence;
        var button = info.querySelector('button');
        button.textContent = 'View'
        return template;
    }

})()
