// AMM — Motor de Búsqueda Inteligente Semántico
class AMMSearchEngine {
  constructor() {
    this.synonyms = {
      "protector": ["protectores de columna", "esquinero", "goma", "amortiguador", "golpes", "columna"],
      "columna": ["protectores de columna", "pintura en columnas", "esquinero", "sótano"],
      "esquina": ["protectores de columna", "esquinero de caucho"],
      "pintar": ["trazo y pintura", "pintura en columnas", "pintura en rampas de estacionamiento", "mantenimiento de estacionamientos", "señalizacion-horizontal"],
      "pintura": ["trazo y pintura", "señalizacion-horizontal", "pintura en columnas", "pintura en rampas"],
      "rampa": ["pintura en rampas de estacionamiento", "antiderrapante", "reductores-topes", "vialetas"],
      "resbaloso": ["pintura en rampas de estacionamiento", "antiderrapante"],
      "estacionamiento": ["mantenimiento de estacionamientos", "trazo y pintura", "barreras-estacionamiento", "reductores-topes"],
      "discapacitado": ["cajones de discapacitados", "accesibilidad", "silla de ruedas", "azul", "franja de ascenso"],
      "discapacidad": ["cajones de discapacitados", "senales-normativas"],
      "tope": ["reductor de velocidad y topes", "speed bump", "caucho", "cajón"],
      "topes": ["reductor de velocidad y topes", "tope de estacionamiento"],
      "letrero": ["fabricacion-letreros-luminosos", "rotulacion", "totems", "senales-normativas"],
      "luminoso": ["fabricacion-letreros-luminosos", "totems", "led"],
      "luz": ["fabricacion-letreros-luminosos", "vialetas", "totems"],
      "valet": ["podiums de valet", "recepcion de llaves", "cajón"],
      "llaves": ["podiums de valet"],
      "boya": ["boyas y botones", "tachuela", "reductor sonoro"],
      "boyas": ["boyas y botones", "vialetas"],
      "vialeta": ["vialetas", "ojo de gato", "catadióptrico", "solar led"],
      "vialetas": ["vialetas", "tachuelas"],
      "cono": ["conos", "seguridad vial", "naranja", "obra"],
      "conos": ["conos", "barricadas"],
      "barrera": ["barreras de estacionamiento", "new jersey", "pluma automatica"],
      "pluma": ["barreras de estacionamiento"],
      "norma": ["senales-normativas", "asesoria de senalizacion", "nom-003", "stps", "proteccion civil"],
      "proteccion civil": ["senales-normativas", "asesoria de senalizacion", "fotoluminiscente"],
      "evacuacion": ["senales-normativas"],
      "extintor": ["senales-normativas"],
      "totem": ["totems", "directorio", "wayfinding"],
      "rotulacion": ["rotulacion", "letras 3d", "vinil", "numeracion"]
    };
  }

  normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  search(query) {
    const rawQuery = query ? query.trim() : "";
    const cleanQuery = this.normalize(rawQuery);

    if (!cleanQuery) {
      return {
        query: rawQuery,
        products: [],
        services: [],
        projects: [],
        resources: [],
        faqs: [],
        total: 0,
        suggestAssistance: false
      };
    }

    const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);

    // Expand search with synonym tags
    const expandedTerms = new Set(tokens);
    tokens.forEach(token => {
      Object.keys(this.synonyms).forEach(key => {
        if (token.includes(key) || key.includes(token)) {
          this.synonyms[key].forEach(syn => {
            this.normalize(syn).split(/\s+/).forEach(st => expandedTerms.add(st));
          });
        }
      });
    });

    const searchTerms = Array.from(expandedTerms);

    // Helper match function
    const matchesTarget = (text) => {
      if (!text) return 0;
      const normalizedText = this.normalize(text);
      let score = 0;
      if (normalizedText.includes(cleanQuery)) score += 10;
      searchTerms.forEach(term => {
        if (normalizedText.includes(term)) score += 2;
      });
      return score;
    };

    // 1. Search Products & Product Categories
    const matchedProducts = [];
    AMM_DATA.productCategories.forEach(cat => {
      const catScore = matchesTarget(cat.name + " " + cat.shortDesc + " " + cat.applications);
      if (catScore > 0) {
        matchedProducts.push({
          type: "category",
          id: cat.id,
          title: cat.name,
          subtitle: `Categoría (${cat.products.length} productos)`,
          desc: cat.shortDesc,
          image: cat.image,
          score: catScore + 5,
          targetId: cat.id
        });
      }

      cat.products.forEach(prod => {
        const prodScore = matchesTarget(
          prod.name + " " + prod.sku + " " + prod.description + " " + prod.material + " " + prod.applications + " " + cat.name
        );
        if (prodScore > 0) {
          matchedProducts.push({
            type: "product",
            id: prod.id,
            title: prod.name,
            subtitle: cat.name,
            desc: prod.description,
            sku: prod.sku,
            image: cat.image,
            score: prodScore,
            category: cat,
            item: prod
          });
        }
      });
    });

    // 2. Search Services
    const matchedServices = [];
    AMM_DATA.services.forEach(serv => {
      const servScore = matchesTarget(
        serv.name + " " + serv.shortDesc + " " + serv.includes.join(" ") + " " + serv.benefits.join(" ")
      );
      if (servScore > 0) {
        matchedServices.push({
          type: "service",
          id: serv.id,
          title: serv.name,
          subtitle: "Servicio Especializado AMM",
          desc: serv.shortDesc,
          image: serv.image,
          score: servScore + 3,
          item: serv
        });
      }
    });

    // 3. Search Projects
    const matchedProjects = [];
    AMM_DATA.projects.forEach(proj => {
      const projScore = matchesTarget(
        proj.title + " " + proj.category + " " + proj.need + " " + proj.solution + " " + proj.location
      );
      if (projScore > 0) {
        matchedProjects.push({
          type: "project",
          id: proj.id,
          title: proj.title,
          subtitle: `${proj.category} · ${proj.location}`,
          desc: proj.solution,
          image: proj.image,
          score: projScore,
          item: proj
        });
      }
    });

    // 4. Search Resources
    const matchedResources = [];
    AMM_DATA.resources.forEach(rec => {
      const recScore = matchesTarget(rec.title + " " + rec.category + " " + rec.desc);
      if (recScore > 0) {
        matchedResources.push({
          type: "resource",
          id: rec.id,
          title: rec.title,
          subtitle: `${rec.category} · ${rec.type} (${rec.size})`,
          desc: rec.desc,
          score: recScore,
          item: rec
        });
      }
    });

    // 5. Search FAQs
    const matchedFaqs = [];
    AMM_DATA.faqs.forEach(faq => {
      const faqScore = matchesTarget(faq.q + " " + faq.a);
      if (faqScore > 0) {
        matchedFaqs.push({
          type: "faq",
          question: faq.q,
          answer: faq.a,
          score: faqScore
        });
      }
    });

    // Sort by score
    matchedProducts.sort((a, b) => b.score - a.score);
    matchedServices.sort((a, b) => b.score - a.score);
    matchedProjects.sort((a, b) => b.score - a.score);

    const total = matchedProducts.length + matchedServices.length + matchedProjects.length + matchedResources.length + matchedFaqs.length;

    return {
      query: rawQuery,
      products: matchedProducts.slice(0, 8),
      services: matchedServices.slice(0, 6),
      projects: matchedProjects.slice(0, 4),
      resources: matchedResources.slice(0, 4),
      faqs: matchedFaqs.slice(0, 3),
      total,
      suggestAssistance: total === 0 || total < 2
    };
  }
}

if (typeof window !== 'undefined') {
  window.AMMSearchEngine = AMMSearchEngine;
}
