import { Component, createSignal, onMount } from "solid-js";
import Section from "./Section";

interface SectionData {
  title: string;
  description: string;
  background: string;
}

const MbrasLuxuryPresentation: Component = () => {
  const sections: SectionData[] = [
    {
      title: "A Visão MBRAS",
      description: "Redefinindo o mercado imobiliário de altíssimo padrão. Apresentamos a você uma nova forma de vivenciar o segmento de luxo, onde cada detalhe foi pensado para inspirar, surpreender e encantar.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Construindo um Legado",
      description: "Fundada em 2010, a MBRAS nasceu com a missão de redefinir o mercado imobiliário de altíssimo padrão. Hoje, com mais de 40 profissionais e localizada no sofisticado Cidade Jardim Corporate Center, a MBRAS se consolida como a escolha de diversas empresas de renome.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Além das Transações, Experiências Elevadas",
      description: "Nosso diferencial transcende a simples negociação de imóveis. Entregamos consultoria especializada, gestão de ativos, operações de incorporação, sale & leaseback e intermediações de alto padrão — sempre orientados a criar experiências memoráveis e superar expectativas.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "A Busca pela Excelência",
      description: "Esta citação de Aristóteles sintetiza a essência da MBRAS: acreditamos que a excelência é fruto de um compromisso constante com a melhoria, colocado em prática todos os dias.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Capacitando a Expertise",
      description: "Oferecemos todo o suporte aos nossos consultores e prestadores de serviço, partindo do princípio cultural de abertura à inovação e qualidade, agregando valor ao atendimento ao cliente.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Movidos pela Paixão, Definidos pela Expertise",
      description: "Nossa equipe multidisciplinar conta com advogados, engenheiros, arquitetos e designers de interiores. Essa variedade de competências permite oferecer soluções precisas e seguras, garantindo transações éticas e transparentes.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Acesso Exclusivo, Oportunidades Incomparáveis",
      description: "O MBRAS Club oferece consultoria e catálogo exclusivos, precificação baseada em dados, ampla divulgação e mídia digital direcionada, além de uma base interna de clientes. Vantagens adicionais incluem visitantes verificados, clientes com potencial de compra e total segurança para você e sua família.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Aquisições Discretas, Propriedades Excepcionais",
      description: "O MBRAS Off Market traz ofertas exclusivas de imóveis não divulgados, do mais alto padrão, assegurando privacidade e acesso a oportunidades imperdíveis. Tudo com visitantes verificados, clientes com alto potencial de compra, segurança e o total apoio da equipe MBRAS.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Alcançando o Cliente Exigente",
      description: "Nossas estratégias de marketing vão muito além de campanhas tradicionais. Possuímos um mailing consolidado de mais de 70.000 pessoas e construímos táticas personalizadas para impulsionar vendas em múltiplas frentes. Usamos mídia programática e anúncios direcionados em Google, Instagram e LinkedIn, maximizando o alcance e a relevância das publicações.",
      background: "from-gray-900 to-slate-950",
    },
    {
      title: "Excelência Reconhecida",
      description: "A MBRAS é destacada em grandes veículos de comunicação: Forbes, InfoMoney, Bloomberg, Dinheiro, CASA, Folha de S.Paulo e muitos outros — consolidando sua imagem de credibilidade e excelência no mercado.",
      background: "from-gray-900 to-slate-950",
    }
  ];

  const [currentSection, setCurrentSection] = createSignal(0);
  const totalSections = sections.length;
  let isThrottled = false;

  const navigateToSection = (index: number) => {
    if (index < 0 || index >= totalSections) return;
    setCurrentSection(index);
    const target = document.getElementById(`section-${index}`);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (isThrottled) return;
    navigateToSection(e.deltaY > 0 ? currentSection() + 1 : currentSection() - 1);
    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") navigateToSection(currentSection() + 1);
    else if (e.key === "ArrowUp") navigateToSection(currentSection() - 1);
  };

  onMount(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
  });

  return (
    <div class="overflow-hidden">
      <style>
        {`
          @page {
            size: A4 landscape;
            margin: 0;
          }
          @media print {
            .print-section {
              width: 297mm;
              height: 210mm;
              page-break-after: always;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
          }
        `}
      </style>
      {sections.map((section, index) => (
        <div id={`section-${index}`} class="print-section w-full">
          <Section
            title={section.title}
            description={section.description}
            background={section.background}
          />
        </div>
      ))}
    </div>
  );
};

export default MbrasLuxuryPresentation;