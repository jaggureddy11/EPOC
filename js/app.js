/**
 * EPOC — Brutalist E-Commerce Core Application Logic
 * Shared Cart, Navigation, Audio FX
 */

const EPOC_PRODUCTS = {
  'brutalist-vase': {
    id: 'brutalist-vase',
    title: 'Brutalist Vase',
    price: 140,
    category: 'Raw Form Collection',
    variant: 'Concrete Ash',
    specs: {
      Material: 'Raw Concrete',
      Weight: '12 kg',
      Dimensions: '40 x 40 x 60 cm',
      Origin: 'Berlin'
    },
    description: 'Raw concrete. Unforgiving angles. A statement piece that demands attention. Reject the smooth, embrace the brutal.',
    image: 'assets/brutalist-vase.jpg'
  },
  'steel-chair': {
    id: 'steel-chair',
    title: 'Steel Chair',
    price: 890,
    category: 'Brutalist Collection',
    variant: 'Raw Industrial',
    specs: {
      Material: 'Cold-Rolled Steel',
      Weight: '28 kg',
      Dimensions: '65 x 60 x 85 cm',
      Origin: 'Detroit'
    },
    description: 'Welded heavy steel with oxidized finish. Not built for passive comfort—built to outlast civilizations.',
    image: 'assets/steel-chair.jpg'
  },
  'abstract-light': {
    id: 'abstract-light',
    title: 'Abstract Light',
    price: 320,
    category: 'Industrial Luminary',
    variant: 'Neon Monolith',
    specs: {
      Material: 'Cast Aluminum & Acrylic',
      Weight: '8 kg',
      Dimensions: '30 x 30 x 120 cm',
      Origin: 'Tokyo'
    },
    description: 'Violent high-lumen fixture that cuts through sterile dark spaces. Raw architectural beacon.',
    image: 'assets/abstract-light.jpg'
  },
  'velvet-lounge': {
    id: 'velvet-lounge',
    title: 'Velvet Lounge',
    price: 1200,
    category: 'Dark Luxury',
    variant: 'Crushed Onyx',
    specs: {
      Material: 'Heavy Brutal Velvet & Steel',
      Weight: '45 kg',
      Dimensions: '90 x 95 x 75 cm',
      Origin: 'Milan'
    },
    description: 'Deep brutalist seating block lined in abrasive-resistant dark velvet on solid slab chassis.',
    image: 'assets/velvet-lounge.jpg'
  }
};

// ================= Audio FX Synthesizer (Zero external dependencies) =================
let audioCtx = null;
function playSound(type = 'click') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'add') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // audio context may be blocked by browser policy until user gesture
  }
}

// ================= Cart Storage & State =================
const CART_STORAGE_KEY = 'epoc_cart_v1';
const PROMO_STORAGE_KEY = 'epoc_promo_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [
      { id: 'steel-chair', qty: 1, variant: 'Raw Industrial' },
      { id: 'brutalist-vase', qty: 2, variant: 'Concrete Ash' }
    ];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  dispatchCartUpdate();
}

function addToCart(productId, qty = 1, variant = null) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    const prod = EPOC_PRODUCTS[productId];
    cart.push({
      id: productId,
      qty: qty,
      variant: variant || prod?.variant || 'Standard'
    });
  }
  saveCart(cart);
  playSound('add');
  showToast(`[${EPOC_PRODUCTS[productId]?.title || 'ARTIFACT'}] ADDED TO CART`);
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
    showToast(`ITEM REMOVED FROM VOID`);
  }
  saveCart(cart);
  playSound('click');
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  playSound('click');
  showToast('ITEM PURGED FROM CART');
}

function clearCart() {
  saveCart([]);
}

function getCartTotals() {
  const cart = getCart();
  let subtotal = 0;
  let itemCount = 0;

  cart.forEach(item => {
    const product = EPOC_PRODUCTS[item.id];
    if (product) {
      subtotal += product.price * item.qty;
      itemCount += item.qty;
    }
  });

  const appliedPromo = localStorage.getItem(PROMO_STORAGE_KEY) || '';
  let discount = 0;
  if (appliedPromo.toUpperCase() === 'CHAOS10' || appliedPromo.toUpperCase() === 'EPOC10') {
    discount = Math.round(subtotal * 0.10);
  } else if (appliedPromo.toUpperCase() === 'GENZ' || appliedPromo.toUpperCase() === 'EPOC') {
    discount = Math.round(subtotal * 0.15);
  }

  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 45;
  const total = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, total, itemCount, appliedPromo };
}

function dispatchCartUpdate() {
  window.dispatchEvent(new CustomEvent('epoc:cart-updated', { detail: getCartTotals() }));
  updateNavCartBadge();
  renderCartDrawer();
}

function updateNavCartBadge() {
  const { itemCount } = getCartTotals();
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.textContent = itemCount;
    el.style.display = itemCount > 0 ? 'flex' : 'none';
  });
}

// ================= Toast Notifications =================
function showToast(message) {
  let toast = document.getElementById('epoc-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'epoc-toast';
    toast.className = 'fixed bottom-6 right-6 z-[100] bg-brand-cream border-4 border-brand-dark p-4 shadow-brutal flex items-center gap-4 transition-transform duration-300 font-display text-2xl uppercase tracking-wider translate-y-32';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <iconify-icon icon="ph:warning-circle-fill" class="text-3xl text-brand-red animate-pulse"></iconify-icon>
    <span>${message}</span>
  `;
  toast.classList.remove('translate-y-32');
  toast.classList.add('translate-y-0');

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('translate-y-0');
    toast.classList.add('translate-y-32');
  }, 3000);
}

// ================= Cart Slide-Over Drawer =================
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  if (!container) return;

  const cart = getCart();
  const { subtotal } = getCartTotals();

  if (subtotalEl) {
    subtotalEl.textContent = `$${subtotal}`;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-brand-dark border-4 border-brand-cream text-brand-cream my-8">
        <iconify-icon icon="ph:ghost-duotone" class="text-6xl text-brand-red mb-4"></iconify-icon>
        <p class="font-display text-4xl uppercase mb-2">Cart is Empty</p>
        <p class="text-sm font-bold opacity-70">No artifacts claimed yet.</p>
        <a href="index.html#objects" onclick="closeCartDrawer()" class="inline-block mt-6 bg-brand-red text-brand-cream font-display text-xl px-6 py-3 border-2 border-brand-cream uppercase hover:bg-brand-cream hover:text-brand-dark transition-colors">
          Browse Objects
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => {
    const prod = EPOC_PRODUCTS[item.id];
    if (!prod) return '';
    return `
      <div class="bg-brand-cream border-4 border-brand-dark p-4 shadow-[6px_6px_0px_0px_#0f0f0f] flex gap-4 items-center">
        <img src="${prod.image}" alt="${prod.title}" class="w-20 h-20 object-cover border-2 border-brand-dark grayscale">
        <div class="flex-1">
          <h4 class="font-display text-2xl uppercase leading-tight">${prod.title}</h4>
          <span class="text-xs font-bold text-brand-dark/70 uppercase">${item.variant}</span>
          <div class="flex justify-between items-center mt-2">
            <span class="font-display text-2xl text-brand-red">$${prod.price * item.qty}</span>
            <div class="flex items-center border-2 border-brand-dark bg-brand-dark text-brand-cream font-display text-lg">
              <button onclick="updateCartQty('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center hover:bg-brand-red">-</button>
              <span class="w-8 text-center">${item.qty}</span>
              <button onclick="updateCartQty('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center hover:bg-brand-red">+</button>
            </div>
          </div>
        </div>
        <button onclick="removeFromCart('${item.id}')" class="text-brand-dark/50 hover:text-brand-red p-1">
          <iconify-icon icon="lucide:trash-2" class="text-xl"></iconify-icon>
        </button>
      </div>
    `;
  }).join('');
}

// ================= Inject Shared Components & Cart Drawer =================
function injectCartDrawerHTML() {
  if (document.getElementById('cart-drawer')) return;

  const markup = `
    <!-- Cart Backdrop -->
    <div id="cart-backdrop" onclick="closeCartDrawer()" class="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[90] opacity-0 pointer-events-none transition-opacity duration-300"></div>

    <!-- Cart Drawer -->
    <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-[#F4E7DA] border-l-8 border-brand-dark z-[95] shadow-[-16px_0px_0px_0px_#0f0f0f] transform translate-x-full transition-transform duration-300 flex flex-col">
      <!-- Header -->
      <div class="p-6 bg-brand-dark text-brand-cream border-b-8 border-brand-dark flex justify-between items-center">
        <div class="flex items-center gap-3">
          <iconify-icon icon="lucide:shopping-bag" class="text-3xl text-brand-red"></iconify-icon>
          <h3 class="font-display text-3xl uppercase tracking-wider">Acquired Loot</h3>
        </div>
        <button onclick="closeCartDrawer()" class="w-10 h-10 border-2 border-brand-cream flex items-center justify-center text-2xl hover:bg-brand-red transition-colors">
          ✕
        </button>
      </div>

      <!-- Item List -->
      <div id="cart-drawer-items" class="flex-1 overflow-y-auto p-6 space-y-4"></div>

      <!-- Drawer Footer -->
      <div class="p-6 bg-brand-cream border-t-8 border-brand-dark space-y-4">
        <div class="flex justify-between items-center font-display text-3xl uppercase">
          <span>Subtotal</span>
          <span id="cart-drawer-subtotal" class="text-brand-red">$0</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <a href="cart.html" class="block text-center py-4 bg-brand-dark text-brand-cream font-display text-2xl uppercase border-4 border-brand-dark hover:bg-brand-cream hover:text-brand-dark transition-colors">
            View Cart
          </a>
          <a href="checkout.html" class="block text-center py-4 bg-brand-red text-brand-cream font-display text-2xl uppercase border-4 border-brand-dark shadow-[4px_4px_0px_0px_#0f0f0f] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Checkout
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', markup);
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  injectCartDrawerHTML();
  updateNavCartBadge();

  // Attach audio effect to buttons & links
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', () => playSound('click'));
  });

  // Listen for cart button clicks in navbar
  document.querySelectorAll('.cart-trigger-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });
});
