import { useEffect, useState } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";

import { useModal } from "../hooks/useModal";
import api from "../utils/api";

import Modal from "../components/Modal";
import aerFoto from "../assets/img/boeing.jpg";
import InputSelect from "../components/InputSelect";
import InputTexto from "../components/InputTexto";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";

type Etapa = {
  id: number;
  nome: string;
};

type Peca = {
  id: number;
  nome: string;
};

type Teste = {
  id: number;
  aerodinamico: string;
  eletrico: string;
  hidraulico: string;
};

type Aeronave = {
  id: number;
  modelo: string;
  capacidade: string;
  alcance: string;
  etapas: Etapa[];
  pecas: Peca[];
  testes: Teste[];
};

function Aeronaves() {
  const [busca, setBusca] = useState("");
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [selecionada, setSelecionada] = useState<Aeronave | null>(null);
  const modalCriar = useModal();
  const modalEditar = useModal();
  const modalTestes = useModal();

  // campos do modal criar
  const [modelo, setModelo] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [alcance, setAlcance] = useState("");

  // campos do modal editar
  const [modeloEditar, setModeloEditar] = useState("");
  const [capacidadeEditar, setCapacidadeEditar] = useState("");
  const [alcanceEditar, setAlcanceEditar] = useState("");

  // campos do modal testes
  const [testeAer, setTesteAer] = useState("Reprovado");
  const [testeHid, setTesteHid] = useState("Reprovado");
  const [testeEle, setTesteEle] = useState("Reprovado");

  useEffect(() => {
    api.get("/aeronaves").then((res) => {
      setAeronaves(res.data);
    });
  }, []);

  function abrirModalEditar() {
    if (!selecionada) return;
    setModeloEditar(selecionada.modelo);
    setCapacidadeEditar(selecionada.capacidade);
    setAlcanceEditar(selecionada.alcance);
    modalEditar.abrir();
  }

  async function handleCriar() {
    try {
      const res = await api.post("/aeronaves", { modelo, capacidade, alcance });
      setAeronaves((prev) => [...prev, res.data]);
      modalCriar.fechar();
      setModelo("");
      setCapacidade("");
      setAlcance("");
    } catch (error) {
      console.error("Erro ao criar aeronave:", error);
    }
  }

  async function handleAtualizar() {
    if (!selecionada) return;
    try {
      const res = await api.put(`/aeronaves/${selecionada.id}`, {
        modelo: modeloEditar,
        capacidade: capacidadeEditar,
        alcance: alcanceEditar,
      });
      setAeronaves((prev) => prev.map((a) => (a.id === selecionada.id ? res.data : a)));
      setSelecionada(res.data);
      modalEditar.fechar();
    } catch (error) {
      console.error("Erro ao atualizar aeronave:", error);
    }
  }

  async function handleDeletar(id: number) {
    try {
      await api.delete(`/aeronaves/${id}`);
      setAeronaves((prev) => prev.filter((a) => a.id !== id));
      setSelecionada(null);
    } catch (error) {
      console.error("Erro ao deletar aeronave:", error);
    }
  }

  async function handleRegistrarTestes() {
    if (!selecionada) return;
    try {
      await api.post(`/aeronaves/${selecionada.id}/testes`, {
        aerodinamico: testeAer,
        hidraulico: testeHid,
        eletrico: testeEle,
      });
      const res = await api.get(`/aeronaves/${selecionada.id}`);
      setSelecionada(res.data);
      modalTestes.fechar();
    } catch (error) {
      console.error("Erro ao registrar testes:", error);
    }
  }

  const aeronavesFiltradas = aeronaves.filter((a) => a.modelo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Nova Aeronave" onClose={modalCriar.fechar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCriar();
            }}>
            <div className="flex flex-col gap-4">
              <InputTexto
                label="Modelo"
                placeholder="Ex: Aeronave 123"
                name="modelo"
                id="modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required={true}
              />

              <InputTexto
                label="Capacidade"
                placeholder="Ex: 300"
                name="capacidade"
                id="capacidade"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                required={true}
              />

              <InputTexto
                label="Alcance"
                placeholder="Ex: 1089"
                name="alcance"
                id="alcance"
                value={alcance}
                onChange={(e) => setAlcance(e.target.value)}
                required={true}
              />
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={modalCriar.fechar}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
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
        <Modal titulo="Editar Aeronave" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Modelo"
              placeholder="Ex: Aeronave 123"
              name="modeloEditar"
              id="modeloEditar"
              value={modeloEditar}
              onChange={(e) => setModeloEditar(e.target.value)}
            />
            <InputTexto
              label="Capacidade"
              placeholder="Ex: 300"
              name="capacidadeEditar"
              id="capacidadeEditar"
              value={capacidadeEditar}
              onChange={(e) => setCapacidadeEditar(e.target.value)}
            />
            <InputTexto
              label="Alcance"
              placeholder="Ex: 1089"
              name="alcanceEditar"
              id="alcanceEditar"
              value={alcanceEditar}
              onChange={(e) => setAlcanceEditar(e.target.value)}
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

      {modalTestes.aberto && (
        <Modal titulo="Registrar Testes" onClose={modalTestes.fechar}>
          <div className="flex flex-col gap-4">
            <InputSelect
              label="Aerodinâmico"
              options={["Aprovado", "Reprovado"]}
              name="TesteAer"
              id="TesteAer"
              value={testeAer}
              onChange={(e) => setTesteAer(e.target.value)}
            />
            <InputSelect
              label="Hidráulico"
              options={["Aprovado", "Reprovado"]}
              name="TesteHid"
              id="TesteHid"
              value={testeHid}
              onChange={(e) => setTesteHid(e.target.value)}
            />
            <InputSelect
              label="Elétrico"
              options={["Aprovado", "Reprovado"]}
              name="TesteEle"
              id="TesteEle"
              value={testeEle}
              onChange={(e) => setTesteEle(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={modalTestes.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleRegistrarTestes}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
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
            <PesquisaCriar
              placeholder="Buscar Aeronave..."
              busca={busca}
              setBusca={setBusca}
              onCriar={modalCriar.abrir}
            />
            <Lista
              itens={aeronavesFiltradas}
              itemSelecionado={selecionada}
              onSelecionar={setSelecionada}
              extrairId={(aeronave) => aeronave.id}
              extrairTexto={(aeronave) => aeronave.modelo}
              mensagemVazia="Nenhuma aeronave encontrada."
            />
          </div>

          <aside className="lg:col-span-1 h-full">
            {selecionada ? (
              <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="pb-5 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
                    {selecionada.modelo}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-2">Detalhes do registro</p>
                </div>

                <div className="py-6 flex-1 flex flex-col gap-4">
                  {[`Capacidade: ${selecionada.capacidade}`, `Alcance: ${selecionada.alcance}`].map((dado, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      <span className="text-base text-slate-700 leading-relaxed">{dado}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pb-6 border-b border-slate-100">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Etapas</p>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {(selecionada.etapas ?? []).length > 0 ? (
                        (selecionada.etapas ?? []).map((etapa) => (
                          <div key={etapa.id} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"></div>
                            <span className="text-xs text-slate-700 leading-relaxed">{etapa.nome}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">Nenhuma etapa.</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Peças</p>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {(selecionada.pecas ?? []).length > 0 ? (
                        (selecionada.pecas ?? []).map((peca) => (
                          <div key={peca.id} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"></div>
                            <span className="text-xs text-slate-700 leading-relaxed">{peca.nome}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">Nenhuma peça.</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Testes</p>
                    <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      {(selecionada.testes ?? []).length > 0 ? (
                        (selecionada.testes ?? []).map((teste) => (
                          <div key={teste.id} className="flex flex-col gap-1">
                            {[
                              { label: "Aerodinâmico", valor: teste.aerodinamico },
                              { label: "Elétrico", valor: teste.eletrico },
                              { label: "Hidráulico", valor: teste.hidraulico },
                            ].map((t) => (
                              <div key={t.label} className="flex items-start gap-2">
                                <div
                                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${t.valor === "REPROVADO" ? "bg-red-400" : "bg-emerald-400"}`}></div>
                                <span className="text-xs text-slate-700">
                                  {t.label}: {t.valor}
                                </span>
                              </div>
                            ))}
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
                  onClick={modalTestes.abrir}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] border border-slate-300 text-white rounded-lg hover:bg-[var(--azul)] hover:border-slate-400 transition-all text-sm font-semibold cursor-pointer shadow-sm">
                  Registrar Testes
                </button>

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
                  Selecione uma aeronave na lista para visualizar os detalhes aqui.
                </p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Aeronaves;
