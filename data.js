// AMM — Señalización · Diseño · Construcción
// Base de Datos Centralizada: Productos, Servicios, Proyectos, Recursos y Base de Conocimiento para Asistente AMM
const AMM_DATA = {
  company: {
    name: "AMM",
    tagline: "Señalización · Diseño · Construcción",
    slogan: "Señalización que transforma tus espacios",
    concept: "Integrador y Asesor de Soluciones en Señalización y Seguridad Vial",
    valueProposition: "No solo buscamos un producto. Buscamos la mejor solución técnica, normativa y presupuestal para tu espacio.",
    process: [
      { step: 1, name: "Necesidad", desc: "Escuchamos tu requerimiento, problemática o idea de proyecto." },
      { step: 2, name: "Análisis", desc: "Evaluamos el espacio, flujo vial/peatonal, normativa SCT/PC y presupuesto." },
      { step: 3, name: "Alternativas", desc: "Comparamos los mejores fabricantes, materiales y técnicas de instalación." },
      { step: 4, name: "Solución", desc: "Diseñamos y ejecutamos la propuesta más conveniente y duradera." }
    ],
    contacts: {
      phones: [
        { label: "Ventas y Proyectos 1", number: "55 5243-8189", clean: "5552438189" },
        { label: "Ventas y Proyectos 2", number: "55 2966-6690", clean: "5529666690" },
        { label: "Atención a Clientes", number: "55 4527-0729", clean: "5545270729" }
      ],
      whatsapp: {
        number: "+52 55 2966 6690",
        url: "https://wa.me/525529666690?text=Hola%20AMM%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20para%20un%20proyecto%20de%20se%C3%B1alizaci%C3%B3n."
      },
      address: "Eje Central Lázaro Cárdenas #701 Bis, Int. 104 y 105, Ciudad de México",
      email: "contacto@senalizacionamm.com.mx",
      schedule: "Lunes a viernes de 8:00 a 18:00 hrs"
    },
    mission: "Transformar y optimizar la comunicación visual y seguridad de nuestros clientes mediante soluciones integrales de señalización de alta calidad, combinando tecnología, diseño e innovación para garantizar espacios más seguros, funcionales y accesibles.",
    vision: "Ser el referente líder en la industria de la señalización y seguridad vial a nivel nacional, reconocidos por nuestra capacidad de innovación, la excelencia operativa y nuestro compromiso con el crecimiento sostenido de nuestros clientes.",
    values: [
      "Asesoría técnica honesta y orientada a soluciones",
      "Cumplimiento riguroso de normativas mexicanas (SCT, STPS, Protección Civil)",
      "Materiales de alta durabilidad y resistencia al intemperismo",
      "Garantía de instalación e integración profesional"
    ]
  },

  // 14 CATEGORÍAS DE PRODUCTOS
  productCategories: [
    {
      id: "alineadores",
      name: "Alineadores",
      slug: "alineadores",
      shortDesc: "Delimitación y encauzamiento de carriles viales, curvas y zonas de obra de alta visibilidad.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
      icon: "barrier",
      applications: "Autopistas, accesos a estacionamientos, pasos peatonales, glorietas y desviaciones viales.",
      products: [
        {
          id: "ali-01",
          name: "Alineador Flexible de Polietileno con Reflejante",
          sku: "AMM-ALI-FLEX100",
          material: "Polímero de alta resistencia con memoria elástica",
          measurements: "Altura 100 cm | Base Ø 20 cm",
          reflector: "Grado Ingeniería o Alta Intensidad Prismática",
          applications: "Encauzamiento vial, retornos, casetas de peaje y rampas.",
          description: "Alineador diseñado para soportar impactos vehiculares moderados y recuperar su posición vertical sin dañar las carrocerías.",
          variants: ["Color Naranja Seguridad", "Color Amarillo Vial", "Color Blanco"]
        },
        {
          id: "ali-02",
          name: "Alineador Tubular de Base Rígida",
          sku: "AMM-ALI-RIG80",
          material: "Polietileno de media densidad con base de caucho reciclado",
          measurements: "Altura 80 cm | Diámetro 10 cm",
          reflector: "Doble franja reflejante de 3 pulgadas Grado Diamante",
          applications: "División de carriles de estacionamiento subterráneo y ciclovías.",
          description: "Ideal para delimitación fija o temporal con anclaje a piso mediante pernos de expansión.",
          variants: ["Base fija para perno", "Base móvil para lastre"]
        }
      ]
    },
    {
      id: "barreras-estacionamiento",
      name: "Barreras de Estacionamiento",
      slug: "barreras-de-estacionamiento",
      shortDesc: "Sistemas de contención, delimitación perimetral y control de accesos vehiculares.",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
      icon: "fence",
      applications: "Centros comerciales, naves industriales, áreas de carga y estacionamientos públicos.",
      products: [
        {
          id: "bar-01",
          name: "Barrera Vial Plástica Tipo New Jersey",
          sku: "AMM-BAR-NJ120",
          material: "Polietileno de alta densidad virgen con protección UV",
          measurements: "Largo 120 cm x Alto 80 cm x Ancho 45 cm",
          weight: "8 kg vacía / 60 kg con agua o arena",
          applications: "Obras viales, eventos masivos, delimitación de carriles contraflujo.",
          description: "Cuerpo hueco rellenable para máxima estabilidad con sistema de interconexión macho-hembra.",
          variants: ["Color Naranja", "Color Amarillo", "Color Blanco"]
        },
        {
          id: "bar-02",
          name: "Barrera Automática de Control de Acceso",
          sku: "AMM-BAR-AUT04",
          material: "Gabinete en acero galvanizado con recubrimiento electrostático",
          measurements: "Mástil de aluminio de 3 a 6 metros con tira LED opcional",
          power: "110V/220V con apertura rápida de 1.5 a 3.5 segundos",
          applications: "Control vehicular en condominios, plazas corporativas y peajes.",
          description: "Solución integrada con fotoceldas de seguridad, lazo magnético e interfaz para control de acceso RFID.",
          variants: ["Mástil recto 4m", "Mástil articulado 3m (para sótanos bajos)"]
        }
      ]
    },
    {
      id: "barricadas",
      name: "Barricadas",
      slug: "barricadas",
      shortDesc: "Protección y señalización preventiva para zonas de obra, reparaciones y desvíos viales.",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      icon: "alert-triangle",
      applications: "Construcción civil, excavaciones, mantenimiento en vías públicas y cierres de carriles.",
      products: [
        {
          id: "bcd-01",
          name: "Barricada Plegable Tipo I y II",
          sku: "AMM-BCD-PLEG",
          material: "Polietileno de alta densidad / Marco metálico esmaltado",
          measurements: "Panel 60 x 30 cm | Altura total 100 cm",
          reflector: "Franjas diagonales blanco/naranja o blanco/rojo Grado Alta Intensidad",
          applications: "Cierres preventivos de carril en obra urbana y mantenimiento vial.",
          description: "Estructura ligera, apilable y fácil de transportar con soporte para lámpara destellante.",
          variants: ["Plegable de plástico", "Estructura de acero con panel de lámina"]
        },
        {
          id: "bcd-02",
          name: "Barricada Tipo III para Obras de Gran Escala",
          sku: "AMM-BCD-TIPO3",
          material: "Perfiles de PVC reforzado y postes de canal de acero galvanizado",
          measurements: "Ancho 1.50m / 2.00m x Alto 1.50m (3 paneles horizontales)",
          reflector: "Película reflejante Grado Diamante con orientación direccional",
          applications: "Cierre total de calzada, autopistas y desvíos de largo plazo.",
          description: "Cumple con las especificaciones de la Secretaría de Infraestructura, Comunicaciones y Transportes (SICT).",
          variants: ["1.50 m de ancho", "2.00 m de ancho con base para lastre"]
        }
      ]
    },
    {
      id: "boyas-botones",
      name: "Boyas y Botones",
      slug: "boyas-y-botones",
      shortDesc: "Reductores sonoros, canalizadores y delimitadores metálicos y plásticos para pavimentos.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
      icon: "circle",
      applications: "Cruces escolares, pasos peatonales, gasolineras, estacionamientos y salidas de emergencia.",
      products: [
        {
          id: "byb-01",
          name: "Boya Metálica de Acero Troquelado Calibre 10",
          sku: "AMM-BYA-MET20",
          material: "Lámina de acero calibre 10 con pintura electrostática horneada",
          measurements: "21 x 21 cm x 6 cm de altura",
          resistance: "Cargas de más de 30 toneladas de tránsito pesado",
          applications: "Reductores de velocidad de alto impacto y líneas canalizadoras.",
          description: "Incluye 4 barrenos de fijación para pernos y película reflejante acrílica opcional.",
          variants: ["Amarillo Tránsito", "Blanco Vial", "Con o sin reflejante"]
        },
        {
          id: "byb-02",
          name: "Botón Cerámico y Polimérico para Conducción",
          sku: "AMM-BTN-CER10",
          material: "Cerámica vitrificada o polímero de ingeniería no abrasivo",
          measurements: "Diámetro 10 cm x 1.8 cm de altura",
          applications: "Líneas de borde, carriles exclusivos de Metrobús/BRT y glorietas.",
          description: "Acabado de alta reflectividad lumínica diurna y nocturna, adherido con resina epóxica bituminosa.",
          variants: ["Cerámico Blanco", "Cerámico Amarillo", "Polímero con prismas ópticos"]
        }
      ]
    },
    {
      id: "burros",
      name: "Burros y Caballetes",
      slug: "burros",
      shortDesc: "Caballetes portátiles para avisos preventivos, delimitaciones de mantenimiento y accesos temporales.",
      image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
      icon: "maximize",
      applications: "Estacionamientos de hoteles, centros de distribución, oficinas y áreas de limpieza.",
      products: [
        {
          id: "bur-01",
          name: "Caballete Portátil Abatible 'Piso Mojado / Mantenimiento'",
          sku: "AMM-CAB-PORT",
          material: "Polipropileno virgen de alta densidad con asa de sujeción ergonómica",
          measurements: "Alto 65 cm x Ancho 30 cm",
          legend: "Texto bilingüe y pictograma internacional de precaución",
          applications: "Áreas comerciales, baños, pasillos y accesos peatonales.",
          description: "Ligero, plegable y con advertencia en ambas caras para prevenir resbalones y caídas.",
          variants: ["Precaución Piso Mojado", "Área Restringida", "Personal Trabajando"]
        },
        {
          id: "bur-02",
          name: "Burro Vial Metálico Extensible de Obra",
          sku: "AMM-BUR-MET",
          material: "Tubo de acero cédula 30 con pintura epóxica horneada a prueba de óxido",
          measurements: "Largo 120 a 200 cm x Alto 90 cm",
          applications: "Delimitación de áreas de carga, rampas y cajones reservados.",
          description: "Estructura robusta con panel rotulado según requerimiento de la empresa o condominio.",
          variants: ["Fijo 1.20 m", "Extensible con cadenas de enganche"]
        }
      ]
    },
    {
      id: "conos",
      name: "Conos de Seguridad Vial",
      slug: "conos",
      shortDesc: "Dispositivos cónicos de canalización y aviso de peligro en medidas reglamentarias.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      icon: "cone",
      applications: "Vías públicas, retenes viales, escuelas, valet parking y delimitación de maniobras.",
      products: [
        {
          id: "con-01",
          name: "Cono de PVC Flexible con Base Negra Lastrada",
          sku: "AMM-CON-PVC90",
          material: "Cloruro de polivinilo fluorescente con memoria de recuperación tras aplastamiento",
          measurements: "Alturas disponibles: 45 cm, 71 cm y 91 cm",
          reflector: "Collarín reflejante Grado Ingeniería o Alta Intensidad de 4 y 6 pulgadas",
          applications: "Autopistas, avenidas rápidas, obras civiles y zonas de alta velocidad.",
          description: "Centro de gravedad bajo para resistir ráfagas de viento provocadas por vehículos pesados.",
          variants: ["45 cm con 1 cinta", "71 cm con 2 cintas", "91 cm con 2 cintas"]
        },
        {
          id: "con-02",
          name: "Cono Plegable Retráctil con Luz LED Integrada",
          sku: "AMM-CON-LED70",
          material: "Lona impermeable Oxford reflejante con base de polipropileno",
          measurements: "Altura extendido 70 cm | Plegado 5 cm de grosor",
          lighting: "Luz LED superior intermitente para visibilidad nocturna extrema",
          applications: "Unidades de emergencia, patrullas, flotillas vehiculares y seguridad privada.",
          description: "Ahorro de espacio radical para transporte en cajuelas de vehículos de supervisión.",
          variants: ["Sin LED", "Con LED destellante recargable"]
        }
      ]
    },
    {
      id: "podiums-valet",
      name: "Podiums de Valet Parking",
      slug: "podiums-de-valet",
      shortDesc: "Módulos operativos y estaciones de recepción de llaves para hoteles, restaurantes y centros de eventos.",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
      icon: "key",
      applications: "Hotelería, restaurantes de alta gama, plazas comerciales y estacionamientos con servicio de chofer.",
      products: [
        {
          id: "pod-01",
          name: "Podium de Valet Ejecutivo de Lámina con Cerradura Bancaria",
          sku: "AMM-POD-EJEC100",
          material: "Lámina rolada en frío calibre 16 y 18 con terminado horneado mate o brillante",
          measurements: "Frente 60 cm x Fondo 45 cm x Altura 110 cm",
          capacity: "Capacidad para 50, 100 o 150 ganchos con porta-boletos",
          security: "Chapa de alta seguridad bancaria, ruedas industriales con freno y paraguero",
          applications: "Recepción de vehículos en accesos principales y drop-offs.",
          description: "Opciones de personalización con logotipo corporativo en vinil de corte o placa de acero inoxidable.",
          variants: ["Capacidad 50 llaves", "Capacidad 100 llaves", "Capacidad 150 llaves con cajón auxiliar"]
        },
        {
          id: "pod-02",
          name: "Podium Compacto Portátil para Eventos",
          sku: "AMM-POD-COMP40",
          material: "Aluminio anodizado y paneles de polímero compuesto ligero",
          measurements: "Frente 50 cm x Fondo 40 cm x Altura 105 cm",
          capacity: "40 ganchos numerados",
          applications: "Eventos temporales, banquetes, centros de convenciones y ferias.",
          description: "Desarmable y de fácil transportación con chapa de combinación mecánica.",
          variants: ["Color Negro Texturizado", "Color Gris Grafito"]
        }
      ]
    },
    {
      id: "protectores-columna",
      name: "Protectores de Columna",
      slug: "protectores-de-columna",
      shortDesc: "Protección integral para esquinas, columnas estructurales y muros en estacionamientos y naves industriales.",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
      icon: "shield",
      applications: "Sótanos de edificios, estacionamientos comerciales, bodegas de logística y pasillos de montacargas.",
      products: [
        {
          id: "col-01",
          name: "Esquinero de Caucho de Alta Densidad con Franjas Amarillas",
          sku: "AMM-ESQ-CAU80",
          material: "Caucho vulcanizado 100% reciclado resistente a impactos y grasas",
          measurements: "Longitud: 80 cm / 100 cm / 120 cm | Alas de 10 x 10 cm | Espesor 10 mm",
          reflector: "Cintas reflejantes amarillas en chevron integradas al cuerpo",
          applications: "Esquinas vivas de concreto, columnas cuadradas y muros de paso vehicular estrecho.",
          description: "Absorbe el impacto de puertas y salpicaderas, protegiendo tanto la estructura del inmueble como los vehículos.",
          variants: ["Longitud 80 cm", "Longitud 100 cm", "Longitud 120 cm"]
        },
        {
          id: "col-02",
          name: "Protector Circular de Columna para Columnas Redondas",
          sku: "AMM-COL-CIRC",
          material: "Espuma de EVA microporosa de celda cerrada o caucho estriado",
          measurements: "Rollos modulares adaptables a columnas de Ø 30 a Ø 90 cm",
          applications: "Columnas cilíndricas en sótanos residenciales y corporativos.",
          description: "Fijación mediante pernos y adhesivo de poliuretano industrial para ajuste perfecto sin holguras.",
          variants: ["Espesor 15 mm", "Espesor 20 mm con reflejante perimetral"]
        }
      ]
    },
    {
      id: "reductores-topes",
      name: "Reductor de Velocidad y Topes",
      slug: "reductor-de-velocidad-y-topes",
      shortDesc: "Dispositivos de control de velocidad y topes delimitadores de cajón para estacionamientos.",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      icon: "activity",
      applications: "Cajones de estacionamiento, rampas de acceso, pasos de peatones interiores y avenidas de fraccionamientos.",
      products: [
        {
          id: "top-01",
          name: "Tope de Estacionamiento para Cajón en Caucho Sólido",
          sku: "AMM-TOP-CAJ180",
          material: "Caucho reciclado de llanta con aglutinante de poliuretano",
          measurements: "Largo 183 cm (6 pies) x Ancho 15 cm x Alto 10 cm",
          reflector: "8 elementos reflejantes amarillos embebidos de grado diamante",
          applications: "Delimitación frontal de cajones en estacionamientos para evitar choques contra banquetas y muros.",
          description: "No se agrieta, no se pudre, no requiere pintura constante y protege las facias de los automóviles.",
          variants: ["Tope 55 cm (individual por llanta)", "Tope 183 cm (cajón completo)"]
        },
        {
          id: "top-02",
          name: "Reductor Modular de Velocidad 'Speed Bump' de Uso Rudo",
          sku: "AMM-RED-MOD50",
          material: "Caucho de alta resistencia con textura antideslizante",
          measurements: "Módulos de 50 cm x 35 cm x 5 cm de altura + Remates semicirculares",
          resistance: "Soporta tránsito continuo de hasta 40 toneladas",
          applications: "Rampas de acceso, accesos a casetas y vialidades internas de parques industriales.",
          description: "Sistema modular con canales inferiores para paso de cableado eléctrico o mangueras temporales.",
          variants: ["Módulo Amarillo", "Módulo Negro", "Terminales laterales de remate"]
        }
      ]
    },
    {
      id: "senales-normativas",
      name: "Señalización Informativa, Preventiva, Restrictiva y Protección Civil",
      slug: "senalizacion-informativa-preventiva-restrictiva-y-proteccion-civil",
      shortDesc: "Placas, señalamientos y paneles normativos bajo especificaciones oficiales NOM-003-SEGOB, NOM-026-STPS y SICT.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      icon: "info",
      applications: "Inmuebles corporativos, fábricas, hospitales, escuelas, estacionamientos y plazas públicas.",
      products: [
        {
          id: "sen-01",
          name: "Señalética de Protección Civil Fotoluminiscente",
          sku: "AMM-SEN-PC30",
          material: "Estireno calibre 40 o trovicel con pigmento fotoluminiscente clase B/C",
          measurements: "20x20 cm, 25x25 cm, 30x40 cm, 40x60 cm",
          norm: "Cumplimiento 100% NOM-003-SEGOB-2011",
          applications: "Rutas de evacuación, extintores, hidrantes, salidas de emergencia y puntos de reunión.",
          description: "Brilla en la oscuridad total durante más de 8 horas ante fallas de suministro eléctrico en emergencias.",
          variants: ["Ruta de evacuación (flecha izq/der)", "Ubicación de Extintor", "Salida de Emergencia"]
        },
        {
          id: "sen-02",
          name: "Señalamiento Vial Restrictivo e Informativo en Lámina Galvanizada",
          sku: "AMM-SEN-VIAL60",
          material: "Lámina galvanizada calibre 16 con ceja perimetral y poste de PTR o tubo galvanizado",
          measurements: "Octagonal 60/75/85 cm | Cuadrado 60x60 cm | Rectangular 40x60 cm",
          reflector: "Grado Ingeniería, Alta Intensidad o Grado Diamante 3M",
          applications: "Vialidades internas, accesos, límites de velocidad, sentidos de circulación y altos.",
          description: "Fabricación conforme al manual de dispositivos para el control del tránsito de la SICT.",
          variants: ["Alto (SR-6)", "Velocidad máxima (SR-9)", "Sentido de circulación", "No estacionarse"]
        }
      ]
    },
    {
      id: "senalizacion-horizontal",
      name: "Señalización Horizontal",
      slug: "senalizacion-horizontal",
      shortDesc: "Pinturas de tráfico, termoplásticas, microesferas de vidrio y resinas para demarcación sobre pavimento.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      icon: "grid",
      applications: "Líneas de carril, pasos de cebra peatonales, flechas de sentido, cajones y áreas de no bloqueo.",
      products: [
        {
          id: "hor-01",
          name: "Pintura de Tráfico Base Solvente / Base Agua de Secado Rápido",
          sku: "AMM-PIN-TRAF200",
          material: "Resina alquidálica modificada con hule clorado o emulsión acrílica base agua",
          measurements: "Cubetas de 19 L y tambores de 200 L",
          drying: "Secado al tacto en 15 minutos / Al tránsito en 30 minutos",
          applications: "Demarcación de cajones, líneas divisorias, numeración de cajones y pasos de cebra.",
          description: "Excelente adherencia en concreto hidráulico y carpeta asfáltica con máxima resistencia a la abrasión.",
          variants: ["Blanco Tráfico", "Amarillo Tráfico", "Azul Discapacitados", "Rojo Hidrante"]
        },
        {
          id: "hor-02",
          name: "Microesfera de Vidrio Retroreflejante Tipo Drop-On",
          sku: "AMM-MIC-VID25",
          material: "Vidrio óptico sodo-cálcico de alta pureza con redondez > 70%",
          measurements: "Sacos de 25 kg",
          applications: "Sembrado superficial sobre pintura fresca para reflectividad nocturna.",
          description: "Multiplica por 10 la visibilidad nocturna de las líneas pintadas cuando los faros vehiculares inciden en ellas.",
          variants: ["Saco 25 kg con tratamiento hidrofóbico"]
        }
      ]
    },
    {
      id: "totems",
      name: "Tótems y Columnas Informativas",
      slug: "totems",
      shortDesc: "Estructuras verticales de identidad, orientación de usuarios y directorios en espacios comerciales y corporativos.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      icon: "layout",
      applications: "Accesos a estacionamientos, directorios de plazas comerciales, parques industriales y hospitales.",
      products: [
        {
          id: "tot-01",
          name: "Tótem Luminoso Institucional con Pantalla Backlight",
          sku: "AMM-TOT-LUM300",
          material: "Estructura interna en perfiles de acero estructural con forro de alucobond / panel de aluminio compuesto",
          measurements: "Altura estándar de 2.5 m a 6.0 m | Ancho de 0.8 m a 1.8 m",
          lighting: "Módulos LED interconectados de alta eficiencia IP67 y bajo consumo",
          applications: "Entradas principales de estacionamientos y señalización de marca en fachada.",
          description: "Diseño personalizado con planos de ingeniería para resistencia a cargas de viento.",
          variants: ["Unilateral", "Bilateral", "Con display de cupo libre/lleno digital"]
        },
        {
          id: "tot-02",
          name: "Tótem Directorio de Orientación Peatonal (Wayfinding)",
          sku: "AMM-TOT-WAY200",
          material: "Perfilería de aluminio anodizado con cristales templados o acrílicos termoformados",
          measurements: "Altura 200 cm x Ancho 60 cm",
          applications: "Lobbies de edificios corporativos, pasillos comerciales y estaciones de transbordo.",
          description: "Mapas de sitio tipo 'Usted está aquí', directorios modulares de fácil actualización de inquilinos.",
          variants: ["Fijo a piso", "Con iluminación perimetral LED"]
        }
      ]
    },
    {
      id: "vialetas",
      name: "Vialetas y Tachuelas Reflejantes",
      slug: "vialetas",
      shortDesc: "Marcadores sobre pavimento retroreflejantes solares, acrílicos y de cristal templado.",
      image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80",
      icon: "sun",
      applications: "Delimitación de carriles en curvas pronunciadas, pasos peatonales, túneles y rampas de acceso.",
      products: [
        {
          id: "via-01",
          name: "Vialeta de Plástico ABS con Lente Acrílico Prismático",
          sku: "AMM-VIA-ABS10",
          material: "Cuerpo de ABS de alto impacto con base texturizada para fijación con epóxico",
          measurements: "10 x 10 cm x 2 cm de altura | Espiga inferior de 5 cm opcional",
          reflector: "Catadióptrico de polimetilmetacrilato con alta reflectividad",
          applications: "Carreteras, bulevares y rampas de estacionamiento.",
          description: "Resiste el paso constante de neumáticos sin perder el prisma reflejante ni despegarse.",
          variants: ["Una cara reflejante", "Dos caras reflejantes (Amarillo/Blanco/Rojo)"]
        },
        {
          id: "via-02",
          name: "Vialeta Solar LED Inteligente",
          sku: "AMM-VIA-SOLAR",
          material: "Cuerpo de aluminio fundido de grado aeronáutico con celda solar de silicio monocristalino",
          measurements: "12 x 12 cm x 3 cm de grosor",
          lighting: "6 LEDs ultrabrillantes con visibilidad superior a 800 metros",
          applications: "Zonas de niebla, curvas peligrosas, accesos a casetas sin iluminación eléctrica.",
          description: "Se recarga con luz diurna y enciende automáticamente al anochecer con hasta 72 horas de autonomía.",
          variants: ["Luz Fija", "Luz Destellante (Amarillo, Azul, Blanco, Verde, Rojo)"]
        }
      ]
    },
    {
      id: "rotulacion",
      name: "Rotulación",
      slug: "rotulacion",
      shortDesc: "Rotulación vinílica computarizada, letras en canal 3D, señalética de corte y brandeo de espacios.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      icon: "type",
      applications: "Muros corporativos, ventanales, rotulación de pisos, señalética de oficinas y vehículos de flotilla.",
      products: [
        {
          id: "rot-01",
          name: "Rotulación en Vinil de Alta Adherencia para Muros y Cristal",
          sku: "AMM-ROT-VIN01",
          material: "Película de vinil polimérico o fundido calandrado de alta durabilidad (5 a 7 años al exterior)",
          measurements: "Corte y dimensiones a la medida del diseño arquitectónico",
          applications: "Logotipos corporativos, letreros en cristal esmerilado, numeración y señalética de puertas.",
          description: "Instalación libre de burbujas sobre cristal, muro de tablaroca, lámina o concreto sellado.",
          variants: ["Vinil de corte de color sólido", "Vinil esmerilado / Dusted", "Vinil impreso en alta resolución laminado"]
        },
        {
          id: "rot-02",
          name: "Letras 3D Realzadas en Acrílico, Acero y Aluminio",
          sku: "AMM-ROT-3D02",
          material: "Acrilico de 3mm a 12mm / Lámina de acero inoxidable cepillado con realce en canal",
          measurements: "Desde 15 cm hasta 2.0 metros de altura por letra",
          lighting: "Opcional luz indirecta cálida/fría (halo effect) en la parte trasera",
          applications: "Recepciones corporativas, fachadas de edificios y marquesinas comerciales.",
          description: "Corte CNC router o láser de máxima precisión con plantillas para instalación nivelada.",
          variants: ["Acrílico sólido", "Acero inoxidable pulido o cepillado", "Con luz LED halo"]
        }
      ]
    }
  ],

  // 8 SERVICIOS OFICIALES
  services: [
    {
      id: "asesoria-senalizacion",
      name: "Asesoría de Señalización",
      slug: "asesoria-de-senalizacion",
      icon: "compass",
      shortDesc: "Diagnóstico normativo, auditoría de flujo vial/peatonal y diseño de planes maestros de señalética.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Levantamiento técnico en sitio y revisión de planos arquitectónicos",
        "Auditoría de cumplimiento con normas NOM-003-SEGOB, NOM-026-STPS y lineamientos SICT",
        "Diseño de flujos de circulación para evitar cuellos de botella y riesgos de colisión",
        "Catálogo de conceptos y presupuesto optimizado con alternativas costo-beneficio"
      ],
      benefits: [
        "Evita multas y clausuras ante inspecciones de Protección Civil y autoridades de vialidad",
        "Optimiza el uso de cajones y áreas de circulación aumentando la capacidad real del inmueble",
        "Presupuesto certero sin compras redundantes ni materiales incompatibles"
      ],
      process: [
        "Paso 1: Entrevista inicial y recopilación de planos o requerimientos del inmueble",
        "Paso 2: Visita de inspección técnica en sitio para medición de radios de giro y visuales",
        "Paso 3: Elaboración de memoria descriptiva y catálogo de señalización recomendado",
        "Paso 4: Presentación de alternativas y cronograma de implementación"
      ],
      faqs: [
        {
          q: "¿Qué documentación entregan al finalizar la asesoría?",
          a: "Entregamos un plano en formato digital con la semaforización de señalamientos, catálogo de conceptos detallado y fichas técnicas de cada elemento propuesto."
        },
        {
          q: "¿Pueden asesorarme si mi inmueble ya está en operación?",
          a: "Sí, realizamos auditorías de señalización existente para identificar elementos deteriorados, faltantes normativos y oportunidades para mejorar la circulación vehicular."
        }
      ]
    },
    {
      id: "fabricacion-letreros-luminosos",
      name: "Fabricación de Letreros Luminosos",
      slug: "fabricacion-de-letreros-luminosos",
      icon: "zap",
      shortDesc: "Diseño, manufactura e instalación de letreros luminosos tipo caja de luz, letras en canal y tótems LED.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Diseño estructural y cálculo de resistencia para exterior",
        "Cajas de luz en perfil de aluminio con lona traslúcida o acrílico de impacto",
        "Iluminación LED de alta eficiencia con transformadores sellados certificados",
        "Instalación eléctrica profesional y fijación mediante anclajes estructurales"
      ],
      benefits: [
        "Visibilidad 24/7 de su marca o señalética vial crítica",
        "Ahorro de hasta un 70% en consumo eléctrico con tecnología LED de última generación",
        "Garantía extendida contra intemperismo, filtración de lluvia y decoloración solar"
      ],
      process: [
        "Paso 1: Definición de dimensiones, ubicación y tipo de iluminación deseada",
        "Paso 2: Modelado virtual y propuesta de materiales (aluminio, acrílico, acero)",
        "Paso 3: Fabricación en taller con control de calidad y pruebas eléctricas de 48 horas",
        "Paso 4: Montaje en sitio con grúa o canastilla según altura y fijación certificada"
      ],
      faqs: [
        {
          q: "¿Qué mantenimiento requieren los letreros luminosos?",
          a: "Nuestros módulos LED sellados requieren mantenimiento mínimo: recomendamos una limpieza superficial y revisión de transformadores una vez al año."
        }
      ]
    },
    {
      id: "cajones-discapacitados",
      name: "Cajones de Discapacitados",
      slug: "cajones-de-discapacitados",
      icon: "user-check",
      shortDesc: "Habilitación, trazo y señalización reglamentaria de cajones accesibles según la norma oficial.",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Dimensionamiento reglamentario del cajón (mínimo 3.80 m de ancho o 2.50 m + 1.20 m de franja de ascenso)",
        "Pintura en fondo azul cielo/tráfico y pictograma internacional de accesibilidad en blanco",
        "Instalación de señal vertical restrictiva complementaria en poste de acero",
        "Conexión con rampas peatonales y rutas accesibles libres de obstáculos"
      ],
      benefits: [
        "Cumplimiento total con la Ley para la Integración de las Personas con Discapacidad",
        "Evita infracciones administrativas y observaciones de inspectores municipales",
        "Comodidad, seguridad y dignidad en el acceso para personas con movilidad reducida"
      ],
      process: [
        "Paso 1: Selección de los cajones más cercanos a accesos peatonales y elevadores",
        "Paso 2: Limpieza profunda y preparación de la superficie (concreto o asfalto)",
        "Paso 3: Aplicación de pintura epóxica o de tráfico azul y trazo de franjas de amortiguamiento",
        "Paso 4: Colocación de señal vertical restrictiva con anclaje a piso o muro"
      ],
      faqs: [
        {
          q: "¿Cuántos cajones para discapacitados debe tener mi estacionamiento?",
          a: "La norma general exige al menos 1 cajón accesible por cada 25 cajones de capacidad total, ubicados invariablemente en las posiciones más próximas a los accesos."
        }
      ]
    },
    {
      id: "mantenimiento-estacionamientos",
      name: "Mantenimiento de Estacionamientos",
      slug: "mantenimiento-de-estacionamientos",
      icon: "tool",
      shortDesc: "Restauración integral de superficies, repintado, cambio de topes deteriorados y lavado profundo.",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Lavado y desengrasado profundo con hidrolavadoras de alta presión",
        "Sellado de grietas y fisuras superficiales en concreto y asfalto",
        "Retiro y sustitución de topes, boyas o esquineros dañados",
        "Repintado total de líneas de cajón, flechas, guarniciones y cebras peatonales"
      ],
      benefits: [
        "Extiende la vida útil de las losas y pavimentos reduciendo costos correctivos mayores",
        "Revitaliza drásticamente la imagen del inmueble generando confianza en visitantes y clientes",
        "Disminuye accidentes por resbalones, baches o líneas poco visibles"
      ],
      process: [
        "Paso 1: Programación por etapas o en horarios nocturnos para no interrumpir la operación",
        "Paso 2: Lavado químico desengrasante y aspirado de sedimentos",
        "Paso 3: Reparación menor de baches, juntas y anclajes",
        "Paso 4: Aplicación de nueva pintura de tráfico y reinstalación de dispositivos viales"
      ],
      faqs: [
        {
          q: "¿Pueden realizar el mantenimiento durante la noche o fines de semana?",
          a: "Absolutamente. Adaptamos nuestros turnos a horarios inhábiles para que el estacionamiento permanezca operativo durante el día."
        }
      ]
    },
    {
      id: "pintura-columnas",
      name: "Pintura en Columnas",
      slug: "pintura-en-columnas",
      icon: "droplet",
      shortDesc: "Señalización perimetral de columnas con franjas amarillas y negras de alta visibilidad y numeración de nivel.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Preparación de superficie: raspado, resanado y aplicación de sellador de alta adherencia",
        "Pintura esmalte o epóxica en franjas inclinadas amarillo preventivo y negro según norma",
        "Rotulación de códigos de nivel, letras de sector y números de columna",
        "Opción de recubrimiento antigraffiti y esquineros de caucho integrados"
      ],
      benefits: [
        "Ayuda a los conductores a calcular dimensiones y radios de giro en espacios reducidos",
        "Facilita la ubicación de vehículos mediante codificación visual por color y letra",
        "Protege la columna contra salpicaduras de agua y humedad ambiental"
      ],
      process: [
        "Paso 1: Delimitación de altura reglamentaria (generalmente de 1.00 m a 1.20 m desde el piso)",
        "Paso 2: Trazado milimétrico con cinta de enmascarar para franjas nítidas a 45 grados",
        "Paso 3: Aplicación a dos manos con esmalte industrial de secado rápido",
        "Paso 4: Rotulación de identificadores mediante plantilla estarcida o vinil"
      ],
      faqs: [
        {
          q: "¿Qué pintura utilizan para las columnas de sótanos húmedos?",
          a: "Empleamos esmaltes alquidálicos modificados o recubrimientos epóxicos de dos componentes con alta tolerancia a la humedad residual."
        }
      ]
    },
    {
      id: "pintura-rampas-estacionamiento",
      name: "Pintura en Rampas de Estacionamiento",
      slug: "pintura-en-rampas-de-estacionamiento",
      icon: "trending-up",
      shortDesc: "Recubrimientos antiderrapantes y señalización de advertencia para rampas con pendientes pronunciadas.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Adición de áridos de sílice calibrado para crear acabado rugoso antiderrapante",
        "Pintura epóxica de alto tráfico con excelente resistencia al patinaje de neumáticos húmedos",
        "Pintura de guarniciones perimetrales en amarillo reflejante",
        "Instalación de vialetas solares o catadióptricas en el vértice de la rampa"
      ],
      benefits: [
        "Elimina por completo el riesgo de derrapes de vehículos en días de lluvia",
        "Mejora la tracción y evita rechinidos molestos en los neumáticos",
        "Advierte a los conductores sobre pendientes y cambios de nivel con claridad"
      ],
      process: [
        "Paso 1: Desbastado mecánico o tratamiento químico para abrir poro en el concreto",
        "Paso 2: Aplicación de primario epóxico de penetración",
        "Paso 3: Riego de cuarzo/sílice para textura antiderrapante y capa de sellado de alta resistencia",
        "Paso 4: Trazado de líneas guía centrales y señalización de velocidad en rampa"
      ],
      faqs: [
        {
          q: "¿Cuánto tiempo después de pintar la rampa se puede abrir al tráfico vehicular?",
          a: "Con nuestros sistemas de curado rápido, la rampa puede habilitarse para tráfico ligero en 12 a 18 horas y tráfico completo en 24 horas."
        }
      ]
    },
    {
      id: "rotulacion-servicios",
      name: "Rotulación Especializada",
      slug: "rotulacion",
      icon: "edit-3",
      shortDesc: "Rotulación de pisos, muros, vidrios, señalética direccional y numeración de cajones con acabados de precisión.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Numeración de cajones con plantillas de corte digital para tipografías uniformes",
        "Leyendas de piso personalizadas: 'PROHIBIDO EL PASO', 'VELOCIDAD MÁXIMA', 'SOLO CLIENTES'",
        "Rotulación de cristales con vinil esmerilado de privacidad",
        "Logotipos corporativos sobre pisos de concreto pulido con sellador epóxico transparente"
      ],
      benefits: [
        "Aspecto pulcro, profesional y corporativo en todas las áreas visibles",
        "Orientación inequívoca para visitantes reduciendo tiempo de búsqueda",
        "Durabilidad extrema resistente a lavados constantes y tráfico peatonal intenso"
      ],
      process: [
        "Paso 1: Elaboración de propuesta gráfica con las fuentes y colores corporativos del cliente",
        "Paso 2: Fabricación de negativos y positivos en plotter de corte de alta precisión",
        "Paso 3: Aplicación con equipo de aspersión o transferencia manual",
        "Paso 4: Capa de protección transparente poliuretánica para sellado definitivo"
      ],
      faqs: [
        {
          q: "¿Pueden rotular el logotipo de mi empresa en el piso del estacionamiento?",
          a: "Sí, podemos reproducir logotipos a todo color en muros o pisos utilizando plantillas y recubrimientos epóxicos resistentes al tráfico."
        }
      ]
    },
    {
      id: "trazo-y-pintura",
      name: "Trazo y Pintura",
      slug: "trazo-y-pintura",
      icon: "layers",
      shortDesc: "Trazo milimétrico y aplicación técnica de pintura vial para cajones en batería, cordón y áreas peatonales.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      includes: [
        "Replanteo topográfico y trazo con tiralíneas para líneas perfectamente rectas",
        "Aplicación con máquina pintarrayas airless especializada (espesor de película uniforme sin goteo)",
        "Demarcación de cajones convencionales, batería a 90°, 60° y 45°, así como en cordón",
        "Franjas de no estacionarse (achurados amarillos) y pasos peatonales cebrados"
      ],
      benefits: [
        "Líneas de bordes afilados y espesor uniforme que duplican la durabilidad frente a brochas",
        "Maximización de cajones aprovechables respetando los anchos mínimos de circulación",
        "Ejecución veloz de cientos de metros lineales por jornada"
      ],
      process: [
        "Paso 1: Limpieza por soplado de las áreas de trazo",
        "Paso 2: Replanteo de distancias conforme al plano del proyecto",
        "Paso 3: Aplicación de pintura de tráfico de alta concentración con equipo airless",
        "Paso 4: Dosificación de microesferas de vidrio simultánea si se requiere retrorreflexión"
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre pintar con máquina airless vs. brocha o rodillo?",
          a: "La máquina airless aplica la pintura con presión hidroneumática constante, logrando un espesor exacto y uniforme que penetra los poros del pavimento, triplicando la resistencia al desprendimiento."
        }
      ]
    }
  ],

  // PROYECTOS REALES / CASOS DE ESTUDIO
  projects: [
    {
      id: "proj-01",
      title: "Reconfiguración y Señalización Integral de Estacionamiento Corporativo Santa Fe",
      category: "Estacionamientos Corporativos",
      location: "Santa Fe, Ciudad de México",
      clientType: "Torre Corporativa Triple A (4 sótanos, 850 cajones)",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80",
      need: "El cliente presentaba constantes colisiones en rampas de doble sentido, cuellos de botella en horas pico matutinas y quejas recurrentes de inquilinos por falta de visibilidad en esquinas de columnas.",
      analysis: "Se identificaron anchos de carril insuficientes en curvas, ausencia de reductores de velocidad en pendiente y columnas desprotegidas que sufrían impactos continuos de carrocerías.",
      alternatives: "Se evaluó señalización vertical estándar vs. integración combinada de pintura de tráfico con microesfera, esquineros de caucho amortiguantes y vialetas LED de advertencia en rampas.",
      solution: "AMM diseñó un plan maestro de circulación unidireccional por niveles, repintó 850 cajones con pintura alquidálica modificada, instaló 240 esquineros de caucho vulcanizado, colocó 18 topes de alta resistencia y 45 vialetas reflejantes en rampas críticas.",
      productsUsed: ["Protectores de Columna 100 cm", "Topes de Caucho 183 cm", "Vialetas ABS Bicara", "Pintura de Tráfico Base Solvente"],
      servicesDone: ["Asesoría de Señalización", "Trazo y Pintura", "Pintura en Columnas", "Pintura en Rampas"],
      result: "Reducción del 95% en incidentes de rozamiento vehicular, flujo de salida 30% más rápido en horas pico y felicitación de Protección Civil durante la inspección anual."
    },
    {
      id: "proj-02",
      title: "Adecuación Normativa y Señalética para Centro de Distribución Logística Tlalnepantla",
      category: "Parques Industriales y CEDIS",
      location: "Tlalnepantla, Estado de México",
      clientType: "Operador Logístico de Retail (35,000 m²)",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
      need: "Requerían habilitar 40 andenes de carga con áreas seguras para peatones y montacargas, cumpliendo con la auditoría de seguridad STPS NOM-026.",
      analysis: "Concurrencia peligrosa entre montacargas de alta velocidad y personal de almacén a pie, sin delimitación física ni señalamientos de alto.",
      alternatives: "Barreras metálicas rígidas fijas vs. pintura epóxica de alta resistencia combinada con boyas de advertencia sonora y señalética suspendida de alta visibilidad.",
      solution: "Se trazaron 3,200 metros de pasillos peatonales seguros con achurado amarillo y pasos de cebra, se instalaron boyas troqueladas en cruces críticos y se fabricaron 80 señalamientos suspendidos tipo bandera.",
      productsUsed: ["Boyas Metálicas Calibre 10", "Señales Normativas STPS", "Conos con Reflejante"],
      servicesDone: ["Trazo y Pintura", "Rotulación Especializada", "Asesoría de Señalización"],
      result: "Cero accidentes de tránsito interno registrados en los primeros 12 meses posteriores a la entrega y certificación de seguridad aprobada sin observaciones."
    },
    {
      id: "proj-03",
      title: "Modernización y Señalización de Centro Comercial Plaza Insurgentes",
      category: "Comercial y Retail",
      location: "Colonia del Valle, Ciudad de México",
      clientType: "Centro Comercial de 3 niveles con 600 cajones",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80",
      need: "La plaza remodeló sus acabados interiores pero el estacionamiento lucía obsoleto, oscuro y con señalización desgastada que generaba desorientación a los compradores.",
      analysis: "Falta de identidad por colores en los diferentes niveles y ausencia de cajones preferenciales accesibles cercanos a escaleras eléctricas.",
      alternatives: "Repintado simple de líneas vs. zonificación temática por colores con tótems de orientación tipo Wayfinding y pintura reflectiva en columnas.",
      solution: "AMM implementó una zonificación cromática (Verde, Azul, Naranja), rotuló 120 columnas con numeración gigante, habilitó 24 cajones para discapacitados con rampas antiderrapantes y colocó 2 podiums de valet parking personalizados con el logotipo de la plaza.",
      productsUsed: ["Podiums de Valet Parking", "Señalamientos de Discapacitados", "Esquineros de Caucho", "Vialetas"],
      servicesDone: ["Cajones de Discapacitados", "Pintura en Columnas", "Mantenimiento de Estacionamientos", "Rotulación"],
      result: "Mejora sustancial en la satisfacción de los visitantes, localización inmediata de vehículos y dignificación de los accesos para personas con discapacidad."
    }
  ],

  // RECURSOS DESCARGABLES Y FICHAS TÉCNICAS
  resources: [
    {
      id: "rec-01",
      title: "Catálogo General de Soluciones y Productos AMM 2026",
      category: "Catálogos",
      type: "PDF",
      size: "8.4 MB",
      desc: "Guía completa de las 14 líneas de productos, especificaciones técnicas, materiales y opciones de personalización."
    },
    {
      id: "rec-02",
      title: "Ficha Técnica: Protectores de Columna y Esquineros de Caucho",
      category: "Fichas Técnicas",
      type: "PDF",
      size: "1.2 MB",
      desc: "Propiedades mecánicas del caucho vulcanizado, absorción de impacto y guía de anclaje con tornillería de expansión."
    },
    {
      id: "rec-03",
      title: "Ficha Técnica: Reductores de Velocidad y Topes de Cajón",
      category: "Fichas Técnicas",
      type: "PDF",
      size: "1.5 MB",
      desc: "Pruebas de resistencia a la carga hasta 40 toneladas, coeficientes de fricción y métodos de instalación en asfalto/concreto."
    },
    {
      id: "rec-04",
      title: "Guía Rápida: Normativa NOM-003-SEGOB para Señalética de Protección Civil",
      category: "Guías Normativas",
      type: "PDF",
      size: "2.1 MB",
      desc: "Dimensionamiento de señales fotoluminiscentes, alturas de montaje recomendadas y cálculo de distancias de visualización."
    },
    {
      id: "rec-05",
      title: "Manual de Recomendaciones para Cajones de Discapacitados y Rampas",
      category: "Guías Normativas",
      type: "PDF",
      size: "1.8 MB",
      desc: "Medidas reglamentarias, áreas de transferencia, porcentaje de pendiente en rampas y colores oficiales."
    }
  ],

  // PREGUNTAS FRECUENTES (FAQs)
  faqs: [
    {
      q: "¿AMM vende productos sueltos o solo ejecuta proyectos completos?",
      a: "Atendemos ambos casos: suministramos productos individuales a precio competitivo y también desarrollamos proyectos integrales 'llave en mano', desde el diagnóstico y cálculo de cantidades hasta la instalación garantizada."
    },
    {
      q: "¿Por qué los precios no aparecen de forma automática en la página?",
      a: "Porque en AMM no creemos en cotizaciones a ciegas. El costo de una solución depende del volumen, el tipo de superficie (asfalto, concreto nuevo o pulido), la ubicación geográfica, si requiere instalación nocturna y las alternativas de materiales más convenientes para su presupuesto."
    },
    {
      q: "¿Hacen envíos e instalaciones fuera de la Ciudad de México?",
      a: "Sí. Enviamos productos a toda la República Mexicana y contamos con cuadrillas de aplicación especializada para proyectos en Estado de México, Querétaro, Puebla, Morelos, Hidalgo, Jalisco, Nuevo León y todo el país."
    },
    {
      q: "¿Cómo solicito una cotización personalizada?",
      a: "Puede pulsar el botón 'Solicitar Cotización' en cualquier producto o servicio, usar el botón de WhatsApp directo (+52 55 2966 6690), o subir sus planos y fotografías en la sección 'Envía tu Proyecto'."
    },
    {
      q: "¿Pueden apoyarme si no tengo planos y solo tengo una idea o problema?",
      a: "Por supuesto. Es precisamente la esencia de AMM: cuéntenos qué problema tiene (ej. 'los autos pegan en las columnas' o 'necesito organizar el flujo en mi bodega') y nosotros le propondremos las mejores alternativas técnicas."
    }
  ]
};

// Respaldo de datos predeterminados de fábrica
if (typeof window !== 'undefined') {
  window.AMM_DATA_DEFAULT = JSON.parse(JSON.stringify(AMM_DATA));

  // Carga de datos personalizados de administración si existen
  try {
    const savedCustom = localStorage.getItem('amm_custom_data');
    if (savedCustom) {
      const parsed = JSON.parse(savedCustom);
      if (parsed.productCategories && Array.isArray(parsed.productCategories)) {
        AMM_DATA.productCategories = parsed.productCategories;
      }
      if (parsed.projects && Array.isArray(parsed.projects)) {
        AMM_DATA.projects = parsed.projects;
      }
      if (parsed.services && Array.isArray(parsed.services)) {
        AMM_DATA.services = parsed.services;
      }
    }
  } catch (err) {
    console.warn('No se pudieron leer datos personalizados previos:', err);
  }

  // Método para guardar cambios desde el panel de administración
  AMM_DATA.saveCustomData = function() {
    try {
      const toSave = {
        productCategories: AMM_DATA.productCategories,
        projects: AMM_DATA.projects,
        services: AMM_DATA.services
      };
      localStorage.setItem('amm_custom_data', JSON.stringify(toSave));
      return true;
    } catch (e) {
      console.error('Error al guardar datos en localStorage:', e);
      return false;
    }
  };

  // Método para restaurar a datos originales de fábrica
  AMM_DATA.resetToDefaults = function() {
    try {
      localStorage.removeItem('amm_custom_data');
      if (window.AMM_DATA_DEFAULT) {
        AMM_DATA.productCategories = JSON.parse(JSON.stringify(window.AMM_DATA_DEFAULT.productCategories));
        AMM_DATA.projects = JSON.parse(JSON.stringify(window.AMM_DATA_DEFAULT.projects));
        AMM_DATA.services = JSON.parse(JSON.stringify(window.AMM_DATA_DEFAULT.services));
      }
      return true;
    } catch (e) {
      console.error('Error al restablecer valores por defecto:', e);
      return false;
    }
  };

  window.AMM_DATA = AMM_DATA;
}

