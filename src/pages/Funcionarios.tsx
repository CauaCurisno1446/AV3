import { useState } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";
import funcFoto from "../assets/img/funcionarios.jpg";
import Modal from "../components/Modal";
import InputTexto from "../components/InputTexto";
import InputSelect from "../components/InputSelect";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";
import InputSenha from "../components/InputSenha";
import { useModal } from "../hooks/useModal";

const mockFuncionarios = [
  { id: 1, nome: "Cauã", dados: ["Telefone: 12 1234567890", "Endereço: Rua das Flores", "Usuário: caua@", "Cargo: Administrador"] },
  { id: 2, nome: "Davi", dados: ["Telefone: 12 0987654321", "Endereço: Rua dos Carros", "Usuário: davi@", "Cargo: Engenheiro"] },
  { id: 3, nome: "João", dados: ["Telefone: 12 1357908642", "Endereço: Rua dos Animais", "Usuário: joao@", "Cargo: Operário"] },
];

function Funcionarios() {
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState(mockFuncionarios[0]);
  // const [modalCriar, setModalCriarAberto] = useState(false);
  // const [modalEditar, setModalEditarAberto] = useState(false);
  const modalCriar = useModal();
  const modalEditar = useModal();

  const funcFiltrados = mockFuncionarios.filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Novo Funcionário" onClose={modalCriar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto label="Nome" placeholder="Ex: Kauan" name="nome" id="nome" />
            <InputTexto label="Telefone" placeholder="Ex: (11) 111111111" name="telefone" id="telefone" />
            <InputTexto label="Endereço" placeholder="Ex: Rua dos Astronautas" name="endereco" id="endereco" />
            <InputTexto label="Usuário" placeholder="Ex: Usuario1@" name="usuario" id="usuario" />
            <InputSenha label="Senha" placeholder="Insira a senha" name="senha" id="senha" />
            <InputSenha label="Repita a senha" placeholder="Insira a senha" name="senhaRepetir" id="senhaRepetir" />
            <InputSelect label="Cargo" options={["Administrador", "Engenheiro", "Operador"]} name="cargo" id="cargo" />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button onClick={modalCriar.fechar} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Salvar</button>
          </div>
        </Modal>
      )}

      {modalEditar.aberto && (
        <Modal titulo="Editar Funcionário" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto label="Nome" placeholder="Ex: Kauan" name="nomeEditar" id="nomeEditar" />
            <InputTexto label="Telefone" placeholder="Ex: (11) 111111111" name="telefoneEditar" id="telefoneEditar" />
            <InputTexto label="Endereço" placeholder="Ex: Rua dos Astronautas" name="enderecoEditar" id="enderecoEditar" />
            <InputSelect label="Cargo" options={["Administrador", "Engenheiro", "Operador"]} name="cargoEditar" id="cargoEditar" />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button onClick={modalEditar.fechar} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Salvar</button>
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
            <PesquisaCriar placeholder="Buscar funcionário..." busca={busca} setBusca={setBusca} onCriar={modalCriar.abrir} />
            <Lista
              itens={funcFiltrados}
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
                  {selecionada.dados.map((dado, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      <span className="text-base text-slate-700 leading-relaxed">{dado}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex items-center gap-3 mt-auto">
                  <button
                    onClick={modalEditar.abrir}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm">
                    <SquarePen size={18} strokeWidth={2.5} />
                    Editar
                  </button>
                  <button className="flex items-center justify-center w-11 h-11 text-slate-400 bg-transparent hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer shrink-0">
                    <Trash2 size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-transparent border border-transparent">
                <MousePointerClick className="text-slate-300 mb-4" size={32} strokeWidth={1.5} />
                <p className="text-base font-semibold text-slate-600 mb-1">Nenhum item selecionado</p>
                <p className="text-sm text-slate-500">Selecione um funcionário na lista para visualizar os detalhes aqui.</p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Funcionarios;
