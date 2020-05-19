import React from 'react';
import Book from './Book';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
  /**
  * @description Calls the searchBooks method in the parent component
  * @param {object} event - The onchange event
  */
  searchBooks = (event) => {
    const query = event.target.value.trim();
    this.props.searchBooks(query);
  }

  componentDidMount() {
    this.props.cleanSearchPage();
    this.nameInput.focus();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.props.history.push("/")}>Close</button>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.searchBooks}  ref={(input) => { this.nameInput = input; }} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.props.searchResults.length > 0 && this.props.searchResults.map(book => (
                <li key={book.id}>
                  <Book 
                      id={book.id}
                      shelf={book.shelf} 
                      title={book.title} 
                      author={book.author} 
                      backgroundImage={book.imageLinks}
                      updateShelf={this.props.updateShelf}
                  />
                </li>
              ))
            }
          </ol>
          {this.props.searchErr && (
            <div className="no-results-found">
                <h1>No results found.</h1>
                <h3>Please try again!</h3>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Search);
