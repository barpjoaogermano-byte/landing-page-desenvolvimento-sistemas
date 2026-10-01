import { useEffect, useState } from 'react'
import './App.css'
import heroImg from './assets/hero.svg'
import bannerSobre from './assets/banner-sobre.svg'
import bannerTecnologias from './assets/banner-tecnologias.svg'
import bannerUnidade from './assets/banner-unidade.svg'
import bannerIngresso from './assets/banner-ingresso.svg'

const LINKS = {
  inscricao: 'https://cursostecnicosgratuitos.sc.senai.br/',
  senai: 'https://sc.senai.br/',
  github: 'https://github.com/barpjoaogermano-byte',
}

const AUTOR = 'João Germano Barp'

const MENU = [
  { href: '#curso', label: 'O curso' },
  { href: '#conteudo', label: 'Conteúdo' },
  { href: '#unidade', label: 'Unidade' },
  { href: '#ingresso', label: 'Ingresso' },
  { href: '#faq', label: 'Dúvidas' },
]

const FICHA = [
  { label: 'Modalidade', valor: 'Curso técnico presencial' },
  { label: 'Área', valor: 'Tecnologia da Informação' },
  { label: 'Unidade', valor: 'SENAI São José, SC' },
  { label: 'Turno (edições recentes)', valor: 'Tarde' },
]

const ATUACAO = [
  { titulo: 'Analisa necessidades', texto: 'Entende o problema do cliente ou da empresa e define o que o sistema precisa fazer.' },
  { titulo: 'Programa', texto: 'Escreve o código de sites, aplicativos e sistemas usando linguagens de programação.' },
  { titulo: 'Trabalha com dados', texto: 'Modela e consulta bancos de dados para armazenar e recuperar informações.' },
  { titulo: 'Testa e mantém', texto: 'Corrige falhas, melhora o desempenho e atualiza o software ao longo do tempo.' },
]

const PERFIL = [
  'Gosta de resolver problemas e quebra-cabeças lógicos',
  'Tem curiosidade sobre como aplicativos e sites funcionam',
  'Quer entrar no mercado de tecnologia com formação técnica',
  'Gosta de aprender fazendo, em projetos práticos',
]

const MODULOS = [
  { titulo: 'Introdução ao desenvolvimento de projetos', texto: 'Visão geral da área, organização do trabalho e primeiros passos em programação.' },
  { titulo: 'Modelagem de sistemas', texto: 'Levantamento de requisitos, diagramas e documentação do que será construído.' },
  { titulo: 'Desenvolvimento de sistemas', texto: 'Codificação de aplicações com acesso a banco de dados e interfaces.' },
  { titulo: 'Teste de sistemas', texto: 'Planejamento e execução de testes para garantir qualidade e segurança.' },
  { titulo: 'Implantação de sistemas', texto: 'Publicação, configuração e entrega do sistema ao usuário final.' },
  { titulo: 'Manutenção de sistemas', texto: 'Correções, melhorias e evolução de sistemas já em funcionamento.' },
]

const CONTEUDO = [
  { titulo: 'Lógica de programação', texto: 'Algoritmos, estruturas de decisão e repetição, resolução de problemas.' },
  { titulo: 'Desenvolvimento web', texto: 'HTML, CSS e JavaScript para construir interfaces responsivas.' },
  { titulo: 'Banco de dados', texto: 'Modelagem e consultas com SQL.' },
  { titulo: 'Back-end e integração', texto: 'Regras de negócio, APIs e comunicação entre sistemas.' },
  { titulo: 'Modelagem de sistemas', texto: 'Levantamento de requisitos e documentação de projetos.' },
  { titulo: 'Testes e implantação', texto: 'Validação de qualidade, versionamento com Git e publicação de sistemas.' },
]

const COMPETENCIAS = [
  'Raciocínio lógico e análise de problemas',
  'Organização e documentação de projetos',
  'Trabalho em equipe e comunicação',
  'Atenção a segurança e boas práticas',
  'Autonomia para aprender novas tecnologias',
  'Apresentação de soluções e resultados',
]

const TECNOLOGIAS = ['HTML', 'CSS', 'JavaScript', 'SQL', 'Git e GitHub', 'APIs REST', 'Modelagem UML', 'Metodologias ágeis']

const METODOLOGIA = [
  { titulo: 'Teoria e prática juntas', texto: 'Os conteúdos são aplicados desde o início em laboratórios e desafios.' },
  { titulo: 'Projetos reais', texto: 'O aluno constrói soluções completas, que podem compor o portfólio.' },
  { titulo: 'Formação completa', texto: 'Trabalho em equipe, comunicação e organização também fazem parte da formação.' },
]

const OUTROS_CURSOS = ['Internet das Coisas', 'Multimídia', 'Programação de Jogos Digitais']

const MERCADO = [
  'Desenvolvedor(a) front-end, back-end ou full stack',
  'Analista de testes e qualidade de software',
  'Suporte técnico e análise de sistemas',
  'Desenvolvimento de soluções para a indústria',
  'Empreendedorismo e trabalho autônomo',
  'Continuidade nos estudos em cursos superiores de TI',
]

const ETAPAS = [
  { titulo: 'Inscrição online', texto: 'Preenchimento do formulário no site dos cursos técnicos gratuitos do SENAI/SC.' },
  { titulo: 'Visita à unidade', texto: 'Agendamento e visita presencial, acompanhado de um responsável.' },
  { titulo: 'Resultado', texto: 'Divulgação da lista de selecionados no portal do SENAI/SC.' },
]

const FAQ = [
  { pergunta: 'Preciso saber programar antes?', resposta: 'Não. O curso parte dos fundamentos e é indicado para quem está começando.' },
  { pergunta: 'Preciso ser bom em matemática?', resposta: 'O essencial é raciocínio lógico e interesse em resolver problemas. Matemática avançada não é pré-requisito.' },
  { pergunta: 'O curso é gratuito?', resposta: 'Nas edições recentes, o SENAI/SC ofereceu vagas gratuitas em cursos técnicos para estudantes da rede estadual. As regras mudam a cada processo seletivo, então confirme no edital vigente.' },
  { pergunta: 'Qual a duração e o horário?', resposta: 'Os detalhes variam conforme a turma. Consulte a unidade ou o edital para obter as informações atualizadas.' },
  { pergunta: 'Preciso ter computador em casa?', resposta: 'A unidade oferece laboratórios para as aulas. Confirme com a escola se há necessidade de equipamento próprio para atividades extras.' },
  { pergunta: 'O curso vale para o currículo?', resposta: 'O SENAI é reconhecido pela indústria e a formação técnica é um diferencial para quem busca a primeira oportunidade na área.' },
]

function Secao({ id, titulo, intro, alt = false, children }) {
  return (
    <section id={id} className={`secao${alt ? ' alt' : ''}`} aria-labelledby={`${id}-titulo`}>
      <div className="wrap">
        <header className="secao-cab">
          <h2 id={`${id}-titulo`}>{titulo}</h2>
          {intro && <p className="intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

function Banner({ img, rotulo, titulo, texto }) {
  return (
    <div className="banner" style={{ backgroundImage: `url(${img})` }}>
      <div className="wrap">
        <p className="rotulo">{rotulo}</p>
        <p className="banner-titulo">{titulo}</p>
        <p className="banner-txt">{texto}</p>
      </div>
    </div>
  )
}

function Cards({ itens, numerado = false }) {
  return (
    <ul className="cards">
      {itens.map(({ titulo, texto }, i) => (
        <li className="card" key={titulo}>
          {numerado && <span className="card-num">{String(i + 1).padStart(2, '0')}</span>}
          <h3>{titulo}</h3>
          <p>{texto}</p>
        </li>
      ))}
    </ul>
  )
}

function Marcadores({ itens, duplo = false }) {
  return (
    <ul className={`marcadores${duplo ? ' duplo' : ''}`}>
      {itens.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function IconeGithub() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function useRevelar() {
  useEffect(() => {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzir || !('IntersectionObserver' in window)) return undefined

    const alvos = document.querySelectorAll(
      '.secao-cab, .card, .etapas li, .painel, .lista, .faq details, .marcadores, .chips, .banner .wrap'
    )
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel')
            observador.unobserve(entrada.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    alvos.forEach((el) => {
      el.classList.add('revelar')
      observador.observe(el)
    })
    return () => observador.disconnect()
  }, [])
}

function VoltarAoTopo() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 600)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <a
      className={`voltar${visivel ? ' ativo' : ''}`}
      href="#inicio"
      aria-label="Voltar ao topo"
      tabIndex={visivel ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  )
}

function Topo() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)

  return (
    <header className="topo">
      <div className="wrap topo-in">
        <a className="marca" href="#inicio" onClick={fechar}>
          SENAI <small>São José · SC</small>
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={aberto}
          aria-controls="menu"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? 'Fechar' : 'Menu'}
        </button>
        <nav id="menu" className={aberto ? 'aberto' : ''} aria-label="Navegação principal">
          {MENU.map(({ href, label }) => (
            <a key={href} href={href} onClick={fechar}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="wrap hero-in">
        <div>
          <p className="rotulo">Curso Técnico</p>
          <h1>Desenvolvimento de Sistemas</h1>
          <p className="hero-txt">
            Formação para quem quer iniciar na área de tecnologia e aprender a projetar,
            programar, testar e manter sistemas, com aulas teóricas e práticas na unidade
            do SENAI em São José.
          </p>
          <div className="acoes">
            <a className="btn" href={LINKS.inscricao} target="_blank" rel="noopener noreferrer">Ver inscrições</a>
            <a className="btn sec" href="#curso">Conhecer o curso</a>
          </div>
        </div>
        <img className="hero-img" src={heroImg} alt="Ilustração de janelas de código, navegador e banco de dados" />
      </div>
    </section>
  )
}

function Ficha() {
  return (
    <div className="faixa">
      <dl className="wrap faixa-in">
        {FICHA.map(({ label, valor }) => (
          <div key={label}><dt>{label}</dt><dd>{valor}</dd></div>
        ))}
      </dl>
    </div>
  )
}

function Rodape() {
  const ano = new Date().getFullYear()
  return (
    <footer className="rodape">
      <div className="wrap rodape-topo">
        <p className="rodape-marca">SENAI <small>São José · SC</small></p>
        <p className="rodape-curso">Técnico em Desenvolvimento de Sistemas</p>
        <p className="rodape-txt">
          Página de divulgação do curso. Informações sujeitas a alteração;
          consulte sempre os canais oficiais do SENAI/SC.
        </p>
        <div className="acoes centro">
          <a className="btn" href={LINKS.inscricao} target="_blank" rel="noopener noreferrer">Ver inscrições</a>
          <a className="btn sec" href={LINKS.senai} target="_blank" rel="noopener noreferrer">Site do SENAI/SC</a>
        </div>
      </div>

      <div className="wrap rodape-grade">
        <div className="rodape-col">
          <p className="rodape-tit">Navegação</p>
          <ul className="rodape-lista">
            {MENU.map(({ href, label }) => <li key={href}><a href={href}>{label}</a></li>)}
          </ul>
        </div>
        <div className="rodape-col">
          <p className="rodape-tit">Unidade</p>
          <address>
            Rodovia BR-101, km 211, nº 7235<br />
            Distrito Industrial<br />
            São José – SC · CEP 88104-800
          </address>
        </div>
        <div className="rodape-col">
          <p className="rodape-tit">Cursos na unidade</p>
          <ul className="rodape-lista">
            <li>Desenvolvimento de Sistemas</li>
            {OUTROS_CURSOS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>

      <div className="rodape-base">
        <div className="wrap rodape-base-in">
          <p>© {ano} · Projeto ilustrativo, sem vínculo oficial com o SENAI.</p>
          <p className="credito">
            Desenvolvido por <strong>{AUTOR}</strong>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${AUTOR}`}>
              <IconeGithub /> GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useRevelar()

  return (
    <>
      <a className="pular" href="#curso">Ir para o conteúdo</a>
      <Topo />
      <main>
        <Hero />
        <Ficha />

        <Secao
          id="curso"
          titulo="O que faz um desenvolvedor de sistemas"
          intro="É o profissional que transforma uma necessidade em um programa que funciona. Aplicativos de banco, sistemas de empresas, sites e plataformas de entrega passam por esse trabalho."
        >
          <Cards itens={ATUACAO} />
        </Secao>

        <Banner
          img={bannerSobre}
          rotulo="Para quem é"
          titulo="Tecnologia começa com curiosidade"
          texto="Você não precisa saber programar para começar. O curso parte do básico e avança de forma gradual."
        />

        <Secao id="perfil" titulo="Este curso é para você se...">
          <Marcadores itens={PERFIL} duplo />
        </Secao>

        <Secao
          id="estrutura"
          alt
          titulo="Estrutura do curso"
          intro="Exemplo de organização por etapas do ciclo de vida de um sistema. A distribuição exata das unidades curriculares segue o plano de curso da unidade."
        >
          <Cards itens={MODULOS} numerado />
        </Secao>

        <Secao
          id="conteudo"
          titulo="O que você vai estudar"
          intro="Os temas vão da base da programação até a implantação de sistemas completos. Linguagens e ferramentas específicas podem variar conforme a turma."
        >
          <dl className="lista">
            {CONTEUDO.map(({ titulo, texto }) => (
              <div className="lista-linha" key={titulo}><dt>{titulo}</dt><dd>{texto}</dd></div>
            ))}
          </dl>
        </Secao>

        <Banner
          img={bannerTecnologias}
          rotulo="Tecnologias"
          titulo="Ferramentas usadas no mercado"
          texto="Do código ao banco de dados, você conhece as tecnologias que sustentam sistemas reais."
        />

        <Secao
          id="tecnologias"
          titulo="Tecnologias e metodologia"
          intro="Exemplos do que costuma aparecer na formação. A lista pode mudar conforme a turma e a atualização do curso."
        >
          <ul className="chips">
            {TECNOLOGIAS.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <Cards itens={METODOLOGIA} />
        </Secao>

        <Secao id="competencias" alt titulo="Competências que você desenvolve">
          <Marcadores itens={COMPETENCIAS} duplo />
        </Secao>

        <Banner
          img={bannerUnidade}
          rotulo="Onde estudar"
          titulo="SENAI São José"
          texto="Unidade na Grande Florianópolis, com cursos técnicos voltados à tecnologia."
        />

        <Secao
          id="unidade"
          titulo="Conheça a unidade"
          intro="O SENAI é a instituição de educação profissional da indústria, e em Santa Catarina atua com unidades em diversas cidades. A de São José fica na Grande Florianópolis e concentra cursos voltados à tecnologia."
        >
          <div className="duas">
            <div className="painel">
              <h3>Cursos técnicos de tecnologia</h3>
              <p className="mudo">Além de Desenvolvimento de Sistemas, as edições recentes incluíram:</p>
              <Marcadores itens={OUTROS_CURSOS} />
            </div>
            <div className="painel">
              <h3>Endereço</h3>
              <address>
                Rodovia BR-101, km 211, nº 7235<br />
                Distrito Industrial, São José – SC<br />
                CEP 88104-800
              </address>
              <p className="mudo">Confirme o endereço e os horários de atendimento no site do SENAI/SC antes da visita.</p>
            </div>
          </div>
        </Secao>

        <Secao
          id="mercado"
          alt
          titulo="Possibilidades profissionais"
          intro="Tecnologia está presente em indústria, saúde, finanças, comércio e educação, e as oportunidades vão além das empresas de software."
        >
          <Marcadores itens={MERCADO} duplo />
        </Secao>

        <Banner
          img={bannerIngresso}
          rotulo="Ingresso"
          titulo="Três etapas para começar"
          texto="Inscrição online, visita à unidade e divulgação do resultado."
        />

        <Secao
          id="ingresso"
          titulo="Como ingressar"
          intro="No processo dos cursos técnicos gratuitos do SENAI/SC, voltado a estudantes da rede estadual, a seleção seguiu três etapas. Confira o edital vigente para saber prazos, vagas e requisitos."
        >
          <ol className="etapas">
            {ETAPAS.map(({ titulo, texto }) => (
              <li key={titulo}><h3>{titulo}</h3><p>{texto}</p></li>
            ))}
          </ol>
          <div className="centro">
            <a className="btn azul" href={LINKS.inscricao} target="_blank" rel="noopener noreferrer">
            Acessar página de inscrição
          </a>
          </div>
        </Secao>

        <Secao id="faq" alt titulo="Perguntas frequentes">
          <div className="faq">
            {FAQ.map(({ pergunta, resposta }) => (
              <details key={pergunta}><summary>{pergunta}</summary><p>{resposta}</p></details>
            ))}
          </div>
        </Secao>
      </main>
      <Rodape />
      <VoltarAoTopo />
    </>
  )
}
