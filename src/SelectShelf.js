import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SelectShelf extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    

    render () {
        const {book, onChangeShelf} = this.props;

        function handleChange(event) {
            onChangeShelf(book, event.target.value);
        }

        return (
            <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : "none"} onChange={handleChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default SelectShelf;