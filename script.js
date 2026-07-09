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
// 作品表示
// ===============================

function showProject(index){

    currentIndex = index;

    const img = images[currentIndex];

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

}


// ===============================
// クリックで表示
// ===============================

images.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        showProject(index);

    });

});


// ===============================
// 閉じる
// ===============================

closeBtn.addEventListener("click",()=>{

    lightbox.style.display="none";

});


// 背景クリック

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});


// ESCキー

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

});


// ===============================
// 前へボタン
// ===============================

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=images.length-1;

    }

    showProject(currentIndex);

});


// ===============================
// 次へボタン
// ===============================

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex>=images.length){

        currentIndex=0;

    }

    showProject(currentIndex);

});


// ===============================
// キーボード左右キー
// ===============================

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display!=="flex") return;

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});


// ===============================
// スクロールフェードイン
// ===============================

const items=document.querySelectorAll(".item");

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const index=[...items].indexOf(entry.target);

            setTimeout(()=>{

                entry.target.classList.add("show");

            },index*120);

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

items.forEach(item=>{

    observer.observe(item);

});

// ===============================
// Aurora Background
// ===============================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const blobs = [
    {
        x: window.innerWidth * 0.3,
        y: window.innerHeight * 0.3,
        r: 260,
        color: "0,180,255",
        dx: 0.3,
        dy: 0.2
    },
    {
        x: window.innerWidth * 0.7,
        y: window.innerHeight * 0.4,
        r: 320,
        color: "180,80,255",
        dx: -0.25,
        dy: 0.18
    },
    {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.8,
        r: 240,
        color: "0,255,220",
        dx: 0.2,
        dy: -0.25
    }
];

function drawBlob(blob){

    const gradient = ctx.createRadialGradient(
        blob.x,
        blob.y,
        0,
        blob.x,
        blob.y,
        blob.r
    );

    gradient.addColorStop(0, `rgba(${blob.color},0.55)`);
    gradient.addColorStop(1, `rgba(${blob.color},0)`);

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
    ctx.fill();
}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.filter = "blur(120px)";

    blobs.forEach(blob=>{

        blob.x += blob.dx;
        blob.y += blob.dy;

        if(blob.x < -100 || blob.x > canvas.width +100) blob.dx *= -1;
        if(blob.y < -100 || blob.y > canvas.height+100) blob.dy *= -1;

        blob.x += (mouse.x - canvas.width/2) * 0.0004;
        blob.y += (mouse.y - canvas.height/2) * 0.0004;

        drawBlob(blob);

    });

    ctx.filter = "none";

    requestAnimationFrame(animate);

}

animate();