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
    const { loading } = this.state;
    return `
      ${Header()}
        <div class="books">
          ${loading
          ? '<div class="loading"></div>'
          : `<h1>${this.state.title}</h1><h3>By ${this.state.author}</h3>`}
        </div>
      ${Footer()}  
      `;
  }

  fetchBooks() {
    fetch("https://www.booknomads.com/api/v0/isbn/9789029538237")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.state.loading = false;
        this.state.title = res.Title;
        this.state.author = res.Authors[0].Name;
        setTimeout(update, 500);
      })
  }

}

const app = new App();
app.fetchBooks();
document.getElementById('app').innerHTML = app.render();

function update() {
  console.log('update');
  document.getElementById('app').innerHTML = app.render();
}