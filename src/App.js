import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    shelf: [],
    searchResults: [],
    searchErr: false
  }

  /**
  * @description Clean up of the search results
  */
  cleanSearchPage = () => {
    this.setState({searchResults: [], searchErr: false });
  }

  /**
  * @description Search for Books
  * @param {string} query - The title or author of the book
  */
  searchBooks = (query) => {
      this.setState({searchResults: [], searchErr: false });
      if (query.length > 0) {
        BooksAPI.search(query).then(books => {
        if (books && books.length > 0) {
          // If we get some data, update the state...
          this.setState(state => {
            const searchResults = books.map(book => {
              // ...and, if the book belongs to one of the shelves, then assign the reading status from that shelve
              const matchedBookInShelve = state.shelf.find(bookInShelve => bookInShelve.id === book.id);
              if (matchedBookInShelve) {
                book.shelf = matchedBookInShelve.shelf;
              } else {
                book.shelf = 'none';
              }
              return book;
            });
      
            return {
              searchResults
            };
          });
        } else {
          this.setState({ searchResults: [], searchErr: true });
        }
      });
    } else {
      this.setState({searchResults: [], searchErr: false });
    }
  }

  /**
  * @description Update Shelves based on dropdown selection
  * @param {string} id - The id of the book
  * @param {string} readingStatus - The new shelve for the book
  */
  updateShelf = (id, readingStatus) => {
    // Update the application state
    // First, update the 'shelf' property in memory, and persist the change
    //  Update 'shelf' property in memory
    //    Does the book belongs to some of the shelves?
    const matchedBookInShelve = this.state.shelf.find(bookInShelve => bookInShelve.id === id);
    if (matchedBookInShelve) {
      // Book is in shelve; update the state with to save the new 'shelf' property in memory
      this.setState(state => {
        const shelf = state.shelf.map(book => {
          if (book.id === matchedBookInShelve.id) {
            book.shelf = readingStatus;
            return book;
          }
          return book;
        });
    
        return {
          shelf
        };
      });
    } else {
      // Book is not in shelve. Then...
      // The book is in the Search results; find its reference
      const bookInSearchResults = this.state.searchResults.find(bookInShelve => bookInShelve.id === id);
      // ...update its 'shelf' property...
      bookInSearchResults.shelf = readingStatus;
      // ...and add it to the array
      // this.state.shelf.append(bookInSearchResults);
      this.setState({
        shelf: this.state.shelf.concat(bookInSearchResults)
      })
    }

    // Persist the updated reading status agains the API
    BooksAPI.update({id}, readingStatus).then(data => console.log(data));
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({shelf: data});
    });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search">
            <Search 
              books={this.state.shelf} 
              updateShelf={this.updateShelf} 
              searchBooks={this.searchBooks}
              searchResults={this.state.searchResults}
              searchErr={this.state.searchErr}
              cleanSearchPage={this.cleanSearchPage}
            />
          </Route>
          <Route exact path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf books={this.state.shelf} shelf={'currentlyReading'} updateShelf={this.updateShelf} />
                  <BookShelf books={this.state.shelf} shelf={'wantToRead'} updateShelf={this.updateShelf} />
                  <BookShelf books={this.state.shelf} shelf={'read'} updateShelf={this.updateShelf} />
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.props.history.push("/search")}>Add a book</button>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(BooksApp);
