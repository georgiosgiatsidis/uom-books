import Header from './Header';
import Footer from './Footer';
import styles from '../public/styles.css';

const App = () => (
  `<div>
    ${Header()}

    ${Footer()}
  </div>`
)
document.getElementById('app').innerHTML = App();
