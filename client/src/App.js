import React from "react";
import { Route } from "react-router-dom";
import './App.css';

import Landing from "./components/Landing/Landing.js";
import Nav from "./components/Nav/Nav.jsx";
import Countries from "./components/Countries/Countries.jsx";
import CountryDetail from "./components/CountryDetail/CountryDetail.js";
import Activities from "./components/Activities/Activities";


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/" component={Nav} />
      <Route exact path="/countries" component={Countries} />
      <Route path="/countries/:idCountry" component={CountryDetail} />
      <Route path="/activities" component={Activities} />
    </div>
  );
}

export default App;

// [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
// [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.