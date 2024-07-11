import { Component } from 'react';

interface Props {}

interface State {
  error: boolean;
}

class BugButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
    };

    this.onThrow = this.onThrow.bind(this);
  }

  componentDidUpdate(): void {
    const { error } = this.state;

    if (error) {
      throw new Error('TEST ERROR!');
    }
  }

  onThrow() {
    this.setState({
      error: true,
    });
  }

  render() {
    return (
      <button onClick={this.onThrow} type="button">
        Bug!
      </button>
    );
  }
}

export default BugButton;
