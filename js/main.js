let choosedGame = ''

function createSelect() {
    const dropdownBtn = document.querySelector('.dropdown__btn')
    const dropdownMenu = document.querySelector('.dropdown__list')
    const items = document.querySelectorAll('.dropdown__list-item')
    const selectedItem = document.getElementById('dropdown-selected')
    const select = document.getElementById("dropdown");
    const points = document.querySelector('.points-cont');
    const circle = document.querySelector(".circle");

    function selectGame(game) {
        console.log("Select on change", game.name);
        const index = GAMES_LIST.findIndex((el) => el.id === game.id);
        setSliderActiveIndex(index);

        selectedItem.innerText = game.name
        choosedGame = game.name
        items.forEach((item) => item.classList.remove('active'))

        success.style.display = 'none';
        circle.classList.remove('success');
        circle.classList.remove('animation');
        circle.style.animation = '';

    }

    GAMES_LIST.forEach((game) => {
        const option = document.createElement("a");
        option.href = `#game${game.id}`;
        option.classList.add('dropdown__list-item')
        option.innerHTML = game.name;
        option.onclick = (e) => {
            selectGame(game);
            e.target.classList.add('active');
            closeMenu()
        }
        select.appendChild(option);

        const point = document.createElement('div');
        point.classList.add('point');
        points.appendChild(point);
        point.onclick = (e) => {
            selectGame(game);
            points.childNodes.forEach(child => { child.classList.remove('point-active') })
            e.target.classList.add('point-active')
        }
    });

    dropdownBtn.addEventListener('click', toggleMenu)

    function toggleMenu() {
        dropdownMenu.classList.toggle('show')
    }
    function closeMenu() {
        dropdownMenu.classList.remove('show')
    }
}

createSelect()
startSlider()

// const bigBtn = document.querySelector('.big-btn')
// const circle = document.querySelector('.circle')
// const success = document.querySelector('.success-text')
// circle.addEventListener('animationend', function (e) {
//     circle.classList.remove('animation');
//     circle.style.animation = '';
//     if (prevGame !== choosedGame) return;
//     success.style.display = 'block';
//     circle.classList.add('success');
//     setTimeout(() => { window.location.href = 'https://google.com' }, 1000)

// })
// let prevGame;
// bigBtn.onclick = () => {
//     if (prevGame === choosedGame) return;

//     circle.classList.add('animation');
//     circle.style.animation = 'spin 2s linear';

//     prevGame = choosedGame
// }
const bigBtn = document.querySelector('.big-btn');
const success = document.querySelector('.success-text');
const circle = document.querySelector(".circle");

circle.addEventListener("animationend", () => {
    circle.style.animation = "";
    success.style.display = 'block';
    setTimeout(() => { window.location.href = 'https://google.com' }, 1000);
});

circle.onclick = () => {
    console.log("click works");
    circle.style.animation = `progress 4s linear`;
    setTimeout(() => {
        bigBtn.classList.add('big-btn-glow')
    }, 800)
    setTimeout(() => {
        bigBtn.classList.remove('big-btn-glow')
    }, 3000)
};
