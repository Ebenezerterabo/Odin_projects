// Memory to store library
const myLibrary = [];
const formDialog = document.getElementById('book-form');
const form = document.getElementById('book-form-content');
const newBookBtn = document.getElementById('new-book-btn');
const addBookBtn = document.getElementById('add-book-btn');
const libraryContainer = document.getElementById('book-container');
const cancelBtn = document.getElementById('cancel-btn');



// books constructor (modal)
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); //gives a unique id to each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// add book to myLibrary
function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

// Show the form dialog when the "New Book" button is clicked
newBookBtn.addEventListener('click', () => {
    formDialog.showModal(); // Show the form dialog when the button is clicked
});

// Reading form value when Add Book button is clicked
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    // console.log("Array after push:", myLibrary);
    form.reset(); // Clear the form fields
    formDialog.close(); // Close the form dialog
});
// console.log("Array after push:", myLibrary)

function displayBooks() {
    libraryContainer.innerHTML = '';   // wipe previous cards
    myLibrary.forEach((book) => {
        const card = createBookCard(book);
        libraryContainer.appendChild(card);
    });
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');

    card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.read ? 'Read' : 'Not read'}</p>
    `;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(book.id));
    card.appendChild(removeBtn);

    return card;
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

// Cancel button trigger
cancelBtn.addEventListener('click', () => {
    formDialog.close()
});

