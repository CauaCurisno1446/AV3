import { useState } from "react"
import { SquarePen, Trash2, MousePointerClick } from "lucide-react"
import etpFoto from "../assets/img/etapas.jpg"
import Modal from "../components/Modal"
import InputTexto from "../components/InputTexto"
import InputSelect from "../components/InputSelect"
import InputCheckBox from "../components/InputCheckBox"
import TituloPagina from "../components/TituloPagina"
import PesquisaCriar from "../components/PesquisaCriar"
import { Lista } from "../components/Lista"
import { useModal } from "../hooks/useModal"

const mockEtapas = [
  {
    id: 1,
    nome: "Colocar mola",
    dados: [
      "Prazo: 12/05/2026",
      "Status: Concluída",
      "Funcionários: Cauã | Davi",
      "Aeronave: Aeronave 1",
    ],
  },
  {
    id: 2,
    nome: "Acoplar janelas",
    dados: [
      "Prazo: 28/11/2026",
      "Status: Em Andamento",
      "Funcionários: Davi",
      "Aeronave: Aeronave 2",
    ],
  },
  {
    id: 3,
    nome: "Apresentar aeronave",
    dados: [
      "Prazo: 12/07/2027",
      "Status: Cancelada",
      "Funcionários: Davi | João",
      "Aeronave: Aeronave 3",
    ],
  },
]

const funcionarios = [
  { id: "func1", label: "Cauã" },
  { id: "func2", label: "Davi" },
  { id: "func3", label: "João" },
]

function Etapas() {
  const [busca, setBusca] = useState("")
  const [selecionada, setSelecionada] = useState(mockEtapas[0])
  // const [modalCriar, setModalCriarAberto] = useState(false);
  // const [modalEditar, setModalEditarAberto] = useState(false);
  const modalCriar = useModal()
  const modalEditar = useModal()

  const etapasFiltradas = mockEtapas.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Nova Etapa" onClose={modalCriar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Nome"
              placeholder="Ex: Etapa X"
              name="nome"
              id="nome"
            />
            <InputTexto
              label="Prazo"
              placeholder="Ex: 08/05/2026"
              name="prazo"
              id="prazo"
            />
            <InputSelect
              label="Status"
              options={["Concluída", "Em Andamento", "Cancelada"]}
              name="status"
              id="status"
            />
            <InputCheckBox label="Funcionários" options={funcionarios} />
            <InputSelect
              label="Aeronave"
              options={["Aeronave 1", "Aeronave 2", "Aeronave 3"]}
              name="aeronave"
              id="aeronave"
            />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={modalCriar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {modalEditar.aberto && (
        <Modal titulo="Editar Etapa" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Nome"
              placeholder="Ex: Etapa X"
              name="nomeEditar"
              id="nomeEditar"
            />
            <InputTexto
              label="Prazo"
              placeholder="Ex: 08/05/2026"
              name="prazoEditar"
              id="prazoEditar"
            />
            <InputSelect
              label="Status"
              options={["Concluída", "Cancelada"]}
              name="statusEditar"
              id="statusEditar"
            />
            <InputCheckBox label="Funcionários" options={funcionarios} />
            <InputSelect
              label="Aeronave"
              options={["Aeronave 1", "Aeronave 2", "Aeronave 3"]}
              name="aeronaveEditar"
              id="aeronaveEditar"
            />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={modalEditar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      <main className="max-w-6xl mx-auto p-6">
        <TituloPagina
          titulo="Etapas"
          paragrafo="Área dedicada à gestão e visualização das etapas de produção da companhia."
          instrucoes="Selecione uma etapa para ver os detalhes."
          imagem={etpFoto}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PesquisaCriar
              placeholder="Buscar etapa..."
              busca={busca}
              setBusca={setBusca}
              onCriar={modalCriar.abrir}
            />
            <Lista
              itens={etapasFiltradas}
              itemSelecionado={selecionada}
              onSelecionar={setSelecionada}
              extrairId={(etapa) => etapa.id}
              extrairTexto={(etapa) => etapa.nome}
              mensagemVazia="Nenhuma etapa encontrada."
            />
          </div>

          <aside className="lg:col-span-1 h-full">
            {selecionada ? (
              <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="pb-5 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
                    {selecionada.nome}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-2">
                    Detalhes do registro
                  </p>
                </div>
                <div className="py-6 flex-1 flex flex-col gap-4">
                  {selecionada.dados.map((dado, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      <span className="text-base text-slate-700 leading-relaxed">
                        {dado}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm">
                  Finalizar Etapa
                </button>
                <div className="pt-4 flex items-center gap-3 mt-auto">
                  <button
                    onClick={modalEditar.abrir}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm"
                  >
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
                <MousePointerClick
                  className="text-slate-300 mb-4"
                  size={32}
                  strokeWidth={1.5}
                />
                <p className="text-base font-semibold text-slate-600 mb-1">
                  Nenhum item selecionado
                </p>
                <p className="text-sm text-slate-500">
                  Selecione uma etapa na lista para visualizar os detalhes aqui.
                </p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  )
}

export default Etapas
