import { useState } from "react";
import { SquarePen, Shield, Mail, Phone, MapPin, Calendar, LogOut, RectangleEllipsis } from "lucide-react";
import Modal from "../components/Modal";
import { NavLink } from "react-router-dom";
import InputSenha from "../components/InputSenha";
import InputTexto from "../components/InputTexto";
import { useModal } from "../hooks/useModal";

const mockUsuario = {
  nome: "Cauã Cursino",
  email: "caua.cursino@email.com",
  telefone: "(11) 99842-3310",
  endereco: "Rua das Flores",
  usuario: "caua@",
  companhia: "Aviação 123",
  dataAdmissao: "12/03/2021",
  cargo: "Administrador",
  avatar: "CC",
};

function Usuario() {
  // const [modalAberto, setModalAberto] = useState(false);
  // const [modalSenha, setModalSenhaAberto] = useState(false);
  // const [modalSair, setModalSairAberto] = useState(false);
  const [dados] = useState(mockUsuario);
  const modalEditar = useModal();
  const modalSenha = useModal();
  const modalSair = useModal();

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalEditar.aberto && (
        <Modal titulo="Editar Perfil" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto label="Nome" placeholder="Ex: Kauan" name="nomeEditar" id="nomeEditar" />
            <InputTexto label="E-mail" placeholder="Ex: caua@email.com" name="emailEditar" id="emailEditar" />
            <InputTexto label="Endereço" placeholder="Ex: Rua dos Astronautas" name="endEditar" id="endEditar" />
            <InputTexto label="Telefone" placeholder="Ex: (12) 1212121212" name="telEditar" id="telEditar" />
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button onClick={modalEditar.fechar} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Salvar</button>
          </div>
        </Modal>
      )}

      {modalSenha.aberto && (
        <Modal titulo="Alterar Senha" onClose={modalSenha.fechar}>
          <div className="flex flex-col gap-4">
            <InputSenha label="Senha Atual:" />
            <InputSenha label="Nova Senha:" />
            <InputSenha label="Repita a Nova Senha:" />
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button onClick={modalSenha.fechar} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Salvar</button>
          </div>
        </Modal>
      )}

      {modalSair.aberto && (
        <Modal titulo="Deseja sair?" onClose={modalSair.fechar}>
          <div className="flex flex-col gap-4">
            <NavLink to="/home">
              <button className="px-4 py-2 w-full text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">Cancelar</button>
            </NavLink>

            <NavLink to="/">
              <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] w-full hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Sair</button>
            </NavLink>
          </div>
        </Modal>
      )}

      <main className="max-w-6xl mx-auto p-6">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12 mt-4">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-[var(--azul-escuro)] flex items-center justify-center rounded-2xl shadow-md shrink-0">
            <span className="text-5xl md:text-6xl font-bold text-white select-none">{dados.avatar}</span>
          </div>
          <div className="w-full text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{dados.nome}</h1>
            <p className="text-lg text-slate-600 mb-6">
              {dados.cargo} na <span className="text-[var(--azul)] font-semibold">{dados.companhia}</span> • {dados.usuario}
            </p>
            <button
              onClick={modalEditar.abrir}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[var(--azul-escuro)] text-white hover:bg-[var(--azul)] active:scale-95 transition-all cursor-pointer">
              <SquarePen size={18} />
              Editar Informações
            </button>
          </div>
        </section>

        <hr className="border-t-2 border-slate-200 mb-8" />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-slate-300 rounded-xl p-8 bg-white flex flex-col gap-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Informações de Contato e Gerais</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3 items-start">
                <Mail className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">E-mail</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{dados.email}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Telefone</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{dados.telefone}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Endereço</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{dados.endereco}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Calendar className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Data de Admissão</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{dados.dataAdmissao}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <button
                onClick={modalSenha.abrir}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-white text-[var(--azul-escuro)] hover:bg-[var(--azul-escuro)] hover:text-white border active:scale-95 transition-all cursor-pointer">
                <RectangleEllipsis size={18} />
                Alterar Senha
              </button>
            </div>
          </div>

          <aside className="lg:col-span-1 border border-slate-300 rounded-xl p-8 bg-white flex flex-col items-center justify-center text-center shadow-sm h-full">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex justify-center items-center mb-6">
              <Shield className="text-[var(--azul-escuro)]" size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Acesso Corporativo</h3>
            <p className="text-sm text-slate-500 mb-6">Nível de permissão e cargo registrados no sistema.</p>
            <div className="px-4 py-2 rounded-full bg-indigo-50 text-[var(--azul)] text-sm font-semibold border border-indigo-100 w-full">{dados.cargo}</div>
          </aside>
        </section>

        <br />

        <button
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[var(--azul-escuro)] text-white hover:bg-[var(--azul)] active:scale-95 transition-all cursor-pointer"
          onClick={modalSair.abrir}>
          <LogOut size={18} />
          Sair
        </button>
      </main>
    </div>
  );
}

export default Usuario;
