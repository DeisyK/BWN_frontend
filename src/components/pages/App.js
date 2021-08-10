import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import { isExpired, decodeToken } from "react-jwt";
import RecuperarPw from "./RecuperarPw";
import Registro from "./Registro";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./Inicio";
import Barra from "./Barra";
import toke from "../../assets/token";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [token, setToken] = useState(null);
  const [editar, setEditar] = useState(undefined);
  const [usuario, setUsuario] = useState(undefined);
  const [errores, setErrores] = useState(undefined);
  const myDecodedToken = decodeToken(toke.getToken());
  const isMyTokenExpired = isExpired(toke.getToken());

  const init = async () => {
    if (!isMyTokenExpired && myDecodedToken) {
      setUsuario(myDecodedToken);
    } else {
      setToken(null);
      setUsuario(undefined);
      toke.removeToken();
    }
  };

  useEffect(() => {
    init();
  }, []);

  const Rutas = () => (
    <div>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route path="/login">
          <Login
            token={token}
            setToken={setToken}
            usuario={usuario}
            setUsuario={setUsuario}
          />
        </Route>

        <Route path="/RecuperarPw">
          <RecuperarPw />
        </Route>
        <Route path="/Registro">
          <Registro />
        </Route>
        <PrivateRoute
          editar={editar}
          setEditar={setEditar}
          setToken={setToken}
          usuario={usuario}
          setUsuario={setUsuario}
        />
      </Switch>
    </div>
  );

  useEffect(() => {
    init();
  }, [token]);

  return (
    <Barra
      rutas={Rutas}
      usuario={usuario}
      setUsuario={setUsuario}
      token={token}
      setToken={setToken}
      errores={errores}
      setErrores={setErrores}
      editar={editar}
      setEditar={setEditar}
    />
  );
};
export default App;
