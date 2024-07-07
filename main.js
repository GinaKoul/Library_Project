let myLibrary = [];
let showButton, addBookDialog, bookTitle, bookAuthor, bookPages, bookRead, addBtn;

// Book constructor
function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readStatus;
        if(this.read) {
            readStatus = 'read';
        } else {
            readStatus = 'not read yet';
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
    this.changeReadStatus = function() {
        this.read = this.read ? this.read = false:this.read = true;
    }
}

// Create book card
function createBookCard(newBook) {
    let card = document.createElement('article');
    card.classList.add('book-card');
    card.textContent = newBook.info();
    return card;
}

// Create new Book using the book constructor and add it to the Library array
function addBookToLibrary(event) {
    event.preventDefault
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

// console.log(theHobbit.info());