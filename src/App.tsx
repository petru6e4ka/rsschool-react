import { Component } from 'react';
import Search from './components/Search/Search';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import { getAllPockemons, getPockemon } from './services/api/api';

import './App.css';

interface State {
  isLoading: boolean;
  error: null | {
    isError: boolean;
    status?: string;
  };
  items: string[];
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      items: [],
    };

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  getSearchResults(query: string) {
    this.setState({ isLoading: true, error: null, items: [] });

    if (query) {
      getPockemon(query).then((data) => {
        if (data.isError) {
          this.setState({
            items: [],
            error: data,
            isLoading: false,
          });

          return;
        }

        this.setState({ items: [data], error: null, isLoading: false });
      });

      return;
    }

    getAllPockemons().then((data) => {
      if (data.isError) {
        this.setState({
          items: [],
          error: data,
          isLoading: false,
        });

        return;
      }

      this.setState({ items: data.results, error: null, isLoading: false });
    });
  }

  render() {
    const { isLoading, error, items } = this.state;

    return (
      <>
        <header className="header">
          <div className="container">
            <Search onSearch={this.getSearchResults} />
          </div>
        </header>
        <main className="main">
          <div className="container">
            {isLoading && <Loader />}
            {error && <Error status={error.status} />}
            {items.length > 0 && 'Pockemons'}
          </div>
        </main>
      </>
    );
  }
}

export default App;
