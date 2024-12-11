// Coloque a função initMap no escopo global
function initMap() {
    const location = { lat: -22.52201, lng: -44.07948 }; // Localização do Shopping Park Sul
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Shopping Park Sul"
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    // Funções utilitárias para o localStorage
    const getFromLocalStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erro ao parsear ${key}:`, error);
            return null;
        }
    };

    const saveToLocalStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Erro ao salvar ${key}:`, error);
        }
    };

    // Verifica se o usuário está logado
    const loggedInUserData = getFromLocalStorage('loggedInUser');
    const isLoggedIn = loggedInUserData?.name || null;

    // Alteração do menu dependendo se o usuário está logado ou não
    const desktopMenuContainer = document.getElementById('userIconContainer');
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const desktopSubmenu = document.getElementById('desktopSubmenu');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');
    const logoutDesktop = document.getElementById('logoutDesktop');
    const logoutMobile = document.getElementById('logoutMobile');

    if (isLoggedIn) {
        // Exibe menu de usuário logado no desktop
        loggedInMenu.classList.remove('hidden');
        loggedOutMenu.classList.add('hidden');

        // Configura links para mobile
        mobileProfileLink.style.display = 'block';
        mobileLoginLink.style.display = 'none';

        // Adiciona eventos de logout
        const handleLogout = () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = "register_page.html";
        };

        logoutDesktop?.addEventListener('click', handleLogout);
        logoutMobile?.addEventListener('click', handleLogout);

        // Mostra submenu ao clicar no ícone do perfil
        const profileIcon = document.getElementById('profileIcon');
        profileIcon.addEventListener('click', (event) => {
            event.preventDefault();
            desktopSubmenu.classList.toggle('hidden');
        });

        // Fecha o submenu ao clicar fora
        document.addEventListener('click', (event) => {
            if (!profileIcon.contains(event.target) && !desktopSubmenu.contains(event.target)) {
                desktopSubmenu?.classList.add('hidden');
            }
        });
    } else {
        // Exibe menu de usuário deslogado no desktop
        loggedInMenu.classList.add('hidden');
        loggedOutMenu.classList.remove('hidden');

        // Configura links para mobile
        mobileProfileLink.style.display = 'none';
        mobileLoginLink.style.display = 'block';
    }
});
