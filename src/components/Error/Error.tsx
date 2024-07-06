import { Component } from 'react';

import * as cls from './Error.module.css';

interface Props {
  status?: string;
}

interface State {
  timerId: number;
  isShowing: boolean;
}

class Error extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      timerId: 0,
      isShowing: true,
    };

    this.closeSearch = this.closeSearch.bind(this);
  }

  componentDidMount(): void {
    const timerId = setTimeout(() => {
      this.setState({
        isShowing: false,
      });
    }, 3000);

    this.setState({ timerId });
  }

  componentWillUnmount(): void {
    const { timerId } = this.state;

    clearTimeout(timerId);
  }

  closeSearch() {
    this.setState({ isShowing: false });
  }

  render() {
    const { isShowing } = this.state;
    const { status } = this.props;

    return isShowing ? (
      <div className={cls.Error__container}>
        <h3>{status ? `Error: ${status}` : 'Something went wrong!'}</h3>
        <button
          className={cls.Error__btn}
          type="button"
          onClick={this.closeSearch}
        >
          +
        </button>
      </div>
    ) : null;
  }
}

Error.defaultProps = {
  status: '',
};

export default Error;
