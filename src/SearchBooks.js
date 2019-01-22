import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.queryBooks = this.queryBooks.bind(this);
    }

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        booksOnTheShelves: PropTypes.array.isRequired
    }

    state = {
        books: []
    }

    shelves = [
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
        {
            name: "None",
            value: "none"
        },
      ]

    queryBooks(event) {
        BooksAPI.search(event.target.value).then((searchedBooks) => {
            if(searchedBooks && !searchedBooks.error){
                const booksHomePage = this.props.booksOnTheShelves
                const idBooksShelves = booksHomePage.map(bs => bs.id);

                searchedBooks = searchedBooks.map((b) => {
                    if(!idBooksShelves.includes(b.id)){
                        b.shelf = "none";
                    }
                    else {
                        b.shelf = booksHomePage.filter(bh => bh.id === b.id)[0].shelf;
                    }
                    return b;
                })
                this.setState({
                    books: searchedBooks
                });
            } else {
                this.setState({
                    books: []
                });
            }
        });
    }

    render () {
        const { onChangeShelf } = this.props;

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={this.queryBooks}/>
                </div>
              </div>
              <div className="search-books-results">
              {
                  this.shelves.map((shelf) => (
                    <Shelf shelf={shelf} key={shelf.value} books={this.state.books} onChangeShelf={onChangeShelf}></Shelf>
                    ))
                }
              </div>
            </div>
        )
    }
}

export default SearchBooks;