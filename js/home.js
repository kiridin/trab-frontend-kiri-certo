// Função para exibir o horário atual
function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(showTime, 500);
}

// Função para adicionar um zero na frente de números menores que 10
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // adiciona zero na frente de números < 10
    return i;
}

// Chama a função para exibir o horário
showTime();

// Recupera o nome armazenado no Local Storage
const nomeArmazenado = localStorage.getItem('nomeUsuario');

// Verifica se o nome foi armazenado
if (nomeArmazenado) {
    // Exibe o nome na página
    document.querySelectorAll('.nomeUsuario').forEach(element => {
        element.textContent = nomeArmazenado;
    });
} else {
    // Caso o nome não tenha sido armazenado
    document.querySelectorAll('.nomeUsuario').forEach(element => {
        element.textContent = 'Nome não encontrado';
    });
}

// Seleciona os botões e o modal
const btnSair = document.querySelector('#sair');
const btnFecharModal = document.querySelector('.btncancelar')
const btnLogin = document.querySelector('.btnsair');
const modalSair = document.querySelector('.modal-sair');

// Função para mostrar o modal
function mostrarModal() {
    modalSair.style.display = 'block';
}

// Função para ocultar o modal
function ocultarModal() {
    modalSair.style.display = 'none';
}

// Função para redirecionar ao clicar em "SAIR"
function redirecionar() {
    localStorage.removeItem('tokenacesso');
    window.location.href = 'login.html';
}

// Adiciona os event listeners aos botões
btnSair.addEventListener('click', mostrarModal);
btnFecharModal.addEventListener('click', ocultarModal);
btnLogin.addEventListener('click', redirecionar);
