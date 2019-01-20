import React from 'react'
import { Route, Link } from 'react-router-dom';
import './App.css';
import Shelf from './Shelf';
import SearchBooks from './SearchBooks.js';


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
            <SearchBooks/>
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
