import React from 'react'
import { Route, Link } from 'react-router-dom';
import './App.css';
import Shelf from './Shelf';


class BooksApp extends React.Component {

  state = {
    shelves: [
      {
        name: "Currently Reading",
        value: "currentlyReading"
      },
      {
        name: "Want to Read",
        value: "wantToRead"
      },
      {
        name: "Read",
        value: "read"
      },
    ]
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
                    {this.state.shelves.map((shelf) => (
                      <Shelf shelf={shelf} key={shelf.value}></Shelf>
                    ))}
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
