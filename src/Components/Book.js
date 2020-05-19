import React from 'react';
import Select from './Select';
import thumbnailNoAvailable from '../icons/noimage.png';

const Book = (props) => {
    const {shelf, title, authors, backgroundImage} = props;
    let authorsArray = [];
    const itHasThumbnail = backgroundImage && backgroundImage.thumbnail
    const itHasSmallThumbnail = backgroundImage && backgroundImage.smallThumbnail;
    const noThumbnailAvailable = !itHasThumbnail && !itHasSmallThumbnail;

    let thumbnail = itHasThumbnail;
    if (noThumbnailAvailable) {
        thumbnail = thumbnailNoAvailable;
    }

    if (authors && authors.length > 0) {
        authorsArray = authors;
    }

    /**
     * @description Calls the updateShelf method in the parent component
     * @param {object} event - The onchange event
     */
    const updateReadingStatus = (readingStatus) => {
        // Update the state for this book item
        props.updateShelf(props.id, readingStatus);
    }
  
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}>
                </div>
                <div className="book-shelf-changer">
                    <Select shelf={shelf} updateReadingStatus={updateReadingStatus}/>
                </div>
            </div>
            <div className="book-title">{title}</div>
            {authorsArray.length > 0 &&
            authorsArray.map((author, index) => (
                <div className="book-authors" key={index}>
                    {author}
                </div>
            ))}
            {authorsArray.length === 0 &&
            <div className="book-authors">
                Unknown Author
            </div>}
        </div>
    );
  }
  
 export default Book;
