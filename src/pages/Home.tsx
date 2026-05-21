"use client";

import { Settings, Plane, Users } from "lucide-react";
import LogoMarquee from "../components/LogoMarquee";

function Home() {
  return (
    <section className="bg-[#f5f5f5] text-black">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
          Gerencie seu sistema de aeronaves com <span className="underline decoration-indigo-500">segurança</span>
        </h1>

        <p className="text-gray-500 max-w-xl text-lg">Plataforma moderna para controle de funcionários, monitoramento de peças e gestão eficiente de etapas de produção.</p>

        <div className="flex items-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-80 transition">Começar</button>
        </div>
      </div>

      <LogoMarquee />

      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Recursos principais para uma gestão eficiente</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12">Tudo que você precisa para controlar aeronaves e operações em um único lugar.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-left duration-200 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center w-10 h-10 bg-yellow-100 rounded-lg mb-4">
              <Settings className="text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Gerenciamento de peças</h3>
            <p className="text-gray-500 text-sm">Gerencie todas as peças utilizadas na produção de uma aeronave.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-left duration-200 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-lg mb-4">
              <Plane className="text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Gestão de Aeronaves</h3>
            <p className="text-gray-500 text-sm">Realize testes, gerencie etapas de produção e controle o status de cada aeronave.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-left duration-200 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center w-10 h-10 bg-purple-100 rounded-lg mb-4">
              <Users className="text-purple-500" />
            </div>
            <h3 className="font-semibold mb-2">Gerenciamento de Usuários</h3>
            <p className="text-gray-500 text-sm">Controle o acesso de funcionários, atribua permissões e monitore atividades.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
