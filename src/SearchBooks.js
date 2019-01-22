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

    queryBooks(event) {
        BooksAPI.search(event.target.value).then((searchedBooks) => {
            if(searchedBooks && !searchedBooks.error){
                const idBooksShelves = this.props.booksOnTheShelves.map(bs => bs.id);
                console.log(idBooksShelves.length);
                searchedBooks = searchedBooks.filter(b => !idBooksShelves.includes(b.id));
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
                <ol className="books-grid">
                {
                    this.state.books.length > 0 && (
                    <Shelf shelf={{
                                name: "None",
                                value: "none"
                                }} 
                        key={"none"}
                        books={this.state.books}
                        onChangeShelf={onChangeShelf}/>
                    )
                }
                
                </ol>
              </div>
            </div>
        )
    }
}

export default SearchBooks;