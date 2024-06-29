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
}

const theHobbit = new Book('The Hobbit','J.R.R. Tolkien',295,false);