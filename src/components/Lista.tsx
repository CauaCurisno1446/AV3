import { MousePointerClick } from "lucide-react";

interface ListaProps<T> {
  itens: T[];
  itemSelecionado: T | null;
  onSelecionar: (item: T) => void;

  extrairId: (item: T) => string | number;
  extrairTexto: (item: T) => string;

  mensagemVazia?: string;
}

function Lista<T>({
  itens,
  itemSelecionado,
  onSelecionar,
  extrairId,
  extrairTexto,
  mensagemVazia = "Nenhum item encontrado.",
}: ListaProps<T>) {
  return (
    <div className="flex flex-col gap-3 p-2 rounded-[10px] bg-[var(--cinza)] max-h-[450px] overflow-y-auto custom-scrollbar">
      {itens.map((item) => {
        const id = extrairId(item);
        const texto = extrairTexto(item);
        const estaSelecionado = itemSelecionado && extrairId(itemSelecionado) === id;

        return (
          <button
            key={id}
            onClick={() => onSelecionar(item)}
            className={`shrink-0 flex items-center justify-between p-4 border rounded-[15px] text-left transition-colors bg-white cursor-pointer ${estaSelecionado ? "border-[var(--azul)] bg-indigo-50" : "border-slate-300 hover:bg-slate-50"}`}>
            <span className="text-lg text-slate-700">
              <span className="text-[#32549e] font-bold">ID: {id} -</span> {texto}
            </span>
            <div
              className={`w-5 h-5 rounded-full border-2 ${estaSelecionado ? "border-[var(--azul-escuro)] bg-[var(--azul)]" : "border-slate-400 bg-slate-200"}`}
            />
          </button>
        );
      })}

      {itens.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
          <MousePointerClick className="opacity-50 mb-2" size={24} />
          <p className="text-sm font-medium">{mensagemVazia}</p>
        </div>
      )}
    </div>
  );
}

export { Lista };
