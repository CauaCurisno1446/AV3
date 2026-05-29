import { useState, useEffect } from "react";
import { SquarePen, Shield, Phone, MapPin, Calendar, LogOut, RectangleEllipsis } from "lucide-react";
import Modal from "../components/Modal";
import InputSenha from "../components/InputSenha";
import InputTexto from "../components/InputTexto";
import { useModal } from "../hooks/useModal";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

interface UsuarioData {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  role: string;
  createdAt?: string;
}

function Usuario() {
  const { logout } = useAuth();
  const { sucesso, erro, info } = useToast();

  const [dados, setDados] = useState<UsuarioData | null>(null);
  const modalEditar = useModal();
  const modalSenha = useModal();
  const modalSair = useModal();

  const [nomeEditar, setNomeEditar] = useState("");
  const [endEditar, setEndEditar] = useState("");
  const [telEditar, setTelEditar] = useState("");
  const [errosEditar, setErrosEditar] = useState<Record<string, string>>({});

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errosSenha, setErrosSenha] = useState<Record<string, string>>({});

  useEffect(() => {
    buscarUsuario();
  }, []);

  async function buscarUsuario() {
    try {
      const response = await api.get("/funcionarios/perfil");
      setDados(response.data);
    } catch (error) {
      console.error(error);
      erro("Erro ao carregar perfil");
    }
  }

  function abrirModalEditar() {
    if (!dados) return;
    setNomeEditar(dados.nome);
    setEndEditar(dados.endereco);
    setTelEditar(dados.telefone);
    setErrosEditar({});
    modalEditar.abrir();
  }

  function validarEdicao() {
    const erros: Record<string, string> = {};
    if (!nomeEditar.trim()) erros.nome = "Nome é obrigatório";
    if (!endEditar.trim()) erros.endereco = "Endereço é obrigatório";
    if (!telEditar.trim()) erros.telefone = "Telefone é obrigatório";
    setErrosEditar(erros);
    return Object.keys(erros).length === 0;
  }

  async function handleSalvarEdicao() {
    if (!dados || !validarEdicao()) return;

    try {
      const response = await api.put(`/funcionarios/${dados.id}`, {
        nome: nomeEditar,
        endereco: endEditar,
        telefone: telEditar,
      });
      setDados(response.data);
      modalEditar.fechar();
      sucesso("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      erro("Erro ao atualizar perfil");
    }
  }

  function validarSenha() {
    const erros: Record<string, string> = {};
    if (!senhaAtual.trim()) erros.senhaAtual = "Informe a senha atual";
    if (!novaSenha.trim()) erros.novaSenha = "Informe a nova senha";
    else if (novaSenha.length < 6) erros.novaSenha = "Mínimo 6 caracteres";
    if (novaSenha !== confirmarSenha) erros.confirmar = "As senhas não coincidem";
    setErrosSenha(erros);
    return Object.keys(erros).length === 0;
  }

  async function handleAlterarSenha() {
    if (!dados || !validarSenha()) return;

    try {
      await api.put(`/funcionarios/${dados.id}`, { senha: novaSenha });
      modalSenha.fechar();
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      sucesso("Senha alterada com sucesso!");
    } catch (error) {
      console.error(error);
      erro("Erro ao alterar senha");
    }
  }

  if (!dados) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--fundo)]">
        <div className="w-8 h-8 border-4 border-[var(--azul-escuro)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const iniciais = dados.nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  const dataAdmissao = dados.createdAt ? new Date(dados.createdAt).toLocaleDateString("pt-BR") : "—";

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalEditar.aberto && (
        <Modal titulo="Editar Perfil" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <div>
              <InputTexto
                label="Nome"
                placeholder="Ex: João Silva"
                name="nomeEditar"
                id="nomeEditar"
                value={nomeEditar}
                onChange={(e) => setNomeEditar(e.target.value)}
              />
              {errosEditar.nome && <span className="text-xs text-red-500">{errosEditar.nome}</span>}
            </div>
            <div>
              <InputTexto
                label="Endereço"
                placeholder="Ex: Rua dos Astronautas"
                name="endEditar"
                id="endEditar"
                value={endEditar}
                onChange={(e) => setEndEditar(e.target.value)}
              />
              {errosEditar.endereco && <span className="text-xs text-red-500">{errosEditar.endereco}</span>}
            </div>
            <div>
              <InputTexto
                label="Telefone"
                placeholder="Ex: (12) 99999-9999"
                name="telEditar"
                id="telEditar"
                value={telEditar}
                onChange={(e) => setTelEditar(e.target.value)}
              />
              {errosEditar.telefone && <span className="text-xs text-red-500">{errosEditar.telefone}</span>}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={modalEditar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleSalvarEdicao}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {modalSenha.aberto && (
        <Modal titulo="Alterar Senha" onClose={modalSenha.fechar}>
          <div className="flex flex-col gap-4">
            <div>
              <InputSenha label="Senha Atual" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} />
              {errosSenha.senhaAtual && <span className="text-xs text-red-500">{errosSenha.senhaAtual}</span>}
            </div>
            <div>
              <InputSenha label="Nova Senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
              {errosSenha.novaSenha && <span className="text-xs text-red-500">{errosSenha.novaSenha}</span>}
            </div>
            <div>
              <InputSenha
                label="Confirmar Nova Senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {errosSenha.confirmar && <span className="text-xs text-red-500">{errosSenha.confirmar}</span>}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={modalSenha.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleAlterarSenha}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {modalSair.aberto && (
        <Modal titulo="Deseja sair?" onClose={modalSair.fechar}>
          <p className="text-sm text-slate-500 mb-2">Você será desconectado do sistema.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={modalSair.fechar}
              className="px-4 py-2 w-full text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={() => {
                info("Até logo!");
                logout();
              }}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] w-full hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Sair
            </button>
          </div>
        </Modal>
      )}

      <main className="max-w-6xl mx-auto p-6">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12 mt-4">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-[var(--azul-escuro)] flex items-center justify-center rounded-2xl shadow-md shrink-0">
            <span className="text-5xl md:text-6xl font-bold text-white select-none">{iniciais}</span>
          </div>
          <div className="w-full text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{dados.nome}</h1>
            <p className="text-lg text-slate-600 mb-6">
              {dados.role} • {dados.usuario}
            </p>
            <button
              onClick={abrirModalEditar}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[var(--azul-escuro)] text-white hover:bg-[var(--azul)] active:scale-95 transition-all cursor-pointer">
              <SquarePen size={18} />
              Editar Informações
            </button>
          </div>
        </section>

        <hr className="border-t-2 border-slate-200 mb-8" />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-slate-300 rounded-xl p-8 bg-white flex flex-col gap-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">
              Informações de Contato e Gerais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <p className="text-base text-slate-700 font-medium mt-1">{dataAdmissao}</p>
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
            <div className="px-4 py-2 rounded-full bg-indigo-50 text-[var(--azul)] text-sm font-semibold border border-indigo-100 w-full">
              {dados.role}
            </div>
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
