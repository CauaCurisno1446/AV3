import { useEffect, useState } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";
import funcFoto from "../assets/img/funcionarios.jpg";

import { useModal } from "../hooks/useModal";
import api from "../utils/api";

import Modal from "../components/Modal";
import InputTexto from "../components/InputTexto";
import InputSelect from "../components/InputSelect";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";
import InputSenha from "../components/InputSenha";

type Funcionario = {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  role?: string;
  etapas: [];
  senha?: string;
};

function Funcionarios() {
  const [busca, setBusca] = useState("");
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selecionada, setSelecionada] = useState<Funcionario | null>(null);

  const modalCriar = useModal();
  const modalEditar = useModal();

  // campos do modal criar
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [usuario, setUsuario] = useState("");
  const [role, setRole] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [usuarioDisponivel, setUsuarioDisponivel] = useState(true);
  const [telefoneDisponivel, setTelefoneDisponivel] = useState(true);

  // campos do modal editar
  const [nomeEditar, setNomeEditar] = useState("");
  const [telefoneEditar, setTelefoneEditar] = useState("");
  const [enderecoEditar, setEnderecoEditar] = useState("");
  const [usuarioEditar, setUsuarioEditar] = useState("");
  const [roleEditar, setRoleEditar] = useState("");

  useEffect(() => {
    api.get("/funcionarios").then((res) => {
      setFuncionarios(res.data);
    });
  }, []);

  useEffect(() => {
    if (!usuario) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await api.post("/funcionarios/validar", {
          usuario,
        });

        setUsuarioDisponivel(res.data.usuarioDisponivel);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [usuario]);

  useEffect(() => {
    if (!telefone) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await api.post("/funcionarios/validar", {
          telefone,
        });

        setTelefoneDisponivel(res.data.telefoneDisponivel);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [telefone]);

  function abrirModalEditar() {
    if (!selecionada) return;
    setNomeEditar(selecionada.nome);
    setTelefoneEditar(selecionada.telefone);
    setEnderecoEditar(selecionada.endereco);
    setUsuarioEditar(selecionada.usuario);
    setRoleEditar(selecionada.role || "");
    modalEditar.abrir();
  }

  async function handleCriar() {
    try {
      const res = await api.post("/funcionarios", { nome, telefone, endereco, usuario, role, senha, etapas: [] });
      setFuncionarios((prev) => [...prev, res.data]);
      modalCriar.fechar();
      setNome("");
      setTelefone("");
      setEndereco("");
      setUsuario("");
      setRole("");
      setSenha("");
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
    }
  }

  async function handleAtualizar() {
    if (!selecionada) return;
    try {
      const res = await api.put(`/funcionarios/${selecionada.id}`, {
        nome: nomeEditar,
        telefone: telefoneEditar,
        endereco: enderecoEditar,
        usuario: usuarioEditar,
        role: roleEditar,
      });
      setFuncionarios((prev) => prev.map((f) => (f.id === selecionada.id ? res.data : f)));
      setSelecionada(res.data);
      modalEditar.fechar();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  }

  async function handleDeletar(id: number) {
    try {
      await api.delete(`/funcionarios/${id}`);
      setFuncionarios((prev) => prev.filter((f) => f.id !== id));
      setSelecionada(null);
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  }

  const funcionariosFiltrados = funcionarios.filter((f) => f.nome.toLowerCase().includes(busca.toLowerCase()));
  const senhasNaoBatem = confirmar && senha !== confirmar;

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Novo Funcionário" onClose={modalCriar.fechar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCriar();
            }}>
            <div className="flex flex-col gap-4">
              <InputTexto
                label="Nome"
                placeholder="Ex: Kauan"
                name="nome"
                id="nome"
                required={true}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputTexto
                label="Telefone"
                placeholder="Ex: (11) 111111111"
                name="telefone"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required={true}
              />

              {!telefoneDisponivel && <p className="text-red-500 text-sm">Telefone já cadastrado.</p>}

              <InputTexto
                label="Endereço"
                placeholder="Ex: Rua dos Astronautas"
                name="endereco"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required={true}
              />
              <InputTexto
                label="Usuário"
                placeholder="Ex: Usuario1@"
                name="usuario"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required={true}
              />

              {!usuarioDisponivel && <p className="text-red-500 text-sm">Usuário já existe.</p>}

              <InputSenha
                label="Senha"
                placeholder="Insira a senha"
                name="senha"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required={true}
              />
              <InputSenha
                label="Repita a senha"
                placeholder="Insira a senha"
                name="senhaRepetir"
                id="senhaRepetir"
                required={true}
                onChange={(e) => setConfirmar(e.target.value)}
              />

              {senhasNaoBatem && <p className="text-red-500 text-sm">As senhas não coincidem.</p>}

              <InputSelect
                label="Cargo"
                options={["Administrador", "Engenheiro", "Operador"]}
                name="cargo"
                id="cargo"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={modalCriar.fechar}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
                Salvar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {modalEditar.aberto && (
        <Modal titulo="Editar Funcionário" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Nome"
              placeholder="Ex: Kauan"
              name="nomeEditar"
              id="nomeEditar"
              value={nomeEditar}
              onChange={(e) => setNomeEditar(e.target.value)}
            />
            <InputTexto
              label="Telefone"
              placeholder="Ex: (11) 111111111"
              name="telefoneEditar"
              id="telefoneEditar"
              value={telefoneEditar}
              onChange={(e) => setTelefoneEditar(e.target.value)}
            />
            <InputTexto
              label="Endereço"
              placeholder="Ex: Rua dos Astronautas"
              name="enderecoEditar"
              id="enderecoEditar"
              value={enderecoEditar}
              onChange={(e) => setEnderecoEditar(e.target.value)}
            />
            <InputSelect
              label="Cargo"
              options={["Administrador", "Engenheiro", "Operador"]}
              name="roleEditar"
              id="roleEditar"
              value={roleEditar}
              onChange={(e) => setRoleEditar(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={modalEditar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleAtualizar}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      <main className="max-w-6xl mx-auto p-6">
        <TituloPagina
          titulo="Funcionários"
          paragrafo="Área dedicada à gestão e visualização dos funcionários da companhia."
          instrucoes="Selecione um(a) funcionário(a) para ver os detalhes."
          imagem={funcFoto}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PesquisaCriar
              placeholder="Buscar funcionário..."
              busca={busca}
              setBusca={setBusca}
              onCriar={modalCriar.abrir}
            />
            <Lista
              itens={funcionariosFiltrados}
              itemSelecionado={selecionada}
              onSelecionar={setSelecionada}
              extrairId={(func) => func.id}
              extrairTexto={(func) => func.nome}
              mensagemVazia="Nenhum funcionário encontrado."
            />
          </div>

          <aside className="lg:col-span-1 h-full">
            {selecionada ? (
              <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="pb-5 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{selecionada.nome}</h2>
                  <p className="text-sm font-medium text-slate-500 mt-2">Detalhes do registro</p>
                </div>
                <div className="py-6 flex-1 flex flex-col gap-4">
                  {[
                    { label: "Nome", valor: selecionada.nome },
                    { label: "Telefone", valor: selecionada.telefone },
                    { label: "Endereço", valor: selecionada.endereco },
                    { label: "Usuário", valor: selecionada.usuario },
                    { label: "Cargo", valor: selecionada.role },
                    { label: "Senha", valor: selecionada.senha },
                  ].map(({ label, valor }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                        {label}
                      </span>
                      <span className="text-sm font-medium text-slate-700">{valor}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex items-center gap-3 mt-auto">
                  <button
                    onClick={abrirModalEditar}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm">
                    <SquarePen size={18} strokeWidth={2.5} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletar(selecionada.id)}
                    className="flex items-center justify-center w-11 h-11 text-slate-400 bg-transparent hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer shrink-0">
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-transparent border border-transparent">
                <MousePointerClick className="text-slate-300 mb-4" size={32} strokeWidth={1.5} />
                <p className="text-base font-semibold text-slate-600 mb-1">Nenhum item selecionado</p>
                <p className="text-sm text-slate-500">
                  Selecione um funcionário na lista para visualizar os detalhes aqui.
                </p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Funcionarios;
