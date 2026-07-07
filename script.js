/* ==========================================================
   ÇOK TEFEKKÜR EDERİM - Apple Dock Engine & 3D Tilt & Gold Glow
========================================================== */

const dock = document.querySelector(".dock");
const books = [...document.querySelectorAll(".book")];

const MAX_SCALE = 1.75;
const NEAR_SCALE = 1.35;
const FAR_SCALE = 1.15;

dock.addEventListener("mousemove", (e) => {
    books.forEach(book => {
        const r = book.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const distance = Math.abs(e.clientX - center);

        let scale = 1;
        let lift = 0;

        // Mac Dock Büyüme ve Yükselme Efekti
        if (distance < 70) {
            scale = MAX_SCALE;
            lift = 42;
        } else if (distance < 140) {
            scale = NEAR_SCALE;
            lift = 25;
        } else if (distance < 230) {
            scale = FAR_SCALE;
            lift = 12;
        } else {
            scale = 1;
            lift = 0;
        }

        // 3D Tilt (Eğilme) Hesaplaması
        const mouseX = e.clientX - r.left;
        const mouseY = e.clientY - r.top;

        const rx = -(mouseY - r.height / 2) / 12;
        const ry = (mouseX - r.width / 2) / 10;

        // Hem Dock hem de 3D Eğilme özelliklerini aynı anda uygula
        book.style.transform = `
            translateY(-${lift}px)
            scale(${scale})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
        `;
    });
});

dock.addEventListener("mouseleave", () => {
    books.forEach(book => {
        book.style.transform = "";
    });
});

/* Kitap Kapaklarındaki Özel Işık ve Gölge Efektleri */
books.forEach(book => {
    const img = book.querySelector("img");

    book.addEventListener("mousemove", (e) => {
        const rect = book.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 3D Altın Gölgelendirme ve Netlik
        img.style.filter = `
            brightness(1.12)
            drop-shadow(0 18px 35px rgba(212,175,55,.45))
        `;

        // Farenin hareketine göre değişen Altın Işık Parlaması
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        img.style.background = `
            radial-gradient(circle at ${glowX}% ${glowY}%,
            rgba(255,230,150,.28),
            transparent 55%)
        `;
    });

    book.addEventListener("mouseleave", () => {
        // Fare ayrıldığında efektleri sıfırla
        img.style.filter = "drop-shadow(0 15px 25px rgba(0,0,0,.35))";
        img.style.background = "transparent";
    });
});
