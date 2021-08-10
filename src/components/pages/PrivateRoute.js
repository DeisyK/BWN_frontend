import { Route, Redirect } from "react-router-dom";
import Miperfil from "./Miperfil";
import EditarPerfil from "./EditarPerfil";
import Contactos from "./Contactos";
import Categorias from "./Categorias";
import DetalleContacto from "./DetalleContacto";
import AgregarCategoria from "./AgregarCategoria";
import DetalleCategoria from "./DetalleCategoria";
import CambiarPassword from "./CambiarPassword";
import Registro from "./Registro";
import token from "../../assets/token";

const PrivateRoute = (props) => {
  if (token.getToken() || props.usuario) {
    return (
      <>
        <Route path="/perfil/password">
          <CambiarPassword
            setToken={props.setToken}
            setUsuario={props.setUsuario}
          />
        </Route>
        {props.usuario && props.usuario.actividad !== 0 ? (
          <>
            <Route path="/perfil/editar">
              <Registro
                editar={props.editar}
                setEditar={props.setEditar}
                setToken={props.setToken}
                usuario={props.usuario}
                setUsuario={props.setUsuario}
              />
            </Route>
            <Route path="/Miperfil">
              <Miperfil />
            </Route>
            <Route path="/EditarPerfil/:id">
              <EditarPerfil
                editar={props.editar}
                setEditar={props.setEditar}
                token={props.token}
              ></EditarPerfil>
            </Route>
            <Route path="/crear-contacto">
              <EditarPerfil />
            </Route>
            <Route path="/:id/detalle-contacto">
              <DetalleContacto
                editar={props.editar}
                setEditar={props.setEditar}
              />
            </Route>
            <Route path="/Contactos">
              <Contactos
                editar={props.editar}
                setEditar={props.setEditar}
                token={props.token}
              />
            </Route>
            <Route path="/Categorias">
              <Categorias editar={props.editar} setEditar={props.setEditar} />
            </Route>
            <Route path="/categoria/agregar">
              <AgregarCategoria />
            </Route>
            <Route path="/categoria/:id/editar">
              <AgregarCategoria
                editar={props.editar}
                setEditar={props.setEditar}
              />
            </Route>
            <Route path="/categoria/:id/detalle">
              <DetalleCategoria
                editar={props.editar}
                setEditar={props.setEditar}
              />
            </Route>
          </>
        ) : (
          <Redirect to="/perfil/password" />
        )}
      </>
    );
  } else {
    return <Redirect to={"/login"} />;
  }
};

export default PrivateRoute;
