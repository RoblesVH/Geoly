// ===== 1) DADOS =====
// MUDANÇA: cada bairro agora tem lat/lng (mapa real) em vez de "pontos" (SVG)

const bairros = [
  // Coordenadas já existentes no seu projeto
  { nome: "Centro",             mil: 12.017, real: true, lat: -25.0950, lng: -50.1620 },
  { nome: "Oficinas",           mil: 22.279, real: true, lat: -25.1080, lng: -50.1700 },
  { nome: "Uvaranas",           mil: 43.420, real: true, lat: -25.0960, lng: -50.1130 },
  { nome: "Nova Rússia",        mil: 15.801, real: true, lat: -25.0800, lng: -50.1900 },
  { nome: "Órfãs",              mil: 13.116, real: true, lat: -25.0780, lng: -50.1450 },
  { nome: "Jardim Carvalho",    mil: 22.606, real: true, lat: -25.1230, lng: -50.1850 },
  { nome: "Contorno",           mil: 40.173, real: true, lat: -25.1130, lng: -50.1450 },
  { nome: "Boa Vista",          mil: 28.304, real: true, lat: -25.0680, lng: -50.1700 },
  { nome: "Cará-Cará",          mil: 42.594, real: true, lat: -25.1680, lng: -50.1294 },
  { nome: "Olarias",            mil: 9.016,  real: true, lat: -25.1110, lng: -50.1420 },

  // Bairros acrescentados
  // Coordenadas aproximadas: validar os centroides antes de publicar
  { nome: "Neves",              mil: 33.516, real: true, lat: -25.0700, lng: -50.1050 },
  { nome: "Chapada",            mil: 21.341, real: true, lat: -25.0800, lng: -50.2200 },
  { nome: "Colônia Dona Luiza", mil: 18.518, real: true, lat: -25.1500, lng: -50.1700 },
  { nome: "Estrela",            mil: 8.566,  real: true, lat: -25.0850, lng: -50.1550 },
  { nome: "Ronda",              mil: 8.268,  real: true, lat: -25.0900, lng: -50.1800 },
  { nome: "Vila Ildemira",      mil: 7.022,  real: true, lat: -25.1450, lng: -50.1100 }
];


// MUDANÇA: nichos generalizados (a ordem dos números segue a ordem dos bairros acima)

const negocios = {
  "Gastronomia": {
    ideal: 2500,
    concorrentes: [
      30, 22, 24, 9, 10, 8, 6, 5, null, null,
      null, null, null, null, null, null
    ],
    palavras: [
      "gastronom", "restaurante", "cafe",
      "padaria", "lanchonete", "pizza"
    ]
  },

  "Imobiliário": {
    ideal: 6000,
    concorrentes: [
      8, 5, 4, 1, 2, 1, 2, 1, null, null,
      null, null, null, null, null, null
    ],
    palavras: [
      "imobiliaria", "imovel", "imoveis",
      "apartamento", "aluguel"
    ]
  },

  "Academias e bem-estar": {
    ideal: 5000,
    concorrentes: [
      9, 7, 8, 3, 4, 3, 2, 2, null, null,
      null, null, null, null, null, null
    ],
    palavras: [
      "academia", "treino", "fitness", "pilates"
    ]
  },

  "Saúde e hospitais": {
    ideal: 4000,
    concorrentes: [
      12, 6, 7, 2, 3, 2, 2, 1, null, null,
      null, null, null, null, null, null
    ],
    palavras: [
      "hospital", "clinica", "saude",
      "farmacia", "dentista"
    ]
  },

  "Beleza e estética": {
    ideal: 4500,
    concorrentes: [14, 10, 12, 6, 8, 7, 5, 5, null, null, null, null, null, null, null, null],
    palavras: ["beleza", "estetica", "salao", "barbearia", "cabeleireiro", "manicure", "unhas"]
  },

  "Pet shop e veterinária": {
    ideal: 6000,
    concorrentes: [8, 5, 7, 3, 4, 4, 3, 3, null, null, null, null, null, null, null, null],
    palavras: ["pet", "veterinaria", "veterinario", "banho e tosa", "racao", "animais"]
  },

  "Educação e cursos": {
    ideal: 7000,
    concorrentes: [7, 5, 6, 3, 4, 3, 2, 2, null, null, null, null, null, null, null, null],
    palavras: ["educacao", "curso", "escola", "idioma", "ingles", "reforco", "aula"]
  },

  "Moda e acessórios": {
    ideal: 3500,
    concorrentes: [18, 9, 7, 5, 6, 4, 3, 3, null, null, null, null, null, null, null, null],
    palavras: ["moda", "roupa", "vestuario", "calcado", "sapato", "acessorio", "loja de roupa"]
  },

  "Mercado e conveniência": {
    ideal: 3500,
    concorrentes: [10, 8, 12, 7, 6, 7, 5, 6, null, null, null, null, null, null, null, null],
    palavras: ["mercado", "mercearia", "conveniencia", "minimercado", "minimercado", "supermercado"]
  },

  "Serviços automotivos": {
    ideal: 8000,
    concorrentes: [12, 9, 7, 6, 5, 6, 6, 5, null, null, null, null, null, null, null, null],
    palavras: ["automotivo", "automotiva", "mecanica", "mecanico", "lava rapido", "borracharia", "troca de oleo"]
  },

  "Serviços para casa": {
    ideal: 6000,
    concorrentes: [6, 5, 4, 4, 3, 4, 3, 3, null, null, null, null, null, null, null, null],
    palavras: ["reforma", "reparo", "manutencao", "eletricista", "encanador", "limpeza", "construcao"]
  }
};



// ===== 2) ESTADO (o que está selecionado agora) =====
let negocioAtual = "Gastronomia";
let bairroSelecionado = -1;   // -1 = nenhum
const perfilPorNegocio = {
  "Gastronomia": "casual",
  "Imobiliário": "medio",
  "Academias e bem-estar": "bairro",
  "Saúde e hospitais": "particular",
  "Beleza e estética": "bairro",
  "Pet shop e veterinária": "loja",
  "Educação e cursos": "idiomas",
  "Moda e acessórios": "acessivel",
  "Mercado e conveniência": "conveniencia",
  "Serviços automotivos": "geral",
  "Serviços para casa": "reparos"
};
let pesoPoderCompra = 50;

const filtrosPorNegocio = {
  "Gastronomia": {
    titulo: "Perfil do restaurante", campo: "Posicionamento / ticket médio",
    criterio: "Renda compatível com ticket", descricao: "Escolha o posicionamento do restaurante e quanto a renda estimada deve influenciar a nota.",
    opcoes: { popular: { rotulo: "Popular · até R$ 35", alvo: 38 }, casual: { rotulo: "Casual · R$ 36 a R$ 90", alvo: 55 }, premium: { rotulo: "Premium · R$ 91 a R$ 180", alvo: 75 }, luxo: { rotulo: "Alta gastronomia · acima de R$ 180", alvo: 90 } }
  },
  "Imobiliário": {
    titulo: "Perfil imobiliário", campo: "Faixa de imóvel e cliente", criterio: "Renda compatível com imóvel", descricao: "A faixa de imóvel ajuda a priorizar bairros com público compatível com o padrão de compra ou locação.",
    opcoes: { economico: { rotulo: "Econômico · entrada / habitação popular", alvo: 38 }, medio: { rotulo: "Médio · padrão intermediário", alvo: 58 }, alto: { rotulo: "Alto padrão · imóveis valorizados", alvo: 78 }, luxo: { rotulo: "Luxo · alto valor", alvo: 92 } }
  },
  "Academias e bem-estar": {
    titulo: "Perfil da academia", campo: "Modelo e mensalidade", criterio: "Renda compatível com plano", descricao: "Compare um modelo de academia e plano mensal com o perfil de consumo estimado do entorno.",
    opcoes: { bairro: { rotulo: "Academia de bairro · até R$ 100/mês", alvo: 40 }, completa: { rotulo: "Academia completa · R$ 101 a R$ 220/mês", alvo: 58 }, boutique: { rotulo: "Estúdio boutique · R$ 221 a R$ 400/mês", alvo: 76 }, premium: { rotulo: "Clube premium · acima de R$ 400/mês", alvo: 90 } }
  },
  "Saúde e hospitais": {
    titulo: "Perfil do serviço de saúde", campo: "Público e faixa de preço", criterio: "Renda compatível com serviço", descricao: "Ajuste o público e o nível de preço do serviço; necessidade de saúde não é medida apenas por renda.",
    opcoes: { popular: { rotulo: "Popular · preço acessível", alvo: 38 }, particular: { rotulo: "Particular · preço intermediário", alvo: 60 }, especializado: { rotulo: "Especializado · ticket alto", alvo: 78 }, premium: { rotulo: "Premium · alto padrão", alvo: 90 } }
  },
  "Beleza e estética": {
    titulo: "Perfil do negócio de beleza", campo: "Serviço e faixa de preço", criterio: "Público compatível com serviço", descricao: "Escolha entre serviços de bairro, salão completo ou atendimento premium.",
    opcoes: { bairro: { rotulo: "Barbearia / salão de bairro", alvo: 42 }, completo: { rotulo: "Salão completo e manicure", alvo: 58 }, estetica: { rotulo: "Estética especializada", alvo: 72 }, premium: { rotulo: "Beleza premium", alvo: 88 } }
  },
  "Pet shop e veterinária": {
    titulo: "Perfil do negócio pet", campo: "Serviço e faixa de preço", criterio: "Público compatível com serviço pet", descricao: "Compare loja de produtos, banho e tosa ou atendimento veterinário com o perfil de consumo estimado.",
    opcoes: { basico: { rotulo: "Banho e tosa acessível", alvo: 42 }, loja: { rotulo: "Pet shop de bairro", alvo: 55 }, veterinaria: { rotulo: "Clínica veterinária", alvo: 68 }, premium: { rotulo: "Pet care premium", alvo: 84 } }
  },
  "Educação e cursos": {
    titulo: "Perfil do negócio de educação", campo: "Curso e faixa de preço", criterio: "Público compatível com curso", descricao: "Escolha o formato do curso; a análise atual não mede idade, escolaridade ou demanda por disciplina.",
    opcoes: { reforco: { rotulo: "Reforço escolar acessível", alvo: 42 }, idiomas: { rotulo: "Idiomas e cursos livres", alvo: 58 }, profissional: { rotulo: "Curso profissionalizante", alvo: 62 }, premium: { rotulo: "Escola / curso premium", alvo: 82 } }
  },
  "Moda e acessórios": {
    titulo: "Perfil da loja de moda", campo: "Público e faixa de preço", criterio: "Público compatível com preço", descricao: "Ajuste o posicionamento da loja; estoque, fluxo de pedestres e compras online não são medidos nesta versão.",
    opcoes: { acessivel: { rotulo: "Moda acessível", alvo: 42 }, casual: { rotulo: "Moda casual intermediária", alvo: 58 }, boutique: { rotulo: "Boutique / marcas selecionadas", alvo: 76 }, premium: { rotulo: "Moda premium", alvo: 88 } }
  },
  "Mercado e conveniência": {
    titulo: "Perfil do comércio de alimentos", campo: "Formato da loja", criterio: "Público compatível com formato", descricao: "Escolha mercearia, minimercado ou conveniência; logística e fluxo de passagem ainda não entram na nota.",
    opcoes: { mercearia: { rotulo: "Mercearia de bairro", alvo: 42 }, conveniencia: { rotulo: "Loja de conveniência", alvo: 58 }, minimercado: { rotulo: "Minimercado", alvo: 52 }, especializado: { rotulo: "Empório especializado", alvo: 78 } }
  },
  "Serviços automotivos": {
    titulo: "Perfil do serviço automotivo", campo: "Especialidade e faixa de preço", criterio: "Público compatível com serviço", descricao: "Selecione oficina geral, serviço rápido ou especializado; frota de veículos e tráfego não são medidos nesta versão.",
    opcoes: { acessivel: { rotulo: "Serviço rápido / acessível", alvo: 45 }, geral: { rotulo: "Oficina mecânica geral", alvo: 55 }, especializado: { rotulo: "Especialista / centro automotivo", alvo: 70 }, premium: { rotulo: "Serviço automotivo premium", alvo: 84 } }
  },
  "Serviços para casa": {
    titulo: "Perfil dos serviços para casa", campo: "Tipo de serviço", criterio: "Público compatível com serviço", descricao: "Use como triagem para reparos e serviços residenciais; quantidade de imóveis e idade das construções não são consideradas.",
    opcoes: { reparos: { rotulo: "Reparos e manutenção", alvo: 45 }, limpeza: { rotulo: "Limpeza residencial", alvo: 50 }, reforma: { rotulo: "Reformas e instalação", alvo: 62 }, projetos: { rotulo: "Projetos e acabamento premium", alvo: 80 } }
  }
};

// Índice demonstrativo (0–100), na mesma ordem do vetor bairros. Não é dado oficial.
const indicePoderCompra = [70, 60, 52, 65, 80, 75, 48, 50, 42, 85, 45, 45, 50, 90, 75, 40];

function perfilAtual() {
  return filtrosPorNegocio[negocioAtual].opcoes[perfilPorNegocio[negocioAtual]];
}



// ===== 3) FUNÇÕES AUXILIARES =====
function pegar(id) {
  return document.getElementById(id);
}

// MUDANÇA: o mapa Leaflet pinta com hexadecimal (não aceita var(--alto))
function corHex(pontos) {
  if (pontos >= 70) return "#1FAA6D";
  if (pontos >= 45) return "#FF9F43";
  return "#E11D48";
}

// (a função centro(i) foi apagada: o mapa real não precisa dela)



// ===== 4) CÁLCULO DA PONTUAÇÃO =====
function calcular() {
  const lista = [];
  for (let i = 0; i < bairros.length; i++) {
    const moradores = bairros[i].mil * 1000;
    const conc = negocios[negocioAtual].concorrentes[i];
    const conhecido = conc !== null && Number.isFinite(conc);
    const habPorConc = conhecido ? moradores / Math.max(conc, 0.5) : 0;
    const demanda = Math.max(5, Math.min(98, Math.round(habPorConc / negocios[negocioAtual].ideal * 55)));
    let pontos = conhecido ? demanda : 0;
    let renda = null;
    let aderenciaRenda = null;
    if (conhecido) {
      renda = indicePoderCompra[i];
      const alvo = perfilAtual().alvo;
      aderenciaRenda = Math.max(0, 100 - Math.abs(renda - alvo) * 1.5);
      const peso = pesoPoderCompra / 100;
      pontos = Math.round(demanda * (1 - peso) + aderenciaRenda * peso);
    }
    pontos = Math.max(5, Math.min(98, pontos));
    lista.push({ nome: bairros[i].nome, moradores: moradores, conc: conc, habPorConc: habPorConc, pontos: pontos, demanda: demanda, renda: renda, aderenciaRenda: aderenciaRenda, conhecido: conhecido });
  }
  return lista;
}



// ===== 5) MAPA REAL (Leaflet) =====
const mapaLeaflet = L.map("mapa").setView([-25.095, -50.145], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap"
}).addTo(mapaLeaflet);

const camada = L.layerGroup().addTo(mapaLeaflet);

// --- Divisão da cidade em áreas (uma por bairro) ---
// Limite aproximado da área urbana: [sul, oeste] até [norte, leste]
const LIMITE = { sul: -25.170, norte: -25.020, oeste: -50.260, leste: -50.040 };

// Corrige a distorção de longitude para as distâncias ficarem proporcionais
const K = Math.cos(25.1 * Math.PI / 180);

function paraXY(lat, lng) { return { x: lng * K, y: lat }; }
function paraLatLng(p)    { return [p.y, p.x / K]; }

// Corta um polígono, mantendo só o lado mais próximo de "a" (e não de "b")
function recortar(poligono, a, b) {
  const nx = b.x - a.x, ny = b.y - a.y;
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const lado = p => (p.x - mx) * nx + (p.y - my) * ny;   // <= 0 : lado do "a"
  const saida = [];

  for (let i = 0; i < poligono.length; i++) {
    const atual = poligono[i];
    const prox = poligono[(i + 1) % poligono.length];
    const fa = lado(atual), fb = lado(prox);

    if (fa <= 0) saida.push(atual);
    if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
      const t = fa / (fa - fb);
      saida.push({ x: atual.x + t * (prox.x - atual.x),
                   y: atual.y + t * (prox.y - atual.y) });
    }
  }
  return saida;
}

// Calcula UMA vez a área de cada bairro
const areasBairros = bairros.map(function (b, i) {
  const a = paraXY(b.lat, b.lng);
  let poligono = [
    paraXY(LIMITE.sul,   LIMITE.oeste),
    paraXY(LIMITE.sul,   LIMITE.leste),
    paraXY(LIMITE.norte, LIMITE.leste),
    paraXY(LIMITE.norte, LIMITE.oeste)
  ];
  bairros.forEach(function (outro, j) {
    if (i !== j) poligono = recortar(poligono, a, paraXY(outro.lat, outro.lng));
  });
  return poligono.map(paraLatLng);
});

// Nome do bairro sem acento e em minúsculas, para comparar com o arquivo
function chaveNome(texto) {
  return normalizar(texto).replace(/^jd\.?\s*/, "jardim ").trim();
}

function indiceDoBairro(feature) {
  const p = feature.properties || {};
  const nome = p.name || p.nome || p.NOME || p.bairro || p.BAIRRO || "";
  const chave = chaveNome(nome);
  for (let i = 0; i < bairros.length; i++) {
    if (chaveNome(bairros[i].nome) === chave) return i;
  }
  return -1;
}

function desenharMapa() {
  const dados = calcular();
  camada.clearLayers();
  const centros = {};

  // ---- COM o arquivo de bairros: formato real ----
  if (typeof geoBairros !== "undefined") {
    geoBairros.features.forEach(function (feature) {
      const i = indiceDoBairro(feature);

            if (i < 0) {
        // bairro sem dados no protótipo: cinza, com nome ao passar o mouse
        const nomeSemDados = (feature.properties && feature.properties.name) || "Bairro";
        L.geoJSON(feature, {
          style: { color: "#888", weight: 1, fillColor: "#bbb", fillOpacity: 0.25 },
          onEachFeature: function (f, layer) {
            layer.bindTooltip("<b>" + nomeSemDados + "</b><br>sem dados",
                              { sticky: true, className: "rotulo-mapa" });
            layer.on("click", function () {
              pegar("resposta").textContent =
                nomeSemDados + ": este protótipo ainda não tem dados de população e concorrentes para esse bairro.";
            });
          }
        }).addTo(camada);
        return;
      }

      const selecionado = (i === bairroSelecionado);
      L.geoJSON(feature, {
        style: {
          color: selecionado ? "#24101A" : "#fff",
          weight: selecionado ? 4 : 2,
          fillColor: dados[i].conhecido ? corHex(dados[i].pontos) : "#929292",
          fillOpacity: dados[i].conhecido ? 0.6 : 0.25
        },
        onEachFeature: function (f, layer) {
          centros[i] = layer.getBounds().getCenter();
          layer.bindTooltip("<b>" + bairros[i].nome + "</b><br>" + (dados[i].conhecido ? dados[i].pontos + " pontos" : "sem dados validados"),
                            { permanent: true, direction: "center", className: "rotulo-mapa" });
          layer.on("click", function () {
            bairroSelecionado = i;
            atualizarTudo();
          });
        }
      }).addTo(camada);
    });

  // ---- SEM o arquivo: áreas aproximadas (as de antes) ----
  } else {
    bairros.forEach(function (b, i) {
      const selecionado = (i === bairroSelecionado);
      L.polygon(areasBairros[i], {
        color: selecionado ? "#24101A" : "#fff",
        weight: selecionado ? 4 : 2,
        fillColor: dados[i].conhecido ? corHex(dados[i].pontos) : "#929292",
        fillOpacity: dados[i].conhecido ? 0.55 : 0.25
      })
      .bindTooltip("<b>" + b.nome + "</b><br>" + (dados[i].conhecido ? dados[i].pontos + " pontos" : "sem dados validados"),
                   { permanent: true, direction: "center", className: "rotulo-mapa" })
      .on("click", function () {
        bairroSelecionado = i;
        atualizarTudo();
      })
      .addTo(camada);
    });
  }

  if (bairroSelecionado >= 0) {
    const b = bairros[bairroSelecionado];
    mapaLeaflet.panTo(centros[bairroSelecionado] || [b.lat, b.lng]);
  }
}


// ===== 6) TEXTOS E RESPOSTA =====
function formatar(numero) {
  return Math.round(numero).toLocaleString("pt-BR");
}

function rotulo(pontos) {
  if (pontos >= 70) return "com espaço para crescer";
  if (pontos >= 45) return "equilibrado";
  return "saturado";
}

function indiceMelhor() {
  const lista = calcular();
  let melhor = lista.findIndex(x => x.conhecido);
  if (melhor < 0) return 0;
  for (let i = 1; i < lista.length; i++) {
    if (lista[i].conhecido && lista[i].pontos > lista[melhor].pontos) melhor = i;
  }
  return melhor;
}

function textoResposta(i) {
  const lista = calcular();
  const x = lista[i];
  const melhor = lista[indiceMelhor()];
  if (!x.conhecido) return `${x.nome}: ainda não há contagem de concorrentes validada para gerar uma recomendação. O bairro aparece cinza no mapa por falta de dados.`;
  let conselho = "";

  if (x.pontos >= 70) {
    conselho = "Vale visitar pontos comerciais na região.";
  } else if (x.pontos >= 45) {
    conselho = "Você precisa de um diferencial para se destacar.";
  } else {
    conselho = `O melhor bairro para este setor é ${melhor.nome} (${melhor.pontos}).`;
  }

  const palavra = (x.conc === 1) ? "concorrente" : "concorrentes";
  // MUDANÇA: "para o setor de ..."
  const perfil = ` Perfil ${perfilAtual().rotulo}; aderência estimada de público ${Math.round(x.aderenciaRenda)}%.`;
  return `${x.nome} está ${rotulo(x.pontos)} para o setor de ${negocioAtual.toLowerCase()}. Pontuação ${x.pontos}. Há ${x.conc} ${palavra} para ${formatar(x.moradores / 1000)} mil moradores.${perfil} ${conselho}`;
}

// ===== 7) DESENHO DOS BOTÕES, NÚMEROS E RANKING =====
function desenharTipos() {
  let html = "";
  for (const nome in negocios) {
    const ativo = (nome === negocioAtual) ? "ativo" : "";
    html += `<button type="button" class="chip ${ativo}" data-tipo="${nome}">${nome}</button>`;
  }
  pegar("tipos").innerHTML = html;
  const filtros = pegar("filtros-tecnicos");
  if (filtros) filtros.hidden = false;
  desenharOpcoesFiltro();
  atualizarResumoFiltro();
}

function desenharOpcoesFiltro() {
  const config = filtrosPorNegocio[negocioAtual];
  pegar("filtros-titulo").textContent = config.titulo;
  pegar("perfil-label").textContent = config.campo;
  pegar("filtros-descricao").textContent = config.descricao;
  pegar("peso-renda-label").textContent = config.criterio;
  const select = pegar("perfil-restaurante");
  select.innerHTML = Object.entries(config.opcoes).map(([chave, opcao]) =>
    `<option value="${chave}">${opcao.rotulo}</option>`
  ).join("");
  select.value = perfilPorNegocio[negocioAtual];
}

function atualizarResumoFiltro() {
  const resumo = pegar("resumo-filtro");
  if (!resumo) return;
  resumo.innerHTML = `<strong>${perfilAtual().rotulo}</strong><span>Pontuação combina demanda (${100 - pesoPoderCompra}%) e ${filtrosPorNegocio[negocioAtual].criterio.toLowerCase()} estimada (${pesoPoderCompra}%).</span>`;
  pegar("peso-renda-valor").textContent = `${pesoPoderCompra}%`;
}

function desenharKpis() {
  if (bairroSelecionado < 0) {
    pegar("kpis").innerHTML = '<p class="an-vazio">Toque em um bairro do mapa para ver os números dele.</p>';
    return;
  }
  const x = calcular()[bairroSelecionado];
  const itens = [
    ["Moradores (est.)", formatar(x.moradores)],
    ["Concorrentes", x.conhecido ? x.conc : "sem dado"],
    ["Hab. por concorrente", x.conhecido ? formatar(x.habPorConc) : "—"],
    ["Referência saudável", formatar(negocios[negocioAtual].ideal)]
  ];

  let html = `<div class="col-12"><p class="an-nome-sel">${x.nome}</p></div>`;
  for (const [nome, valor] of itens) {
    html += `<div class="col-6"><div class="kpi"><span>${nome}</span><b>${valor}</b></div></div>`;
  }

  // Estacionamentos (OpenStreetMap)
  let textoEstac;
  if (typeof estacionamentos === "undefined" || estacionamentos === null) {
    textoEstac = "carregando...";
  } else if (estacionamentos === "erro") {
    textoEstac = "indisponível";
  } else {
    textoEstac = estacionamentos[bairroSelecionado];
  }
  html += `<div class="col-12"><div class="kpi"><span>Estacionamentos mapeados (OpenStreetMap)</span><b>${textoEstac}</b></div></div>`;

  pegar("kpis").innerHTML = html;
}

// NOVO: painel "Exemplo de análise" (usa os dados reais do setor selecionado)
function nivelDaNota(pontos) {
  if (pontos >= 70) return "Alta oportunidade";
  if (pontos >= 45) return "Equilibrado";
  return "Saturado";
}

function desenharAnalise() {
  const ordem = calcular().filter(x => x.conhecido).sort(function (a, b) {
    return b.pontos - a.pontos;                  // do maior para o menor
  });
  const topo = ordem[0];
  const cor = corHex(topo.pontos);
  const ideal = negocios[negocioAtual].ideal;

  // título, nota e anel
  pegar("an-setor").textContent = negocioAtual.toLowerCase();
  pegar("an-nota").textContent = topo.pontos;
  pegar("an-anel").style.background =
    `conic-gradient(${cor} ${topo.pontos}%, rgba(255,255,255,0.15) 0)`;

  // nome, veredito e frase em linguagem simples
  pegar("an-bairro").textContent = topo.nome;
  const nivel = pegar("an-nivel");
  nivel.textContent = nivelDaNota(topo.pontos);
  nivel.style.background = cor;
  pegar("an-frase").textContent =
    `${formatar(topo.moradores / 1000)} mil moradores, ${topo.conc} concorrentes e aderência estimada ao perfil em ${Math.round(topo.aderenciaRenda)}%.`;

  // números principais
  const itens = [
    ["Concorrentes", topo.conc],
    ["Moradores", formatar(topo.moradores / 1000) + " mil"],
    ["Mínimo saudável", formatar(ideal)]
  ];
  let stats = "";
  for (const [nome, valor] of itens) {
    stats += `<div class="col-4"><div class="kpi"><span>${nome}</span><b>${valor}</b></div></div>`;
  }
  pegar("an-stats").innerHTML = stats;

  // barra: quanto maior que a marca branca, melhor
  const razao = topo.habPorConc / ideal;                    // 1 = exatamente o ideal
  const largura = Math.min(razao / 1.5, 1) * 100;           // a marca fica em 66,7%
  pegar("an-barra-fill").style.width = largura + "%";
  pegar("an-barra-fill").style.background = cor;
  pegar("an-barra-valor").textContent =
    `${formatar(topo.habPorConc)} (mínimo ${formatar(ideal)})`;

  // ranking top 3
  let html = "";
  ordem.slice(0, 3).forEach(function (x, i) {
    html += `<li><span><em class="pos">${i + 1}</em>${x.nome}</span><b style="color:${corHex(x.pontos)}">${x.pontos}</b></li>`;
  });
  pegar("ranking").innerHTML = html;
}

function atualizarTudo() {
  desenharTipos();
  desenharMapa();
  desenharKpis();
  desenharAnalise();   // NOVO
  if (bairroSelecionado >= 0) {
    pegar("resposta").textContent = textoResposta(bairroSelecionado);
  }
}

// ===== 8) CLIQUES =====
// MUDANÇA: o clique no bairro agora é tratado dentro do Leaflet (.on("click")),
// então aqui sobrou só o clique nos botões de setor.
document.addEventListener("click", function (evento) {
  const botaoTipo = evento.target.closest("[data-tipo]");

  if (botaoTipo) {
    negocioAtual = botaoTipo.dataset.tipo;
    atualizarTudo();
  }
});

pegar("perfil-restaurante").addEventListener("change", function (evento) {
  perfilPorNegocio[negocioAtual] = evento.target.value;
  atualizarTudo();
});
pegar("peso-renda").addEventListener("input", function (evento) {
  pesoPoderCompra = Number(evento.target.value);
  atualizarTudo();
});

// ===== 9) PERGUNTA EM LINGUAGEM NATURAL =====
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function perguntar(texto) {
  if (texto.trim() === "") return;

  const palavrasDoTexto = normalizar(texto).split(/\W+/);
  const textoLimpo = normalizar(texto);
  let tipoAchado = null;
  let bairroAchado = -1;

  for (const nome in negocios) {
    for (const palavra of negocios[nome].palavras) {
      for (const p of palavrasDoTexto) {
        if (p.startsWith(palavra)) {
          tipoAchado = nome;
        }
      }
    }
  }

  for (let i = 0; i < bairros.length; i++) {
    const nomeBairro = normalizar(bairros[i].nome).replace("jd. ", "");
    if (textoLimpo.includes(nomeBairro)) {
      bairroAchado = i;
    }
  }

  let aviso = "";
  if (tipoAchado !== null) {
    negocioAtual = tipoAchado;
  } else {
    aviso = `Não identifiquei o setor, então usei “${negocioAtual}”. `;
  }

  const termosPerfil = {
    "Gastronomia": [[/\b(luxo|alta gastronomia|5 estrelas|cinco estrelas|fine dining)\b/, "luxo"], [/\b(premium|sofisticado|alto padrao)\b/, "premium"], [/\b(popular|barato|economico|baixo custo)\b/, "popular"], [/\b(casual|ticket medio)\b/, "casual"]],
    "Imobiliário": [[/\b(luxo|alto valor)\b/, "luxo"], [/\b(alto padrao|valorizado)\b/, "alto"], [/\b(economico|popular|entrada)\b/, "economico"], [/\b(medio|intermediario)\b/, "medio"]],
    "Academias e bem-estar": [[/\b(boutique|estudio)\b/, "boutique"], [/\b(premium|clube)\b/, "premium"], [/\b(completa)\b/, "completa"], [/\b(bairro|barata)\b/, "bairro"]],
    "Saúde e hospitais": [[/\b(premium|alto padrao)\b/, "premium"], [/\b(especializado|especializada|especialidade)\b/, "especializado"], [/\b(popular|acessivel|baixo custo)\b/, "popular"], [/\b(particular|clinica)\b/, "particular"]],
    "Beleza e estética": [[/\b(premium|alto padrao)\b/, "premium"], [/\b(estetica|especializada)\b/, "estetica"], [/\b(completo|completa|manicure)\b/, "completo"], [/\b(barbearia|bairro|acessivel)\b/, "bairro"]],
    "Pet shop e veterinária": [[/\b(premium)\b/, "premium"], [/\b(veterinaria|veterinario|clinica)\b/, "veterinaria"], [/\b(banho|tosa|acessivel)\b/, "basico"], [/\b(pet shop|loja)\b/, "loja"]],
    "Educação e cursos": [[/\b(premium|alto padrao)\b/, "premium"], [/\b(profissionalizante|profissional)\b/, "profissional"], [/\b(ingles|idioma|idiomas|curso livre)\b/, "idiomas"], [/\b(reforco|aula particular)\b/, "reforco"]],
    "Moda e acessórios": [[/\b(premium|alto padrao)\b/, "premium"], [/\b(boutique|marcas selecionadas)\b/, "boutique"], [/\b(casual|intermediaria)\b/, "casual"], [/\b(popular|acessivel|barata)\b/, "acessivel"]],
    "Mercado e conveniência": [[/\b(emporio|especializado)\b/, "especializado"], [/\b(minimercado)\b/, "minimercado"], [/\b(conveniencia)\b/, "conveniencia"], [/\b(mercearia|bairro)\b/, "mercearia"]],
    "Serviços automotivos": [[/\b(premium|alto padrao)\b/, "premium"], [/\b(especialista|especializado|centro automotivo)\b/, "especializado"], [/\b(geral|mecanica|mecanico)\b/, "geral"], [/\b(rapido|acessivel)\b/, "acessivel"]],
    "Serviços para casa": [[/\b(premium|projeto|projetos|acabamento)\b/, "projetos"], [/\b(reforma|reformas|instalacao)\b/, "reforma"], [/\b(limpeza|faxina)\b/, "limpeza"], [/\b(reparo|reparos|manutencao)\b/, "reparos"]]
  };
  const perfilEncontrado = termosPerfil[negocioAtual].find(([regex]) => regex.test(textoLimpo));
  if (perfilEncontrado) perfilPorNegocio[negocioAtual] = perfilEncontrado[1];

  bairroSelecionado = (bairroAchado >= 0) ? bairroAchado : indiceMelhor();
  atualizarTudo();
  pegar("resposta").textContent = aviso + textoResposta(bairroSelecionado);
}

// ===== 10) EXEMPLOS CLICÁVEIS =====
// MUDANÇA: só 3, genéricos (cada um tem uma palavra-chave dos setores)
const exemplos = [
  "Onde abrir um restaurante premium?",
  "Vale abrir uma imobiliária em Uvaranas?",
  "Qual bairro precisa de uma clínica?",
  "Onde abrir uma barbearia?",
  "Pet shop em Uvaranas?",
  "Qual bairro para reforço escolar?",
  "Vale abrir uma loja de roupas popular?",
  "Onde montar um minimercado?"
];

function desenharExemplos() {
  let html = "";
  for (const texto of exemplos) {
    html += `<button type="button" class="chip chip-escuro" data-pergunta="${texto}">${texto}</button>`;
  }
  pegar("exemplos").innerHTML = html;
}

document.addEventListener("click", function (evento) {
  const exemplo = evento.target.closest("[data-pergunta]");
  if (exemplo) {
    pegar("pergunta").value = exemplo.dataset.pergunta;
    perguntar(exemplo.dataset.pergunta);
  }
});

pegar("btn-perguntar").addEventListener("click", function () {
  perguntar(pegar("pergunta").value);
});

pegar("pergunta").addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    perguntar(pegar("pergunta").value);
  }
});

// ===== 11) ESTACIONAMENTOS (dados do OpenStreetMap) =====
let estacionamentos = null;   // null = carregando | "erro" | lista com um número por bairro

// Diz se um ponto (lat, lng) está dentro de um polígono
function pontoNoPoligono(lat, lng, poli) {
  let dentro = false;
  for (let i = 0, j = poli.length - 1; i < poli.length; j = i++) {
    const yi = poli[i][0], xi = poli[i][1];
    const yj = poli[j][0], xj = poli[j][1];
    if (((yi > lat) !== (yj > lat)) &&
        (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      dentro = !dentro;
    }
  }
  return dentro;
}

async function carregarEstacionamentos() {
  const area = `${LIMITE.sul},${LIMITE.oeste},${LIMITE.norte},${LIMITE.leste}`;
  const consulta = `[out:json][timeout:25];
    (node["amenity"="parking"](${area});
     way["amenity"="parking"](${area});
     relation["amenity"="parking"](${area}););
    out center;`;

  try {
    const resposta = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: new URLSearchParams({ data: consulta })
    });
    const json = await resposta.json();

    const contagem = bairros.map(function () { return 0; });
    json.elements.forEach(function (el) {
      const lat = (el.lat !== undefined) ? el.lat : (el.center && el.center.lat);
      const lng = (el.lon !== undefined) ? el.lon : (el.center && el.center.lon);
      if (lat === undefined || lng === undefined) return;

      for (let i = 0; i < areasBairros.length; i++) {
        if (pontoNoPoligono(lat, lng, areasBairros[i])) {
          contagem[i]++;
          break;
        }
      }
    });
    estacionamentos = contagem;
  } catch (erro) {
    estacionamentos = "erro";
  }
  desenharKpis();
}
// ===== INICIALIZAÇÃO (sempre no FIM do arquivo) =====
desenharExemplos();
atualizarTudo();
carregarEstacionamentos();
