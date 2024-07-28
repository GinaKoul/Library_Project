let myLibrary = [];
let showButton, addBookDialog, bookTitle, bookAuthor, bookPages, bookRead, addBtn;

// Book constructor
function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.titleInfo = function() {
        let bookTitle = document.createElement('h2');
        bookTitle.textContent = this.title;
        return bookTitle;
    };
    this.authorInfo = function() {
        let bookAuthor = document.createElement('p');
        let authorKey = document.createElement('span');
        let authorContent = document.createElement('span');
        authorKey.classList.add('font-bold');
        authorKey.textContent = 'Author: ';
        authorContent.classList.add('font-italic');
        authorContent.textContent = this.author;
        bookAuthor.append(authorKey, authorContent);
        return bookAuthor;
    };
    this.pagesInfo = function() {
        let bookPages = document.createElement('p');
        let pagesKey = document.createElement('span');
        let pagesContent = document.createElement('span');
        pagesKey.classList.add('font-bold');
        pagesKey.textContent = 'Pages: ';
        pagesContent.classList.add('font-italic');
        pagesContent.textContent = `${this.pages} pages`;
        bookPages.append(pagesKey, pagesContent);
        return bookPages;
    };
    this.readInfo = function() {
        let bookRead = document.createElement('p');
        bookRead.classList.add('font-bold');
        bookRead.textContent = 'Read';
        if(this.read) {
            bookRead.classList.add('read');
        } else {
            bookRead.classList.add('not-read');
        }
        return bookRead;
    }
    this.changeReadStatus = function() {
        this.read = this.read ? this.read = false:this.read = true;
    }
}

// Create book card
function createBookCard(newBook) {
    let card = document.createElement('article');
    let closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    card.classList.add('book-card');
    card.append(closeButton,newBook.titleInfo(),newBook.authorInfo(),newBook.pagesInfo(),newBook.readInfo());
    return card;
}

// Create new Book using the book constructor and add it to the Library array
function addBookToLibrary(event) {
    event.preventDefault;
    let newBook = new Book(bookTitle?.value,bookAuthor?.value,bookPages?.value,bookRead?.checked);
    myLibrary.push(newBook);
    addBookDialog.querySelector('form').reset();
    let bookGrid = document.querySelector('#bookGrid');
    let newBookCard = createBookCard(newBook);
    bookGrid.appendChild(newBookCard);
    console.log(newBook.read);
    newBook.changeReadStatus();
    console.log(newBook.read);
}

function initDialog() {
    // Initialize dialog variables
    showButton = document.querySelector("#showBookDialog");
    addBookDialog = document.querySelector("dialog");
    bookTitle = addBookDialog?.querySelector("#bookTitle");
    bookAuthor = addBookDialog?.querySelector("#bookAuthor");
    bookPages = addBookDialog?.querySelector("#bookPages");
    bookRead = addBookDialog?.querySelector("#bookRead");
    addBtn = addBookDialog?.querySelector("#addBtn");

    // "Show the dialog" button opens the <dialog> modally
    showButton.addEventListener("click", () => {
        addBookDialog.showModal();
    });

    // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
    addBookDialog.addEventListener("close", addBookToLibrary);

    // Prevent the "add" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
    addBtn.addEventListener("click", (event) => {
        event.preventDefault(); // We don't want to submit this fake form
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