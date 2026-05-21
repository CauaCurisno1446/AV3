type PaginaProps = {
  titulo: string;
  imagem: string;
  paragrafo: string;
  instrucoes?: string;
};

function TituloPagina({ titulo, imagem, paragrafo, instrucoes }: PaginaProps) {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-full md:w-1/2 aspect-video bg-slate-200 flex items-center justify-center rounded-md">
          <img src={imagem} alt="Boeing" className="rounded-md" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">{titulo}</h1>
          <p className="text-lg text-slate-600">
            {paragrafo} <span className="text-indigo-500">{instrucoes}</span>
          </p>
        </div>
      </section>

      <hr className="border-t-2 border-slate-200 mb-8" />
    </>
  );
}

export default TituloPagina;
