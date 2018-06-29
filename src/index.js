import Books from './Books';
import Header from './Header';
import Footer from './Footer';
import Fetch from './Fetch';
import styles from '../public/styles.css';

const booksComponent = new Books({ title: 'title', author: 'author', body: 'body' });
booksComponent.setBody();
const fetch = new Fetch();
fetch.get();

const App = () => (
  `<div>
    ${Header()}
    <div id="book"></div>
    ${booksComponent.render()}
    ${Footer()}
  </div>`
)
document.getElementById('app').innerHTML = App();
