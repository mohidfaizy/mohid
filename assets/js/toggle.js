// Toggle nav
const majicToggle = (links, menus) => {
    const link = document.querySelectorAll(links),
    menu = document.querySelectorAll(menus);
    
    link.forEach((navLinks, navId)=>{
        navLinks.addEventListener('click' ,()=>{
            link.forEach(links =>{
                links.classList.remove('active');
            })
            navLinks.classList.add('active');
            menu.forEach(menus =>{
                menus.classList.remove('active');
            })
            menu[navId].classList.add('active');
        });
    });
}

majicToggle('.portfolio-link', '.portfolio-menu')