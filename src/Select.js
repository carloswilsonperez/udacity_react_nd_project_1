import React from 'react'

const Select = (props) => {
  const {shelf} = props;

  /**
   * @description Calls the updateReadingStatus method in the parent component
   * @param {object} event - The onchange event
   */
  const handleChange = (event) => {
    const shelf = event.target.value;
    props.updateReadingStatus(shelf);
  }

  return (
    <select value={shelf} onChange={handleChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
    </select>
  );
}

export default Select;