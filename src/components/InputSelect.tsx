type SelectTesteProps = {
  label: string;
  options: string[];
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function InputSelect({ label, options, name, id, value, onChange }: SelectTesteProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <select
        className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--azul)] focus:ring-2 focus:ring-[var(--azul-escuro)]/10 transition-all bg-white"
        name={name}
        id={id}
        value={value}
        onChange={onChange}>
        <option value="">Selecione...</option>
        {options.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
