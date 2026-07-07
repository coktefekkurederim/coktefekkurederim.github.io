// ==========================================================
// SEÇİCİLER VE AYARLAR
// ==========================================================
const books = document.querySelectorAll('.book');
const MAX_SCALE = 1.25;

// MÜZİK MOTORU
const musicBtn = document.querySelector('.music-btn');
let bgMusic = document.getElementById('bgMusic'); // index.html içindeki id ile eşleşti

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '🎵 Müziği Durdur';
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log("Müzik izni gerekiyor:", err);
            });
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '🎵 Müziği Başlat';
            musicBtn.classList.remove('playing');
        }
    });
}

// ==========================================================
// GİRİŞ ANİMASYONU MOTORU (Sihirli Gökten İniş Şovu)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    books.forEach((book, index) => {
        setTimeout(() => {
            book.style.opacity = "1";
            if (window.innerWidth > 700) {
                book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
                const img = book.querySelector("img");
                if (img) {
                    img.style.boxShadow = "0 30px 50px rgba(212, 175, 55, 0.3)";
                    setTimeout(() => {
                        img.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
                    }, 800);
                }
            } else {
                book.style.transform = "none";
            }
        }, 100 * (index + 1));
    });
});

// ==========================================================
// ANA HAREKET MOTORU (Masaüstü Tekli Büyüme ve 3D Efekti)
// ==========================================================
function handleMove(clientX, clientY) {
    if (window.innerWidth <= 700) {
        resetEffects();
        return;
    }

    books.forEach(book => {
        const r = book.getBoundingClientRect();
        const isMouseOver = (
            clientX >= r.left && 
            clientX <= r.right && 
            clientY >= r.top && 
            clientY <= r.bottom
        );

        let scale = 1;
        let lift = 0;
        let rx = 0;
        let ry = 0;

        if (isMouseOver) {
            scale = MAX_SCALE;
            lift = 25;
            const mouseX = clientX - r.left;
            const mouseY = clientY - r.top;
            rx = -(mouseY - r.height / 2) / 12;
            ry = (mouseX - r.width / 2) / 10;
        }

        book.style.transform = `
            translateY(-${lift}px)
            scale(${scale})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
        `;
        
        const img = book.querySelector("img");
        if (img) {
            img.style.filter = isMouseOver ? "brightness(1.15)" : "brightness(1)";
        }
    });
}

function resetEffects() {
    books.forEach(book => {
        if (window.innerWidth <= 700) {
            book.style.transform = "none";
        } else {
            book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
        }
        const img = book.querySelector("img");
        if (img) img.style.filter = "brightness(1)";
    });
}

window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
window.addEventListener('mouseleave', resetEffects);
