// Ürünlerin listesi
const products = [
    {
        id: 1,
        name: "Kablosuz Kulaklık",
        description: "30 saat pil ömrü var.",
        price: 899.99,
        image: "images/kulaklik.jpg"
    },
    {
        id: 2,
        name: "Akıllı Saat",
        description: "Adım sayar ve bildirim gösterir.",
        price: 1499.99,
        image: "images/akilli-saat.jpg"
    },
    {
        id: 3,
        name: "Laptop Çantası",
        description: "Su geçirmez kumaş.",
        price: 349.99,
        image: "images/canta.jpg"
    },
    {
        id: 4,
        name: "Wireless Mouse",
        description: "Hassas ve ergonomik.",
        price: 249.99,
        image: "images/mouse.jpg"
    },
    {
        id: 5,
        name: "Mekanik Klavye",
        description: "RGB ışıklı oyuncu klavyesi.",
        price: 799.99,
        image: "images/klavye.jpg"
    },
    {
        id: 6,
        name: "Webcam HD",
        description: "Net görüntü kalitesi.",
        price: 599.99,
        image: "images/webcam.jpg"
    }
];

// Sepetimiz (boş liste)
let cart = [];

// HTML'den gerekli yerleri seçiyoruz
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// Ürünleri sayfada gösterme fonksiyonu
function renderProducts() {
    productsGrid.innerHTML = '';
    
    // Her ürün için bir kart oluşturuyoruz
    for(let i = 0; i < products.length; i++) {
        let product = products[i];
        
        let div = document.createElement('div');
        div.className = 'product-card';
        
        div.innerHTML = `
            <img src="${product.image}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p>${product.description}</p>
            <span class="product-price">${product.price} TL</span>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Sepete Ekle</button>
        `;
        
        productsGrid.appendChild(div);
    }
}

// Sepete ekleme işlemi
function addToCart(id) {
    let product = products.find(p => p.id === id);
    
    // Ürün zaten sepette var mı bakalım
    let sepetUrunu = cart.find(item => item.id === id);
    
    if (sepetUrunu) {
        sepetUrunu.quantity++; // Varsa sayısını artır
    } else {
        // Yoksa yeni ekle
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart(); // Sepeti güncelle
    alert(product.name + " sepete eklendi!"); // Basit uyarı
}

// Sepetten çıkarma
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Sepeti ekranda güncelleme
function updateCart() {
    // Rozet sayısını güncelle
    let totalCount = 0;
    for(let item of cart) {
        totalCount += item.quantity;
    }
    cartBadge.innerText = totalCount;
    
    // Sepet boşsa
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Sepetiniz boş.</p>';
        totalPrice.innerText = '0.00 TL';
        return;
    }
    
    // Sepet doluysa listele
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        let div = document.createElement('div');
        div.className = 'cart-item';
        
        div.innerHTML = `
            <img src="${item.image}" style="width:50px">
            <div>
                <strong>${item.name}</strong>
                <br>
                ${item.price} TL x ${item.quantity}
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Sil</button>
        `;
        
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });
    
    totalPrice.innerText = total.toFixed(2) + " TL";
}

// Modal açma kapama işlemleri
cartIcon.onclick = function() {
    cartModal.style.display = 'block'; // class yerine style ile gösterdik
}

closeCart.onclick = function() {
    cartModal.style.display = 'none';
}

// Satın al butonu
checkoutBtn.onclick = function() {
    if(cart.length > 0) {
        alert("Siparişiniz alındı!");
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    } else {
        alert("Sepetiniz boş!");
    }
}

// Sayfa açılınca ürünleri yükle
renderProducts();