/**
 * DRA. SÂMIA VASCONCELOS — LANDING PAGE DE ALTA CONVERSÃO
 * Script principal: Galeria, Lightbox em Tela Cheia, Interatividade e Adição de Links
 */

// ==========================================================================
// 1. CONFIGURAÇÃO DE IMAGENS (ADICIONE NOVOS LINKS DIRETAMENTE AQUI)
// ==========================================================================
const RESULTS_IMAGES = [
  'https://i.imgur.com/F1Vtae4.jpeg',
  'https://i.imgur.com/M0MDcpB.jpeg',
  'https://i.imgur.com/tg2SnU6.jpeg',
  'https://i.imgur.com/kKLRt32.jpeg',
  'https://i.imgur.com/D85eKWH.jpeg',
  'https://i.imgur.com/WZonstY.jpeg',
  'https://i.imgur.com/QRmbAqA.jpeg',
  'https://i.imgur.com/QEl1N0b.jpeg',
  'https://i.imgur.com/TgKbUkn.jpeg',
  'https://i.imgur.com/YBCeTSP.jpeg',
  'https://i.imgur.com/xmz4Fe2.jpeg',
  'https://i.imgur.com/e0UEYJ5.jpeg',
  'https://i.imgur.com/jCnApiD.jpeg',
  'https://i.imgur.com/H385Hbf.jpeg',
  'https://i.imgur.com/1gcZm2Q.jpeg',
  'https://i.imgur.com/8mjUIf7.jpeg',
  'https://i.imgur.com/xC9rQy6.jpeg',
  'https://i.imgur.com/mTq1d56.jpeg',
  'https://i.imgur.com/99UzbRH.jpeg',
  'https://i.imgur.com/a3Vrmbq.jpeg',
  'https://i.imgur.com/FYrnKKE.jpeg',
  'https://i.imgur.com/GVEDTYd.jpeg',
  'https://i.imgur.com/rvqBn0b.jpeg',
  'https://i.imgur.com/Kpw0RBB.jpeg',
  'https://i.imgur.com/Cvj1SrE.jpeg',
  'https://i.imgur.com/IIe9Vn7.jpeg',
  'https://i.imgur.com/MAcXHDb.jpeg',
  'https://i.imgur.com/0LcEsuV.jpeg',
  'https://i.imgur.com/acCgclP.jpeg',
  'https://i.imgur.com/0jf3wk1.jpeg',
  'https://i.imgur.com/tJ3yGdO.jpeg',
  'https://i.imgur.com/bCvIpZQ.jpeg',
  'https://i.imgur.com/IffBehv.jpeg',
  'https://i.imgur.com/ah4RqGG.jpeg',
  'https://i.imgur.com/iSK1xyp.jpeg',
  'https://i.imgur.com/pXbEOI6.jpeg',
  'https://i.imgur.com/Q6OFo5L.jpeg'
];

const EXPERT_IMAGES = [
  {
    url: 'https://i.imgur.com/41tTJp9.jpeg',
    caption: 'Atendimento individualizado do diagnóstico à entrega final',
    context: 'Consultório no Centro de Tianguá'
  },
  {
    url: 'https://i.imgur.com/gnfloZq.jpeg',
    caption: 'Planejamento estético que valoriza a harmonia natural do seu rosto',
    context: 'Lentes e Reabilitação'
  },
  {
    url: 'https://i.imgur.com/smU1gFS.jpeg',
    caption: 'Escuta atenta e dedicação exclusiva a cada caso',
    context: 'Atendimento com Hora Marcada'
  },
  {
    url: 'https://i.imgur.com/yKDlEc9.jpeg',
    caption: 'Precisão em Lentes de Porcelana, Facetas em Resina e Implantes',
    context: 'Alta Precisão Clínica'
  },
  {
    url: 'https://i.imgur.com/syCgaIQ.jpeg',
    caption: 'Conforto absoluto e opção de sedação para quem tem medo ou ansiedade',
    context: 'Tratamento Sem Dor'
  },
  {
    url: 'https://i.imgur.com/eCrMWW3.jpeg',
    caption: 'Acompanhamento próximo em cada passo do seu novo sorriso',
    context: 'Dra. Sâmia Vasconcelos'
  }
];

// ==========================================================================
// 2. ESTADO GLOBAL DA PÁGINA
// ==========================================================================
let currentGalleryList = [...RESULTS_IMAGES];
let showAllPhotos = false;
const INITIAL_HIGHLIGHTS_COUNT = 12;

// Lightbox state
let activeLightboxItems = [];
let currentLightboxIndex = 0;

// Inicialização com fotos personalizadas salvas no navegador (se houver)
try {
  const savedCustom = localStorage.getItem('samia_custom_gallery_urls');
  if (savedCustom) {
    const parsed = JSON.parse(savedCustom);
    if (Array.isArray(parsed) && parsed.length > 0) {
      currentGalleryList = [...parsed, ...RESULTS_IMAGES];
    }
  }
} catch (e) {
  console.warn('Erro ao carregar fotos personalizadas:', e);
}

// ==========================================================================
// 3. RENDERIZAÇÃO DA GALERIA
// ==========================================================================
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  const countTabAll = document.getElementById('count-all');
  const countTabHighlights = document.getElementById('count-highlights');
  const toggleMoreBtn = document.getElementById('gallery-more-btn');

  if (!container) return;

  if (countTabAll) countTabAll.textContent = currentGalleryList.length;
  if (countTabHighlights) countTabHighlights.textContent = Math.min(INITIAL_HIGHLIGHTS_COUNT, currentGalleryList.length);

  const displayList = showAllPhotos
    ? currentGalleryList
    : currentGalleryList.slice(0, INITIAL_HIGHLIGHTS_COUNT);

  container.innerHTML = displayList.map((url, idx) => `
    <div class="gallery-item" data-index="${idx}" onclick="openResultsLightbox(${idx})">
      <img 
        src="${url}" 
        alt="Caso odontológico real ${idx + 1} - Dra. Sâmia Vasconcelos" 
        loading="lazy" 
        referrerpolicy="no-referrer"
        onerror="this.parentElement.style.display='none'"
      />
      <div class="gallery-item-overlay">
        <span>Caso #${idx + 1}</span>
        <span>Ampliar ↗</span>
      </div>
    </div>
  `).join('');

  if (toggleMoreBtn) {
    if (currentGalleryList.length <= INITIAL_HIGHLIGHTS_COUNT) {
      toggleMoreBtn.style.display = 'none';
    } else {
      toggleMoreBtn.style.display = 'block';
      toggleMoreBtn.textContent = showAllPhotos
        ? `Mostrar apenas os ${INITIAL_HIGHLIGHTS_COUNT} destaques`
        : `Ver todos os ${currentGalleryList.length} resultados reais`;
    }
  }
}

// ==========================================================================
// 4. CONTROLES DA GALERIA & ADIÇÃO DE FOTOS
// ==========================================================================
window.setGalleryFilter = function(mode) {
  showAllPhotos = (mode === 'all');
  
  const tabHighlights = document.getElementById('tab-highlights');
  const tabAll = document.getElementById('tab-all');
  
  if (tabHighlights && tabAll) {
    if (showAllPhotos) {
      tabHighlights.classList.remove('active');
      tabAll.classList.add('active');
    } else {
      tabHighlights.classList.add('active');
      tabAll.classList.remove('active');
    }
  }
  
  renderGallery();
};

window.toggleGalleryMore = function() {
  window.setGalleryFilter(showAllPhotos ? 'highlights' : 'all');
};

window.toggleAddPhotoPanel = function() {
  const panel = document.getElementById('add-photo-panel');
  if (panel) {
    panel.classList.toggle('open');
  }
};

window.handleAddNewPhoto = function(event) {
  event.preventDefault();
  const input = document.getElementById('new-photo-url');
  if (!input) return;

  const url = input.value.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    alert('Por favor, insira um link válido começando com https://');
    return;
  }

  currentGalleryList.unshift(url);
  try {
    const saved = localStorage.getItem('samia_custom_gallery_urls');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(url);
    localStorage.setItem('samia_custom_gallery_urls', JSON.stringify(list));
  } catch (e) {
    console.warn(e);
  }

  input.value = '';
  window.toggleAddPhotoPanel();
  window.setGalleryFilter('all');
};

// ==========================================================================
// 5. LIGHTBOX MODAL (TELA CHEIA)
// ==========================================================================
window.openResultsLightbox = function(index) {
  activeLightboxItems = currentGalleryList.map((url, i) => ({
    url,
    caption: `Resultado real #${i + 1} — Planejado e executado pela Dra. Sâmia Vasconcelos`
  }));
  currentLightboxIndex = index;
  showLightbox();
};

window.openExpertLightbox = function(index) {
  activeLightboxItems = EXPERT_IMAGES.map((item) => ({
    url: item.url,
    caption: `${item.caption} (${item.context})`
  }));
  currentLightboxIndex = index;
  showLightbox();
};

function showLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.nextLightbox = function(e) {
  if (e) e.stopPropagation();
  currentLightboxIndex = (currentLightboxIndex + 1) % activeLightboxItems.length;
  updateLightboxContent();
};

window.prevLightbox = function(e) {
  if (e) e.stopPropagation();
  currentLightboxIndex = (currentLightboxIndex - 1 + activeLightboxItems.length) % activeLightboxItems.length;
  updateLightboxContent();
};

function updateLightboxContent() {
  if (!activeLightboxItems[currentLightboxIndex]) return;

  const item = activeLightboxItems[currentLightboxIndex];
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');

  if (img) {
    img.src = item.url;
    img.alt = item.caption;
  }
  if (caption) {
    caption.textContent = item.caption;
  }
  if (counter) {
    counter.textContent = `${currentLightboxIndex + 1} de ${activeLightboxItems.length}`;
  }
}

// Teclado para o Lightbox
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightbox-modal');
  if (!modal || !modal.classList.contains('active')) return;

  if (e.key === 'Escape') window.closeLightbox();
  if (e.key === 'ArrowRight') window.nextLightbox();
  if (e.key === 'ArrowLeft') window.prevLightbox();
});

// Fechar ao clicar fora da imagem
const lightboxModalEl = document.getElementById('lightbox-modal');
if (lightboxModalEl) {
  lightboxModalEl.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-modal' || e.target.classList.contains('lightbox-main')) {
      window.closeLightbox();
    }
  });
}

// ==========================================================================
// 6. HERO THUMBNAIL SELECTOR
// ==========================================================================
window.changeHeroPhoto = function(index, buttonEl) {
  const mainImg = document.getElementById('hero-main-photo');
  if (mainImg && EXPERT_IMAGES[index]) {
    mainImg.src = EXPERT_IMAGES[index].url;
  }

  const allThumbs = document.querySelectorAll('.hero-thumb-btn');
  allThumbs.forEach(btn => btn.classList.remove('active'));
  if (buttonEl) {
    buttonEl.classList.add('active');
  }
};

// ==========================================================================
// 7. BARRA FLUTUANTE MOBILE (WHATSAPP DE ALTA CONVERSÃO)
// ==========================================================================
function initFloatingMobileCta() {
  const bar = document.getElementById('floating-mobile-cta');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 480) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }, { passive: true });
}

// ==========================================================================
// 8. INICIALIZAÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initFloatingMobileCta();
});
