window.onload = () => {
    const usuario = JSON.parse(localStorage.getItem("loggedInUser"));
    const loginToast = document.getElementById('login-toast'); // Toast de login
    const closeToastButton = document.getElementById('close-toast'); // Botão de fechar o toast

    // Elementos do menu de navegação
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const mobileProfileLink = document.getElementById('mobileProfileLink'); // Link de perfil mobile
    const mobileLoginLink = document.getElementById('mobileLoginLink'); // Link de login mobile
    const userIcon = document.getElementById('profileIcon'); // Ícone de usuário
    const desktopSubmenu = document.getElementById('desktopSubmenu'); // Submenu de perfil

    if (!usuario) {
        // Se o usuário não estiver logado, exibe o toast e redireciona
        loginToast.classList.remove('hidden');
        
        // Redireciona após um tempo (5 segundos)
        setTimeout(function() {
            window.location.href = "register_page.html";
        }, 5000);

        // Fecha o toast e redireciona se o botão for clicado
        closeToastButton.addEventListener('click', function() {
            loginToast.classList.add('hidden');
            window.location.href = "register_page.html";
        });

        // Esconde o menu de usuário logado e exibe o menu de login
        loggedInMenu.classList.add('hidden');
        loggedOutMenu.classList.remove('hidden');
        mobileLoginLink.classList.remove('hidden');
        mobileProfileLink.classList.add('hidden');

        return; // Impede o restante do código de rodar se o usuário não estiver logado
    }

    // Caso o usuário esteja logado, preenche os campos de endereço
    if (usuario && usuario.endereco) {
        document.getElementById("rua").value = usuario.endereco.rua || '';
        document.getElementById("bairro").value = usuario.endereco.bairro || '';
        document.getElementById("cidade").value = usuario.endereco.cidade || '';
        document.getElementById("cep").value = usuario.endereco.cep || '';
        document.getElementById("numero").value = usuario.endereco.numero || '';
    }

    // Mostra o menu de usuário logado e oculta o menu de login
    loggedInMenu.classList.remove('hidden');
    loggedOutMenu.classList.add('hidden');
    mobileLoginLink.classList.add('hidden');
    mobileProfileLink.classList.remove('hidden');
};

// Adiciona evento de clique no ícone de usuário (para mostrar/ocultar o submenu)
const userIcon = document.getElementById('profileIcon');
const desktopSubmenu = document.getElementById('desktopSubmenu');

if (userIcon) {
    userIcon.addEventListener('click', (event) => {
        // Impede a propagação do clique para que o clique fora não feche o submenu
        event.stopPropagation();

        // Alterna a visibilidade do submenu
        desktopSubmenu.classList.toggle('hidden');
    });
}

// Fechar o submenu se o usuário clicar fora dele
document.addEventListener('click', (event) => {
    if (!desktopSubmenu.contains(event.target) && !userIcon.contains(event.target)) {
        desktopSubmenu.classList.add('hidden');
    }
});

// Controle do menu mobile
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const loginToast = document.getElementById('login-toast'); // Para garantir que o clique fora do toast não feche o menu
    if (!mobileNav.contains(event.target) && !burger.contains(event.target) && !loginToast.contains(event.target)) {
        mobileNav.classList.add('hidden');
    }
});

// Previne que o clique dentro do menu faça com que ele se feche
mobileNav.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Código para carrinho de compras (sem alterações)
let total = 0;

// Quando a página do carrinho carregar, vamos pegar os itens do localStorage (caso existam)
document.addEventListener('DOMContentLoaded', function() {
    // Recupera os itens armazenados no localStorage
    const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itensCarrinhoElement = document.getElementById('itensCarrinho');
    const totalElement = document.getElementById('total');

    // Exibe os itens do carrinho e calcula o total
    itensCarrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        itensCarrinhoElement.appendChild(li);
        total += item.preco; // Soma o valor para o total
    });

    // Atualiza o valor total na tela
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
});

// Função para adicionar ao carrinho (salva no localStorage)
function adicionarAoCarrinho(nome, preco) {
    const item = { nome, preco };
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(item); // Adiciona o item ao carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage

    // Atualiza a quantidade de itens no carrinho (ícone)
    const quantidadeCarrinho = document.getElementById('quantidadeCarrinho');
    if (quantidadeCarrinho) {
        quantidadeCarrinho.textContent = carrinho.length; // Atualiza a quantidade
    }
}

// Mostra os campos de forma de pagamento selecionada
const cartaoBtn = document.getElementById('cartaoBtn');
const pixBtn = document.getElementById('pixBtn');
const cartaoCampos = document.getElementById('cartaoCampos');
const pixCampos = document.getElementById('pixCampos');

// Ao clicar no botão de Cartão, mostrar os campos correspondentes
cartaoBtn.addEventListener('click', function() {
    cartaoCampos.classList.remove('hidden');
    pixCampos.classList.add('hidden');
});

// Ao clicar no botão de Pix, mostrar os campos correspondentes
pixBtn.addEventListener('click', function() {
    pixCampos.classList.remove('hidden');
    cartaoCampos.classList.add('hidden');
});
