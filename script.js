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

    const items = document.querySelectorAll(".item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightbox3D = document.getElementById("lightbox-3d");
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
        const targetItem = items[currentIndex];
        if(!targetItem || !lightbox) return;

        const img = targetItem.querySelector("img");
        if(!img) return;

        // 3Dモデルデータの確認
        const modelPath = targetItem.getAttribute("data-model");

        if (modelPath && lightbox3D) {
            // 3Dモデルが存在する場合
            lightboxImg.style.display = "none";
            lightbox3D.style.display = "block";
            lightbox3D.setAttribute("src", modelPath);
        } else {
            // 通常の画像作品の場合
            if (lightbox3D) lightbox3D.style.display = "none";
            lightboxImg.style.display = "block";
            lightboxImg.src = img.src;
        }

        // 大文字小文字のズレを考慮してファイル名検索
        const fileName = img.src.split("/").pop().toLowerCase();
        const projectKey = Object.keys(projects).find(key => key.toLowerCase() === fileName);
        const project = projects[projectKey];

        if(project){
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;
            projectTime.textContent = project.time;
            projectSoftware.textContent = project.software;
        } else {
            projectTitle.textContent = "";
            projectDescription.textContent = "";
            projectTime.textContent = "";
            projectSoftware.textContent = "";
        }

        // 1. まず表示状態にする
        lightbox.style.display = "flex";

        // 2. 少し遅らせて .active を付与しアニメーションを起動
        setTimeout(() => {
            lightbox.classList.add("active");
        }, 20);
    }

    // ===============================
    // モーダルを閉じる処理
    // ===============================
    function closeLightbox() {
        if(!lightbox) return;
        
        lightbox.classList.remove("active");

        setTimeout(() => {
            lightbox.style.display = "none";
            // 閉じた時に3Dモデル読み込みをクリア
            if (lightbox3D) lightbox3D.removeAttribute("src");
        }, 300);
    }

    // ===============================
    // 作品カード（または画像）クリックで開く
    // ===============================
    items.forEach((item, index) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
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
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex--;
            if (currentIndex < 0) currentIndex = items.length - 1;
            showProject(currentIndex);
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex++;
            if (currentIndex >= items.length) currentIndex = 0;
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
    items.forEach(item => {
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

// ===============================
// トップへ戻るボタンの制御
// ===============================
const backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}