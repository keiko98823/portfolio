// ===============================
// 作品データ
// ===============================

const projects = {
    "lip.png": {
        title: "Lipstick",
        description: "高級感のある口紅をテーマに制作しました。",
        time: "4時間",
        software: "Blender"
    },
    "obake.png": {
        title: "Obake",
        description: "おばけを制作しました。",
        time: "4時間",
        software: "Blender"
    },
    "balloondog.jpg": {
        title: "Balloon Dog",
        description: "バルーンアートをリアルな質感で制作しました。",
        time: "6時間",
        software: "Blender"
    },
    "pumpkins.PNG": {
        title: "Pumpkins",
        description: "ハロウィンをイメージした作品です。",
        time: "5時間",
        software: "Blender"
    },
    "ahiru3.png": {
        title: "Ahiru",
        description: "アヒルを制作しました。",
        time: "3時間",
        software: "Blender"
    },
    "NeonLogo.png": {
        title: "Neon Logo",
        description: "ネオン風ロゴデザインです。",
        time: "2時間",
        software: "Blender"
    }
};

let currentIndex = 0;

// ページの読み込みが完了してから処理を実行
window.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    const projectTitle = document.getElementById("project-title");
    const projectDescription = document.getElementById("project-description");
    const projectTime = document.getElementById("project-time");
    const projectSoftware = document.getElementById("project-software");

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // ===============================
    // 作品表示（モーダルを開く）
    // ===============================
    function showProject(index){
        currentIndex = index;
        const img = images[currentIndex];
        if(!img || !lightbox) return;

        // 1. まず確実にモーダルを表示（この時点では opacity: 0）
        lightbox.style.display = "flex";

        lightboxImg.src = img.src;
        const fileName = img.src.split("/").pop();
        const project = projects[fileName];

        if(project){
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;
            projectTime.textContent = project.time;
            projectSoftware.textContent = project.software;
        }

        // 2. ブラウザが画面を描画した次の瞬間に .active を付与してアニメーション起動！
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                lightbox.classList.add("active");
            });
        });
    }

    // ===============================
    // モーダルを閉じる処理
    // ===============================
    function closeLightbox() {
        if(!lightbox) return;
        
        // 1. .active を外してふわっと消すアニメーションを開始
        lightbox.classList.remove("active");

        // 2. 0.3秒のアニメーションが終わった後に確実に非表示(none)にする
        setTimeout(() => {
            lightbox.style.display = "none";
        }, 300);
    }

    // ===============================
    // 画像クリックで開く
    // ===============================
    images.forEach((img, index) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            showProject(index);
        });
    });

    // ===============================
    // 閉じるイベント
    // ===============================
    if(closeBtn) closeBtn.addEventListener("click", closeLightbox);

    if(lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

    // ===============================
    // 前へ・次へボタン
    // ===============================
    if(prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex--;
            if (currentIndex < 0) currentIndex = images.length - 1;
            showProject(currentIndex);
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex++;
            if (currentIndex >= images.length) currentIndex = 0;
            showProject(currentIndex);
        });
    }

    document.addEventListener("keydown", (e) => {
        if (lightbox && lightbox.style.display !== "flex") return;
        if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
        if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    });

    // ===============================
    // 3Dチルトエフェクト
    // ===============================
    const tiltItems = document.querySelectorAll(".item");
    tiltItems.forEach(item => {
        const img = item.querySelector("img");
        if (!img) return;

        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const maxTilt = 15;
            const rotateX = (0.5 - y) * maxTilt;
            const rotateY = (x - 0.5) * maxTilt;

            img.style.transition = "none";
            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        item.addEventListener("mouseleave", () => {
            img.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
            img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        });
    });

});

// ===============================
// スクロールフェードイン
// ===============================
const items = document.querySelectorAll(".item");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = [...items].indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 120);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

items.forEach(item => {
    observer.observe(item);
});