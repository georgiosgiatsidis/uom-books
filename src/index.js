import Component from './Component';
import Header from './Header';
import Footer from './Footer';
import pagination from './Pagination';
import styles from '../public/styles.css';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      loading: true,
      query: props.query,
      startIndex: 0,
      totalPages: undefined,
    }
    console.log(this.state);
  }

  render() {
    const { loading, books } = this.state;
    console.log('startIndex', this.state.startIndex + 1);
    console.log('totalPages', this.state.totalPages);
    console.log(pagination(this.state.startIndex + 1, this.state.totalPages));
    return `
      <div class="container">
        ${Header()}
        <input onchange="document.componentRegistry[${this._id}].handleChange(event.target.value, 0)" value='${this.state.query}' />
        <span>*type a keyword and press enter</span>
        <div class="row row-eq-height">
          ${loading ? '<div class="loading"></div>' : `${books.map(book => `
            <div class="col-sm-6">
              <a href="${book.previewLink}" target="_blank">
                <img src="${book.thumbnail}" />
              </a>
              <h2>${book.title}</h2>
              ${book.description && `<p class="ellipsis">${book.description}</p>`}
              <p>${book.authors && book.authors.map(author => author)}</p>
            </div>`).join('\n')}`}
            ${pagination(this.state.startIndex, this.state.totalPages).map(page =>`
              <span class="page" ${page !== "..." && `onclick="document.componentRegistry[${this._id}].handleChange('${this.state.query}', ${page - 1})"`}>
                ${page}
              </span>`).join('\n')}
        </div>
        ${Footer()}
      </div>
      `;
  }

  handleChange(query, startIndex) {
    this.state.query = query;
    this.state.startIndex = startIndex;
    this.fetchBooks();
  }

  fetchBooks() {
    this.state.loading = true;
    update();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&startIndex=${this.state.startIndex}`)
      .then(res => res.json())
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
        this.state.loading = false;
        this.state.totalPages = Math.ceil(res.totalItems / 10);
        this.state.books = res.items && res.items.map(item => {
          const book = {
            title: item.volumeInfo.title,
            thumbnail: typeof item.volumeInfo.imageLinks !== 'undefined' ? item.volumeInfo.imageLinks.thumbnail : '',
            description: item.volumeInfo.description,
            previewLink: item.volumeInfo.previewLink,
            authors: item.volumeInfo.authors,
          };
          return book;
        });
        setTimeout(update, 200);
      })
  }
}

const app = new App({ query: 'javascript' });
app.fetchBooks();
document.getElementById('app').innerHTML = app.render();

function update() {
  console.log('update');
  document.getElementById('app').innerHTML = app.render();
}
