// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const item = { nome, preco };
    cart.push(item);
    localStorage.setItem('carrinho', JSON.stringify(cart));
    const cartCount = cart.length;
    document.getElementById('cart-count').innerText = cartCount;
    console.log(cart);
}

document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Elementos do menu
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');
    const logoutDesktop = document.getElementById('logoutDesktop');
    const logoutMobile = document.getElementById('logoutMobile');
    const profileIcon = document.getElementById('profileIcon');
    const desktopSubmenu = document.getElementById('desktopSubmenu');

    if (!loggedInUser) {
        const toast = document.getElementById('login-toast');
        const closeToast = document.getElementById('close-toast');

        // Exibe o toast
        toast.classList.remove('hidden');

        setTimeout(() => {
            window.location.href = "register_page.html"; 
        }, 8000);

        // Permite que o usuário feche manualmente
        closeToast.addEventListener('click', () => {
            toast.classList.add('hidden');
            window.location.href = "register_page.html";
        });

        // Ajusta o menu para usuários deslogados
        loggedInMenu.classList.add('hidden');
        loggedOutMenu.classList.remove('hidden');
        mobileProfileLink.classList.add('hidden');
        mobileLoginLink.classList.remove('hidden');

        return;
    }

    // Ajusta o menu para usuários logados
    loggedInMenu.classList.remove('hidden');
    loggedOutMenu.classList.add('hidden');
    mobileProfileLink.classList.remove('hidden');
    mobileLoginLink.classList.add('hidden');

    // Exibe o submenu do ícone de perfil no desktop
    profileIcon.addEventListener('click', () => {
        desktopSubmenu.classList.toggle('hidden');
    });

    // Oculta o submenu ao clicar fora
    document.addEventListener('click', (event) => {
        if (!loggedInMenu.contains(event.target)) {
            desktopSubmenu.classList.add('hidden');
        }
    });

    // Função de logout
    const logout = () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = "register_page.html";
    };

    // Eventos de logout
    logoutDesktop.addEventListener('click', logout);
    logoutMobile.addEventListener('click', logout);

    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });
});
