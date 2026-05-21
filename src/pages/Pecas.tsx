import { useState } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";
import Modal from "../components/Modal";
import pecasFoto from "../assets/img/pecas.jpg";
import InputTexto from "../components/InputTexto";
import InputSelect from "../components/InputSelect";
import InputCheckBox from "../components/InputCheckBox";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";
import { useModal } from "../hooks/useModal";

const mockPecas = [
  { id: 1, nome: "Peça 1", dados: ["Tipo: Importada", "Fornecedor: Embraer", "Status: Pronta"] },
  { id: 2, nome: "Peça 2", dados: ["Tipo: Importada", "Fornecedor: Akaer", "Status: Em Andamento"] },
  { id: 3, nome: "Peça 3", dados: ["Tipo: Nacional", "Fornecedor: Boeing", "Status: Cancelada"] },
];

const aeronaves = [
  { id: "aer1", label: "Aeronave 1" },
  { id: "aer2", label: "Aeronave 2" },
  { id: "aer3", label: "Aeronave 3" },
];

function Pecas() {
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState(mockPecas[0]);
  // const [modalCriar, setModalCriarAberto] = useState(false);
  // const [modalEditar, setModalEditarAberto] = useState(false);
  const modalCriar = useModal();
  const modalEditar = useModal();

  const pecasFiltradas = mockPecas.filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Nova Peça" onClose={modalCriar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto label="Nome" placeholder="Ex: Peça 321" name="nome" id="nome" />
            <InputSelect label="Tipo" options={["Importada", "Nacional"]} name="tipo" id="tipo" />
            <InputTexto label="Fornecedor" placeholder="Ex: Embraer" name="fornecedor" id="fornecedor" />
            <InputSelect label="Status" options={["Pronta", "Em Trânsito", "Cancelada"]} name="status" id="status" />
            <InputCheckBox label="Associar a Aeronave" options={aeronaves} />
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
        <Modal titulo="Editar Peça" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto label="Nome" placeholder="Ex: Peça 321" name="nomeEditar" id="nomeEditar" />
            <InputSelect label="Tipo" options={["Importada", "Nacional"]} name="tipoEditar" id="tipoEditar" />
            <InputTexto label="Fornecedor" placeholder="Ex: Embraer" name="fornecedorEditar" id="fornecedorEditar" />
            <InputSelect label="Status" options={["Pronta", "Em Trânsito", "Cancelada"]} name="statusEditar" id="statusEditar" />
            <InputCheckBox label="Associar a Aeronave" options={aeronaves} />
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
