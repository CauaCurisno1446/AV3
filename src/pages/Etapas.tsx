import { useEffect, useState } from "react";
import { SquarePen, Trash2, MousePointerClick } from "lucide-react";
import etpFoto from "../assets/img/etapas.jpg";

import { useModal } from "../hooks/useModal";
import api from "../utils/api";

import Modal from "../components/Modal";
import InputTexto from "../components/InputTexto";
import InputSelect from "../components/InputSelect";
import InputCheckBox from "../components/InputCheckBox";
import TituloPagina from "../components/TituloPagina";
import PesquisaCriar from "../components/PesquisaCriar";
import { Lista } from "../components/Lista";

type Funcionario = {
  id: number;
  nome: string;
};

type Aeronave = {
  id: number;
  modelo: string;
};

type Etapa = {
  id: number;
  nome: string;
  prazo: string;
  status: string;
  funcionarios: Funcionario[];
  aeronave: Aeronave;
};

function Etapas() {
  const [busca, setBusca] = useState("");
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [selecionada, setSelecionada] = useState<Etapa | null>(null);

  const modalCriar = useModal();
  const modalEditar = useModal();

  const [funcionariosDisponiveis, setFuncionariosDisponiveis] = useState<Funcionario[]>([]);
  const [aeronavesDisponiveis, setAeronavesDisponiveis] = useState<Aeronave[]>([]);

  // criar
  const [nome, setNome] = useState("");
  const [prazo, setPrazo] = useState("");
  const [status, setStatus] = useState("EM_ANDAMENTO");
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState<number[]>([]);
  const [aeronaveSelecionada, setAeronaveSelecionada] = useState<number>(0);

  // editar
  const [nomeEditar, setNomeEditar] = useState("");
  const [prazoEditar, setPrazoEditar] = useState("");
  const [statusEditar, setStatusEditar] = useState("EM_ANDAMENTO");
  const [funcionariosEditar, setFuncionariosEditar] = useState<number[]>([]);
  const [aeronaveEditar, setAeronaveEditar] = useState<number>(0);

  useEffect(() => {
    api.get("/etapas").then((res) => {
      setEtapas(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/aeronaves").then((res) => {
      setAeronavesDisponiveis(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/funcionarios").then((res) => {
      setFuncionariosDisponiveis(res.data);
    });
  }, []);

  function abrirModalEditar() {
    if (!selecionada) return;
    setNomeEditar(selecionada.nome);
    setPrazoEditar(selecionada.prazo ? new Date(selecionada.prazo).toISOString().split("T")[0] : "");
    setStatusEditar(selecionada.status);
    setFuncionariosEditar(selecionada.funcionarios.map((f) => f.id));
    setAeronaveEditar(selecionada.aeronave.id);
    modalEditar.abrir();
  }

  async function handleCriar() {
    try {
      const res = await api.post("/etapas", {
        nome,
        prazo,
        status,
        funcionarios: funcionariosSelecionados,
        aeronave: aeronaveSelecionada,
      });
      setEtapas((prev) => [...prev, res.data]);
      modalCriar.fechar();
      setNome("");
      setPrazo("");
      setStatus("EM_ANDAMENTO");
      setFuncionariosSelecionados([]);
      setAeronaveSelecionada(0);
    } catch (error) {
      console.error("Erro ao criar etapa:", error);
    }
  }

  async function handleAtualizar() {
    if (!selecionada) return;

    try {
      const res = await api.put(`/etapas/${selecionada.id}`, {
        nome: nomeEditar,
        prazo: prazoEditar,
        status: statusEditar,
        funcionarios: funcionariosEditar,
        aeronave: aeronaveEditar,
      });

      setEtapas((prev) => prev.map((e) => (e.id === selecionada.id ? res.data : e)));
      setSelecionada(res.data);
      modalEditar.fechar();
    } catch (error) {
      console.error("Erro ao atualizar etapa:", error);
    }
  }

  async function handleDeletar(id: number) {
    try {
      await api.delete(`/etapas/${id}`);
      setEtapas((prev) => prev.filter((e) => e.id !== id));
      setSelecionada(null);
    } catch (error) {
      console.error("Erro ao deletar etapa:", error);
    }
  }

  const etapasFiltradas = etapas.filter((e) => e.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans">
      {modalCriar.aberto && (
        <Modal titulo="Nova Etapa" onClose={modalCriar.fechar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCriar();
            }}>
            <div className="flex flex-col gap-4">
              <InputTexto
                label="Nome"
                placeholder="Ex: Montagem"
                name="nome"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
              />

              <InputTexto
                label="Prazo"
                type="date"
                placeholder="2026-05-08"
                name="prazo"
                id="prazo"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                required={true}
              />

              <InputSelect
                label="Status"
                options={["Em andamento", "Concluída", "Cancelada"]}
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <InputCheckBox
                label="Funcionários"
                options={funcionariosDisponiveis.map((funcionario) => ({
                  id: funcionario.id.toString(),
                  label: funcionario.nome,
                  value: funcionario.id,
                }))}
                selectedValues={funcionariosSelecionados}
                onChange={(values) => setFuncionariosSelecionados(values as number[])}
              />

              <InputSelect
                label="Aeronave"
                options={aeronavesDisponiveis.map((a) => a.modelo)}
                name="aeronave"
                id="aeronave"
                value={aeronavesDisponiveis.find((a) => a.id === aeronaveSelecionada)?.modelo || ""}
                onChange={(e) => {
                  const aeronave = aeronavesDisponiveis.find((a) => a.modelo === e.target.value);

                  if (aeronave) {
                    setAeronaveSelecionada(aeronave.id);
                  }
                }}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={modalCriar.fechar}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                Cancelar
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg">
                Salvar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {modalEditar.aberto && (
        <Modal titulo="Editar Etapa" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-4">
            <InputTexto
              label="Nome"
              placeholder="Ex: Montagem"
              name="nomeEditar"
              id="nomeEditar"
              value={nomeEditar}
              onChange={(e) => setNomeEditar(e.target.value)}
            />

            <InputTexto
              label="Prazo"
              placeholder="2026-05-08"
              name="prazoEditar"
              id="prazoEditar"
              type="date"
              value={prazoEditar}
              onChange={(e) => setPrazoEditar(e.target.value)}
            />

            <InputSelect
              label="Status"
              options={["Em andamento", "Concluída", "Cancelada"]}
              name="statusEditar"
              id="statusEditar"
              value={statusEditar}
              onChange={(e) => setStatusEditar(e.target.value)}
            />

            <InputCheckBox
              label="Funcionários"
              options={funcionariosDisponiveis.map((funcionario) => ({
                id: funcionario.id.toString(),
                label: funcionario.nome,
                value: funcionario.id,
              }))}
              selectedValues={funcionariosEditar}
              onChange={(values) => setFuncionariosEditar(values as number[])}
            />

            <InputSelect
              label="Aeronave"
              options={aeronavesDisponiveis.map((a) => a.modelo)}
              name="aeronaveEditar"
              id="aeronaveEditar"
              value={aeronavesDisponiveis.find((a) => a.id === aeronaveEditar)?.modelo || ""}
              onChange={(e) => {
                const aeronave = aeronavesDisponiveis.find((a) => a.modelo === e.target.value);

                if (aeronave) {
                  setAeronaveEditar(aeronave.id);
                }
              }}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={modalEditar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancelar
            </button>

            <button
              onClick={handleAtualizar}
              className="px-5 py-2 text-sm bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white rounded-lg">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      <main className="max-w-6xl mx-auto p-6">
        <TituloPagina
          titulo="Etapas"
          paragrafo="Área dedicada à gestão e visualização das etapas."
          instrucoes="Selecione uma etapa para visualizar os detalhes."
          imagem={etpFoto}
        />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PesquisaCriar placeholder="Buscar etapa..." busca={busca} setBusca={setBusca} onCriar={modalCriar.abrir} />
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
                  <h2 className="text-2xl font-bold text-slate-800">{selecionada.nome}</h2>
                  <p className="text-sm text-slate-500 mt-2">Detalhes da etapa</p>
                </div>
                <div className="py-6 flex flex-col gap-4">
                  <div>
                    <strong>Status:</strong> {selecionada.status}
                  </div>
                  <div>
                    <strong>Prazo:</strong> {new Date(selecionada.prazo).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Aeronave:</strong> {selecionada.aeronave?.modelo}
                  </div>
                  <div>
                    <strong>Funcionários:</strong>
                    <ul className="list-disc ml-5 mt-2">
                      {selecionada.funcionarios.map((f) => (
                        <li key={f.id}>{f.nome}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 mt-auto">
                  <button
                    onClick={abrirModalEditar}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--azul-escuro)] text-white rounded-lg hover:bg-[var(--azul)]">
                    <SquarePen size={18} />
                    Editar
                  </button>

                  <button
                    onClick={() => handleDeletar(selecionada.id)}
                    className="flex items-center justify-center w-11 h-11 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                <MousePointerClick className="text-slate-300 mb-4" size={32} />

                <p className="text-base font-semibold text-slate-600 mb-1">Nenhuma etapa selecionada</p>

                <p className="text-sm text-slate-500">Selecione uma etapa para visualizar os detalhes.</p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Etapas;
