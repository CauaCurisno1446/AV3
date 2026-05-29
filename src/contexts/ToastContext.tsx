import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type TipoToast = "sucesso" | "erro" | "info";

type Toast = {
  id: number;
  mensagem: string;
  tipo: TipoToast;
};

type ToastContextType = {
  sucesso: (mensagem: string) => void;
  erro: (mensagem: string) => void;
  info: (mensagem: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

let contador = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remover = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const adicionar = useCallback((mensagem: string, tipo: TipoToast) => {
    const id = ++contador;
    setToasts((prev) => [...prev, { id, mensagem, tipo }]);
    setTimeout(() => remover(id), 3500);
  }, [remover]);

  const sucesso = useCallback((mensagem: string) => adicionar(mensagem, "sucesso"), [adicionar]);
  const erro = useCallback((mensagem: string) => adicionar(mensagem, "erro"), [adicionar]);
  const info = useCallback((mensagem: string) => adicionar(mensagem, "info"), [adicionar]);

  const estilos: Record<TipoToast, string> = {
    sucesso: "bg-emerald-50 border-emerald-200 text-emerald-800",
    erro: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const icones: Record<TipoToast, ReactNode> = {
    sucesso: <CheckCircle size={18} className="text-emerald-500 shrink-0" />,
    erro: <XCircle size={18} className="text-red-500 shrink-0" />,
    info: <Info size={18} className="text-blue-500 shrink-0" />,
  };

  return (
    <ToastContext.Provider value={{ sucesso, erro, info }}>
      {children}

      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium animate-slide-in ${estilos[toast.tipo]}`}
          >
            {icones[toast.tipo]}
            <span className="flex-1">{toast.mensagem}</span>
            <button
              onClick={() => remover(toast.id)}
              className="ml-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }
  return context;
}
