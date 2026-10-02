// AMM — Controlador Principal de la Aplicación (App Router & Interacciones)
var AMM_DATA = window.AMM_DATA || (typeof AMM_DATA !== 'undefined' ? AMM_DATA : {});
var AMMSearchEngine = window.AMMSearchEngine || (typeof AMMSearchEngine !== 'undefined' ? AMMSearchEngine : class {});
var AMMAssistant = window.AMMAssistant || (typeof AMMAssistant !== 'undefined' ? AMMAssistant : class {});

class AMMApp {
  constructor() {
    this.searchEngine = new AMMSearchEngine();
    this.assistant = new AMMAssistant();
    this.currentView = 'inicio';
    this.uploadedFiles = [];
    this.quoteRequests = JSON.parse(localStorage.getItem('amm_quotes') || '[]');

    this.initElements();
    this.bindEvents();
    this.renderInitialContent();
    this.handleRouteFromHash();
  }

  initElements() {
    // Navigation & Sidebar
    this.sidebar = document.getElementById('amm-sidebar');
    this.mobileOverlay = document.getElementById('mobile-overlay');
    this.hamburgerBtn = document.getElementById('mobile-hamburger');
    this.navLinks = document.querySelectorAll('[data-nav-target]');
    this.views = document.querySelectorAll('.view-section');

    // Search
    this.searchInput = document.getElementById('hero-search-input');
    this.searchDropdown = document.getElementById('search-results-dropdown');
    this.searchChips = document.querySelectorAll('[data-search-tag]');

    // Modals
    this.productModal = document.getElementById('product-detail-modal');
    this.serviceModal = document.getElementById('service-detail-modal');
    this.quoteModal = document.getElementById('quote-request-modal');
    this.privacyModal = document.getElementById('privacy-policy-modal');
    this.adminModal = document.getElementById('admin-panel-modal');

    // Assistant Drawer
    this.assistantDrawer = document.getElementById('assistant-drawer');
    this.assistantToggleBtn = document.getElementById('btn-toggle-assistant');
    this.assistantCloseBtn = document.getElementById('btn-close-assistant');
    this.assistantForm = document.getElementById('assistant-form');
    this.assistantInput = document.getElementById('assistant-input');
    this.assistantMessages = document.getElementById('assistant-messages');

    // Drag & Drop
    this.dropZone = document.getElementById('project-drop-zone');
    this.fileInput = document.getElementById('project-file-input');
    this.fileListContainer = document.getElementById('project-file-list');
    this.projectForm = document.getElementById('project-submission-form');
    this.formSuccessAlert = document.getElementById('form-success-alert');

    // Admin Toggle & CMS
    this.adminToggleBtn = document.getElementById('admin-view-trigger');
    this.adminContainer = document.getElementById('admin-view-container');
    this.adminCrudModal = document.getElementById('admin-crud-modal');
    this.adminCrudBody = document.getElementById('admin-crud-modal-body');
    this.adminTab = 'productos';
    this.adminFilterCat = 'all';
  }

  bindEvents() {
    // Mobile Drawer
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => this.toggleMobileSidebar(true));
    }
    if (this.mobileOverlay) {
      this.mobileOverlay.addEventListener('click', () => this.toggleMobileSidebar(false));
    }

    // Delegación global para navegación infalible
    document.addEventListener('click', (e) => {
      const navEl = e.target.closest('[data-nav-target]');
      if (navEl) {
        e.preventDefault();
        const target = navEl.getAttribute('data-nav-target');
        this.navigateTo(target);
        this.toggleMobileSidebar(false);
      }
    });

    // Hash change routing
    window.addEventListener('hashchange', () => this.handleRouteFromHash());

    // Search Engine Events
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
      this.searchInput.addEventListener('focus', () => {
        if (this.searchInput.value.trim()) {
          this.searchDropdown.classList.add('active');
        }
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-container')) {
          if (this.searchDropdown) this.searchDropdown.classList.remove('active');
        }
      });
    }

    // Search Chips
    this.searchChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-search-tag');
        if (this.searchInput) {
          this.searchInput.value = query;
          this.handleSearchInput(query);
          this.searchDropdown.classList.add('active');
          this.searchInput.focus();
        }
      });
    });

    // Assistant Events
    if (this.assistantToggleBtn) {
      this.assistantToggleBtn.addEventListener('click', () => this.toggleAssistant());
    }
    if (this.assistantCloseBtn) {
      this.assistantCloseBtn.addEventListener('click', () => this.toggleAssistant(false));
    }
    if (this.assistantForm) {
      this.assistantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAssistantUserMessage();
      });
    }

    // Drag & Drop File Management
    if (this.dropZone && this.fileInput) {
      this.dropZone.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => this.handleFileSelection(e.target.files));

      ['dragenter', 'dragover'].forEach(eventName => {
        this.dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          this.dropZone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        this.dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          this.dropZone.classList.remove('dragover');
        });
      });

      this.dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files) {
          this.handleFileSelection(dt.files);
        }
      });
    }

    // Project Form Submission
    if (this.projectForm) {
      this.projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleProjectFormSubmit();
      });
    }

    // Close Modals on Backdrop or Close Button
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close-x')) {
          modal.classList.remove('active');
        }
      });
    });

    // Admin Panel Trigger
    if (this.adminToggleBtn) {
      this.adminToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openAdminPanel();
      });
    }
  }

  openAdminPanel() {
    this.navigateTo('admin');
  }

  toggleMobileSidebar(open) {
    if (!this.sidebar) return;
    if (open) {
      this.sidebar.classList.add('open');
      if (this.mobileOverlay) this.mobileOverlay.classList.add('active');
    } else {
      this.sidebar.classList.remove('open');
      if (this.mobileOverlay) this.mobileOverlay.classList.remove('active');
    }
  }

  handleRouteFromHash() {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    this.navigateTo(hash, false);
  }

  navigateTo(viewId, updateHash = true) {
    const targetView = document.getElementById(`view-${viewId}`);
    if (!targetView) return;

    this.views = document.querySelectorAll('.view-section');
    this.views.forEach(v => v.style.display = 'none');
    targetView.style.display = 'block';

    const allNavLinks = document.querySelectorAll('[data-nav-target]');
    allNavLinks.forEach(link => {
      if (link.getAttribute('data-nav-target') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    this.currentView = viewId;
    if (updateHash) {
      window.location.hash = viewId;
    }

    // Actualizar título en Top App Bar estilo Android
    const headerTitle = document.getElementById('android-header-title');
    if (headerTitle) {
      const titles = {
        'inicio': 'INICIO',
        'nosotros': 'NOSOTROS',
        'servicios': 'SERVICIOS',
        'productos': 'PRODUCTOS',
        'proyectos': 'PROYECTOS',
        'fichas-tecnicas': 'FICHAS TÉCNICAS',
        'contacto': 'CONTACTO',
        'admin': 'ADMINISTRACIÓN'
      };
      headerTitle.textContent = titles[viewId] || viewId.toUpperCase();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewId === 'admin') {
      this.renderAdminView();
    }
  }

  renderInitialContent() {
    this.renderProductCategories();
    this.renderServices();
    this.renderProjects();
    this.renderResources();
    this.renderFaqs();
    this.initAssistantGreeting();
  }

  // Render 14 Product Categories con Iconografía Android
  renderProductCategories() {
    const grid = document.getElementById('products-categories-grid');
    if (!grid) return;

    const catIcons = {
      "alineadores": "🚧",
      "barreras-estacionamiento": "🛑",
      "barricadas": "⚠️",
      "boyas-botones": "🔘",
      "burros": "🚸",
      "conos": "🔶",
      "podiums-valet": "🔑",
      "protectores-columna": "🛡️",
      "reductores-topes": "⛔",
      "senales-normativas": "🪧",
      "senalizacion-horizontal": "🛣️",
      "totems": "🏛️",
      "vialetas": "👁️",
      "rotulacion": "🏷️"
    };

    grid.innerHTML = AMM_DATA.productCategories.map(cat => `
      <div class="category-card" data-category-id="${cat.id}">
        <div class="category-image-wrap">
          <img src="${cat.image}" alt="${cat.name}" class="category-image" loading="lazy" />
          <span class="android-cat-pill">${catIcons[cat.id] || '📦'}</span>
          <span class="category-count-badge">📋 ${cat.products.length} productos</span>
        </div>
        <div class="category-body">
          <div>
            <h3 class="category-name"><span class="cat-title-icon">${catIcons[cat.id] || '📦'}</span> ${cat.name}</h3>
            <p class="category-desc">${cat.shortDesc}</p>
            <p class="category-apps"><span class="app-icon">🎯</span> <strong>Aplicaciones:</strong> ${cat.applications}</p>
          </div>
          <button class="btn btn-outline btn-sm btn-category-open" data-cat-id="${cat.id}">
            <span>📦</span> Ver Catálogo &rarr;
          </button>
        </div>
      </div>
    `).join('');

    // Bind category click
    grid.querySelectorAll('.btn-category-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        this.openCategoryDetailModal(catId);
      });
    });
  }

  // Render 8 Services con Iconografía Android
  renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    const servIcons = {
      "trazo-y-pintura": "📏",
      "mantenimiento-estacionamientos": "🧹",
      "pintura-rampas-estacionamiento": "📐",
      "pintura-columnas": "🏛️",
      "cajones-discapacitados": "♿",
      "fabricacion-letreros-luminosos": "💡",
      "asesoria-senalizacion": "📋",
      "rotulacion-servicios": "🎨"
    };

    grid.innerHTML = AMM_DATA.services.map(serv => `
      <div class="service-card" data-service-id="${serv.id}">
        <div class="service-img-wrap">
          <img src="${serv.image}" alt="${serv.name}" class="service-img" loading="lazy" />
          <span class="android-serv-pill">${servIcons[serv.id] || '🛠️'}</span>
        </div>
        <div class="service-body">
          <div>
            <h3 class="service-name"><span class="serv-title-icon">${servIcons[serv.id] || '🛠️'}</span> ${serv.name}</h3>
            <p class="service-desc">${serv.shortDesc}</p>
          </div>
          <button class="btn btn-outline btn-sm btn-service-open" data-serv-id="${serv.id}">
            <span>🛠️</span> Conocer Servicio &rarr;
          </button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-service-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const servId = btn.getAttribute('data-serv-id');
        this.openServiceDetailModal(servId);
      });
    });
  }

  // Render Projects / Case Studies
  renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = AMM_DATA.projects.map(proj => `
      <div class="project-card">
        <div class="project-media">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" />
          <span class="project-badge">${proj.category}</span>
        </div>
        <div class="project-info">
          <div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-location">📍 ${proj.location} · ${proj.clientType}</p>
            
            <div class="project-breakdown">
              <div class="breakdown-box">
                <div class="breakdown-label">1. Necesidad del Cliente</div>
                <div class="breakdown-text">${proj.need}</div>
              </div>
              <div class="breakdown-box">
                <div class="breakdown-label">2. Análisis AMM</div>
                <div class="breakdown-text">${proj.analysis}</div>
              </div>
              <div class="breakdown-box">
                <div class="breakdown-label">3. Alternativas Evaluadas</div>
                <div class="breakdown-text">${proj.alternatives}</div>
              </div>
              <div class="breakdown-box">
                <div class="breakdown-label">4. Solución Integral</div>
                <div class="breakdown-text">${proj.solution}</div>
              </div>
            </div>

            <div class="project-tags">
              ${proj.productsUsed.map(p => `<span class="tag-item">📦 ${p}</span>`).join('')}
              ${proj.servicesDone.map(s => `<span class="tag-item">🛠️ ${s}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 16px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-success);">
              ✅ Resultado: ${proj.result.substring(0, 75)}...
            </span>
            <button class="btn btn-primary btn-sm btn-quote-proj" data-proj-title="${proj.title}">
              Cotizar Solución Similar
            </button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-quote-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-proj-title');
        this.openQuoteModal(`Solución basada en caso de estudio: ${title}`);
      });
    });
  }

  // Render Downloadable Resources
  renderResources() {
    const list = document.getElementById('resources-list');
    if (!list) return;

    list.innerHTML = AMM_DATA.resources.map(rec => `
      <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <div style="width: 48px; height: 48px; background: var(--color-surface-subtle); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
            📄
          </div>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 4px;">${rec.title}</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 4px;">${rec.desc}</p>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-light); text-transform: uppercase;">
              ${rec.category} · ${rec.type} · ${rec.size}
            </span>
          </div>
        </div>
        <button class="btn btn-outline btn-sm btn-download-rec" data-rec-title="${rec.title}">
          Descargar PDF
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-download-rec').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-rec-title');
        alert(`Generando descarga de: ${title}\n(Documento técnico oficial AMM disponible para descarga directa).`);
      });
    });
  }

  // Render FAQs
  renderFaqs() {
    const container = document.getElementById('faqs-container');
    if (!container) return;

    container.innerHTML = AMM_DATA.faqs.map((faq, idx) => `
      <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px 24px; margin-bottom: 12px;">
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 8px; color: var(--color-text-main);">
          ${faq.q}
        </h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.55;">
          ${faq.a}
        </p>
      </div>
    `).join('');
  }

  // Search Engine Input Handler
  handleSearchInput(query) {
    if (!this.searchDropdown) return;
    if (!query || query.trim().length < 2) {
      this.searchDropdown.classList.remove('active');
      return;
    }

    const results = this.searchEngine.search(query);
    this.renderSearchResults(results);
    this.searchDropdown.classList.add('active');
  }

  renderSearchResults(results) {
    if (results.total === 0) {
      this.searchDropdown.innerHTML = `
        <div class="search-empty-state">
          <p style="font-weight: 600; color: var(--color-text-main); margin-bottom: 6px;">
            No encontramos coincidencias exactas para "${results.query}".
          </p>
          <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 16px;">
            Recuerda que en AMM podemos fabricar o integrar la solución que necesitas.
          </p>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-accent btn-sm" id="search-open-assistant-btn">
              🤖 Hablar con Asistente AMM
            </button>
            <button class="btn btn-outline btn-sm" id="search-open-project-btn">
              🏗️ Enviar mi Proyecto
            </button>
          </div>
        </div>
      `;

      const astBtn = document.getElementById('search-open-assistant-btn');
      if (astBtn) astBtn.addEventListener('click', () => {
        this.searchDropdown.classList.remove('active');
        this.toggleAssistant(true);
        this.assistantInput.value = `Necesito asesoría sobre: ${results.query}`;
        this.handleAssistantUserMessage();
      });

      const prjBtn = document.getElementById('search-open-project-btn');
      if (prjBtn) prjBtn.addEventListener('click', () => {
        this.searchDropdown.classList.remove('active');
        this.navigateTo('proyectos');
      });
      return;
    }

    let html = '';

    // Products
    if (results.products.length > 0) {
      html += `
        <div class="results-group">
          <div class="results-group-title">Productos y Categorías</div>
          ${results.products.map(p => `
            <div class="result-item search-prod-item" data-type="${p.type}" data-id="${p.id}" data-cat-id="${p.category ? p.category.id : p.id}">
              <div class="result-info">
                <span class="result-title">${p.title}</span>
                <span class="result-meta">${p.subtitle}</span>
              </div>
              <span class="result-badge">${p.type === 'category' ? 'Categoría' : 'Producto'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Services
    if (results.services.length > 0) {
      html += `
        <div class="results-group">
          <div class="results-group-title">Servicios Especializados</div>
          ${results.services.map(s => `
            <div class="result-item search-serv-item" data-id="${s.id}">
              <div class="result-info">
                <span class="result-title">${s.title}</span>
                <span class="result-meta">${s.desc.substring(0, 60)}...</span>
              </div>
              <span class="result-badge">Servicio</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Projects
    if (results.projects.length > 0) {
      html += `
        <div class="results-group">
          <div class="results-group-title">Casos de Éxito</div>
          ${results.projects.map(pr => `
            <div class="result-item search-proj-item" data-id="${pr.id}">
              <div class="result-info">
                <span class="result-title">${pr.title}</span>
                <span class="result-meta">${pr.subtitle}</span>
              </div>
              <span class="result-badge">Proyecto</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Suggested actions if search was exploratory
    html += `
      <div style="padding: 12px 16px; background: var(--color-surface-subtle); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.8rem; color: var(--color-text-muted);">¿No estás seguro de cuál es la mejor alternativa?</span>
        <button class="btn btn-outline btn-sm" id="search-bar-ask-ast">
          Consultar Asistente AMM
        </button>
      </div>
    `;

    this.searchDropdown.innerHTML = html;

    // Bind clicks
    this.searchDropdown.querySelectorAll('.search-prod-item').forEach(el => {
      el.addEventListener('click', () => {
        const catId = el.getAttribute('data-cat-id');
        this.searchDropdown.classList.remove('active');
        this.openCategoryDetailModal(catId);
      });
    });

    this.searchDropdown.querySelectorAll('.search-serv-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        this.searchDropdown.classList.remove('active');
        this.openServiceDetailModal(id);
      });
    });

    this.searchDropdown.querySelectorAll('.search-proj-item').forEach(el => {
      el.addEventListener('click', () => {
        this.searchDropdown.classList.remove('active');
        this.navigateTo('proyectos');
      });
    });

    const askAstBtn = document.getElementById('search-bar-ask-ast');
    if (askAstBtn) {
      askAstBtn.addEventListener('click', () => {
        this.searchDropdown.classList.remove('active');
        this.toggleAssistant(true);
        this.assistantInput.value = `¿Qué me recomiendas para: ${results.query}?`;
        this.handleAssistantUserMessage();
      });
    }
  }

  // Category & Product Detail Modal
  openCategoryDetailModal(catId) {
    const cat = AMM_DATA.productCategories.find(c => c.id === catId);
    if (!cat || !this.productModal) return;

    const modalBody = this.productModal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="section-tag accent">Catálogo de Productos</span>
        <h2 style="font-size: 1.8rem; margin: 8px 0;">${cat.name}</h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">${cat.shortDesc}</p>
        <p style="font-size: 0.85rem; margin-top: 6px; color: var(--color-text-main);"><strong>Aplicaciones habituales:</strong> ${cat.applications}</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px;">
        ${cat.products.map(prod => `
          <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text-main);">${prod.name}</h4>
                <span style="font-size: 0.78rem; font-family: monospace; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">SKU: ${prod.sku}</span>
              </div>
              <button class="btn btn-primary btn-sm btn-quote-single" data-prod-name="${prod.name} (SKU: ${prod.sku})">
                <span>⚡</span> Solicitar Cotización
              </button>
            </div>

            <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 16px;">${prod.description}</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.82rem;">
              <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: flex; align-items: center; gap: 6px;">
                <span>🧱</span> <span><strong>Material:</strong> ${prod.material}</span>
              </div>
              <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: flex; align-items: center; gap: 6px;">
                <span>📐</span> <span><strong>Medidas:</strong> ${prod.measurements}</span>
              </div>
              ${prod.reflector ? `
                <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: flex; align-items: center; gap: 6px;">
                  <span>✨</span> <span><strong>Reflejante:</strong> ${prod.reflector}</span>
                </div>
              ` : ''}
              ${prod.resistance ? `
                <div style="background: #ffffff; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: flex; align-items: center; gap: 6px;">
                  <span>🛡️</span> <span><strong>Resistencia:</strong> ${prod.resistance}</span>
                </div>
              ` : ''}
            </div>

            ${prod.variants ? `
              <div style="margin-top: 12px; font-size: 0.8rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px;">
                <span>🎨</span> <span><strong>Variantes disponibles:</strong> ${prod.variants.join(' · ')}</span>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <div style="background: var(--color-accent-light); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: var(--radius-md); padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-accent-dark);">¿Requieres medidas o especificaciones personalizadas?</h4>
          <p style="font-size: 0.82rem; color: var(--color-accent-dark);">Fabricamos sobre diseño e integramos productos especiales para tu proyecto.</p>
        </div>
        <button class="btn btn-accent btn-sm btn-quote-cat-all" data-cat-name="${cat.name}">
          Cotizar Solución Integral
        </button>
      </div>
    `;

    modalBody.querySelectorAll('.btn-quote-single').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = btn.getAttribute('data-prod-name');
        this.productModal.classList.remove('active');
        this.openQuoteModal(`Cotización de producto: ${prod}`);
      });
    });

    modalBody.querySelectorAll('.btn-quote-cat-all').forEach(btn => {
      btn.addEventListener('click', () => {
        const cname = btn.getAttribute('data-cat-name');
        this.productModal.classList.remove('active');
        this.openQuoteModal(`Cotización integral de línea: ${cname}`);
      });
    });

    this.productModal.classList.add('active');
  }

  // Service Detail Modal
  openServiceDetailModal(servId) {
    const serv = AMM_DATA.services.find(s => s.id === servId);
    if (!serv || !this.serviceModal) return;

    const modalBody = this.serviceModal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="section-tag accent">Servicio Especializado AMM</span>
        <h2 style="font-size: 1.8rem; margin: 8px 0;">${serv.name}</h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">${serv.shortDesc}</p>
      </div>

      <div style="margin-bottom: 24px; border-radius: var(--radius-md); overflow: hidden; height: 260px;">
        <img src="${serv.image}" alt="${serv.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;">
        <div style="background: var(--color-surface-subtle); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
          <h4 style="font-size: 0.95rem; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Qué Incluye el Servicio</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.86rem; color: var(--color-text-main);">
            ${serv.includes.map(inc => `<li style="display: flex; gap: 8px;"><span>✔</span> <span>${inc}</span></li>`).join('')}
          </ul>
        </div>
        <div style="background: var(--color-surface-subtle); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
          <h4 style="font-size: 0.95rem; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Beneficios Clave</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.86rem; color: var(--color-text-main);">
            ${serv.benefits.map(ben => `<li style="display: flex; gap: 8px;"><span>⭐</span> <span>${ben}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1rem; font-weight: 800; text-transform: uppercase; margin-bottom: 14px;">Proceso de Ejecución</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${serv.process.map(p => `
            <div style="background: #ffffff; border: 1px solid var(--color-border); padding: 12px 16px; border-radius: var(--radius-sm); font-size: 0.88rem;">
              ${p}
            </div>
          `).join('')}
        </div>
      </div>

      ${serv.faqs && serv.faqs.length > 0 ? `
        <div style="margin-bottom: 28px;">
          <h4 style="font-size: 1rem; font-weight: 800; text-transform: uppercase; margin-bottom: 14px;">Preguntas Frecuentes del Servicio</h4>
          ${serv.faqs.map(f => `
            <div style="margin-bottom: 10px; font-size: 0.86rem;">
              <strong style="color: var(--color-text-main);">${f.q}</strong>
              <p style="color: var(--color-text-muted); margin-top: 2px;">${f.a}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--color-border); padding-top: 20px;">
        <button class="btn btn-outline" onclick="document.getElementById('service-detail-modal').classList.remove('active')">
          Cerrar
        </button>
        <button class="btn btn-accent btn-quote-this-serv" data-serv-name="${serv.name}">
          Solicitar Cotización de este Servicio
        </button>
      </div>
    `;

    modalBody.querySelector('.btn-quote-this-serv').addEventListener('click', () => {
      this.serviceModal.classList.remove('active');
      this.openQuoteModal(`Servicio especializado: ${serv.name}`);
    });

    this.serviceModal.classList.add('active');
  }

  // Quote / Request Modal
  openQuoteModal(prefilledText = '') {
    if (!this.quoteModal) return;
    const descField = document.getElementById('quote-modal-desc');
    if (descField) {
      descField.value = prefilledText;
    }
    this.quoteModal.classList.add('active');
  }

  handleQuickQuoteSubmit() {
    const descField = document.getElementById('quote-modal-desc');
    const nameField = document.getElementById('quote-modal-name');
    const phoneField = document.getElementById('quote-modal-phone');
    const emailField = document.getElementById('quote-modal-email');
    const cityField = document.getElementById('quote-modal-city');

    const desc = descField ? descField.value.trim() : 'Solicitud rápida';
    const name = nameField ? nameField.value.trim() : 'Cliente Web';
    const phone = phoneField ? phoneField.value.trim() : 'N/A';
    const email = emailField ? emailField.value.trim() : 'N/A';
    const city = cityField && cityField.value.trim() ? cityField.value.trim() : 'No indicada';

    const folio = 'AMM-' + Math.floor(100000 + Math.random() * 900000);
    const newQuote = {
      folio,
      date: new Date().toLocaleString(),
      name,
      company: 'Contacto Rápido',
      phone,
      email,
      city,
      budget: 'Por cotizar',
      description: desc,
      files: []
    };

    this.quoteRequests.unshift(newQuote);
    localStorage.setItem('amm_quotes', JSON.stringify(this.quoteRequests));

    if (this.quoteModal) this.quoteModal.classList.remove('active');
    const form = document.getElementById('quick-quote-form');
    if (form) form.reset();

    alert(`¡Solicitud enviada con éxito!\n\nFolio de seguimiento: ${folio}\nUn asesor técnico especializado de AMM se pondrá en contacto contigo en breve.`);
    this.showToast(`Solicitud ${folio} registrada exitosamente.`);
  }

  // Drag & Drop File Selection
  handleFileSelection(files) {
    if (!files || files.length === 0) return;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'doc', 'docx', 'ppt', 'pptx'];

    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (allowedExtensions.includes(ext)) {
        if (!this.uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
          this.uploadedFiles.push(file);
        }
      } else {
        alert(`El archivo "${file.name}" no tiene una extensión permitida. Formatos admitidos: JPG, PNG, WEBP, PDF, DOC, DOCX, PPT, PPTX.`);
      }
    });

    this.renderFileList();
  }

  renderFileList() {
    if (!this.fileListContainer) return;
    if (this.uploadedFiles.length === 0) {
      this.fileListContainer.innerHTML = '';
      return;
    }

    this.fileListContainer.innerHTML = this.uploadedFiles.map((file, idx) => `
      <div class="file-chip">
        <span>📎 <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)</span>
        <span class="file-chip-remove" data-file-index="${idx}">✕ Eliminar</span>
      </div>
    `).join('');

    this.fileListContainer.querySelectorAll('.file-chip-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-file-index'), 10);
        this.uploadedFiles.splice(index, 1);
        this.renderFileList();
      });
    });
  }

  // Project Form Submit
  handleProjectFormSubmit() {
    const name = document.getElementById('proj-name').value;
    const company = document.getElementById('proj-company').value;
    const phone = document.getElementById('proj-phone').value;
    const email = document.getElementById('proj-email').value;
    const city = document.getElementById('proj-city').value;
    const projectType = document.getElementById('proj-type').value;
    const budget = document.getElementById('proj-budget').value;
    const description = document.getElementById('proj-description').value;

    const folio = 'AMM-' + Math.floor(100000 + Math.random() * 900000);

    const record = {
      folio,
      date: new Date().toLocaleString(),
      name,
      company,
      phone,
      email,
      city,
      projectType,
      budget,
      description,
      files: this.uploadedFiles.map(f => ({ name: f.name, size: f.size }))
    };

    this.quoteRequests.push(record);
    localStorage.setItem('amm_quotes', JSON.stringify(this.quoteRequests));

    if (this.formSuccessAlert) {
      this.formSuccessAlert.style.display = 'block';
      this.formSuccessAlert.innerHTML = `
        <div style="background: #ecfdf5; border: 1.5px solid #10b981; border-radius: var(--radius-md); padding: 24px; color: #065f46; margin-top: 20px;">
          <h4 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 8px;">¡Gracias por contactarnos!</h4>
          <p style="font-size: 0.95rem; margin-bottom: 12px;">Hemos recibido tu información y archivos con el <strong>Folio de Seguimiento: ${folio}</strong>. Nuestro equipo técnico analizará tu requerimiento y se pondrá en contacto contigo.</p>
          <a href="${AMM_DATA.company.contacts.whatsapp.url}&text=Hola%20AMM%2C%20acabo%20de%20enviar%20el%20proyecto%20con%20folio%20${folio}" target="_blank" class="btn btn-accent btn-sm" style="display: inline-flex;">
            Confirmar de inmediato por WhatsApp &rarr;
          </a>
        </div>
      `;
      this.formSuccessAlert.scrollIntoView({ behavior: 'smooth' });
    }

    // Reset Form
    this.projectForm.reset();
    this.uploadedFiles = [];
    this.renderFileList();
  }

  // Assistant Logic & Chat UI
  toggleAssistant(forceState) {
    if (!this.assistantDrawer) return;
    if (forceState !== undefined) {
      if (forceState) {
        this.assistantDrawer.classList.add('active');
        if (this.assistantInput) this.assistantInput.focus();
      } else {
        this.assistantDrawer.classList.remove('active');
      }
    } else {
      this.assistantDrawer.classList.toggle('active');
      if (this.assistantDrawer.classList.contains('active') && this.assistantInput) {
        this.assistantInput.focus();
      }
    }
  }

  initAssistantGreeting() {
    if (!this.assistantMessages) return;
    const initial = this.assistant.processMessage("");
    this.appendBotMessage(initial.reply, initial.actions);
  }

  handleAssistantUserMessage() {
    const text = this.assistantInput.value.trim();
    if (!text) return;

    this.appendUserMessage(text);
    this.assistantInput.value = '';

    // Process Bot Response
    setTimeout(() => {
      const response = this.assistant.processMessage(text);
      this.appendBotMessage(response.reply, response.actions);
    }, 280);
  }

  appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'message user';
    div.innerHTML = `<div class="message-bubble">${text}</div>`;
    this.assistantMessages.appendChild(div);
    this.assistantMessages.scrollTop = this.assistantMessages.scrollHeight;
  }

  appendBotMessage(text, actions = []) {
    const div = document.createElement('div');
    div.className = 'message bot';

    // Format markdown bold & lines
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');

    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = `
        <div class="bot-actions-row">
          ${actions.map((act, i) => `
            <button class="bot-action-btn" data-action-index="${i}">${act.label}</button>
          `).join('')}
        </div>
      `;
    }

    div.innerHTML = `
      <div class="message-bubble">
        ${formattedText}
        ${actionsHtml}
      </div>
    `;

    this.assistantMessages.appendChild(div);
    this.assistantMessages.scrollTop = this.assistantMessages.scrollHeight;

    // Bind action buttons
    div.querySelectorAll('.bot-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-action-index'), 10);
        const actionObj = actions[idx];
        this.handleBotAction(actionObj);
      });
    });
  }

  handleBotAction(action) {
    switch (action.action) {
      case 'open_whatsapp':
        window.open(action.text ? `https://wa.me/525529666690?text=${encodeURIComponent(action.text)}` : AMM_DATA.company.contacts.whatsapp.url, '_blank');
        break;
      case 'open_project_modal':
        this.toggleAssistant(false);
        this.navigateTo('proyectos');
        const descField = document.getElementById('proj-description');
        if (descField && action.prefill) descField.value = action.prefill;
        break;
      case 'open_quote':
        this.toggleAssistant(false);
        this.openQuoteModal(action.prefill || '');
        break;
      case 'view_service':
        this.toggleAssistant(false);
        this.navigateTo('servicios');
        this.openServiceDetailModal(action.target);
        break;
      case 'view_category':
        this.toggleAssistant(false);
        this.navigateTo('productos');
        this.openCategoryDetailModal(action.target);
        break;
      case 'send_prompt':
        this.assistantInput.value = action.prompt;
        this.handleAssistantUserMessage();
        break;
      case 'view_page':
        this.toggleAssistant(false);
        this.navigateTo(action.target);
        break;
      default:
        break;
    }
  }

  // =========================================================================
  // SISTEMA ADMINISTRATIVO SEGURO (CMS PARA PRODUCTOS, PROYECTOS Y LEADS)
  // =========================================================================

  isAdminAuthenticated() {
    return sessionStorage.getItem('amm_admin_auth') === 'true';
  }

  loginAdmin(username, password) {
    const validUser = localStorage.getItem('amm_admin_user') || 'admin';
    const validPass = localStorage.getItem('amm_admin_pass') || 'amm@admin2026';
    if (username.trim() === validUser && password === validPass) {
      sessionStorage.setItem('amm_admin_auth', 'true');
      return true;
    }
    return false;
  }

  logoutAdmin() {
    sessionStorage.removeItem('amm_admin_auth');
    this.renderAdminView();
    this.showToast('Sesión de administración cerrada.');
  }

  showToast(message) {
    let toast = document.getElementById('amm-admin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'amm-admin-toast';
      toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:#f8fafc;padding:12px 24px;border-radius:8px;font-size:0.9rem;font-weight:600;z-index:9999;box-shadow:0 10px 25px rgba(0,0,0,0.3);border-left:4px solid var(--color-accent-amber);transition:opacity 0.3s;';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.style.display = 'none'; }, 300);
    }, 3200);
  }

  renderAdminView() {
    if (!this.adminContainer) {
      this.adminContainer = document.getElementById('admin-view-container');
    }
    if (!this.adminContainer) return;

    if (!this.isAdminAuthenticated()) {
      this.renderAdminLoginForm();
    } else {
      this.renderAdminDashboard();
    }
  }

  renderAdminLoginForm(errorMsg = '') {
    this.adminContainer.innerHTML = `
      <div class="admin-login-container">
        <div class="admin-login-card">
          <div class="admin-lock-icon">🔐</div>
          <span class="section-tag accent" style="margin-bottom: 8px;">ÁREA SEGURA</span>
          <h2 style="font-size: 1.6rem; margin: 8px 0 12px 0;">Panel de Administración AMM</h2>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 20px;">
            Ingresa tus credenciales autorizadas para modificar productos, proyectos, servicios y consultar solicitudes recibidas.
          </p>

          <div class="admin-demo-creds">
            <strong>Credenciales por defecto:</strong><br/>
            • Usuario: <code style="background:#e2e8f0;padding:2px 4px;border-radius:3px;">admin</code><br/>
            • Contraseña: <code style="background:#e2e8f0;padding:2px 4px;border-radius:3px;">amm@admin2026</code>
          </div>

          ${errorMsg ? `
            <div style="background:#fee2e2;border:1px solid #ef4444;color:#b91c1c;padding:10px 14px;border-radius:6px;font-size:0.85rem;margin-bottom:16px;text-align:left;">
              ⚠️ ${errorMsg}
            </div>
          ` : ''}

          <form id="admin-login-form" style="display:flex;flex-direction:column;gap:14px;text-align:left;">
            <div class="form-group">
              <label class="form-label" for="login-user">Usuario Administrador</label>
              <input type="text" id="login-user" class="form-input" placeholder="admin" required value="admin" />
            </div>

            <div class="form-group">
              <label class="form-label" for="login-pass">Contraseña</label>
              <input type="password" id="login-pass" class="form-input" placeholder="••••••••" required value="amm@admin2026" />
            </div>

            <button type="submit" class="btn btn-accent btn-lg" style="width:100%;margin-top:6px;">
              INICIAR SESIÓN EN EL PANEL
            </button>
          </form>
        </div>
      </div>
    `;

    const form = document.getElementById('admin-login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('login-user').value;
        const pass = document.getElementById('login-pass').value;
        if (this.loginAdmin(user, pass)) {
          this.renderAdminView();
          this.showToast('¡Bienvenido al Panel de Administración de AMM!');
        } else {
          this.renderAdminLoginForm('Usuario o contraseña incorrectos. Por favor intenta nuevamente.');
        }
      });
    }
  }

  renderAdminDashboard() {
    let totalProds = 0;
    if (AMM_DATA.productCategories) {
      AMM_DATA.productCategories.forEach(c => {
        if (c.products) totalProds += c.products.length;
      });
    }
    const totalProjects = (AMM_DATA.projects || []).length;
    const totalServices = (AMM_DATA.services || []).length;
    const totalQuotes = this.quoteRequests.length;

    this.adminContainer.innerHTML = `
      <div class="admin-dashboard">
        <!-- Top Bar -->
        <div class="admin-top-bar">
          <div class="admin-top-title">
            <span style="background:var(--color-accent-amber);color:#000;padding:2px 8px;border-radius:4px;font-size:0.9rem;font-weight:900;">ADMIN</span>
            <span>Gestor Integral de Contenidos AMM</span>
          </div>
          <div class="admin-top-actions">
            <button class="btn btn-outline-dark btn-sm" id="btn-admin-reset-defaults" title="Restablecer datos originales">
              🔄 Restaurar Catálogo de Fábrica
            </button>
            <button class="btn btn-danger btn-sm" id="btn-admin-logout">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        <!-- Metric Counter Tiles -->
        <div class="admin-stats-row">
          <div class="admin-stat-box">
            <span class="admin-stat-num">${totalProds}</span>
            <span class="admin-stat-label">Productos Activos</span>
          </div>
          <div class="admin-stat-box">
            <span class="admin-stat-num">${totalProjects}</span>
            <span class="admin-stat-label">Proyectos / Casos</span>
          </div>
          <div class="admin-stat-box">
            <span class="admin-stat-num">${totalServices}</span>
            <span class="admin-stat-label">Servicios Registrados</span>
          </div>
          <div class="admin-stat-box">
            <span class="admin-stat-num" style="color:var(--color-accent-dark);">${totalQuotes}</span>
            <span class="admin-stat-label">Cotizaciones Recibidas</span>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="admin-tabs-nav">
          <button class="admin-tab-btn ${this.adminTab === 'productos' ? 'active' : ''}" data-tab="productos">
            📦 Gestión de Productos (${totalProds})
          </button>
          <button class="admin-tab-btn ${this.adminTab === 'proyectos' ? 'active' : ''}" data-tab="proyectos">
            🏗️ Gestión de Proyectos (${totalProjects})
          </button>
          <button class="admin-tab-btn ${this.adminTab === 'servicios' ? 'active' : ''}" data-tab="servicios">
            🛠️ Servicios (${totalServices})
          </button>
          <button class="admin-tab-btn ${this.adminTab === 'cotizaciones' ? 'active' : ''}" data-tab="cotizaciones">
            📥 Bandeja de Solicitudes (${totalQuotes})
          </button>
        </div>

        <!-- Tab Body -->
        <div class="admin-tab-content" id="admin-tab-body"></div>
      </div>
    `;

    // Bind Top Actions
    const logoutBtn = document.getElementById('btn-admin-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logoutAdmin());
    }

    const resetBtn = document.getElementById('btn-admin-reset-defaults');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('¿Deseas restaurar todos los productos, proyectos y servicios a los valores originales de fábrica? Se perderán las modificaciones locales.')) {
          if (AMM_DATA.resetToDefaults) {
            AMM_DATA.resetToDefaults();
            this.renderProductCategories();
            this.renderProjects();
            this.renderServices();
            this.renderAdminDashboard();
            this.showToast('Catálogo restablecido exitosamente a los valores de fábrica.');
          }
        }
      });
    }

    // Bind Tabs
    this.adminContainer.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.adminTab = btn.getAttribute('data-tab');
        this.renderAdminDashboard();
      });
    });

    // Render Active Tab Content
    const tabBody = document.getElementById('admin-tab-body');
    if (!tabBody) return;

    if (this.adminTab === 'productos') {
      this.renderAdminProductsTab(tabBody);
    } else if (this.adminTab === 'proyectos') {
      this.renderAdminProjectsTab(tabBody);
    } else if (this.adminTab === 'servicios') {
      this.renderAdminServicesTab(tabBody);
    } else if (this.adminTab === 'cotizaciones') {
      this.renderAdminQuotesTab(tabBody);
    }
  }

  // --- TAB: PRODUCTOS ---
  renderAdminProductsTab(container) {
    const categories = AMM_DATA.productCategories || [];
    const filterCat = this.adminFilterCat || 'all';

    let allProducts = [];
    categories.forEach(cat => {
      if (cat.products) {
        cat.products.forEach(p => {
          allProducts.push({ ...p, categoryId: cat.id, categoryName: cat.name });
        });
      }
    });

    const filtered = filterCat === 'all' 
      ? allProducts 
      : allProducts.filter(p => p.categoryId === filterCat);

    container.innerHTML = `
      <div class="admin-toolbar">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <label style="font-size:0.85rem;font-weight:700;">Filtrar por Categoría:</label>
          <select id="admin-cat-filter-select" class="form-select" style="max-width:260px;padding:8px 12px;">
            <option value="all" ${filterCat === 'all' ? 'selected' : ''}>Todas las categorías (${allProducts.length} productos)</option>
            ${categories.map(c => `
              <option value="${c.id}" ${filterCat === c.id ? 'selected' : ''}>${c.name} (${(c.products || []).length})</option>
            `).join('')}
          </select>
        </div>

        <button class="btn btn-accent btn-sm" id="btn-admin-add-product">
          ➕ Crear Nuevo Producto
        </button>
      </div>

      <div class="admin-items-grid">
        ${filtered.map(prod => `
          <div class="admin-item-card">
            <img 
              src="${prod.image || 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'}" 
              alt="${prod.name}" 
              class="admin-item-thumb" 
              onerror="this.src='https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'"
            />
            <div class="admin-item-body">
              <div>
                <div class="admin-item-header">
                  <h4 class="admin-item-title">${prod.name}</h4>
                  <span class="category-count-badge" style="position:static;font-size:0.7rem;background:var(--color-dark-bg);">${prod.categoryName}</span>
                </div>
                <div class="admin-item-meta">
                  <strong>SKU:</strong> ${prod.sku} | <strong>Medidas:</strong> ${prod.measurements || 'N/A'}<br/>
                  <strong>Material:</strong> ${prod.material || 'N/A'}
                </div>
                <p style="font-size:0.84rem;color:var(--color-text-muted);line-height:1.45;margin-bottom:8px;">
                  ${(prod.description || '').substring(0, 100)}${(prod.description || '').length > 100 ? '...' : ''}
                </p>
              </div>

              <div class="admin-card-actions">
                <button class="btn btn-edit btn-sm btn-edit-prod" data-cat-id="${prod.categoryId}" data-prod-id="${prod.id}" style="flex:1;">
                  ✏️ Editar
                </button>
                <button class="btn btn-danger btn-sm btn-delete-prod" data-cat-id="${prod.categoryId}" data-prod-id="${prod.id}">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Filter Change
    const filterSelect = document.getElementById('admin-cat-filter-select');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.adminFilterCat = e.target.value;
        this.renderAdminProductsTab(container);
      });
    }

    // Add Product
    const addBtn = document.getElementById('btn-admin-add-product');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.openProductCrudModal(null, null);
      });
    }

    // Edit Product
    container.querySelectorAll('.btn-edit-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        const prodId = btn.getAttribute('data-prod-id');
        this.openProductCrudModal(catId, prodId);
      });
    });

    // Delete Product
    container.querySelectorAll('.btn-delete-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        const prodId = btn.getAttribute('data-prod-id');
        this.deleteProduct(catId, prodId);
      });
    });
  }

  // --- TAB: PROYECTOS ---
  renderAdminProjectsTab(container) {
    const projects = AMM_DATA.projects || [];

    container.innerHTML = `
      <div class="admin-toolbar">
        <div>
          <h3 style="font-size:1.15rem;font-weight:800;">Proyectos y Casos de Estudio Ejecutados</h3>
          <p style="font-size:0.85rem;color:var(--color-text-muted);">Administra los casos de éxito visibles para clientes y presupuestos.</p>
        </div>
        <button class="btn btn-accent btn-sm" id="btn-admin-add-project">
          ➕ Crear Nuevo Proyecto
        </button>
      </div>

      <div class="admin-items-grid">
        ${projects.map(proj => `
          <div class="admin-item-card">
            <img 
              src="${proj.image || 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'}" 
              alt="${proj.title}" 
              class="admin-item-thumb" 
              onerror="this.src='https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'"
            />
            <div class="admin-item-body">
              <div>
                <div class="admin-item-header">
                  <h4 class="admin-item-title">${proj.title}</h4>
                  <span class="category-count-badge" style="position:static;font-size:0.7rem;background:var(--color-dark-bg);">${proj.category}</span>
                </div>
                <div class="admin-item-meta">
                  📍 ${proj.location} · <strong>Cliente:</strong> ${proj.clientType}
                </div>
                <p style="font-size:0.84rem;color:var(--color-text-muted);line-height:1.45;margin-bottom:8px;">
                  <strong>Solución:</strong> ${(proj.solution || '').substring(0, 110)}...
                </p>
              </div>

              <div class="admin-card-actions">
                <button class="btn btn-edit btn-sm btn-edit-proj" data-proj-id="${proj.id}" style="flex:1;">
                  ✏️ Editar
                </button>
                <button class="btn btn-danger btn-sm btn-delete-proj" data-proj-id="${proj.id}">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Add Project
    const addBtn = document.getElementById('btn-admin-add-project');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.openProjectCrudModal(null);
      });
    }

    // Edit Project
    container.querySelectorAll('.btn-edit-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-proj-id');
        this.openProjectCrudModal(id);
      });
    });

    // Delete Project
    container.querySelectorAll('.btn-delete-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-proj-id');
        this.deleteProject(id);
      });
    });
  }

  // --- TAB: SERVICIOS ---
  renderAdminServicesTab(container) {
    const services = AMM_DATA.services || [];

    container.innerHTML = `
      <div class="admin-toolbar">
        <div>
          <h3 style="font-size:1.15rem;font-weight:800;">Servicios de Señalización y Aplicación</h3>
          <p style="font-size:0.85rem;color:var(--color-text-muted);">Modifica descripciones, especificaciones o imágenes de los servicios.</p>
        </div>
      </div>

      <div class="admin-items-grid">
        ${services.map(serv => `
          <div class="admin-item-card">
            <img 
              src="${serv.image}" 
              alt="${serv.name}" 
              class="admin-item-thumb" 
              onerror="this.src='https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'"
            />
            <div class="admin-item-body">
              <div>
                <h4 class="admin-item-title" style="margin-bottom:6px;">${serv.name}</h4>
                <p style="font-size:0.84rem;color:var(--color-text-muted);line-height:1.45;margin-bottom:8px;">
                  ${serv.shortDesc}
                </p>
              </div>

              <div class="admin-card-actions">
                <button class="btn btn-edit btn-sm btn-edit-serv" data-serv-id="${serv.id}" style="width:100%;">
                  ✏️ Editar Descripción e Imagen
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.btn-edit-serv').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-serv-id');
        this.openServiceCrudModal(id);
      });
    });
  }

  // --- TAB: COTIZACIONES ---
  renderAdminQuotesTab(container) {
    container.innerHTML = `
      <div class="admin-toolbar">
        <div>
          <h3 style="font-size:1.15rem;font-weight:800;">Bandeja de Cotizaciones y Solicitudes</h3>
          <p style="font-size:0.85rem;color:var(--color-text-muted);">Registro en tiempo real de leads recibidos a través del formulario y modales.</p>
        </div>
        ${this.quoteRequests.length > 0 ? `
          <button class="btn btn-outline btn-sm" id="btn-admin-clear-quotes">
            Vaciar Solicitudes
          </button>
        ` : ''}
      </div>

      ${this.quoteRequests.length === 0 ? `
        <div style="text-align:center;padding:48px 20px;background:var(--color-surface-subtle);border-radius:var(--radius-md);">
          <p style="color:var(--color-text-muted);font-weight:600;">No hay solicitudes registradas en este momento.</p>
          <p style="font-size:0.8rem;color:var(--color-text-light);margin-top:4px;">Las solicitudes enviadas desde los formularios de la web aparecerán aquí al instante.</p>
        </div>
      ` : `
        <div style="display:flex;flex-direction:column;gap:16px;">
          ${this.quoteRequests.map((item, idx) => `
            <div style="background:var(--color-surface-subtle);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:18px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <span style="font-weight:800;font-family:monospace;background:var(--color-dark-bg);color:#fff;padding:3px 8px;border-radius:4px;">${item.folio || 'AMM-REQ'}</span>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-size:0.78rem;color:var(--color-text-muted);">${item.date || 'Reciente'}</span>
                  <button class="btn btn-danger btn-sm btn-delete-quote" data-quote-index="${idx}" style="padding:4px 8px;font-size:0.75rem;">
                    ✕
                  </button>
                </div>
              </div>

              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:0.84rem;margin-bottom:10px;">
                <div><strong>Nombre:</strong> ${item.name}</div>
                <div><strong>Empresa:</strong> ${item.company || 'N/A'}</div>
                <div><strong>Teléfono:</strong> <a href="tel:${item.phone}" style="color:var(--color-accent-dark);font-weight:700;">${item.phone}</a></div>
                <div><strong>Correo:</strong> ${item.email}</div>
                <div><strong>Ciudad:</strong> ${item.city || 'N/A'}</div>
                <div><strong>Presupuesto:</strong> ${item.budget || 'No indicado'}</div>
              </div>

              <p style="font-size:0.84rem;background:#ffffff;padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--color-border);margin-bottom:8px;line-height:1.5;">
                <strong>Detalle:</strong> ${item.description}
              </p>

              ${item.files && item.files.length > 0 ? `
                <div style="font-size:0.78rem;color:var(--color-text-muted);">
                  <strong>Archivos adjuntos (${item.files.length}):</strong> ${item.files.map(f => f.name).join(', ')}
                </div>
              ` : '<div style="font-size:0.78rem;color:var(--color-text-light);">Sin archivos adjuntos</div>'}
            </div>
          `).join('')}
        </div>
      `}
    `;

    const clearBtn = document.getElementById('btn-admin-clear-quotes');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('¿Deseas vaciar la bandeja de cotizaciones?')) {
          this.quoteRequests = [];
          localStorage.setItem('amm_quotes', '[]');
          this.renderAdminQuotesTab(container);
          this.showToast('Bandeja de solicitudes vaciada.');
        }
      });
    }

    container.querySelectorAll('.btn-delete-quote').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-quote-index'), 10);
        this.quoteRequests.splice(idx, 1);
        localStorage.setItem('amm_quotes', JSON.stringify(this.quoteRequests));
        this.renderAdminQuotesTab(container);
      });
    });
  }

  // --- CRUD MODAL: PRODUCTOS ---
  openProductCrudModal(catId, prodId) {
    if (!this.adminCrudModal) return;
    const body = document.getElementById('admin-crud-modal-body');
    if (!body) return;

    let product = null;
    let category = null;

    if (catId && prodId) {
      category = (AMM_DATA.productCategories || []).find(c => c.id === catId);
      if (category && category.products) {
        product = category.products.find(p => p.id === prodId);
      }
    }

    const isEdit = !!product;
    const allCategories = AMM_DATA.productCategories || [];

    body.innerHTML = `
      <div style="margin-bottom:20px;">
        <span class="section-tag accent">${isEdit ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}</span>
        <h2 style="font-size:1.6rem;margin:6px 0;">${isEdit ? 'Modificar Información del Producto' : 'Crear Producto en Catálogo'}</h2>
        <p style="font-size:0.86rem;color:var(--color-text-muted);">
          Los cambios se guardan localmente y se reflejan de inmediato en la tienda y catálogo público.
        </p>
      </div>

      <form id="product-crud-form" style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div class="form-group">
            <label class="form-label">Categoría *</label>
            <select id="crud-prod-category" class="form-select" required>
              ${allCategories.map(c => `
                <option value="${c.id}" ${category && category.id === c.id ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">SKU / Clave *</label>
            <input type="text" id="crud-prod-sku" class="form-input" required value="${isEdit ? prod.sku : 'AMM-' + Math.floor(1000 + Math.random() * 9000)}" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Nombre del Producto *</label>
          <input type="text" id="crud-prod-name" class="form-input" required value="${isEdit ? product.name : ''}" placeholder="Ej. Protector de Columna con Reflejante" />
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div class="form-group">
            <label class="form-label">Material</label>
            <input type="text" id="crud-prod-material" class="form-input" value="${isEdit ? (product.material || '') : ''}" placeholder="Ej. Caucho virgen vulcanizado" />
          </div>
          <div class="form-group">
            <label class="form-label">Medidas / Dimensiones</label>
            <input type="text" id="crud-prod-measurements" class="form-input" value="${isEdit ? (product.measurements || '') : ''}" placeholder="Ej. Alto 100 cm x Ala 10 cm" />
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div class="form-group">
            <label class="form-label">Tipo de Reflejante</label>
            <input type="text" id="crud-prod-reflector" class="form-input" value="${isEdit ? (product.reflector || '') : ''}" placeholder="Ej. Grado Alta Intensidad Prismática" />
          </div>
          <div class="form-group">
            <label class="form-label">Resistencia / Capacidad</label>
            <input type="text" id="crud-prod-resistance" class="form-input" value="${isEdit ? (product.resistance || '') : ''}" placeholder="Ej. Hasta 20 toneladas de carga" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción Técnica *</label>
          <textarea id="crud-prod-desc" class="form-textarea" rows="3" required placeholder="Describe características, durabilidad y ventajas...">${isEdit ? (product.description || '') : ''}</textarea>
        </div>

        <!-- Manejo de Imagen: URL + Subida de Archivo con Preview -->
        <div class="form-group">
          <label class="form-label">Imagen del Producto (URL o Cargar desde tu equipo)</label>
          <div style="display:flex;gap:10px;margin-bottom:8px;">
            <input type="url" id="crud-prod-img-url" class="form-input" placeholder="https://..." value="${isEdit ? (product.image || (category ? category.image : '')) : 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80'}" />
            <label class="btn btn-outline btn-sm" style="cursor:pointer;white-space:nowrap;margin:0;">
              📁 Subir Imagen
              <input type="file" id="crud-prod-file" accept="image/*" style="display:none;" />
            </label>
          </div>
          <div class="img-preview-container">
            <img id="crud-prod-preview" class="img-preview-thumbnail" src="${isEdit ? (product.image || (category ? category.image : 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80')) : 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80'}" alt="Preview" />
            <span style="font-size:0.78rem;color:var(--color-text-muted);">Vista previa de la imagen seleccionada</span>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:14px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('admin-crud-modal').classList.remove('active')">
            Cancelar
          </button>
          <button type="submit" class="btn btn-accent btn-sm">
            💾 ${isEdit ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    `;

    // Bind Image File Reader
    const fileInput = document.getElementById('crud-prod-file');
    const urlInput = document.getElementById('crud-prod-img-url');
    const previewImg = document.getElementById('crud-prod-preview');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const dataUrl = re.target.result;
            urlInput.value = dataUrl;
            previewImg.src = dataUrl;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', () => {
        previewImg.src = urlInput.value || 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80';
      });
    }

    // Submit Crud Form
    const form = document.getElementById('product-crud-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetCatId = document.getElementById('crud-prod-category').value;
      const targetCat = (AMM_DATA.productCategories || []).find(c => c.id === targetCatId);
      if (!targetCat) return;

      const pData = {
        id: isEdit ? product.id : 'prod-' + Date.now(),
        name: document.getElementById('crud-prod-name').value.trim(),
        sku: document.getElementById('crud-prod-sku').value.trim(),
        material: document.getElementById('crud-prod-material').value.trim(),
        measurements: document.getElementById('crud-prod-measurements').value.trim(),
        reflector: document.getElementById('crud-prod-reflector').value.trim(),
        resistance: document.getElementById('crud-prod-resistance').value.trim(),
        description: document.getElementById('crud-prod-desc').value.trim(),
        image: document.getElementById('crud-prod-img-url').value.trim() || targetCat.image
      };

      if (!targetCat.products) targetCat.products = [];

      if (isEdit) {
        // Si cambió de categoría, remover de la anterior
        if (category && category.id !== targetCatId) {
          category.products = category.products.filter(p => p.id !== product.id);
        }
        const existingIdx = targetCat.products.findIndex(p => p.id === pData.id);
        if (existingIdx >= 0) {
          targetCat.products[existingIdx] = pData;
        } else {
          targetCat.products.push(pData);
        }
      } else {
        targetCat.products.unshift(pData);
      }

      if (AMM_DATA.saveCustomData) AMM_DATA.saveCustomData();

      this.renderProductCategories();
      this.renderAdminView();
      this.adminCrudModal.classList.remove('active');
      this.showToast(isEdit ? '¡Producto actualizado correctamente!' : '¡Producto creado con éxito!');
    });

    this.adminCrudModal.classList.add('active');
  }

  // Eliminar Producto
  deleteProduct(catId, prodId) {
    const category = (AMM_DATA.productCategories || []).find(c => c.id === catId);
    if (!category || !category.products) return;

    const prod = category.products.find(p => p.id === prodId);
    const prodName = prod ? prod.name : 'este producto';

    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente "${prodName}"?`)) {
      category.products = category.products.filter(p => p.id !== prodId);
      if (AMM_DATA.saveCustomData) AMM_DATA.saveCustomData();
      this.renderProductCategories();
      this.renderAdminView();
      this.showToast('Producto eliminado del catálogo.');
    }
  }

  // --- CRUD MODAL: PROYECTOS ---
  openProjectCrudModal(projId) {
    if (!this.adminCrudModal) return;
    const body = document.getElementById('admin-crud-modal-body');
    if (!body) return;

    let proj = null;
    if (projId) {
      proj = (AMM_DATA.projects || []).find(p => p.id === projId);
    }
    const isEdit = !!proj;

    body.innerHTML = `
      <div style="margin-bottom:20px;">
        <span class="section-tag accent">${isEdit ? 'EDITAR CASO DE ESTUDIO' : 'NUEVO PROYECTO'}</span>
        <h2 style="font-size:1.6rem;margin:6px 0;">${isEdit ? 'Modificar Proyecto Ejecutado' : 'Registrar Nuevo Proyecto'}</h2>
        <p style="font-size:0.86rem;color:var(--color-text-muted);">
          Este caso se mostrará en la sección de Proyectos y en los ejemplos de cotización para clientes.
        </p>
      </div>

      <form id="project-crud-form" style="display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Título del Proyecto *</label>
          <input type="text" id="crud-proj-title" class="form-input" required value="${isEdit ? proj.title : ''}" placeholder="Ej. Torre Corporativa Insurgentes Sur" />
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;">
          <div class="form-group">
            <label class="form-label">Categoría *</label>
            <input type="text" id="crud-proj-category" class="form-input" required value="${isEdit ? proj.category : 'Estacionamiento Corporativo'}" placeholder="Ej. Parque Logístico" />
          </div>
          <div class="form-group">
            <label class="form-label">Ubicación *</label>
            <input type="text" id="crud-proj-location" class="form-input" required value="${isEdit ? proj.location : 'Ciudad de México'}" placeholder="Ej. Querétaro, Qro." />
          </div>
          <div class="form-group">
            <label class="form-label">Tipo de Cliente</label>
            <input type="text" id="crud-proj-client" class="form-input" value="${isEdit ? proj.clientType : 'Administración de Inmuebles'}" placeholder="Ej. Nave Industrial" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">1. Necesidad Inicial del Cliente *</label>
          <textarea id="crud-proj-need" class="form-textarea" rows="2" required placeholder="¿Cuál era el problema a resolver?">${isEdit ? proj.need : ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">2. Análisis Técnico AMM *</label>
          <textarea id="crud-proj-analysis" class="form-textarea" rows="2" required placeholder="Evaluación técnica del espacio realizada por AMM...">${isEdit ? proj.analysis : ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">3. Alternativas Evaluadas *</label>
          <textarea id="crud-proj-alternatives" class="form-textarea" rows="2" required placeholder="Opciones y materiales comparados...">${isEdit ? proj.alternatives : ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">4. Solución Integral Implementada *</label>
          <textarea id="crud-proj-solution" class="form-textarea" rows="2" required placeholder="Detalle de la instalación y trabajos realizados...">${isEdit ? proj.solution : ''}</textarea>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div class="form-group">
            <label class="form-label">Productos Utilizados (separados por coma)</label>
            <input type="text" id="crud-proj-products" class="form-input" value="${isEdit ? (proj.productsUsed || []).join(', ') : ''}" placeholder="Ej. Protectores de columna, Topes de caucho" />
          </div>
          <div class="form-group">
            <label class="form-label">Servicios Realizados (separados por coma)</label>
            <input type="text" id="crud-proj-services" class="form-input" value="${isEdit ? (proj.servicesDone || []).join(', ') : ''}" placeholder="Ej. Trazo y pintura airless, Lavado hidrolavado" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Resultado Obtenido *</label>
          <input type="text" id="crud-proj-result" class="form-input" required value="${isEdit ? proj.result : ''}" placeholder="Ej. 100% de reducción de siniestros y cumplimiento de Protección Civil" />
        </div>

        <!-- Imagen del Proyecto -->
        <div class="form-group">
          <label class="form-label">Fotografía del Proyecto (URL o Cargar desde tu equipo)</label>
          <div style="display:flex;gap:10px;margin-bottom:8px;">
            <input type="url" id="crud-proj-img-url" class="form-input" placeholder="https://..." value="${isEdit ? proj.image : 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80'}" />
            <label class="btn btn-outline btn-sm" style="cursor:pointer;white-space:nowrap;margin:0;">
              📁 Subir Imagen
              <input type="file" id="crud-proj-file" accept="image/*" style="display:none;" />
            </label>
          </div>
          <div class="img-preview-container">
            <img id="crud-proj-preview" class="img-preview-thumbnail" src="${isEdit ? proj.image : 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'}" alt="Preview" />
            <span style="font-size:0.78rem;color:var(--color-text-muted);">Vista previa de la fotografía del proyecto</span>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:14px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('admin-crud-modal').classList.remove('active')">
            Cancelar
          </button>
          <button type="submit" class="btn btn-accent btn-sm">
            💾 ${isEdit ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
          </button>
        </div>
      </form>
    `;

    // File Upload Handler
    const fileInput = document.getElementById('crud-proj-file');
    const urlInput = document.getElementById('crud-proj-img-url');
    const previewImg = document.getElementById('crud-proj-preview');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const dataUrl = re.target.result;
            urlInput.value = dataUrl;
            previewImg.src = dataUrl;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', () => {
        previewImg.src = urlInput.value || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80';
      });
    }

    // Submit Project Form
    const form = document.getElementById('project-crud-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const prData = {
        id: isEdit ? proj.id : 'proj-' + Date.now(),
        title: document.getElementById('crud-proj-title').value.trim(),
        category: document.getElementById('crud-proj-category').value.trim(),
        location: document.getElementById('crud-proj-location').value.trim(),
        clientType: document.getElementById('crud-proj-client').value.trim(),
        need: document.getElementById('crud-proj-need').value.trim(),
        analysis: document.getElementById('crud-proj-analysis').value.trim(),
        alternatives: document.getElementById('crud-proj-alternatives').value.trim(),
        solution: document.getElementById('crud-proj-solution').value.trim(),
        productsUsed: document.getElementById('crud-proj-products').value.split(',').map(s => s.trim()).filter(Boolean),
        servicesDone: document.getElementById('crud-proj-services').value.split(',').map(s => s.trim()).filter(Boolean),
        result: document.getElementById('crud-proj-result').value.trim(),
        image: document.getElementById('crud-proj-img-url').value.trim() || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80'
      };

      if (!AMM_DATA.projects) AMM_DATA.projects = [];

      if (isEdit) {
        const idx = AMM_DATA.projects.findIndex(p => p.id === prData.id);
        if (idx >= 0) AMM_DATA.projects[idx] = prData;
      } else {
        AMM_DATA.projects.unshift(prData);
      }

      if (AMM_DATA.saveCustomData) AMM_DATA.saveCustomData();

      this.renderProjects();
      this.renderAdminView();
      this.adminCrudModal.classList.remove('active');
      this.showToast(isEdit ? '¡Proyecto actualizado correctamente!' : '¡Proyecto agregado con éxito!');
    });

    this.adminCrudModal.classList.add('active');
  }

  // Eliminar Proyecto
  deleteProject(projId) {
    if (!AMM_DATA.projects) return;
    const proj = AMM_DATA.projects.find(p => p.id === projId);
    const pTitle = proj ? proj.title : 'este proyecto';

    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente el proyecto "${pTitle}"?`)) {
      AMM_DATA.projects = AMM_DATA.projects.filter(p => p.id !== projId);
      if (AMM_DATA.saveCustomData) AMM_DATA.saveCustomData();
      this.renderProjects();
      this.renderAdminView();
      this.showToast('Proyecto eliminado exitosamente.');
    }
  }

  // --- CRUD MODAL: SERVICIOS ---
  openServiceCrudModal(servId) {
    if (!this.adminCrudModal) return;
    const body = document.getElementById('admin-crud-modal-body');
    if (!body) return;

    const serv = (AMM_DATA.services || []).find(s => s.id === servId);
    if (!serv) return;

    body.innerHTML = `
      <div style="margin-bottom:20px;">
        <span class="section-tag accent">MODIFICAR SERVICIO</span>
        <h2 style="font-size:1.6rem;margin:6px 0;">${serv.name}</h2>
        <p style="font-size:0.86rem;color:var(--color-text-muted);">
          Actualiza la descripción técnica o fotografía representativa del servicio.
        </p>
      </div>

      <form id="service-crud-form" style="display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Nombre del Servicio *</label>
          <input type="text" id="crud-serv-name" class="form-input" required value="${serv.name}" />
        </div>

        <div class="form-group">
          <label class="form-label">Descripción Breve *</label>
          <textarea id="crud-serv-short" class="form-textarea" rows="2" required>${serv.shortDesc}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción Detallada *</label>
          <textarea id="crud-serv-full" class="form-textarea" rows="3" required>${serv.fullDesc || serv.shortDesc}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Fotografía del Servicio</label>
          <div style="display:flex;gap:10px;margin-bottom:8px;">
            <input type="url" id="crud-serv-img-url" class="form-input" value="${serv.image}" />
            <label class="btn btn-outline btn-sm" style="cursor:pointer;white-space:nowrap;margin:0;">
              📁 Subir Imagen
              <input type="file" id="crud-serv-file" accept="image/*" style="display:none;" />
            </label>
          </div>
          <div class="img-preview-container">
            <img id="crud-serv-preview" class="img-preview-thumbnail" src="${serv.image}" alt="Preview" />
            <span style="font-size:0.78rem;color:var(--color-text-muted);">Vista previa</span>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:14px;">
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('admin-crud-modal').classList.remove('active')">
            Cancelar
          </button>
          <button type="submit" class="btn btn-accent btn-sm">
            💾 Guardar Cambios
          </button>
        </div>
      </form>
    `;

    const fileInput = document.getElementById('crud-serv-file');
    const urlInput = document.getElementById('crud-serv-img-url');
    const previewImg = document.getElementById('crud-serv-preview');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            const dataUrl = re.target.result;
            urlInput.value = dataUrl;
            previewImg.src = dataUrl;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', () => {
        previewImg.src = urlInput.value;
      });
    }

    const form = document.getElementById('service-crud-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      serv.name = document.getElementById('crud-serv-name').value.trim();
      serv.shortDesc = document.getElementById('crud-serv-short').value.trim();
      serv.fullDesc = document.getElementById('crud-serv-full').value.trim();
      serv.image = document.getElementById('crud-serv-img-url').value.trim() || serv.image;

      if (AMM_DATA.saveCustomData) AMM_DATA.saveCustomData();

      this.renderServices();
      this.renderAdminView();
      this.adminCrudModal.classList.remove('active');
      this.showToast('Servicio actualizado correctamente.');
    });

    this.adminCrudModal.classList.add('active');
  }
}

// Inicialización ultra segura
function initAMMApp() {
  if (!window.ammApp) {
    if (typeof AMM_DATA === 'undefined') {
      window.AMM_DATA = window.AMM_DATA || {};
    }
    window.ammApp = new AMMApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAMMApp);
} else {
  initAMMApp();
}

