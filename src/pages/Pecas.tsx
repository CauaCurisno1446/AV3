import { useState, useEffect } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";

import { useModal } from "../hooks/useModal";
import api from "../utils/api";

import Modal from "../components/Modal";
import pecasFoto from "../assets/img/pecas.jpg";
import InputTexto from "../components/InputTexto";
import InputSelect from "../components/InputSelect";
import InputCheckBox from "../components/InputCheckBox";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";

type Peca = {
  id: number;
  nome: string;
  tipo: string;
  fornecedor: string;
  status: string;
};

function Pecas() {
  const [busca, setBusca] = useState("");
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [selecionada, setSelecionada] = useState<Peca | null>(null);
  const modalCriar = useModal();
  const modalEditar = useModal();

  // campos do modal criar
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Importada");
  const [fornecedor, setFornecedor] = useState("");
  const [status, setStatus] = useState("Pronta");

  // campos do modal editar
  const [nomeEditar, setNomeEditar] = useState("");
  const [tipoEditar, setTipoEditar] = useState("Importada");
  const [fornecedorEditar, setFornecedorEditar] = useState("");
  const [statusEditar, setStatusEditar] = useState("Pronta");

  useEffect(() => {
    api.get("/pecas").then((res) => {
      setPecas(res.data);
    });
  }, []);

  function abrirModalEditar() {
    if (!selecionada) return;
    setNomeEditar(selecionada.nome);
    setTipoEditar(selecionada.tipo);
    setFornecedorEditar(selecionada.fornecedor);
    setStatusEditar(selecionada.status);
    modalEditar.abrir();
  }

  async function handleCriar() {
    try {
      const res = await api.post("/pecas", { nome, tipo, fornecedor, status });
      setPecas((prev) => [...prev, res.data]);
      modalCriar.fechar();
      setNome("");
      setTipo("Importada");
      setFornecedor("");
      setStatus("Pronta");
    } catch (error) {
      console.error("Erro ao criar peça:", error);
    }
  }

  async function handleAtualizar() {
    if (!selecionada) return;
    try {
      const res = await api.put(`/pecas/${selecionada.id}`, {
        nome: nomeEditar,
        tipo: tipoEditar,
        fornecedor: fornecedorEditar,
        status: statusEditar,
      });
      setPecas((prev) => prev.map((p) => (p.id === selecionada.id ? res.data : p)));
      setSelecionada(res.data);
      modalEditar.fechar();
    } catch (error) {
      console.error("Erro ao atualizar peça:", error);
    }
  }

  async function handleDeletar(id: number) {
    try {
      await api.delete(`/pecas/${id}`);
      setPecas((prev) => prev.filter((p) => p.id !== id));
      setSelecionada(null);
    } catch (error) {
      console.error("Erro ao deletar peça:", error);
    }
  }

  const pecasFiltradas = pecas.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Nova Peça" onClose={modalCriar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Nome"
              placeholder="Ex: Peça 321"
              name="nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <InputSelect
              label="Tipo"
              options={["Importada", "Nacional"]}
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <InputTexto
              label="Fornecedor"
              placeholder="Ex: Embraer"
              name="fornecedor"
              id="fornecedor"
              value={fornecedor}
              onChange={(e) => setFornecedor(e.target.value)}
            />
            <InputSelect
              label="Status"
              options={["Pronta", "Em Trânsito", "Cancelada"]}
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <InputCheckBox label="Associar a Aeronave" options={[]} />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={modalCriar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleCriar}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {modalEditar.aberto && (
        <Modal titulo="Editar Peça" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Nome"
              placeholder="Ex: Peça 321"
              name="nomeEditar"
              id="nomeEditar"
              value={nomeEditar}
              onChange={(e) => setNomeEditar(e.target.value)}
            />
            <InputSelect
              label="Tipo"
              options={["Importada", "Nacional"]}
              name="tipoEditar"
              id="tipoEditar"
              value={tipoEditar}
              onChange={(e) => setTipoEditar(e.target.value)}
            />
            <InputTexto
              label="Fornecedor"
              placeholder="Ex: Embraer"
              name="fornecedorEditar"
              id="fornecedorEditar"
              value={fornecedorEditar}
              onChange={(e) => setFornecedorEditar(e.target.value)}
            />
            <InputSelect
              label="Status"
              options={["Pronta", "Em Trânsito", "Cancelada"]}
              name="statusEditar"
              id="statusEditar"
              value={statusEditar}
              onChange={(e) => setStatusEditar(e.target.value)}
            />
            <InputCheckBox label="Associar a Aeronave" options={[]} />
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
          titulo="Peças"
          paragrafo="Área dedicada à gestão e visualização das peças usadas nas aeronaves."
          instrucoes="Selecione uma peça para ver os detalhes."
          imagem={pecasFoto}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PesquisaCriar placeholder="Buscar peça..." busca={busca} setBusca={setBusca} onCriar={modalCriar.abrir} />
            <Lista
              itens={pecasFiltradas}
              itemSelecionado={selecionada}
              onSelecionar={setSelecionada}
              extrairId={(peca) => peca.id}
              extrairTexto={(peca) => `ID: ${peca.id} - ${peca.nome}`}
              mensagemVazia="Nenhuma peça encontrada."
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
                    `Tipo: ${selecionada.tipo}`,
                    `Fornecedor: ${selecionada.fornecedor}`,
                    `Status: ${selecionada.status}`,
                  ].map((dado, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      <span className="text-base text-slate-700 leading-relaxed">{dado}</span>
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
                <p className="text-sm text-slate-500">Selecione uma peça na lista para visualizar os detalhes aqui.</p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Pecas;
