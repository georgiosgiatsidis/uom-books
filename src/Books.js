import Component from './Component';

export default class Books extends Component {
  constructor(props) {
    super();
    this.state = {
      author: props.author,
      title: props.title,
      body: props.body,
    }
  }

  setBody() {
    console.log('hi');
  }

  render() {
    document.componentRegistry[this._id].setBody();

    return `<div class="post">
              <h1>${this.state.title}</h1>
              <h3>By ${this.state.author}</h3>
              <p>${this.state.body}</p>
            </div>`;
  }
}
