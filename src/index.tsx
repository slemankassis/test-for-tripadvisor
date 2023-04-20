import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={CharacterList} />
          <Route path="/characters/:id" component={CharacterDetail} />
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
