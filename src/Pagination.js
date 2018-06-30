import Component from './Component';

export default class Pagination extends Component {
  constructor(props) {
    super();
    this.state = {
      startIndex: props.startIndex,
      totalPages: props.totalPages,
      that: props.that,
    };
  }

  build() {
    const current = this.state.startIndex;
    const last = this.state.totalPages;
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i += 1) {
      const a = i === 1 || i === last;
      const b = i >= left && i < right;
      if (a || b) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }

  render() {
    const { startIndex, totalPages, that } = this.state;
    return `
      ${this.build(startIndex, totalPages).map(page => `
        <span class="page" ${page !== '...' && `onclick="document.componentRegistry[${that}].handleChange(undefined, ${page - 1})"`}>
          ${page}
        </span>`).join('\n')}
    `;
  }
}
