import Component from './Component';
import Header from './Header';
import Book from './Book';
import Footer from './Footer';
import Pagination from './Pagination';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      query: props.query,
      startIndex: 0,
      totalPages: 0,
    };
  }

  render() {
    const {
      loading,
      books,
      startIndex,
      totalPages,
    } = this.state;
    const pagination = new Pagination({ startIndex, totalPages, that: this._id });
    return `
      <div class="container">
        ${Header()}
        <input onchange="document.componentRegistry[${this._id}].handleChange(event.target.value, 0)" value='${this.state.query}' />
        <span>*type a keyword and press enter</span>
        <div class="row row-eq-height">
          ${loading ? '<div class="loading"></div>' : `${books.map(book => `${Book({ book })}`).join('\n')}`}
        </div>
        ${pagination.render()}
        ${Footer()}
      </div>
      `;
  }

  handleChange(query, startIndex) {
    if (typeof query !== 'undefined') {
      this.state.query = query;
    }
    this.state.startIndex = startIndex;
    this.fetchBooks();
  }

  fetchBooks() {
    this.state.loading = true;
    document.getElementById('app').innerHTML = this.render();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&startIndex=${this.state.startIndex}`)
      .then(res => res.json())
      .then((res) => {
        this.state.loading = false;
        this.state.totalPages = Math.ceil(res.totalItems / 10);
        this.state.books = res.items && res.items.map((item) => {
          const book = {
            title: item.volumeInfo.title,
            thumbnail: typeof item.volumeInfo.imageLinks !== 'undefined' ? item.volumeInfo.imageLinks.thumbnail : '',
            description: item.volumeInfo.description,
            previewLink: item.volumeInfo.previewLink,
            authors: item.volumeInfo.authors,
          };
          return book;
        });
        document.getElementById('app').innerHTML = this.render();
      });
  }
}
