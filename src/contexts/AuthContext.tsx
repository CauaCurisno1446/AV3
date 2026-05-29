import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

type UsuarioLogado = {
  id: number;
  nome: string;
  usuario: string;
  role: string;
};

type AuthContextType = {
  usuario: UsuarioLogado | null;
  token: string | null;
  login: (usuario: string, senha: string) => Promise<void>;
  logout: () => void;
  carregando: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (tokenSalvo && usuarioSalvo) {
      setToken(tokenSalvo);
      setUsuario(JSON.parse(usuarioSalvo));
    }

    setCarregando(false);
  }, []);

  async function login(usuarioInput: string, senha: string) {
    const response = await api.post("/funcionarios/login", {
      usuario: usuarioInput,
      senha,
    });

    const { token, usuario } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    setToken(token);
    setUsuario(usuario);

    navigate("/home");
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
