type SelectTesteProps = {
  label: string;
  options: string[];
  name?: string;
  id?: string;
};

function InputSelect({ label, options }: SelectTesteProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <select className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--azul)] focus:ring-2 focus:ring-[var(--azul-escuro)]/10 transition-all bg-white">
        <option value="">Selecione...</option>
        {options.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
