import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type RotaProtegidaProps = {
  children: React.ReactNode;
  rolesPermitidas?: string[];
};

function RotaProtegida({ children, rolesPermitidas }: RotaProtegidaProps) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--fundo)]">
        <div className="w-8 h-8 border-4 border-[var(--azul-escuro)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (rolesPermitidas && !rolesPermitidas.map(r => r.toUpperCase()).includes(usuario.role.toUpperCase())) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export default RotaProtegida;
