"use client";

import { NavLink } from "react-router-dom";
import Aviao from "../assets/img/aviao.png";
import LogoDark from "../components/LogoDark";
import InputTexto from "../components/InputTexto";
import InputSenha from "../components/InputSenha";

function Login() {
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
              Acesse sua conta para gerenciar suas informações, <br className="hidden md:block" />
              acompanhar operações e manter tudo sob controle de forma simples e segura.
            </p>
          </div>

          <br />

          <div className="flex flex-col gap-4 w-full">
            <InputTexto label="Usuário" placeholder="Insira o usuário" name="usuario" id="usuario" />
            <InputSenha label="Senha" placeholder="Insira a senha" name="senha" id="senha" />
            {/* <input type="text" placeholder="Usuário..." className={StyleInput} />
            <input type="password" placeholder="Senha..." className={StyleInput} /> */}

            <NavLink to="/home" className="w-1/4">
              <input
                type="submit"
                value="Entrar"
                className="bg-[var(--azul-escuro)] hover:bg-[var(--azul)] flex items-center justify-center h-[50px] w-full sm:w-1/3 md:w-1 lg:w-full rounded-[10px] text-[var(--branco)] duration-200 cursor-pointer"
              />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full h-full items-center justify-center">
        <div style={{ backgroundImage: `url(${Aviao})` }} className="w-[80%] h-[90%] rounded-[40px] bg-cover bg-center" />
      </div>
    </section>
  );
}

export default Login;
