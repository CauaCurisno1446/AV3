import { Search } from "lucide-react";

type Props = {
  placeholder: string;
  busca: string;
  setBusca: (valor: string) => void;
  onCriar: () => void;
};

function PesquisaCriar({ placeholder, busca, setBusca, onCriar }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-end border-b border-slate-400 w-full sm:w-1/2 gap-2 pb-1">
        <Search size={16} />
        <input
          type="text"
          placeholder={`Buscar ${placeholder.toLowerCase()}...`}
          className="bg-transparent focus:outline-none w-full text-slate-700"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <button
        className="cursor-pointer bg-[var(--azul-escuro)] hover:bg-[var(--azul)] text-white font-medium py-2 px-6 rounded-[10px] transition-colors w-full sm:w-auto"
        onClick={onCriar}>
        Criar
      </button>
    </div>
  );
}

export default PesquisaCriar;
