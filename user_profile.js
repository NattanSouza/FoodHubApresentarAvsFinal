document.addEventListener('DOMContentLoaded', function () {

    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    const loginToast = document.getElementById('login-toast'); // Toast de login
    const closeToastButton = document.getElementById('close-toast'); // Botão de fechar o toast
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Converte a string JSON em objeto
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const mobileLoginLink = document.getElementById('mobileLoginLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const logoutMobile = document.getElementById('logoutMobile');
    const profileIcon = document.getElementById('profileIcon'); // Ícone de perfil
    const desktopSubmenu = document.getElementById('desktopSubmenu'); // Submenu no desktop

    // Função para alternar visibilidade do submenu
    function toggleSubmenu() {
        desktopSubmenu.classList.toggle('hidden');
    }

    // Função para alternar visibilidade do menu mobile
    function toggleMobileMenu() {
        mobileNav.classList.toggle('hidden');
    }

    // Controle do menu hamburger
    burger.addEventListener('click', toggleMobileMenu);

    // Fechar o menu ao clicar fora dele (não interfere com o toast)
    document.addEventListener('click', (event) => {
        if (!mobileNav.contains(event.target) && !burger.contains(event.target) && !loginToast.contains(event.target)) {
            mobileNav.classList.add('hidden');
        }
    });

    // Previne que o clique dentro do menu faça com que ele se feche
    mobileNav.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Verifica se o usuário está logado e exibe o menu ou o toast
    if (loggedInUser) {
        // Exibe o menu de usuário logado
        loggedInMenu.classList.remove('hidden');
        loggedOutMenu.classList.add('hidden');
        mobileLoginLink.classList.add('hidden');
        mobileProfileLink.classList.remove('hidden');

        // Encontra o usuário logado na lista de usuários
        const currentUser = users.find(user => user.email === loggedInUser.email);

        if (!currentUser) {
            alert("Usuário não encontrado. Redirecionando para o login.");
            window.location.href = "register_page.html";
            return;
        }

        // Preenche os campos com os dados existentes
        document.getElementById('nome').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('senha').value = currentUser.password || '';
        const endereco = currentUser.endereco || {};
        document.getElementById('cidade').value = endereco.cidade || '';
        document.getElementById('rua').value = endereco.rua || '';
        document.getElementById('bairro').value = endereco.bairro || '';
        document.getElementById('numero').value = endereco.numero || '';

        // Atualizar o perfil ao salvar
        document.getElementById('salvarPerfil').addEventListener('click', function () {
            currentUser.name = document.getElementById('nome').value;
            currentUser.password = document.getElementById('senha').value;
            currentUser.endereco = {
                cidade: document.getElementById('cidade').value,
                rua: document.getElementById('rua').value,
                bairro: document.getElementById('bairro').value,
                numero: document.getElementById('numero').value
            };

            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
            alert("Perfil atualizado com sucesso!");
        });

        // Excluir usuário (logout)
        logoutMobile.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            alert("Você saiu da sua conta.");
            window.location.href = "register_page.html";
        });

        // Exibir/ocultar o submenu de perfil ao clicar no ícone
        profileIcon.addEventListener('click', toggleSubmenu);

    } else {
        // Se não estiver logado, exibe o toast de aviso
        loginToast.classList.remove('hidden');
        
        // Redireciona após um tempo (5 segundos)
        setTimeout(function() {
            window.location.href = "register_page.html";
        }, 5000);

        // Adiciona funcionalidade ao botão de fechar
        closeToastButton.addEventListener('click', function() {
            loginToast.classList.add('hidden');
            window.location.href = "register_page.html";
        });
    }
});
