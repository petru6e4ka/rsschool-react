import { ChangeEvent, Component } from 'react';
import { queryStorage } from '../../utils/localStorage/localStorage';

import * as cls from './Search.module.css';

interface State {
  query: string;
}

interface Props {
  onSearch: (query: string) => void;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount(): void {
    const { onSearch } = this.props;
    const { query } = this.state;

    const search = queryStorage.get();

    if (search) {
      this.setState({
        query: search,
      });
    }

    onSearch(query);
  }

  getSearchResults() {
    const { onSearch } = this.props;
    const { query } = this.state;
    const toSearch = query.trim();

    queryStorage.set(toSearch);
    onSearch(toSearch);
  }

  updateSearch(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
  }

  render() {
    const { query } = this.state;

    return (
      <div className={cls.Search}>
        <input
          className={cls.Search__input}
          type="text"
          name="search"
          id="search"
          value={query}
          onChange={this.updateSearch}
        />
        <button
          className={cls.Search__button}
          type="button"
          onClick={this.getSearchResults}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
