const header = document.querySelector('header');

function handleScroll() {
    if (window.scrollY > 300) {
        header.style.backgroundColor = '#fff';
    } else {
        header.style.backgroundColor = 'transparent';
    }
}
function handleMouseOver() {
    header.style.backgroundColor = 'white';
}
function handleMouseOut() {
    if (window.scrollY <= 300) {
        header.style.backgroundColor = 'transparent';
    }
}

window.addEventListener('scroll', handleScroll);

header.addEventListener('mouseover', handleMouseOver);
header.addEventListener('mouseout', handleMouseOut);
