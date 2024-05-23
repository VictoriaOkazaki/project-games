const GAMES_LIST = [
    { id: '1', name: "Counter Strike 2", img: "img/img-1.jpg" },
    { id: '2', name: "Dota 2", img: "img/img-2.jpg" },
    { id: '3', name: "Assasin's Creed 2", img: "img/img-3.jpg" },
    { id: '4', name: "Counter Strike 2 4", img: "img/img-4.jpg" },
    { id: '5', name: "Dota 2 5", img: "img/img-5.jpg" },
    { id: '6', name: "Assasin's Creed 2 6", img: "img/img-6.jpg" },
    { id: '7', name: "Counter Strike 2 7", img: "img/img-7.jpg" },
    { id: '8', name: "Dota 2 8", img: "img/img-8.jpg" },
    { id: '9', name: "Assasin's Creed 2 9", img: "img/img-9.jpg" },
]

function getGameImage(index) {
    return GAMES_LIST[index].img;
}

function setActivePoint(index) {
    const points = document.querySelector('.points-cont');
    points.childNodes.forEach(child => { child.classList.remove('point-active') })
    points.childNodes[index].classList.add('point-active')
}

let curIndex = 0;

function startSlider() {
    const img1 = document.getElementById("slider-img-1");
    const img2 = document.getElementById("slider-img-2");

    setActivePoint(curIndex);
    img1.src = getGameImage(curIndex);
    prepareNextImage(img1, img2);
}

let swapTm;
function prepareNextImage(curImg, nextImg) {
    const nextIndex = (curIndex + 1) % GAMES_LIST.length;
    nextImg.src = getGameImage(nextIndex);
    nextImg.style.transition = "";
    nextImg.style.transform = `translateX(100%)`;
    curIndex = nextIndex;
    swapTm = setTimeout(() => {
        setActivePoint(curIndex);
        changeActiveImage(curImg, nextImg);
    }, 3000);
}

function changeActiveImage(curImg, nextImg) {
    const TRANSITION_SEC = 1;
    curImg.style.transform = `translateX(-100%)`;
    curImg.style.transition = `${TRANSITION_SEC}s`;
    curImg.style.zIndex = 2;
    // curImg.style.transitionTimingFunction = "linear";

    nextImg.style.transform = `translateX(0)`;
    nextImg.style.transition = `${TRANSITION_SEC}s`;
    nextImg.style.zIndex = 1;
    // nextImg.style.transitionTimingFunction = "ease-out";

    nextImg.dataset.active = true;
    curImg.dataset.active = false;

    curImg.ontransitionend = () => {
        curImg.ontransitionend = null;
        prepareNextImage(nextImg, curImg);
    };
}

function setSliderActiveIndex(index) {
    setActivePoint(index);
    clearTimeout(swapTm);

    const img1 = document.getElementById("slider-img-1");
    const img2 = document.getElementById("slider-img-2");

    img1.ontransitionend = null;
    img2.ontransitionend = null;

    const curImg = img1.dataset.active ? img1 : img2;
    curImg.src = getGameImage(index);
    curImg.style.transform = "";
    curImg.style.transition = "";
    curImg.style.zIndex = 3;
}
