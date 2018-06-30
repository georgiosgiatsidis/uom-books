const Book = ({ book }) => (
  `<div class="col-sm-6">
    <a href="${book.previewLink}" target="_blank">
      <img src="${book.thumbnail}" />
    </a>
    <a href="${book.previewLink}" target="_blank">
      <h2>${book.title}</h2>
    </a>
    ${book.description && `<p class="ellipsis">${book.description}</p>`}
    <p>${book.authors && book.authors.map(author => author)}</p>
  </div>`
);

export default Book;
