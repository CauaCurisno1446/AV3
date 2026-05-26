import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputSenhaProps = {
  label: string;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

function InputSenha({ label, className, name, id, placeholder, required, value, onChange }: InputSenhaProps) {
  const [verSenha, setVerSenha] = useState(false);

  const styleInput =
    "border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--azul)] focus:ring-2 focus:ring-[var(--azul-escuro)]/10 transition-all";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <div className="relative">
        <input
          type={verSenha ? "text" : "password"}
          placeholder={placeholder}
          className={`${styleInput} ${className} w-full pr-10`}
          name={name}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setVerSenha(!verSenha)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
          {verSenha ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default InputSenha;
