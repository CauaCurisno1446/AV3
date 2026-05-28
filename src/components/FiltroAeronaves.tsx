type Aeronave = {
  id: number;
  modelo: string;
};

type Props = {
  aeronaves: Aeronave[];
  selecionadas: number[];
  onChange: (ids: number[]) => void;
};

function FiltroAeronaves({ aeronaves, selecionadas, onChange }: Props) {
  function toggleAeronave(id: number) {
    if (selecionadas.includes(id)) {
      onChange(selecionadas.filter((a) => a !== id));
    } else {
      onChange([...selecionadas, id]);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-700 mb-3">Filtrar por aeronave</p>
      <div className="flex flex-col gap-2">
        {aeronaves.map((aeronave) => (
          <label key={aeronave.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selecionadas.includes(aeronave.id)}
              onChange={() => toggleAeronave(aeronave.id)}
              className="accent-[var(--azul-escuro)]"
            />
            <span className="text-sm text-slate-600">{aeronave.modelo}</span>
          </label>
        ))}
      </div>
      {selecionadas.length > 0 && (
        <button onClick={() => onChange([])} className="mt-3 text-xs text-slate-400 hover:text-slate-600">
          Limpar filtro
        </button>
      )}
    </div>
  );
}

export default FiltroAeronaves;
