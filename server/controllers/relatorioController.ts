import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";

const prisma = new PrismaClient();

export async function gerarRelatorio(req: Request<{ id: string }>, res: Response) {
  try {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        etapas: { include: { funcionarios: true } },
        pecas: true,
        testes: true,
      },
    });

    if (!aeronave) {
      return res.status(404).json({ error: "Aeronave não encontrada" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=relatorio-${aeronave.modelo.replace(/\s+/g, "_")}.pdf`);
    doc.pipe(res);

    //Cabeçalho
    doc.fontSize(22).font("Helvetica-Bold").text("Relatório de Aeronave", { align: "center" });
    doc.moveDown(0.5);
    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#666666")
      .text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, { align: "center" });
    doc.moveDown(1);

    linha(doc);

    //Dados gerais
    secao(doc, "Dados Gerais");
    campo(doc, "Modelo", aeronave.modelo);
    campo(doc, "Capacidade", `${aeronave.capacidade} passageiros`);
    campo(doc, "Alcance", `${aeronave.alcance} km`);
    doc.moveDown(1);

    //Testes
    secao(doc, "Testes");
    if (aeronave.testes.length === 0) {
      doc.fontSize(10).fillColor("#888888").text("Nenhum teste registrado.");
    } else {
      aeronave.testes.forEach((teste, i) => {
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .fillColor("#333333")
          .text(`Teste #${i + 1}`);
        campo(doc, "Aerodinâmico", teste.aerodinamico);
        campo(doc, "Elétrico", teste.eletrico);
        campo(doc, "Hidráulico", teste.hidraulico);
        campo(doc, "Data", new Date(teste.createdAt).toLocaleDateString("pt-BR"));
        doc.moveDown(0.5);
      });
    }
    doc.moveDown(1);

    //Etapas
    secao(doc, "Etapas");
    if (aeronave.etapas.length === 0) {
      doc.fontSize(10).fillColor("#888888").text("Nenhuma etapa registrada.");
    } else {
      aeronave.etapas.forEach((etapa) => {
        doc.fontSize(10).font("Helvetica-Bold").fillColor("#333333").text(etapa.nome);
        campo(doc, "Status", etapa.status);
        campo(doc, "Prazo", new Date(etapa.prazo).toLocaleDateString("pt-BR"));
        const nomes = etapa.funcionarios.map((f) => f.nome).join(", ") || "Nenhum";
        campo(doc, "Funcionários", nomes);
        doc.moveDown(0.5);
      });
    }
    doc.moveDown(1);

    //Peças
    secao(doc, "Peças");
    if (aeronave.pecas.length === 0) {
      doc.fontSize(10).fillColor("#888888").text("Nenhuma peça registrada.");
    } else {
      aeronave.pecas.forEach((peca) => {
        doc.fontSize(10).font("Helvetica-Bold").fillColor("#333333").text(peca.nome);
        campo(doc, "Tipo", peca.tipo);
        campo(doc, "Fornecedor", peca.fornecedor);
        campo(doc, "Status", peca.status);
        doc.moveDown(0.5);
      });
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar relatório" });
  }
}

function linha(doc: PDFKit.PDFDocument) {
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#cccccc").stroke();
  doc.moveDown(0.8);
}

function secao(doc: PDFKit.PDFDocument, titulo: string) {
  doc.fontSize(13).font("Helvetica-Bold").fillColor("#1e3a5f").text(titulo);
  doc.moveDown(0.4);
}

function campo(doc: PDFKit.PDFDocument, label: string, valor: string) {
  doc.fontSize(10).font("Helvetica-Bold").fillColor("#555555").text(`${label}: `, { continued: true });
  doc.font("Helvetica").fillColor("#333333").text(valor);
}
