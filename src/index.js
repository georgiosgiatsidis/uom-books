import Component from './Component';
import Header from './Header';
import Footer from './Footer';
import styles from '../public/styles.css';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      loading: true,
    }
  }

  render() {
    const { loading, books } = this.state;
    return `
      <div class="container">
        ${Header()}
          <div class="row">
            ${loading ? '<div class="loading"></div>' : `${books.map(book => `
            <div class="col-sm-6">
              <div class="row">
                <div class="col">
                  <a href="${book.previewLink}" target="_blank">
                    <img src="${book.thumbnail}" />
                  </a>
                </div>
                <div class="col">
                  <h2>${book.title}</h2>
                </div>
              </div>
              <p>By ${book.description}</p>
            </div>`).join('\n')}
            <button onclick="document.componentRegistry[${this._id}].changePage('javascript, 2')">change page</button>
            `}
          </div>
        ${Footer()}
      </div>
      `;
  }

  changePage(q, startIndex) {
    this.state.loading = true;
    update();
    this.fetchBooks(q, startIndex);
  }

  fetchBooks(q, startIndex = 0) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}`)
      .then(res => res.json())
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
        this.state.loading = false;
        this.state.books = res.items.map(item => {
          const book = {
            title: item.volumeInfo.title,
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            description: item.volumeInfo.description,
            previewLink: item.volumeInfo.previewLink,
          };
          return book;
        });
        setTimeout(update, 500);
      })
  }

}

const app = new App();
app.fetchBooks('javascript');
document.getElementById('app').innerHTML = app.render();

function update() {
  console.log('update');
  document.getElementById('app').innerHTML = app.render();
}
