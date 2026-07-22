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


// ===============================
// 要素取得
// ===============================

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

let currentIndex = 0;


// ===============================
// 作品表示（アニメーション対応）
// ===============================

function showProject(index){
    currentIndex = index;
    const img = images[currentIndex];

    // 1. まず枠を表示（この時点では opacity: 0）
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

    // 2. 10ミリ秒後に .active をつけてフェードイン＆ズームイン発動！
    setTimeout(() => {
        lightbox.classList.add("active");
    }, 10);
}


// ===============================
// 画像クリックでモーダルを開く
// ===============================

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        showProject(index);
    });
});


// ===============================
// モーダルを閉じる処理（アニメーション対応）
// ===============================

function closeLightbox() {
    lightbox.classList.remove("active");

    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

// 閉じるイベントの割り当て
if(closeBtn) closeBtn.addEventListener("click", closeLightbox);

// 背景クリックで閉じる
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ESCキーで閉じる
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});


// ===============================
// 前へ・次へボタン
// ===============================

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showProject(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showProject(currentIndex);
});


// ===============================
// キーボード左右キー
// ===============================

document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") {
        nextBtn.click();
    }
    if (e.key === "ArrowLeft") {
        prevBtn.click();
    }
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
}, {
    threshold: 0.2
});

items.forEach(item => {
    observer.observe(item);
});


// ===============================
// 3Dチルトエフェクト
// ===============================

window.addEventListener("DOMContentLoaded", () => {
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