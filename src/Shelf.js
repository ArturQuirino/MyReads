import React, {Component} from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

class Shelf extends Component {
    state = {
        books: []
    }

    static propTypes = {
        shelf: PropTypes.object.isRequired
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
          this.setState({books})
        })
      }

    render() {
        const { shelf } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    { this.state.books.map(book => (
                        book.shelf === shelf.value && (
                        <Book book={book} key={book.id}/>
                        )
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;