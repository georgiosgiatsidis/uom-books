import '../public/styles.css';
import App from './App';

const app = new App({ query: 'javascript' });
app.fetchBooks();
document.getElementById('app').innerHTML = app.render();
