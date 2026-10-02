// AMM — Asistente Virtual Inteligente (IA Integral Basada en Todo el Contenido y Archivos de AMM)
class AMMAssistant {
  constructor() {
    this.history = [];
    this.buildIndexedKnowledge();
  }

  normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/gi, ' ')
      .trim();
  }

  buildIndexedKnowledge() {
    // Definición de palabras clave e indexación semántica profunda
    this.categoryKeywords = {
      "alineadores": ["alineador", "alineadores", "delimitador", "poste flexible", "hito", "encauzamiento", "retorno", "caseta"],
      "barreras-estacionamiento": ["barrera", "barreras", "new jersey", "pluma", "plumas", "automatica", "control de acceso", "mastil", "mástil"],
      "barricadas": ["barricada", "barricadas", "desvio", "desvío", "obra", "cierre de carril", "tipo 3", "tipo iii", "sict"],
      "boyas-botones": ["boya", "boyas", "boton", "botones", "tachuela", "tachuelas", "metalica", "metálica", "cerámico", "calibre 10", "reductor sonoro"],
      "burros": ["burro", "burros", "caballete", "caballetes", "piso mojado", "precaucion", "precaución", "portatil", "portátil"],
      "conos": ["cono", "conos", "pvc", "cono vial", "cono naranja", "cono con reflejante", "cono flexible", "lastrado"],
      "podiums-valet": ["podium", "podiums", "valet", "valet parking", "llaves", "porta boletos", "chapa bancaria", "caseta valet"],
      "protectores-columna": ["protector", "protectores", "esquinero", "esquineros", "columna", "columnas", "esquina", "esquinas", "golpe", "golpes", "amortiguador", "caucho"],
      "reductores-topes": ["tope", "topes", "reductor", "reductores", "velocidad", "speed bump", "tope de cajon", "tope de estacionamiento", "caucho macizo"],
      "senales-normativas": ["senal", "señal", "senales", "señales", "senaletica", "señalética", "letrero", "letreros", "proteccion civil", "protección civil", "nom 003", "nom 026", "stps", "segob", "evacuacion", "evacuación", "extintor", "extintores", "salida de emergencia", "fotoluminiscente"],
      "senalizacion-horizontal": ["pintura de trafico", "pintura vial", "microesfera", "microesferas", "retroreflejante", "lineas", "líneas", "cebra", "paso peatonal", "flechas"],
      "totems": ["totem", "tótem", "totems", "tótems", "directorio", "wayfinding", "columna informativa", "backlight", "directorio comercial"],
      "vialetas": ["vialeta", "vialetas", "ojo de gato", "catadioptrico", "catadióptrico", "solar led", "reflejante", "tachuela solar"],
      "rotulacion": ["rotulacion", "rotulación", "vinil", "vinilo", "letras 3d", "canal", "esmerilado", "cristal", "logo en piso", "acero inoxidable"]
    };

    this.serviceKeywords = {
      "asesoria-senalizacion": ["asesoria", "asesoría", "auditoria", "auditoría", "dictamen", "normativa", "plano", "plan maestro", "semaforizacion", "semaforización", "circulacion"],
      "fabricacion-letreros-luminosos": ["letrero luminoso", "letreros luminosos", "caja de luz", "luz led", "anuncio luminoso", "marquesina", "fachada luminosa"],
      "cajones-discapacitados": ["discapacitado", "discapacitados", "discapacidad", "silla de ruedas", "movilidad reducida", "cajon azul", "cajón azul", "rampa discapacitados"],
      "mantenimiento-estacionamientos": ["mantenimiento", "lavado", "limpieza profunda", "hidrolavado", "desengrasado", "bacheo", "repintado general", "restauracion"],
      "pintura-columnas": ["pintura en columnas", "pintar columnas", "franjas amarillas", "franjas negras", "numeracion de nivel", "marcar columnas"],
      "pintura-rampas-estacionamiento": ["rampa", "rampas", "resbalosa", "derrape", "derrapes", "antiderrapante", "pendiente", "patinan", "resbala"],
      "rotulacion-servicios": ["rotulacion especializada", "rotular piso", "numerar cajones", "letras en muro", "vinil esmerilado"],
      "trazo-y-pintura": ["trazo", "trazar", "pintar cajones", "pintura de cajones", "airless", "lineas rectas", "achurado", "pintarrayas"]
    };
  }

  processMessage(userMessage) {
    const raw = userMessage ? userMessage.trim() : "";
    const clean = this.normalize(raw);

    // Saludo vacío inicial
    if (!clean) {
      return {
        reply: "Hola, soy el **Asistente Virtual de AMM**. Conozco todo el catálogo de productos, servicios, fichas técnicas y normativas de la empresa. ¿En qué podemos asesorarte hoy?",
        actions: [
          { label: "🅿️ Tengo un estacionamiento", action: "send_prompt", prompt: "Tengo un estacionamiento y necesito organizarlo" },
          { label: "🛡️ Protectores y Topes", action: "send_prompt", prompt: "¿Qué protectores de columna y topes tienen?" },
          { label: "♿ Cajones Discapacitados", action: "send_prompt", prompt: "¿Cómo deben ser los cajones para discapacitados?" },
          { label: "📋 Fichas Técnicas y Normas", action: "send_prompt", prompt: "¿Tienen fichas técnicas y guías de Protección Civil?" }
        ]
      };
    }

    // 1. SALUDOS Y CORTESÍA
    if (/^(hola|buenos dias|buenas tardes|buenas noches|saludos|que tal|hey|hi)\b/.test(clean)) {
      return {
        reply: `¡Hola! Bienvenido a **AMM (Señalización · Diseño · Construcción)**. 

Puedo brindarte información sobre:
• **Productos:** Topes, protectores de columna, boyas, vialetas, conos, barricadas, tótems y pintura vial.
• **Servicios:** Trazo airless, mantenimiento, pintura en columnas y rampas antiderrapantes, cajones accesibles.
• **Fichas Técnicas:** Especificaciones de materiales, medidas y normativas NOM-003 / SICT.

¿Qué tipo de proyecto o espacio deseas consultar?`,
        actions: [
          { label: "📦 Ver Catálogo de Productos", action: "view_page", target: "productos" },
          { label: "🛠️ Ver Servicios Especializados", action: "view_page", target: "servicios" },
          { label: "📄 Ver Fichas Técnicas", action: "view_page", target: "fichas-tecnicas" },
          { label: "💬 Hablar por WhatsApp", action: "open_whatsapp" }
        ]
      };
    }

    // 2. AGRADECIMIENTOS
    if (/^(gracias|muchas gracias|ok|perfecto|excelente|entendido|enterado)\b/.test(clean)) {
      return {
        reply: `¡Con gusto! En AMM estamos para resolver tu proyecto. Si deseas que un ingeniero revise tu caso o te cotice formalmente, podemos ayudarte de inmediato.`,
        actions: [
          { label: "📝 Solicitar Cotización", action: "open_quote", prefill: "Solicitud de cotización y asesoría" },
          { label: "💬 Chatear por WhatsApp", action: "open_whatsapp" },
          { label: "🏗️ Enviar Planos o Fotos", action: "open_project_modal" }
        ]
      };
    }

    // 3. PREGUNTAS DE CONTACTO (TELÉFONOS, DIRECCIÓN, HORARIOS, WHATSAPP)
    if (clean.includes("telefono") || clean.includes("numero") || clean.includes("llamar") || clean.includes("contacto")) {
      return {
        reply: `Puedes comunicarte directamente con AMM a través de nuestras líneas telefónicas oficiales:

📞 **Teléfonos de Oficina:**
• [55 5243-8189](tel:5552438189)
• [55 2966-6690](tel:5529666690)
• [55 4527-0729](tel:5545270729)

🟢 **WhatsApp Directo:** [55 2966-6690](https://wa.me/525529666690)
🕒 **Horario:** Lunes a viernes de 8:00 a 18:00 hrs.`,
        actions: [
          { label: "💬 Abrir Chat de WhatsApp", action: "open_whatsapp" },
          { label: "📍 Ver Ubicación en Contacto", action: "view_page", target: "contacto" }
        ]
      };
    }

    if (clean.includes("donde estan") || clean.includes("ubicacion") || clean.includes("direccion") || clean.includes("oficina") || clean.includes("sucursal")) {
      return {
        reply: `Nuestras oficinas centrales de atención y coordinación de proyectos se ubican en:

📍 **Dirección AMM:**
**Eje Central Lázaro Cárdenas #701 Bis, Int. 104 y 105, Ciudad de México.**

🕒 **Horario de atención:** Lunes a viernes de 8:00 a 18:00 hrs.
🚚 **Cobertura:** Atendemos la CDMX, Área Metropolitana y realizamos envíos y cuadrillas de instalación a toda la República Mexicana.`,
        actions: [
          { label: "📞 Ver Teléfonos y Contacto", action: "view_page", target: "contacto" },
          { label: "💬 Contactar por WhatsApp", action: "open_whatsapp" }
        ]
      };
    }

    if (clean.includes("horario") || clean.includes("abren") || clean.includes("cierran") || clean.includes("dias") || clean.includes("atencion")) {
      return {
        reply: `El horario oficial de atención en oficinas es:
**Lunes a viernes de 8:00 a 18:00 hrs.**

Para la ejecución de proyectos de trazo, pintura y mantenimiento en estacionamientos, contamos con **cuadrillas de trabajo nocturno y en fines de semana** para no interrumpir el flujo de vehículos de tu inmueble.`,
        actions: [
          { label: "📝 Solicitar Cotización de Proyecto", action: "open_quote", prefill: "Requiero trabajo nocturno / fines de semana" },
          { label: "💬 Consultar con un Asesor", action: "open_whatsapp" }
        ]
      };
    }

    // 4. COBERTURA Y ENVÍOS (MONTERREY, GUADALAJARA, QUERÉTARO, PROVINCIA)
    if (clean.includes("envio") || clean.includes("envios") || clean.includes("republica") || clean.includes("provincia") || clean.includes("monterrey") || clean.includes("guadalajara") || clean.includes("queretaro") || clean.includes("puebla") || clean.includes("toluca") || clean.includes("foraneo")) {
      return {
        reply: `**Sí, tenemos cobertura en todo México:**

1. **Suministro de Productos:** Enviamos piezas (topes, esquineros, boyas, vialetas, conos, pintura de tráfico) a cualquier ciudad de la República Mexicana mediante transportes consolidados y fleteras seguras.
2. **Proyectos 'Llave en Mano':** Desplazamos cuadrillas especializadas con maquinaria de trazo airless para proyectos en Estado de México, Querétaro, Jalisco, Nuevo León, Puebla, Morelos, Hidalgo y más.`,
        actions: [
          { label: "📝 Cotizar con Envío", action: "open_quote", prefill: "Cotización de productos con envío foráneo" },
          { label: "💬 Consultar Flete por WhatsApp", action: "open_whatsapp", text: "Hola AMM, quisiera consultar costos de envío para mi ciudad." }
        ]
      };
    }

    // 5. IDENTIDAD: QUIÉNES SON, MISIÓN, VISIÓN, VALORES
    if (clean.includes("quienes son") || clean.includes("quien es amm") || clean.includes("sobre amm") || clean.includes("empresa") || clean.includes("experiencia")) {
      return {
        reply: `**AMM (Señalización · Diseño · Construcción)** es una empresa mexicana integradora y asesora de soluciones en movilidad y seguridad vial.

**Nuestro Concepto:**
No nos limitamos a vender un producto aislado. Entendemos tu necesidad, analizamos el espacio y el presupuesto, y proponemos la mejor alternativa técnica y normativa.

**Capacidades:**
• Fabricación propia de letreros, señalamientos en lámina y estructuras.
• Alianzas directas con los mejores fabricantes de caucho y pintura.
• Cuadrillas certificadas de aplicación con maquinaria airless.`,
        actions: [
          { label: "🏢 Conocer Más en 'Nosotros'", action: "view_page", target: "nosotros" },
          { label: "🏗️ Ver Proyectos Ejecutados", action: "view_page", target: "proyectos" }
        ]
      };
    }

    if (clean.includes("mision") || clean.includes("visión") || clean.includes("vision") || clean.includes("valores")) {
      return {
        reply: `**Misión de AMM:**
"${AMM_DATA.company.mission}"

**Visión de AMM:**
"${AMM_DATA.company.vision}"

**Nuestra Filosofía:**
*"Entender primero. Recomendar después."* Evaluamos la necesidad antes de sugerir cualquier producto o material.`,
        actions: [
          { label: "🏢 Ver Sección Nosotros", action: "view_page", target: "nosotros" }
        ]
      };
    }

    // 6. FICHAS TÉCNICAS Y DESCARGAS
    if (clean.includes("ficha") || clean.includes("fichas") || clean.includes("manual") || clean.includes("descarga") || clean.includes("pdf") || clean.includes("catalogo") || clean.includes("documentacion")) {
      const recList = AMM_DATA.resources.map(r => `• **${r.title}** (${r.type} - ${r.size})`).join("\n");
      return {
        reply: `Contamos con un **Centro de Fichas Técnicas y Manuales** con documentación oficial disponible:

${recList}

Puedes consultarlas y descargarlas libremente en nuestra sección oficial de Fichas Técnicas.`,
        actions: [
          { label: "📄 Ir a Fichas Técnicas", action: "view_page", target: "fichas-tecnicas" },
          { label: "💬 Solicitar Ficha Específica por WhatsApp", action: "open_whatsapp", text: "Hola AMM, requiero una ficha técnica específica para mi proyecto." }
        ]
      };
    }

    // 7. PRECIOS Y COTIZACIONES
    if (clean.includes("precio") || clean.includes("precios") || clean.includes("cuanto cuesta") || clean.includes("costo") || clean.includes("cotizar") || clean.includes("presupuesto") || clean.includes("tarifa")) {
      return {
        reply: `En AMM **no manejamos precios genéricos automáticos en la página** porque cada proyecto requiere una solución personalizada:

• **Volumen:** Descuentos por volumen en piezas o metraje lineal de pintura.
• **Superficie:** Tipo de piso (concreto hidráulico, asfalto viejo, losa pulida o tratada).
• **Logística:** Ubicación geográfica y turnos (diurnos o nocturnos).
• **Materiales:** Alternativas costo-beneficio según la durabilidad requerida.

Nuestros presupuestos son sin costo ni compromiso y te proponemos alternativas a la medida.`,
        actions: [
          { label: "📝 Solicitar Cotización Personalizada", action: "open_quote", prefill: "Solicitud de presupuesto y alternativas" },
          { label: "💬 Cotizar de inmediato por WhatsApp", action: "open_whatsapp", text: "Hola, quisiera cotizar una solución para mi inmueble." }
        ]
      };
    }

    // 8. BÚSQUEDA PROFUNDA EN CATEGORÍAS DE PRODUCTOS
    let bestCat = null;
    let maxCatScore = 0;

    for (const [catId, keywords] of Object.entries(this.categoryKeywords)) {
      let score = 0;
      keywords.forEach(kw => {
        if (clean.includes(kw)) score += 3;
      });
      const catObj = AMM_DATA.productCategories.find(c => c.id === catId);
      if (catObj && clean.includes(this.normalize(catObj.name))) score += 5;

      if (score > maxCatScore) {
        maxCatScore = score;
        bestCat = catObj;
      }
    }

    // 9. BÚSQUEDA PROFUNDA EN SERVICIOS
    let bestServ = null;
    let maxServScore = 0;

    for (const [servId, keywords] of Object.entries(this.serviceKeywords)) {
      let score = 0;
      keywords.forEach(kw => {
        if (clean.includes(kw)) score += 3;
      });
      const servObj = AMM_DATA.services.find(s => s.id === servId);
      if (servObj && clean.includes(this.normalize(servObj.name))) score += 5;

      if (score > maxServScore) {
        maxServScore = score;
        bestServ = servObj;
      }
    }

    // Comparar y responder si hay coincidencia en productos o servicios
    if (bestCat && maxCatScore >= 3 && maxCatScore >= maxServScore) {
      const prodsInfo = bestCat.products.map(p => `• **${p.name}** (SKU: ${p.sku}) — *Material:* ${p.material}. *Medidas:* ${p.measurements}`).join("\n\n");
      
      return {
        reply: `Sobre **${bestCat.name}**, en AMM contamos con las siguientes soluciones disponibles:

${prodsInfo}

**Aplicaciones comunes:** ${bestCat.applications}

¿Deseas que preparemos una cotización con las cantidades que necesitas o prefieres revisar la ficha técnica?`,
        actions: [
          { label: `📦 Ver ${bestCat.name} en Catálogo`, action: "view_category", target: bestCat.id },
          { label: "📝 Cotizar este Producto", action: "open_quote", prefill: `Cotización de ${bestCat.name}` },
          { label: "💬 Consultar con Asesor por WhatsApp", action: "open_whatsapp", text: `Hola AMM, me interesa consultar especificaciones de ${bestCat.name}.` }
        ]
      };
    }

    if (bestServ && maxServScore >= 3) {
      const incs = bestServ.includes.map(i => `• ${i}`).join("\n");
      const bens = bestServ.benefits.map(b => `✔ ${b}`).join("\n");

      return {
        reply: `AMM es especialista en **${bestServ.name}**:

${bestServ.shortDesc}

**Qué incluye el servicio:**
${incs}

**Beneficios principales:**
${bens}

Podemos coordinar una visita de inspección en sitio o analizar tus planos.`,
        actions: [
          { label: `🛠️ Ver Detalles de ${bestServ.name}`, action: "view_service", target: bestServ.id },
          { label: "📝 Solicitar Cotización de este Servicio", action: "open_quote", prefill: `Cotización para servicio de ${bestServ.name}` },
          { label: "💬 Agendar Asesoría por WhatsApp", action: "open_whatsapp", text: `Hola AMM, requiero asesoría para el servicio de ${bestServ.name}.` }
        ]
      };
    }

    // 10. REVISIÓN DE FAQS DE LA BASE DE DATOS
    for (const faq of AMM_DATA.faqs) {
      const normQ = this.normalize(faq.q);
      const words = normQ.split(/\s+/).filter(w => w.length > 3);
      let matchCount = 0;
      words.forEach(w => {
        if (clean.includes(w)) matchCount++;
      });
      if (matchCount >= 2) {
        return {
          reply: `**Pregunta frecuente:** "${faq.q}"\n\n**Respuesta técnica:** ${faq.a}`,
          actions: [
            { label: "📝 Solicitar Asesoría Personalizada", action: "open_quote", prefill: `Consulta sobre: ${faq.q}` },
            { label: "💬 Hablar por WhatsApp", action: "open_whatsapp" }
          ]
        };
      }
    }

    // 11. ESCENARIO DE ESTACIONAMIENTOS O NECESIDADES GLOBALES
    if (clean.includes("estacionamiento") || clean.includes("cajon") || clean.includes("cajones") || clean.includes("lugares") || clean.includes("organizar") || clean.includes("desorden")) {
      return {
        reply: `Para la organización y acondicionamiento integral de un estacionamiento, AMM propone una solución completa:

1. **Trazo y Pintura con Equipo Airless:** Delimitación milimétrica de cajones y flechas de sentido con pintura alquidálica modificada de secado rápido.
2. **Cajones de Discapacitados:** Habilitación reglamentaria de 3.80 m de ancho con fondo azul, pictograma blanco y señal vertical NOM.
3. **Protectores de Columna:** Esquineros de caucho vulcanizado con reflejantes amarillos en chevron para evitar golpes a vehículos y muros.
4. **Reductores y Topes:** Topes de 1.83 m en caucho para delimitar cajones y reductores modulares de velocidad en accesos y rampas.
5. **Señalamientos Normativos:** Velocidad máxima (10 km/h), sentido de circulación y rutas fotoluminiscentes de Protección Civil.

¿Te gustaría enviar planos o fotos de tu estacionamiento para calcular alternativas de costo?`,
        actions: [
          { label: "🏗️ Enviar Planos o Fotos", action: "open_project_modal", prefill: "Acondicionamiento y señalización integral de estacionamiento" },
          { label: "📝 Solicitar Cotización", action: "open_quote", prefill: "Paquete integral de estacionamiento" },
          { label: "💬 Hablar con Asesor Técnico", action: "open_whatsapp", text: "Hola AMM, tengo un estacionamiento y requiero una propuesta integral." }
        ]
      };
    }

    // 12. CASO ESPECÍFICO DE PROBLEMAS CON PROTECCIÓN CIVIL O NORMAS
    if (clean.includes("norma") || clean.includes("normas") || clean.includes("clausura") || clean.includes("multa") || clean.includes("inspeccion") || clean.includes("inspección") || clean.includes("proteccion") || clean.includes("segob")) {
      return {
        reply: `AMM apoya a empresas e inmuebles para cumplir al 100% con las inspecciones de **Protección Civil (NOM-003-SEGOB-2011)** y **STPS (NOM-026-STPS-2008)**:

• **Señales Fotoluminiscentes:** Rutas de evacuación, extintores, hidrantes, botiquines y salidas de emergencia que brillan más de 8 horas sin electricidad.
• **Señalización Vial y Preventiva:** Límites de velocidad, zonas de no bloqueo, pasos peatonales y áreas seguras.
• **Auditoría Técnica:** Levantamiento para determinar qué señales faltan o qué medidas reglamentarias exige tu municipio o alcaldía.`,
        actions: [
          { label: "🦺 Ver Señales de Protección Civil", action: "view_category", target: "senales-normativas" },
          { label: "📄 Descargar Guía NOM-003", action: "view_page", target: "fichas-tecnicas" },
          { label: "💬 Solicitar Asesoría Normativa", action: "open_whatsapp", text: "Hola AMM, requiero asesoría para una inspección de Protección Civil." }
        ]
      };
    }

    // 13. RESPUESTA INTELIGENTE DE ORIENTACIÓN (SIN DECIR "NO TENGO INFORMACIÓN" BRUSCAMENTE)
    return {
      reply: `En AMM cubrimos una amplia gama de soluciones en **señalización, trazo de estacionamientos, equipamiento vial y protección estructural**.

Para poder asesorarte con exactitud sobre tu consulta:
• ¿Se trata de un **producto específico** (topes, protectores, conos, vialetas, boyas, pintura, letreros)?
• ¿O de un **servicio en campo** (trazo de cajones, pintura en columnas, rampas antiderrapantes, mantenimiento)?

Cuéntanos más detalles o permítenos canalizarte con un asesor técnico.`,
      actions: [
        { label: "📦 Explorar Productos", action: "view_page", target: "productos" },
        { label: "🛠️ Explorar Servicios", action: "view_page", target: "servicios" },
        { label: "🏗️ Enviar Datos de mi Proyecto", action: "open_project_modal", prefill: raw },
        { label: "💬 Preguntar a un Ingeniero por WhatsApp", action: "open_whatsapp", text: `Hola AMM, tengo una consulta técnica: ${raw}` }
      ]
    };
  }
}

if (typeof window !== 'undefined') {
  window.AMMAssistant = AMMAssistant;
}
