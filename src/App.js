import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topo from "./components/Topo";
import Home from "./components/Home";
import Frontend from "./components/Frontend";
import Programacao from "./components/Programacao";
import Design from "./components/Design";
import Catalogo from "./components/Catalogo";
import Rodape from "./components/Rodape";
import NotFound from "./components/NotFound";
import Livro from "./components/Livro";
import axios from "axios";

import "./index.css";

class App extends Component {
  state = {
    livros: [],
    pags: [],
  };

  async componentDidMount() {
    try {
       // axios no projeto busca apos public /api
       // data renomeado para livros
      const { data: livros } = await axios.get("/api/todosOsLivros.json");
      this.setState({ livros });
      const preco = { "slug": "preco", "marca":"12", "valor":"legado", "categoria":"frontend"};
      this.setState({ pags: preco });
    } catch (error) {
      //console.log(error);
      
      //var p = document.createElement("p");
      // p.className = 'erro' / p.setAttribute("class", "erro")
      //p.innerText = error;
      //p.innerHTML = '<span class="erro"></span>';
       
      document
        .querySelectorAll(".principal")[0]
        .insertAdjacentHTML(
          "beforeend",   
         "<p class='erro'>"+error+"</p>"
        ); //.appendChild(p);
    }
  }
  render() {
    return (
      <Router>
        <Topo />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home livros={this.state.livros} />}
          />
          <Route
            exact
            path="/frontend"
            render={() => <Frontend livros={this.state.livros} />}
          />
          <Route
            exact
            path="/programacao"
            render={() => <Programacao livros={this.state.livros} />}
          />
          <Route
            exact
            path="/design"
            render={() => <Design livros={this.state.livros} />}
          />
          <Route
            exact
            path="/catalogo"
            render={() => <Catalogo livros={this.state.livros} />}
          />
          <Route
            path="/livro/:livroSlug"
            render={(props) => {
              const livro = this.state.livros.find(  //nome qualquer/slug no obj
                (livro) => livro.slug === props.match.params.livroSlug  //do array = props.URL
              );
              if (livro) return <Livro livro={livro} />;
              else return <NotFound />;  //return para devolver 1a op da fç
            }}
          />
          <Route component={NotFound} />
        </Switch>
        <Rodape />
      </Router>
    );
  }
}

export default App;
