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

console.log(theHobbit.info());
console.log(Object.getPrototypeOf(theHobbit) === Book.prototype); // Returns true because theHobbit objects prototype is the Book.prototype
console.log(Object.getPrototypeOf(theHobbit)); // TheHobbit object inherits from the Book.prototype
console.log(Object.getPrototypeOf(Book.prototype)); // Book prototype inherits from Object.prototype
console.log(theHobbit.valueOf()); // The value of method is a method of Object.prototype
console.log(theHobbit.hasOwnProperty('valueOf')); // Check if the valueOf is a property of theHobbit object
console.log(Object.prototype.hasOwnProperty('valueOf')); // Check if the valueOf is a property of theHobbit object