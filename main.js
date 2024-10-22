let myLibrary = [];
let bookGrid, showButton, addBookDialog, bookTitle, bookAuthor, bookPages, bookRead, addBtn;
let increasingId = 0;

class Book {
    constructor(id,title,author,pages,read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.titleInfo = this.title;
        this.authorInfo = this.author;
        this.pagesInfo = this.pages;
        this.readInfo = this.read;
        this.card =[this.id,this.titleInfo,this.authorInfo,this.pagesInfo,this.readInfo];
    }

    get titleInfo() {
        return this._titleInfo;
    }

    set titleInfo(value) {
        let bookTitle = document.createElement('h2');
        bookTitle.textContent = value;
        this._titleInfo = bookTitle;
    }

    get authorInfo() {
        return this._authorInfo;
    }

    set authorInfo(value) {
        let bookAuthor = document.createElement('p');
        let authorKey = document.createElement('span');
        let authorContent = document.createElement('span');
        authorKey.classList.add('font-bold');
        authorKey.textContent = 'Author: ';
        authorContent.classList.add('font-italic');
        authorContent.textContent = value;
        bookAuthor.append(authorKey, authorContent);
        this._authorInfo = bookAuthor;
    }

    get pagesInfo() {
        return this._pagesInfo;
    }

    set pagesInfo(value) {
        let bookPages = document.createElement('p');
        let pagesKey = document.createElement('span');
        let pagesContent = document.createElement('span');
        pagesKey.classList.add('font-bold');
        pagesKey.textContent = 'Pages: ';
        pagesContent.classList.add('font-italic');
        pagesContent.textContent = `${value} pages`;
        bookPages.append(pagesKey, pagesContent);
        this._pagesInfo = bookPages;
    }

    get readInfo() {
        return this._readInfo;
    }

    set readInfo(value) {
        let readContainer = document.createElement('div');
        let bookRead = document.createElement('p');
        let readStatusBtn = document.createElement('button');
        readContainer.classList.add('read-wrap');
        bookRead.classList.add('font-bold');
        bookRead.textContent = 'Read';
        readStatusBtn.classList.add('read-switch');
        readStatusBtn.addEventListener('click',this.changeReadStatus);
        value?readStatusBtn.classList.add('read'):null;
        readContainer.append(bookRead,readStatusBtn);
        this._readInfo = readContainer;
    }

    get card() {
        return this._card;
    }

    // Create book card
    set card([id,title,author,pages,read]) {
        let card = document.createElement('article');
        let closeButton = document.createElement('button');
        let closeBtnText = document.createElement('span');
        closeButton.classList.add('close-btn');
        closeBtnText.classList.add('sr-only');
        closeBtnText.textContent = 'Remove from Library';
        closeButton.appendChild(closeBtnText);
        closeButton.addEventListener('click',removeBook);
        card.setAttribute('data-id',id);
        card.classList.add('book-card');
        card.append(closeButton,title,author,pages,read);
        this._card = card;
    }

    // Toggle the read status of Book class and card
    changeReadStatus() {
        this.classList.toggle('read');
        const currentBook = myLibrary.find((book) => book.id == this.closest('.book-card')?.getAttribute('data-id'));
        this._read = this._read ? this._read = false:this._read = true;
    }
}

// Remove book from Library array and from DOM
function removeBook() {
    const filteredLibrary = myLibrary.filter((book) => book.id != this.closest('.book-card')?.getAttribute('data-id'));
    myLibrary = filteredLibrary;
    this.closest('.book-card')?.remove();
    // showLibrary();
}

// Display book cards of Library
function showLibrary() {
    bookGrid.textContent = '';
    myLibrary.forEach(book => {
        let newBookCard = book.card;
        bookGrid.appendChild(newBookCard);
    })
}

// Create new Book using the book constructor and add it to the Library array
function addBookToLibrary(event) {
    event.preventDefault;
    increasingId ++;
    let newBook = new Book(increasingId,bookTitle?.value,bookAuthor?.value,bookPages?.value,bookRead?.checked);
    myLibrary.push(newBook);
    addBookDialog.querySelector('form').reset();
    showLibrary();
    // let newBookCard = createBookCard(newBook);
    // bookGrid.appendChild(newBookCard);
}

function initDialog() {
    // Initialize variables
    bookGrid = document.querySelector('#bookGrid');
    showButton = document.querySelector("#showBookDialog");
    addBookDialog = document.querySelector("dialog");
    bookTitle = addBookDialog?.querySelector("#bookTitle");
    bookAuthor = addBookDialog?.querySelector("#bookAuthor");
    bookPages = addBookDialog?.querySelector("#bookPages");
    bookRead = addBookDialog?.querySelector("#bookRead");
    addBtn = addBookDialog?.querySelector("#addBtn");

    // Add book to Library
    increasingId ++;
    let newBook = new Book(increasingId,'The Hobbit','J. R. R. Tolkien.',300,false);
    myLibrary.push(newBook);
    showLibrary();

    // "Add book to library" button opens the <dialog> modally
    showButton.addEventListener("click", () => {
        addBookDialog.showModal();
    });

    // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
    addBookDialog.addEventListener("close", addBookToLibrary);

    // Prevent the "add" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        addBookDialog.close();
    });
}

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", initDialog);
} else {
    // `DOMContentLoaded` has already fired
    initDialog();
}