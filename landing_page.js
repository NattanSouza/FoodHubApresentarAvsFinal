document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    const logoutDesktop = document.getElementById('logoutDesktop');
    const profileIcon = document.getElementById('profileIcon');
    const desktopSubmenu = document.getElementById('desktopSubmenu');

    // Elementos de login/perfil
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');

    // Controle do menu mobile
    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    // Alternar submenu de perfil no desktop
    profileIcon.addEventListener('click', () => {
        desktopSubmenu.classList.toggle('hidden');
    });

    // Fechar o submenu se clicar fora dele
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#profileIcon') && !event.target.closest('#desktopSubmenu')) {
            desktopSubmenu.classList.add('hidden');
        }
    });

    // Função para verificar estado de login
    const getFromLocalStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erro ao parsear ${key}:`, error);
            return null;
        }
    };

    const loggedInUserData = getFromLocalStorage('loggedInUser');
    const isLoggedIn = loggedInUserData?.name || null;

    // Alteração do menu dependendo do estado de login
    if (isLoggedIn) {
        // Usuário logado
        loggedInMenu.classList.remove('hidden');
        loggedOutMenu.classList.add('hidden');
        mobileProfileLink.style.display = 'block';
        mobileLoginLink.style.display = 'none';
    } else {
        // Usuário deslogado
        loggedInMenu.classList.add('hidden');
        loggedOutMenu.classList.remove('hidden');
        mobileProfileLink.style.display = 'none';
        mobileLoginLink.style.display = 'block';
    }

    // Função de logout
    const clearLocalStorage = () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'register_page.html';
    };

    logoutDesktop.addEventListener('click', clearLocalStorage);
});
