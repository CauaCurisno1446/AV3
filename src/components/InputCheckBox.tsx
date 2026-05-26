type CheckboxOption = {
  id: string;
  label: string;
  value: string | number | boolean;
};

type InputCheckProps = {
  label: string;
  options: CheckboxOption[];
  name?: string;

  selectedValues?: (string | number | boolean)[];
  onChange?: (values: (string | number | boolean)[]) => void;
};

function InputCheckBox({ label, options, name, selectedValues, onChange }: InputCheckProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1 custom-scrollbar border border-slate-200 rounded-lg p-3 bg-slate-50">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer select-none hover:bg-slate-100">
            <input
              type="checkbox"
              id={option.id}
              name={name}
              value={String(option.value)}
              checked={selectedValues?.includes(option.value)}
              className="w-4 h-4 rounded accent-[var(--azul-escuro)] cursor-pointer"
              onChange={(e) => {
                let updated;

                if (e.target.checked) {
                  updated = [...(selectedValues || []), option.value];
                } else {
                  updated = (selectedValues || []).filter((v) => v !== option.value);
                }

                onChange?.(updated);
              }}
            />
            <span className="text-sm text-slate-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default InputCheckBox;
