import { useState } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";
import Modal from "../components/Modal";
import aerFoto from "../assets/img/boeing.jpg";
import InputSelect from "../components/InputSelect";
import InputTexto from "../components/InputTexto";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";
import { useModal } from "../hooks/useModal";

const mockAeronaves = [
  {
    id: 1,
    nome: "Aeronave 1",
    dados: ["Modelo: Boeing 737", "Tipo: Comercial", "Capacidade: 189", "Alcance: 300 Km"],
    etapas: ["Colocar mola", "Acoplar janelas"],
    pecas: ["Motor GE90", "Trem de pouso"],
    testes: ["Aerodinâmico: Aprovado", "Elétrico: Aprovado", "Hidráulico: Reprovado"],
  },
  {
    id: 2,
    nome: "Aeronave 2",
    dados: ["Modelo: Airbus A320", "Tipo: Militar", "Capacidade: 400", "Alcance: 400 Km"],
    etapas: ["Apresentar aeronave"],
    pecas: ["Motor CFM56", "APU GTCP331"],
    testes: ["Aerodinâmico: Aprovado"],
  },
  {
    id: 3,
    nome: "Aeronave 3",
    dados: ["Modelo: Embraer E195", "Tipo: Comercial", "Capacidade: 202", "Alcance: 500 Km"],
    etapas: [],
    pecas: ["Motor CF34"],
    testes: [],
  },
];

function Aeronaves() {
  const [busca, setBusca] = useState("");
  const [selecionada, setSelecionada] = useState(mockAeronaves[0]);
  const modalCriar = useModal();
  const modalEditar = useModal();
  const modalTestes = useModal();

  const aeronavesFiltradas = mockAeronaves.filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Nova Aeronave" onClose={modalCriar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto label="Modelo" placeholder="Ex: Aeronave 123" name="modelo" id="modelo" />
            <InputSelect label="Tipo" options={["Comercial", "Militar"]} name="tipo" id="tipo" />
            <InputTexto label="Capacidade" placeholder="Ex: 300" name="capacidade" id="capacidade" />
            <InputTexto label="Alcance" placeholder="Ex: 1089" name="alcance" id="alcance" />
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
        <Modal titulo="Editar Aeronave" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <InputTexto label="Modelo" placeholder="Ex: Aeronave 123" name="modeloEditar" id="modeloEditar" />
              <InputSelect label="Tipo" options={["Comercial", "Militar"]} name="tipoEditar" id="tipoEditar" />
              <InputTexto label="Capacidade" placeholder="Ex: 300" name="capacidadeEditar" id="capacidadeEditar" />
              <InputTexto label="Alcance" placeholder="Ex: 1089" name="alcanceEditar" id="alcanceEditar" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button onClick={modalEditar.fechar} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Salvar</button>
          </div>
        </Modal>
      )}

      {modalTestes.aberto && (
        <Modal titulo="Registrar Testes" onClose={modalTestes.fechar}>
          <div className="flex flex-col gap-4">
            <InputSelect label="Aerodinâmico" options={["Aprovado", "Reprovado"]} name="TesteAer" id="TesteAer" />
            <InputSelect label="Hidráulico" options={["Aprovado", "Reprovado"]} name="TesteHid" id="TesteHid" />
            <InputSelect label="Elétrico" options={["Aprovado", "Reprovado"]} name="TesteEle" id="TesteEle" />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button onClick={modalTestes.fechar} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">Salvar</button>
          </div>
        </Modal>
      )}

      <main className="max-w-6xl mx-auto p-6">
        <TituloPagina
          titulo="Aeronaves"
          paragrafo="Área dedicada à gestão e visualização das aeronaves da companhia."
          instrucoes="Selecione uma aeronave para ver os detalhes."
          imagem={aerFoto}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PesquisaCriar placeholder="Buscar Aeronave..." busca={busca} setBusca={setBusca} onCriar={modalCriar.abrir} />

            <Lista
              itens={aeronavesFiltradas}
              itemSelecionado={selecionada}
              onSelecionar={setSelecionada}
              extrairId={(aeronave) => aeronave.id}
              extrairTexto={(aeronave) => aeronave.nome}
              mensagemVazia="Nenhuma aeronave encontrada."
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

                <div className="flex flex-col gap-4 pb-6 border-b border-slate-100">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Etapas</p>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto custom-scrollbar bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {selecionada.etapas.length > 0 ? (
                        selecionada.etapas.map((etapa, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"></div>
                            <span className="text-xs text-slate-700 leading-relaxed">{etapa}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">Nenhuma etapa.</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Peças</p>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto custom-scrollbar bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {selecionada.pecas.length > 0 ? (
                        selecionada.pecas.map((peca, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"></div>
                            <span className="text-xs text-slate-700 leading-relaxed">{peca}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">Nenhuma peça.</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Testes</p>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto custom-scrollbar bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {selecionada.testes.length > 0 ? (
                        selecionada.testes.map((teste, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${teste.includes("Reprovado") ? "bg-red-400" : "bg-emerald-400"}`}></div>
                            <span className="text-xs text-slate-700 leading-relaxed">{teste}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">Nenhum teste.</span>
                      )}
                    </div>
                  </div>
                </div>

                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 mt-6 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm">
                  Gerar Relatório
                </button>

                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm"
                  onClick={modalTestes.abrir}>
                  Registrar Testes
                </button>

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

export default Aeronaves;
