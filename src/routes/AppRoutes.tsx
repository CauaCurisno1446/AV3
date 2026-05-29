import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Aeronaves from "../pages/Aeronaves";
import Pecas from "../pages/Pecas";
import Funcionarios from "../pages/Funcionarios";
import Etapas from "../pages/Etapas";
import Usuario from "../pages/Usuario";
import RotaProtegida from "../components/RotaProtegida";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <RotaProtegida>
            <MainLayout />
          </RotaProtegida>
        }>
        <Route path="/home" element={<Home />} />
        <Route path="/aeronaves" element={<Aeronaves />} />
        <Route path="/pecas" element={<Pecas />} />

        <Route
          path="/etapas"
          element={
            <RotaProtegida rolesPermitidas={["Administrador", "Engenheiro"]}>
              <Etapas />
            </RotaProtegida>
          }
        />

        <Route
          path="/funcionarios"
          element={
            <RotaProtegida rolesPermitidas={["Administrador"]}>
              <Funcionarios />
            </RotaProtegida>
          }
        />

        <Route path="/usuario" element={<Usuario />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
