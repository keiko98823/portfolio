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
        "Snowglobe.png": {
        title: "Snowglobe",
        description: "スノードームをテーマに制作しました。",
        time: "制作時間",
        software: "Blender"
    }
};

let currentIndex = 0;

// ページの読み込みが完了してから処理を実行
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
    // 作品表示（モーダルを開く）
    // ===============================
    function showProject(index){
        currentIndex = index;
        const img = images[currentIndex];
        if(!img || !lightbox) return;

        // 1. まず確実にモーダルを表示（この時点では opacity: 0）
        lightbox.style.display = "flex";

       const fileName = img.src.split("/").pop();

if (fileName.toLowerCase() === "snowglobe.png") {
    lightboxImg.style.display = "none";
    snowglobeViewer.style.display = "block";
} else {
    lightboxImg.style.display = "block";
    snowglobeViewer.style.display = "none";
    lightboxImg.src = img.src;
}
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

// モジュールとして読み込む場合、またはCDNのグローバル変数として使用する場合の記述
// ※今回はCDNでグローバルに読み込んだ場合の書き方（ES Modules環境の場合は適宜 import に書き換えてください）

window.addEventListener("DOMContentLoaded", () => {
    // 1. シーン・カメラ・レンダラーの基本設定
    const scene = new THREE.Scene();
    
    // カメラの設定 (視野角, アスペクト比, 近クリップ, 遠クリップ)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 5); // カメラの位置

    // レンダラーの設定（HTML内の <canvas> または自動生成）
    const canvas = document.querySelector("canvas") || document.createElement("canvas");
    if (!document.body.contains(canvas)) document.body.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. ライティング（ライトがないとモデルが真っ暗になります）
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // 全体的な環境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // 影や立体感を生む平行光
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // 3. OrbitControls（ドラッグ操作）の追加
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;   // 滑らかな慣性を有効化
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;      // スクロールでの拡大縮小

    // 4. 3Dモデル（GLB/GLTF）の読み込み
    let loadedModel = null;
    const loader = new THREE.GLTFLoader();

    // ※ "model.glb" の部分はご自身の3Dモデルファイルのパスに変更してください
    loader.load(
        'models/model.glb', 
        (gltf) => {
            loadedModel = gltf.scene;
            scene.add(loadedModel);
            
            // 必要に応じてモデルの位置や大きさを調整
            loadedModel.position.set(0, 0, 0);
            loadedModel.scale.set(1, 1, 1);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened while loading the model:', error);
        }
    );

    // 5. 自動回転と操作のスマートな切り替え管理
    let isUserInteracting = false;
    let resumeTimeout = null;

    // ユーザーがマウス操作を開始したとき
    controls.addEventListener('start', () => {
        isUserInteracting = true;
        clearTimeout(resumeTimeout);
    });

    // ユーザーがマウス操作を終えたとき（一定時間後に自動回転を再開）
    controls.addEventListener('end', () => {
        resumeTimeout = setTimeout(() => {
            isUserInteracting = false;
        }, 2000); // 2秒間操作がないと自動回転を再開
    });

    // 6. アニメーションループ（毎フレームの描画処理）
    function animate() {
        requestAnimationFrame(animate);

        // ① ユーザーが操作していない時は、ゆっくり自動回転させる
        if (loadedModel && !isUserInteracting) {
            loadedModel.rotation.y += 0.005; // 回転速度（数値はお好みで調整）
        }

        // ② コントローラー（慣性など）の更新
        controls.update();

        renderer.render(scene, camera);
    }
    animate();

    // 7. ウィンドウリサイズ対応
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});