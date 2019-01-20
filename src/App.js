import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';
import './App.css';
import SelectShelf from './SelectShelf.js';
import Book from './Book.js'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({books})
    })
  }



  render() {
    return (
      
        <div className="app">
          <Route path="/search" render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <input type="text" placeholder="Search by title or author" />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          )}/>
          
          <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        { this.state.books.map(book => (
                          book.shelf === "currentlyReading" && (
                          <Book book={book} />
                          )
                        ))}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        { this.state.books.map(book => (
                          book.shelf === "wantToRead" && (
                          <Book book={book} />
                          )
                        ))}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                        { this.state.books.map(book => (
                          book.shelf === "read" && (
                          <Book book={book} />
                          )
                        ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <Link className="open-search" to="/search">Search a book</Link>
              </div>
            )}/>
          </div>
    )
  }
}

export default BooksApp
