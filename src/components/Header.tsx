import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { usuario } = useAuth();

  const role = (usuario?.role ?? "").toUpperCase();

  const podeVerFuncionarios = role === "ADMIN" || role === "ADMINISTRADOR";
  const podeVerEtapas = podeVerFuncionarios || role === "ENGENHEIRO";

  return (
    <>
      <header className="relative grid grid-cols-[1fr_auto_1fr] w-full items-center h-[72px] px-4 sm:px-8 bg-[var(--azul-escuro)]/95 backdrop-blur-md border-b border-blue-500/15 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 pointer-events-none" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[400px] h-20 bg-blue-500/8 blur-2xl rounded-full pointer-events-none" />

        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/aeronaves">Aeronaves</NavItem>
          <Divider />
          <NavItem to="/pecas">Peças</NavItem>
          {podeVerEtapas && (
            <>
              <Divider />
              <NavItem to="/etapas">Etapas</NavItem>
            </>
          )}
        </nav>

        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-blue-500/25 bg-blue-500/6 text-white hover:bg-blue-500/15 hover:border-blue-500/50 transition-all duration-250"
          onClick={() => setMenuAberto((v) => !v)}
        >
          {menuAberto ? <X size={16} /> : <Menu size={16} />}
        </button>

        <NavLink
          to="/home"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg hover:bg-blue-500/transition-all duration-250"
        >
          <Logo />
        </NavLink>

        <nav className="hidden md:flex items-center justify-end gap-1">
          {podeVerFuncionarios && (
            <NavItem to="/funcionarios">Funcionários</NavItem>
          )}

          <NavItem to="/usuario">
            <button className="ml-2 flex items-center justify-center w-9 h-9 rounded-lg border border-blue-500/25 bg-blue-500/6 text-white cursor-pointer hover:bg-blue-500/15 hover:border-blue-500/50 hover:text-white transition-all duration-250">
              <User size={16} />
            </button>
          </NavItem>
        </nav>

        <div className="md:hidden flex items-center justify-end gap-2">
          <NavLink
            to="/usuario"
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-blue-500/25 bg-blue-500/6 text-white hover:bg-blue-500/15 hover:border-blue-500/50 transition-all duration-250"
          >
            <User size={16} />
          </NavLink>
        </div>
      </header>

      {menuAberto && (
        <div className="md:hidden flex flex-col bg-[var(--azul-escuro)]/98 border-b border-blue-500/15 px-4 py-3 gap-1">
          <NavItem to="/aeronaves">Aeronaves</NavItem>
          <NavItem to="/pecas">Peças</NavItem>
          {podeVerEtapas && <NavItem to="/etapas">Etapas</NavItem>}
          {podeVerFuncionarios && <NavItem to="/funcionarios">Funcionários</NavItem>}
        </div>
      )}
    </>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3.5 py-1.5 rounded-md text-[11px] font-semibold tracking-widest uppercase font-[Rajdhani,sans-serif] transition-all duration-250 group ${isActive ? "text-blue-400" : "text-white hover:text-white hover:bg-blue-500/8"} `
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={`absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] rounded-full bg-blue-400 transition-transform duration-250 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
          />
        </>
      )}
    </NavLink>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-blue-500/20 mx-1" />;
}

export default Header;
