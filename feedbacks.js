document.addEventListener('DOMContentLoaded', function () {
    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    
    // Verifica se o burger e o mobileNav existem antes de adicionar o evento
    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');  // Alterna a visibilidade do menu
        });
    }

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
    const userIconContainer = document.getElementById('userIconContainer');
    const loggedInMenu = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');
    const profileIcon = document.getElementById('profileIcon');
    const desktopSubmenu = document.getElementById('desktopSubmenu');
    const logoutDesktop = document.getElementById('logoutDesktop');
    
    // Controle do clique no ícone de perfil
    let isSubmenuVisible = false;

    if (profileIcon) {
        profileIcon.addEventListener('click', () => {
            isSubmenuVisible = !isSubmenuVisible;
            if (isSubmenuVisible) {
                desktopSubmenu.classList.remove('hidden');  // Mostra o submenu
            } else {
                desktopSubmenu.classList.add('hidden');     // Esconde o submenu
            }
        });
    }

    // Exibe ou esconde links no menu com base no estado de login
    if (isLoggedIn) {
        loggedInMenu.classList.remove('hidden');
        loggedOutMenu.classList.add('hidden');
    } else {
        loggedInMenu.classList.add('hidden');
        loggedOutMenu.classList.remove('hidden');
    }

    const profileLink = document.getElementById('profileLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');

    // Ajuste do menu mobile
    if (isLoggedIn) {
        mobileProfileLink.style.display = 'block';
        mobileLoginLink.style.display = 'none';
    } else {
        mobileProfileLink.style.display = 'none';
        mobileLoginLink.style.display = 'block';
    }

    const feedbackForm = document.getElementById('feedbackForm');
    const submitButton = document.getElementById('submitFeedback');
    const feedbackText = document.getElementById('feedbackText');
    const feedbacksContainer = document.getElementById('feedbacksContainer');
    const starRating = document.getElementById('starRating');
    let selectedStars = 0;
    const feedbacks = getFromLocalStorage('feedbacks') || [];

    // Função para exibir feedbacks
    function displayFeedbacks() {
        feedbacksContainer.innerHTML = '';
        feedbacks.forEach(feedback => {
            const feedbackElement = document.createElement('div');
            feedbackElement.classList.add(
                'bg-white', 'p-6', 'rounded-lg', 
                'shadow-md', 'hover:shadow-xl', 
                'transition-shadow', 'duration-300'
            );
            feedbackElement.innerHTML = `  
                <p class="text-gray-600">${feedback.text}</p>
                <div class="flex items-center mt-3">
                    <span class="text-sm text-gray-400">- ${feedback.user}</span>
                    <div class="ml-3 text-yellow-400">
                        ${createStars(feedback.stars)}
                    </div>
                </div>
            `;
            feedbacksContainer.appendChild(feedbackElement);
        });
    }

    // Inicializa os feedbacks exibidos
    displayFeedbacks();

    submitButton.disabled = true;

    // Lógica para selecionar as estrelas
    const stars = starRating.querySelectorAll('i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedStars = parseInt(star.getAttribute('data-index')) + 1;
            updateStars();
            checkFormValidity();
        });
    });

    function updateStars() {
        stars.forEach((star, index) => {
            if (index < selectedStars) {
                star.classList.add('text-yellow-400');
                star.classList.remove('text-gray-400');
            } else {
                star.classList.add('text-gray-400');
                star.classList.remove('text-yellow-400');
            }
        });
    }

    function checkFormValidity() {
        submitButton.disabled = feedbackText.value.trim() === '' || selectedStars === 0;
    }

    feedbackText.addEventListener('input', checkFormValidity);

    submitButton.addEventListener('click', () => {
        if (!isLoggedIn) {
            // Exibe aviso se não estiver logado
            const warningMessage = document.createElement('p');
            warningMessage.classList.add('text-red-500', 'text-center', 'mt-4');
            warningMessage.textContent = 'Você precisa estar logado para enviar um feedback.';
            feedbackForm.appendChild(warningMessage);

            setTimeout(() => {
                warningMessage.remove();
            }, 3000);

            return;
        }

        const feedback = feedbackText.value.trim();
        if (feedback.length > 0 && selectedStars > 0) {
            const newFeedback = {
                text: feedback,
                user: isLoggedIn,
                stars: selectedStars
            };
            feedbacks.unshift(newFeedback);
            saveToLocalStorage('feedbacks', feedbacks);
            displayFeedbacks();
            feedbackText.value = '';
            selectedStars = 0;
            updateStars();
            checkFormValidity();

            const successMessage = document.createElement('p');
            successMessage.classList.add('text-green-500', 'text-center', 'mt-4');
            successMessage.textContent = 'Feedback enviado com sucesso!';
            feedbackForm.appendChild(successMessage);

            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });

    function createStars(rating) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += i < rating ? '<i class="bx bxs-star"></i>' : '<i class="bx bx-star"></i>';
        }
        return starsHtml;
    }
});
