import { useState } from "react";

import Aviao from "../assets/img/aviao.png";

import LogoDark from "../components/LogoDark";
import InputTexto from "../components/InputTexto";
import InputSenha from "../components/InputSenha";

import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

function Login() {
  const { login } = useAuth();
  const { erro } = useToast();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<{ usuario?: string; senha?: string }>({});

  function validar() {
    const novosErros: { usuario?: string; senha?: string } = {};

    if (!usuario.trim()) {
      novosErros.usuario = "Informe o usuário";
    }

    if (!senha.trim()) {
      novosErros.senha = "Informe a senha";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!validar()) return;

    setCarregando(true);

    try {
      await login(usuario, senha);
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.error || "Usuário ou senha inválidos";
      erro(mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr]">
      <div className="w-full h-full grid grid-rows-[auto_1fr] py-8 px-6 md:px-0">
        <div className="flex items-center justify-start md:ml-20 mb-6 md:mb-0">
          <LogoDark size={200} />
        </div>

        <div className="flex flex-col justify-center items-start md:ml-20 gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Olá, <br /> Bem-vindo de volta!
            </h1>

            <p className="text-gray-500 text-sm md:text-base">
              Faça login para continuar
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <InputTexto
                label="Usuário"
                placeholder="Insira o usuário"
                name="usuario"
                id="usuario"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  if (erros.usuario) setErros((p) => ({ ...p, usuario: undefined }));
                }}
              />
              {erros.usuario && (
                <span className="text-xs text-red-500 mt-0.5">{erros.usuario}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <InputSenha
                label="Senha"
                placeholder="Insira a senha"
                name="senha"
                id="senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (erros.senha) setErros((p) => ({ ...p, senha: undefined }));
                }}
              />
              {erros.senha && (
                <span className="text-xs text-red-500 mt-0.5">{erros.senha}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="bg-[var(--azul-escuro)] hover:bg-[var(--azul)] h-[50px] rounded-[10px] text-[var(--branco)] duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {carregando ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-full h-full items-center justify-center">
        <div
          style={{ backgroundImage: `url(${Aviao})` }}
          className="w-[80%] h-[90%] rounded-[40px] bg-cover bg-center"
        />
      </div>
    </section>
  );
}

export default Login;
