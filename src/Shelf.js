import React, {Component} from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';

class Shelf extends Component {

    static propTypes = {
        shelf: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { shelf, books, onChangeShelf } = this.props;
        if(books){
            
            return (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        { 
                            books.map(book => (
                            (book.shelf === shelf.value || !book.shelf) && (
                            <Book book={book} key={book.id} onChangeShelf={onChangeShelf}/>
                            )
                        ))}
                        </ol>
                    </div>
                </div>
            )
        }
        

        
    }
}

export default Shelf;