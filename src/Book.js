import React, {Component} from 'react';
import SelectShelf from './SelectShelf.js';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { book, onChangeShelf } = this.props;
        if(book && book.imageLinks && book.imageLinks.smallThumbnail && book.title){
            return (
                <li>
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                        <SelectShelf book={book} onChangeShelf={onChangeShelf}/>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {
                            book.authors && (
                                <div className="book-authors">{book.authors[0]}</div>
                            )
                        }
                    </div>
                </li>
            )
         } else {
             return null;
         }
    }
}

export default Book;