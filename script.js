// Navigation Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileProductsButton = document.getElementById('mobileProductsButton');
const mobileProductsMenu = document.getElementById('mobileProductsMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileProductsButton.addEventListener('click', () => {
    mobileProductsMenu.classList.toggle('hidden');
});

// Cart Functionality
const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const notification = document.getElementById('notification');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];

cartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
    cartSidebar.classList.add('translate-x-0');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-0');
    cartSidebar.classList.add('translate-x-full');
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCartUI();
        showNotification('Produk berhasil dibeli!');
    });
});

function updateCartUI() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="text-center text-gray-500 py-8">Keranjang Anda masih kosong</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex justify-between items-start border-b border-gray-200 pb-4">
                <div class="flex-1">
                    <h4 class="font-medium">${item.name}</h4>
                    <div class="flex items-center mt-1">
                        <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-medium">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
                    <button class="text-red-500" data-id="${item.id}" data-action="remove">Hapus</button>
                </div>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    cartTotal.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;

    // Quantity +/-
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const action = button.getAttribute('data-action');
            const item = cart.find(i => i.id === id);

            if (action === 'increase') item.quantity += 1;
            else if (action === 'decrease' && item.quantity > 1) item.quantity -= 1;

            updateCartUI();
        });
    });

    // Remove
    document.querySelectorAll('[data-action="remove"]').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
        });
    });
}

function showNotification(message) {
    notification.querySelector('span').textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    showNotification('Pembelian berhasil! Terima kasih.');

    cart = [];
    updateCartUI();

    setTimeout(() => {
        cartSidebar.classList.remove('translate-x-0');
        cartSidebar.classList.add('translate-x-full');
    }, 1000);
});

const productDetailModal = document.getElementById('productDetailModal');
const closeDetailModal = document.getElementById('closeDetailModal');
const detailAddToCart = document.getElementById('detailAddToCart');

function viewProductDetail(productId) {
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const detailPrice = document.getElementById('detailPrice');
    const detailImage = document.getElementById('detailImage');
    
    // Contoh data dummy untuk simulasi
    const data = {
        'kaos-pria-sport-1': {
            title: 'Sport Performance Black Pria',
            description: 'Kaos teknologi tinggi untuk latihan intensif.',
            price: 599000,
            image: 'images/kaospria2.PNG',
            thumbnails: [
                'images/kaospria2.PNG',
                'images/kaospria2.2.PNG',
                'images/kaospria2.3.PNG'
              ]
        },
        'kaos-pria-sport-2': {
            title: 'Kaos Jersey Sepak Bola Pria',
            description: 'Kaos Sepak Bola dengan bahan nyaman di badan.',
            price: 499000,
            image: 'images/kaospria5..PNG',
            thumbnails: [
                'images/kaospria5..PNG',
                'images/kaospria5.2.PNG',
                'images/kaospria5.3.PNG'
              ]
        },
        'kaos-pria-sport-3': {
            title: 'Singlet Running Pria',
            description: 'Material ringan dan fleksibel yang berwarna seperti garis pemandu kecepatan memastikanmu nyaman bergerak.',
            price: 400000,
            image: 'images/kaospria3.PNG',
            thumbnails: [
                'images/kaospria3.PNG',
                'images/kaospria3.2.PNG',
                'images/kaospria3.3.PNG'
              ]
        },
        'kaos-pria-sport-4': {
            title: 'Kaos Lengan Panjang Tenis Putih Pria',
            description: 'Menyerap dan menyebarkan keringat untuk performa sejuk, kering, dan bebas gangguan.',
            price: 500000,
            image: 'images/kaospria4.PNG',
            thumbnails: [
                'images/kaospria4.PNG',
                'images/kaospria4.2.PNG',
                'images/kaospria4.3.PNG'
              ]
        },
        'kaos-wanita-sport-1': {
            title: 'Kaos Tenis Putih Wanita',
            description: 'Desain aerodinamis untuk latihan crossfit.',
            originalPrice: 399000,
            discountPrice: 359000,
            image: 'images/kaoswanita5.PNG',
            thumbnails: [
                'images/kaoswanita5.PNG',
                'images/kaoswanita5.2.PNG',
                'images/kaoswanita5.3.PNG'
              ]
        },
        'kaos-wanita-sport-2': {
            title: 'Atasan Lengan Panjang Sepak Bola Wanita',
            description: 'Kain French terry yang lembut membuat Anda tetap nyaman.',
            price: 739000,
            image: 'images/kaoswanita2.PNG',
            thumbnails: [
                'images/kaoswanita2.PNG',
                'images/kaoswanita2.2.PNG',
                'images/kaoswanita2.3.PNG'
              ]
        },
        'kaos-wanita-sport-3': {
            title: 'Kaos Wafel Yoga Motion Wanita',
            description: 'Kaos elastis untuk yoga dan pilates.',
            price: 580000,
            image: 'images/kaoswanita3.PNG',
            thumbnails: [
                'images/kaoswanita3.PNG',
                'images/kaoswanita3.2.PNG',
                'images/kaoswanita3.3.PNG'
              ]
        },
        'kaos-wanita-sport-4': {
            title: 'Kaos Running wanita',
            description: 'Kaos berlari dengan perlindungan UV.',
            originalPrice: 450000,
            discountPrice: 385000,
            image: 'images/kaoswanita4.PNG',
            thumbnails: [
                'images/kaoswanita4.PNG',
                'images/kaoswanita4.2.PNG',
                'images/kaoswanita4.3.PNG'
              ]
        }
    };

    const product = data[productId] || {
        title: 'Produk Tidak Ditemukan',
        description: 'Deskripsi tidak tersedia.',
        price: 0,
        image: 'https://placehold.co/600x600?text=Not+Found'
    };

    detailTitle.textContent = product.title;
    detailDescription.textContent = product.description;
    if (product.discountPrice) {
        detailPrice.innerHTML = `
          <span class="text-gray-400 line-through mr-2">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>
          <span class="text-blue-600 font-bold">Rp ${product.discountPrice.toLocaleString('id-ID')}</span>
        `;
      } else {
        detailPrice.textContent = `Rp ${product.price.toLocaleString('id-ID')}`;
      }
      
    detailImage.src = product.image;
    // Ambil container thumbnail (berada setelah elemen detailImage)
const thumbnailsContainer = detailImage.parentElement.nextElementSibling;

// Bersihkan thumbnail lama
thumbnailsContainer.innerHTML = '';

// Tampilkan thumbnail baru (jika ada)
if (product.thumbnails && product.thumbnails.length > 0) {
  product.thumbnails.forEach(src => {
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.className = 'w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 thumbnail';
    thumb.setAttribute('data-src', src);
    thumb.addEventListener('click', () => {
      detailImage.src = src;
    });
    thumbnailsContainer.appendChild(thumb);
  });
}

    detailImage.alt = product.title;

    detailAddToCart.onclick = () => {
        const existingItem = cart.find(item => item.name === product.title);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: `detail-${Date.now()}`,
                name: product.title,
                price: product.price,
                quantity: 1
            });
        }
const itemPrice = product.discountPrice || product.price;

        updateCartUI();
        showNotification('Produk berhasil dibeli!');
    };

    productDetailModal.classList.remove('hidden');
}

closeDetailModal.addEventListener('click', () => {
    productDetailModal.classList.add('hidden');
});

productDetailModal.addEventListener('click', (e) => {
    if (e.target === productDetailModal) {
        productDetailModal.classList.add('hidden');
    }
});

document.querySelector('#productDetailModal > div').addEventListener('click', (e) => {
    e.stopPropagation();
});

const loginButton = document.getElementById('loginButton');
const mobileLoginButton = document.getElementById('mobileLoginButton');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');

function toggleLoginModal() {
    loginModal.classList.toggle('hidden');
    mobileMenu.classList.add('hidden');
}

loginButton.addEventListener('click', toggleLoginModal);
mobileLoginButton.addEventListener('click', toggleLoginModal);
closeLoginModal.addEventListener('click', toggleLoginModal);

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) toggleLoginModal();
});

document.querySelector('#loginModal > div').addEventListener('click', (e) => {
    e.stopPropagation();
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login berhasil!');
    toggleLoginModal();
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Registrasi berhasil!');
    toggleLoginModal();
});

// Slideshow Hero dengan gambar lokal
document.addEventListener('DOMContentLoaded', () => {
    const slideshowImage = document.getElementById('slideshowImage');
    const heroImages = [
        'images/slideshow/badminton1.png',
        'images/slideshow/Lari1.png',
        'images/slideshow/lari2.png'
    ];

    let heroIndex = 0;

    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        slideshowImage.style.opacity = 0;
        setTimeout(() => {
            slideshowImage.src = heroImages[heroIndex];
            slideshowImage.style.opacity = 1;
        }, 500);
    }, 4000);
});

// Slideshow Inspirasi Gaya
document.addEventListener('DOMContentLoaded', () => {
  const styleSlideshow = document.getElementById('styleSlideshow');
  const styleImages = [
    'images/slideshow/1.png',
    'images/slideshow/2.png',
  ];

  let styleIndex = 0;
  setInterval(() => {
    styleIndex = (styleIndex + 1) % styleImages.length;
    styleSlideshow.style.opacity = 0;
    setTimeout(() => {
      styleSlideshow.src = styleImages[styleIndex];
      styleSlideshow.style.opacity = 1;
    }, 500);
  }, 4000);
});

// Login/Register Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
  
    tabLogin.addEventListener('click', () => {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      tabLogin.classList.add('border-blue-600');
      tabRegister.classList.remove('border-blue-600');
    });
  
    tabRegister.addEventListener('click', () => {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      tabLogin.classList.remove('border-blue-600');
      tabRegister.classList.add('border-blue-600');
    });
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login berhasil!');
      toggleLoginModal();
    });
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Registrasi berhasil!');
      toggleLoginModal();
    });
  });
// Toggle Produk Menu di Desktop
const desktopProductsButton = document.getElementById('desktopProductsButton');
const desktopProductsMenu = document.getElementById('desktopProductsMenu');

desktopProductsButton.addEventListener('click', (e) => {
    e.stopPropagation();
    desktopProductsMenu.classList.toggle('hidden');
});

// Tutup menu jika klik di luar
document.addEventListener('click', (e) => {
    if (!desktopProductsButton.contains(e.target) && !desktopProductsMenu.contains(e.target)) {
        desktopProductsMenu.classList.add('hidden');
    }
});
  

