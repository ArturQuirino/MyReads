import React from 'react'
import { Route, Link } from 'react-router-dom';
import './App.css';
import Shelf from './Shelf';
import SearchBooks from './SearchBooks.js';
import * as BooksAPI from './BooksAPI';


class BooksApp extends React.Component {

  state = {
    books:[],
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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({books})
    })
}

  changeShelf = (book, shelf) => {
    if(shelf && shelf !== 'move') {
        book.shelf = shelf;
        this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
        BooksAPI.update(book, shelf);
    }
}

  render() {
    return (
      
        <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks onChangeShelf={this.changeShelf}/>
          )}/>
          
          <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.shelves.map((shelf) => (
                      <Shelf shelf={shelf} key={shelf.value} books={this.state.books} onChangeShelf={this.changeShelf}></Shelf>
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
