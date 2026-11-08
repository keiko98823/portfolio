
// ===============================
// 作品データ
// ===============================

const projects = {
    "lip.png": {
        title: "Lipstick",
        description: "高級感のある口紅をテーマに制作しました。",
        time: "4時間",
        software: "Blender",
        model: "models/lip2.glb"
    },
    "obake.png": {
        title: "Obake",
        description: "おばけを制作しました。",
        time: "4時間",
        software: "Blender",
        model: "models/obake.glb"
    },
    "balloondog.jpg": {
        title: "Balloon Dog",
        description: "バルーンアートをリアルな質感で制作しました。",
        time: "6時間",
        software: "Blender",
        model: "models/inu.glb"
    },
    "pumpkins.PNG": {
        title: "Pumpkins",
        description: "ハロウィンをイメージした作品です。",
        time: "5時間",
        software: "Blender",
        model: "models/pumpkins2.glb"
    },
    "ahiru3.png": {
        title: "Ahiru",
        description: "アヒルを制作しました。",
        time: "3時間",
        software: "Blender",
        model: "models/duck3.glb"
    },
    "Snowglobe.png": {
        title: "Snowglobe",
        description: "スノードームをテーマに制作しました。",
        time: "制作時間",
        software: "Blender",
        model: "models/Snowglobe.glb"
    }
};

let currentIndex = 0;

window.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const snowglobeViewer = document.getElementById("snowglobe-viewer");
    const closeBtn = document.querySelector(".close");

    const projectTitle = document.getElementById("project-title");
    const projectDescription = document.getElementById("project-description");
    const projectTime = document.getElementById("project-time");
    const projectSoftware = document.getElementById("project-software");

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // ===============================
    // 作品表示
    // ===============================

    
function showProject(index) {
    currentIndex = index;

    const img = images[currentIndex];
    if (!img || !lightbox) return;

    lightbox.style.display = "flex";

    // 画像のファイル名を取得
    const fileName = img.getAttribute("src").split("/").pop();

    // 大文字・小文字の違いも吸収して作品を検索
    const projectEntry = Object.entries(projects).find(
        ([key]) => key.toLowerCase() === fileName.toLowerCase()
    );

    const project = projectEntry ? projectEntry[1] : null;

    console.log("選択した作品:", fileName);
    console.log("作品データ:", project);

    if (project && project.model && snowglobeViewer) {

        // 画像を隠す
        lightboxImg.style.display = "none";

        // 3Dモデルを表示
        snowglobeViewer.style.display = "block";

        // モデルのURLを設定
        const modelURL = new URL(
            project.model,
            document.baseURI
        ).href;

        snowglobeViewer.setAttribute("src", modelURL);
        snowglobeViewer.setAttribute(
            "alt",
            project.title + " 3D Model"
        );

        console.log("3Dモデル読み込み:", modelURL);

        snowglobeViewer.addEventListener("load", () => {
    console.log("3Dモデル読み込み成功！");
});

snowglobeViewer.addEventListener("error", (event) => {
    console.log("3Dモデル読み込み失敗:", event);
});

console.log("現在の3DモデルURL:", snowglobeViewer.src);

    } else {

        // 3Dモデルがない場合は画像を表示
        lightboxImg.style.display = "block";
        snowglobeViewer.style.display = "none";

        lightboxImg.src = img.src;

        console.log("3Dモデルが登録されていません");
    }

    // 作品情報
    if (project) {
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;
        projectTime.textContent = project.time;
        projectSoftware.textContent = project.software;
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            lightbox.classList.add("active");
        });
    });
}


    // ===============================
    // モーダルを閉じる
    // ===============================

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

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

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLightbox);
    }

    if (lightbox) {

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

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }

            showProject(currentIndex);

        });

    }

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            currentIndex++;

            if (currentIndex >= images.length) {
                currentIndex = 0;
            }

            showProject(currentIndex);

        });

    }

    // キーボードの左右キー
    document.addEventListener("keydown", (e) => {

        if (!lightbox || lightbox.style.display !== "flex") return;

        if (e.key === "ArrowRight" && nextBtn) {
            nextBtn.click();
        }

        if (e.key === "ArrowLeft" && prevBtn) {
            prevBtn.click();
        }

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

            img.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        });

        item.addEventListener("mouseleave", () => {

            img.style.transition =
                "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";

            img.style.transform =
                "rotateX(0deg) rotateY(0deg) scale(1)";

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
