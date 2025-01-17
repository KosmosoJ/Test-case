import React from 'react';

const Book = ({ book }) => {
  // Переиспользуемая карточка книги
  return (
    <div className="book">
      <h3>{book.name}</h3>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Author:</strong> {book.author_name}</p>
    </div>
  );
};

export default Book;