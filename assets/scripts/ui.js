var UI = (function() {

    var bookCardTemplateID = 'book-card-template';
    var bookDetailsTemplateID = 'book-details-template';
    var spinnerTemplateID = 'spinner-template';

    var publicAPI = {
        createBookCard,
        renderBookDetails
    }

    return publicAPI;

    // ==========================

    function removeWithDelay(element, delay = 1000) {
        window.setTimeout(function removeElement() {
            element.parentElement.removeChild(element);
        }, delay)
    }

    function lazyLoadImage(imageElement, imageSource) {
        var image = new Image();

        var spinner = document.getElementById(spinnerTemplateID).content.cloneNode(true);
        imageElement.parentElement.appendChild(spinner);
        
        image.onload = function() {
            imageElement.src = this.src;
            imageElement.parentElement.classList.add('loaded');
            removeWithDelay(imageElement.parentElement.querySelector('.spinner'));
        }

        image.onerror = function() {
            imageElement.src = 'assets/images/not-found.jpg';
            imageElement.parentElement.classList.add('loaded');
            removeWithDelay(imageElement.parentElement.querySelector('.spinner'));
        }

        image.src = imageSource;
    }

    function createBookCard(book, onBookViewFn) {
        var template = document.getElementById(bookCardTemplateID).content.cloneNode(true);
        var coverImage = template.querySelector('img')
        lazyLoadImage(coverImage, book.coverImage);
        coverImage.alt = `Cover for book: ${book.title}`;
        var info = template.querySelector('.book-list__item-info');
        info.querySelector('h3').textContent = book.title ?? 'Mystery book';
        info.querySelector('p').textContent = book.firstSentence;
        var button = info.querySelector('button');
        button.textContent = 'View';
        button.addEventListener('click', onBookViewFn);
        return template;
    }

    function renderBookDetails(targetElement, book, onBookAddFn) {
        var template = document.getElementById(bookDetailsTemplateID).content.cloneNode(true);
        var coverImage = template.querySelector('img');
        coverImage.src = book.coverImage;
        coverImage.alt = `Cover for book: ${book.title}`;
        var title = template.querySelector('.title');
        title.textContent = book.title;
        var description = template.querySelector('.description');
        description.textContent = book.firstSentence;
        template.querySelector('.author').textContent = book.author;
        template.querySelector('.pages').textContent = book.pages;
        template.querySelector('.rating').textContent = book.rating;
        var actions = template.querySelector('.actions');
        var addButton = actions.querySelector('button.warning');
        addButton.textContent = 'Add to your books';
        addButton.addEventListener('click', onBookAddFn);
        actions.querySelector('button.danger').remove();
        targetElement.appendChild(template);
    }

})()
