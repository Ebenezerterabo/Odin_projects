// Memory to store library
const myLibrary = [];
const bookForm = document.getElementById('book-form');
const libraryGrid = document.getElementById('book-container');
const newBookBtn = document.getElementById('new-book-btn');
const addBookBtn = document.getElementById('add-book-btn');


// books constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// form toggle logic
// newBookBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     bookForm.style.display = 'block';
// });

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const bookContainer = document.getElementById('book-container');

    myLibrary.forEach((book) => {
        const bookEl = document.createElement('div');
        bookEl.classList.add('book-card');
        bookEl.textContent = book;
        bookContainer.appendChild(bookEl);
    });
}


// displayBooks();

// clicking the book button
newBookBtn.addEventListener('click', () => {
    bookForm.style.display = 'block';
});

// function formPopup() {
//     const formContainer = document.getElementById('form-container');
//     formContainer.style.display = 'block';
// }