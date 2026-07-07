/* ==========================================================
   ÇOK TEFEKKÜR EDERİM - Premium Hybrid Engine (PC & Mobile)
========================================================== */

const dock = document.querySelector(".dock");
const books = [...document.querySelectorAll(".book")];

const MAX_SCALE = 1.70;
const NEAR_SCALE = 1.35;
const FAR_SCALE = 1.15;

// Hem fare hem de dokunma hareketlerini işleyen ana fonksiyon
function handleMove(clientX, clientY) {
    books.forEach(book => {
        const r = book.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const distance = Math.abs(clientX - center);

        let scale = 1;
        let lift = 0;

        // Büyüme ve Yükselme Hesaplaması
        if (distance < 60) {
            scale = MAX_SCALE;
            lift = 40;
        } else if (distance < 120) {
            scale = NEAR_SCALE;
            lift = 22;
        } else if (distance < 180) {
            scale = FAR_SCALE;
            lift = 10;
        } else {
            scale = 1;
            lift = 0;
        }

        // 3D Tilt (Eğilme) Hesaplaması
        const mouseX = clientX - r.left;
        const mouseY = clientY - r.top;
        const rx = -(mouseY - r.height / 2) / 12;
        const ry = (mouseX - r.width / 2) / 10;

        // Efektleri Uygula
        book.style.transform = `
            translateY(-${lift}px)
            scale(${scale})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
        `;
        
        // Parlama ve Netlik efekti (CSS ile uyumlu)
        const img = book.querySelector("img");
        if(img && distance < 180) {
            img.style.filter = "brightness(1.15)";
        }
    });
}

// Tüm efektleri sıfırlayan fonksiyon
function resetEffects() {
    books.forEach(book => {
        book.style.transform = "";
        const img = book.querySelector("img");
        if(img) {
            img.style.filter = "drop-shadow(0 15px 35px rgba(0,0,0,0.5))";
        }
    });
}

/* --- MOUSE (BİLGİSAYAR) OLAYLARI --- */
dock.addEventListener("mousemove", (e) => {
    handleMove(e.clientX, e.clientY);
});

dock.addEventListener("mouseleave", () => {
    resetEffects();
});


/* --- TOUCH (TELEFON) OLAYLARI --- */
// Telefondaki basılı tutunca çıkan sistem menüsünü engeller (Akıcılık için şarttır)
books.forEach(book => {
    book.addEventListener("contextmenu", (e) => e.preventDefault());
    
    // Telefonun resmi seçmesini engellemek için img etiketlerine de ekliyoruz
    const img = book.querySelector("img");
    if(img) {
        img.addEventListener("contextmenu", (e) => e.preventDefault());
        img.setAttribute("draggable", "false");
    }
});

dock.addEventListener("touchmove", (e) => {
    // Sayfanın aşağı yukarı kaymasını anlık durdurur ki sağa sola rahatça gezilebilsin
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    }
}, { passive: true });

dock.addEventListener("touchend", () => {
    // Parmak ekrandan çekildiğinde kapakları eski haline döndürür
    resetEffects();
});


/* ==========================================================
   DİNAMİK ALTIN TOZLARI MOTORU (RÜZGARLI)
========================================================== */
function createGoldDust() {
    const container = document.getElementById("goldDust");
    if(!container) return;
    
    const dustCount = 50; 
    
    for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement("div");
        dust.classList.add("dust");
        
        const size = Math.random() * 3 + 2; 
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        dust.style.left = `${Math.random() * 100}vw`;
        
        const delay = Math.random() * 14;
        dust.style.animationDelay = `${delay}s`;
        
        const duration = Math.random() * 6 + 10; 
        dust.style.animationDuration = `${duration}s`;
        
        container.appendChild(dust);
    }
}

window.addEventListener("DOMContentLoaded", createGoldDust);

/* ==========================================================
   ARKA PLAN MÜZİK YÖNETİM SİSTEMİ
========================================================== */
function initMusic() {
    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicToggle");
    const icon = button.querySelector(".music-icon");
    const text = button.querySelector(".music-text");

    if (!music || !button) return;

    // Ses seviyesini arkada hafif tatlı bir fon müziği olacak şekilde %30'a ayarlıyoruz
    music.volume = 0.3; 

    button.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(() => {
                text.textContent = "Müziği Kapat";
                icon.textContent = "⏸️";
                button.style.borderColor = "#fff"; // Çalarken buton rengi hafif değişsin
            }).catch(error => {
                console.log("Müzik çalma tarayıcı engeline takıldı:", error);
            });
        } else {
            music.pause();
            text.textContent = "Müziği Aç";
            icon.textContent = "🎵";
            button.style.borderColor = "var(--gold2)";
        }
    });
}

// Sayfa yüklendiğinde müzik motorunu hazırla
window.addEventListener("DOMContentLoaded", initMusic);
