// Função para salvar o token de autenticação na localStorage
function salvarToken(token){
    // Aqui salvo o token na localStorage
    localStorage.setItem('token', token);
}

// Função para enviar o formulário de login
function enviarForm(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obter os valores do formulário
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Construir o objeto de dados para enviar na requisição POST
    var data = {
        email: email,
        senha: senha
    };

    // Enviar a requisição POST para o endpoint /login
    fetch('http://localhost:3400/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Se o login for bem-sucedido, iniciar a animação de desaparecimento e redirecionar para index.html após a animação
                return response.json();
            } else {
                // Se o login falhar, exibir uma mensagem de erro (opcional)
                document.getElementById('custom-alert').style.display = 'flex';

                // Fechar o alert customizado ao clicar no botão de fechar
                document.querySelector('.close').addEventListener('click', function () {
                    document.getElementById('custom-alert').style.display = 'none';
                    document.querySelector(".modal-content").style.display = "block";
                });
                throw new Error('Erro de login');
            }
        })
        .then(data => {
            const nome = data.usuario.nome;
            const token = data.token; // Acesse a variável "nome" do objeto JSON
            console.log('Nome:', nome);
            localStorage.setItem('nomeUsuario', nome);
            localStorage.setItem('tokenacesso', token);

            // Coloque aqui o código de animação e redirecionamento após o login ser bem-sucedido
            var container = document.querySelector('.container');
            var key = document.querySelector('.key');
            var background = document.querySelector('.background');

            // Aplicar transições suaves de opacidade
            container.style.transition = 'opacity 1.5s ease';
            container.style.opacity = '0';
            key.style.transition = 'opacity 1.5s ease';
            key.style.opacity = '0';

            // Aplicar transição suave e transformação para reverter a perspectiva e a rotação aplicadas anteriormente ao background
            background.style.transition = 'transform 1.5s ease';
            background.style.transform = 'perspective(800px) rotateY(0deg) rotate(0deg)';

            setTimeout(function () {
                window.location.href = 'home.html';
            }, 1500); // Tempo da animação em milissegundos (o mesmo que a transição de opacidade)
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            // Exibir mensagem de erro genérica em caso de falha na requisição

        });
}

// Função para alternar a visibilidade da senha e trocar o ícone do olho
var password = document.getElementById("senha");
var eye = document.getElementById("eye");

eye.addEventListener('click', function () {
    // Alterna o tipo de input
    password.type = password.type === 'password' ? 'text' : 'password';

});

// Trocar a imagem do olho ao clicar
var eye = document.querySelector("#eye"); // se "eye" é um id

var originalSrc = eye.src;
var newSrc = 'https://cdn.icon-icons.com/icons2/2406/PNG/512/eye_slash_visible_hide_hidden_show_icon_145987.png';

eye.addEventListener('click', function () {
    if (eye.src === originalSrc) {
        eye.src = newSrc;
    } else {
        eye.src = originalSrc;
    }
});

// Animação da linha de login
var linhalogin = document.querySelector("#linhalogin");
var container = document.querySelector(".container");

container.addEventListener("mouseenter", function () {
    // Quando o mouse entra no contêiner, aumentar a largura da linha de login suavemente
    animateWidth(linhalogin, 80, 180, 500); // De 50px para 100px em 500ms
});

container.addEventListener("mouseleave", function () {
    // Quando o mouse sai do contêiner, restaurar a largura original da linha de login suavemente
    animateWidth(linhalogin, 180, 80, 500); // De 100px para 50px em 500ms
});

// Função para animar a largura
function animateWidth(element, startWidth, endWidth, duration) {
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;

        element.style.width = easeInOutQuad(progress, startWidth, endWidth - startWidth, duration) + 'px';

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// Função para calcular a progressão da animação
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

// Animação da linha do email e da senha
var linhae = document.querySelector(".linhaemail");
var inputmail = document.querySelector("#email");
var linhas = document.querySelector(".linhasenha");
var inputsenha = document.querySelector("#senha");

var animacaoEmail = false;
var animacaoSenha = false;

// Adiciona um listener para o evento de entrada de texto no input do email
inputmail.addEventListener("input", function () {
    if (inputmail.value.trim() !== '' && !animacaoEmail) { // Verifica se o valor do input não está vazio e se a animação não foi acionada
        animateWidth(linhae, 0, 140, 1000); // Inicia a animação se houver algum valor no input
        animacaoEmail = true; // Define que a animação foi acionada
    } else if (inputmail.value.trim() === '' && animacaoEmail) { // Se o valor do input ficar vazio e a animação tiver sido acionada
        animateWidth(linhae, 140, 0, 1000); // Reverte a animação
        animacaoEmail = false; // Define que a animação foi revertida
    }
});

// Adiciona um listener para o evento de entrada de texto no input da senha
inputsenha.addEventListener("input", function () {
    if (inputsenha.value.trim() !== '' && !animacaoSenha) { // Verifica se o valor do input não está vazio e se a animação não foi acionada
        animateWidth(linhas, 0, 120, 1000); // Inicia a animação se houver algum valor no input
        animacaoSenha = true; // Define que a animação foi acionada
    } else if (inputsenha.value.trim() === '' && animacaoSenha) { // Se o valor do input ficar vazio e a animação tiver sido acionada
        animateWidth(linhas, 120, 0, 1000); // Reverte a animação
        animacaoSenha = false; // Define que a animação foi revertida
    }
});
