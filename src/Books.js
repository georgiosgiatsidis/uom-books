import Component from './Component';
import Fetch from './Fetch';

export default class Books extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
    //   author: props.author,
    //   title: props.title,
    //   body: props.body,
    }
  }

  fetchBooks() {
    const fetch = new Fetch();
    return fetch.get();
  }

  render() {
    // document.componentRegistry[this._id].setBody();
    const { loading } = this.state;
    return loading
      ? 'loading...'
      : `books loaded...`;
  }
}

/*
          <textarea onchange="document.componentRegistry[${this._id}].setBody(this.value)">
            ${JSON.stringify(this.state)}
          </textarea>
*/