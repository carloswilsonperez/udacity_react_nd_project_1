import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
  const {books, shelf, updateShelf} = props;
  const booksInThisShelve = books.filter(book => book.shelf === shelf);

  let category;
  switch (shelf) {
    case 'currentlyReading': 
      category = 'Currently Reading';
      break;
    case 'wantToRead': 
      category = 'Want to Read';
      break;
    case 'read': 
      category = 'Read';
      break;
    default:
      category = 'Read';
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{category}</h2>
      <div className="bookshelf-books">
      <ol className="books-grid">
        {
          booksInThisShelve.map(book => (
          <li key={book.id}>
            <Book 
              id={book.id}
              shelf={book.shelf} 
              title={book.title} 
              author={book.author} 
              backgroundImage={book.imageLinks}
              updateShelf={updateShelf}
            />
          </li>
          ))
        }
      </ol>
      </div>
  </div>
  );
}

export default BookShelf;
