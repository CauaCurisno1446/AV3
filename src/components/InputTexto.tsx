type InputTextoProps = {
  label: string;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
};

function InputTexto({ label, className, name, id, placeholder }: InputTextoProps) {
  let style = "border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--azul)] focus:ring-2 focus:ring-[var(--azul-escuro)]/10 transition-all";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input type="text" className={`${style} ${className}`} name={name} id={id} placeholder={placeholder} />
    </div>
  );
}

export default InputTexto;
