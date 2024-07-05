import { Component } from 'react';
import Search from './components/Search/Search';

import './App.css';

interface State {
  items: string[];
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      items: [],
    };

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  getSearchResults(query: string) {
    this.setState((prev) => ({
      items: [...prev.items, query],
    }));
    // makes a call to an api with the newly provided search term
    // (search term should not have any trailing spaces, process the input)
    // to get the results (only first page).
    // The provided search term should be saved to the LS, if the value exists overwrite it.

    // makes a call to the selected api
    // to get the list of the items with the search term from the input (only first page).
    // If the input is empty make a call to get all the items.
  }

  render() {
    return (
      <>
        <header className="header">
          <div className="container">
            <Search onSearch={this.getSearchResults} />
          </div>
        </header>
        <main className="main">
          <div className="container" />
        </main>
      </>
    );
  }
}

export default App;
