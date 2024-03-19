

function obterToken(token){
   return localStorage.getItem("tokenacesso");
}


function aplicarEstilo1() {
    document.querySelector('.container').classList.remove('containervoltar');
    document.querySelector('.containeredit').classList.remove('containereditvoltar');
    
    document.querySelector('.container').classList.add('containerir');
    document.querySelector('.containeredit').classList.add('containereditir')
}

function removerEstilo1() {
    document.querySelector('.container').classList.remove('containerir');
    document.querySelector('.containeredit').classList.remove('containereditir')
    document.querySelector('.container').classList.add('containervoltar');
    document.querySelector('.containeredit').classList.add('containereditvoltar');

}

document.querySelector('#produtoFormedit').addEventListener('submit', event => {
    event.preventDefault();
    const produtoId = document.getElementById('idedit').value;
    enviarDadosEditados(produtoId);
    carregarProdutos();
});

function editarProduto(produtoId) {
   
       fetch(`http://localhost:3400/produtos/${produtoId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(produto => {
        document.getElementById('idedit').value = produto.id;
        document.getElementById('nomeedit').value = produto.nome;
        document.getElementById('valoredit').value = produto.valor;
        document.getElementById('quantidadeEstoqueedit').value = produto.quantidadeEstoque;
        document.getElementById('observacaoedit').value = produto.observacao;
        document.getElementById('dataCadastroedit').value = produto.dataCadastro;
        document.getElementById('conteudo_editar').style.display = "block";
        document.getElementById('caneta').style.display = "none";
        aplicarEstilo1()

    })
    .catch(error => console.error('Erro ao recuperar detalhes do produto:', error));
}





function enviarDadosEditados(produtoId) {
    const nome = document.getElementById('nomeedit').value;
    const id=document.getElementById('idedit').value;
    const valor = document.getElementById('valoredit').value;
    const quantidade = document.getElementById('quantidadeEstoqueedit').value;
    const observacao = document.getElementById('observacaoedit').value;
    const datinha = document.getElementById('dataCadastroedit').value;
    const tudo = {
        id: id,
        nome: nome,
        valor: valor,
        quantidadeEstoque: quantidade,
        observacao: observacao,
        dataCadastro: datinha
    };

    var url = `http://localhost:3400/produtos/${produtoId}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body: JSON.stringify(tudo),
        redirect: 'follow'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar o produto.');
        }
        console.log('Produto atualizado com sucesso.');
        document.getElementById('idedit').value = "";
        document.getElementById('nomeedit').value = "";
        document.getElementById('valoredit').value = "";
        document.getElementById('quantidadeEstoqueedit').value = "";
        document.getElementById('observacaoedit').value = "";
        document.getElementById('dataCadastroedit').value = "";
    })
    .catch(error => {
        console.error('Erro ao atualizar o produto:', error);
    });
}


function carregarProdutos() {
    var url = 'http://localhost:3400/produtos';

    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            var produtosContainer = document.getElementById('produtos-container');
            produtosContainer.innerHTML = '';


            data.forEach(function (produto) {

                var produtoElement = document.createElement('div');

                produtoElement.classList.add('produto');

                let dataCadastro = new Date(produto.dataCadastro);
                let dataFormatada = dataCadastro.toLocaleDateString('pt-BR');


                produtoElement.innerHTML = `
                    <button id="nomelista">${produto.nome}</button>
                    <button class="lixeira" onclick="deleteProduto(${produto.id}, '${produto.nome}')"><i class="fa-solid fa-trash" style="color: #a41919;"></i></button>
                    <button class="edit" onclick="editarProduto(${produto.id})"><i class="fa-solid fa-pen" style="color: #362371;"></i></button>

                    <div class="textprod">ID: ${produto.id}</div>
                    <div class="textprod" >Valor: ${produto.valor}</div>
                    <div class="textprod" >Quantidade: ${produto.quantidadeEstoque}</div>
                    <div class="textprod">Data de Cadastro: ${dataFormatada}</div>
                    <p class="textobs"  class="observacao" id="observacao-${produto.id}" style="display:none">Observação: ${produto.observacao}</p>
                     
                    `;

                produtosContainer.appendChild(produtoElement);
                let fundo = document.createElement('div');
                fundo.classList.add('fundo');
                produtosContainer.appendChild(fundo);
                let fundoobs = document.createElement('div');
                fundoobs.classList.add('fundo2');
                produtosContainer.appendChild(fundoobs);

                produtoElement.addEventListener('mouseover', function () {
                    var obs = produtoElement.querySelector('.obs');
                  
                    toggleObservacao(produto.id);
                    fundoobs.style.opacity = '1';
                    fundoobs.style.transition = "top 0.5s ease"; 
                    fundoobs.style.top = "-21px";

                });


                produtoElement.addEventListener('mouseout', function () {
                    var obs = produtoElement.querySelector('.obs');
                    
                    toggleObservacao(produto.id);
                    fundoobs.style.transition = "top 0.5s ease";
                    fundoobs.style.top = "-120px";


                   
                    var editButtons = document.querySelectorAll('.edit');
                    editButtons.forEach(function (button) {
                        button.addEventListener('mouseover', function () {
                            document.querySelector('#caneta').classList.add('tremor');
                        });
                    
                        button.addEventListener('mouseout', function () {
                            document.querySelector('#caneta').classList.remove('tremor');
                        });
                    });
                    

                });


            });
        })

        .catch(error => console.log('Erro ao recuperar os produtos:', error));
}


document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos();
});


function exibir_lista() {
    document.querySelector("#produtos-container").style.display = 'block';
    document.querySelector("#searchInput").style.display = 'block';
    document.querySelector("#list").style.display = 'block';
    document.querySelector('#exibir_lista').style.display = 'none';
};

document.querySelector('#exibir_lista').addEventListener('click', exibir_lista);

function validarEEnviar() {
    var nome = document.getElementById('nome').value;
    var valor = parseFloat(document.getElementById('valor').value);
    var quantidadeEstoque = parseInt(document.getElementById('quantidadeEstoque').value);
    var observacao = document.getElementById('observacao').value;
    var dataCadastro = document.getElementById('dataCadastro').value;

    // Verifica se todos os campos obrigatórios estão preenchidos

    if (nome && valor && quantidadeEstoque && dataCadastro) {
        var produto = {
            "nome": nome,
            "valor": valor,
            "quantidadeEstoque": quantidadeEstoque,
            "observacao": observacao,
            "dataCadastro": dataCadastro
        };


        var jsonData = JSON.stringify(produto);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3400/produtos", true);
        xhr.setRequestHeader("Content-Type", "application/json" );
        xhr.setRequestHeader("Authorization", obterToken());
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.querySelector('.alertaa').textContent = `Sucesso!`;
                    document.querySelector('.alerta2').textContent = `Tudo certo, produto adicionado.😊`;
                    document.getElementById('custom-alert').style.display = 'flex';
                    document.querySelector('.close').addEventListener('click', function () {
                        document.getElementById('custom-alert').style.display = 'none';
                        document.querySelector(".modal-content").style.display = "block";
                    });

                    document.getElementById("produtoForm").reset();
                    document.querySelector('.close').addEventListener('click', function () {
                        carregarProdutos()
                        exibir_lista()

                    });

                } else {
                    alert("Erro ao adicionar o produto. Por favor, tente novamente.");

                }

            }

        };

        xhr.send(jsonData);

    } else {

        document.querySelector('.alertaa').textContent = `Oops! Você Não pode prosseguir assim.😢`;
        document.querySelector('.alerta2').textContent = `Preencha todos os campos obigatórios, e tente novamente.`;
        document.getElementById('custom-alert').style.display = 'flex';
        document.querySelector('.close').addEventListener('click', function () {
            document.getElementById('custom-alert').style.display = 'none';
            document.querySelector(".modal-content").style.display = "block";

        });

    }

}


function toggleObservacao(produtoId) {
    var observacaoElement = document.getElementById(`observacao-${produtoId}`);

    if (observacaoElement.style.display === 'none') {
        observacaoElement.style.display = 'flex';
    } else {
        observacaoElement.style.display = 'none';
    }
}


function deleteProduto(produtoId, nomeCliente) {


    let nomeClienteToDelete = nomeCliente;
    document.querySelectorAll('.nomeUsuario').forEach(element => {
        element.textContent = nomeClienteToDelete;
    });
  
    document.querySelector('.modal-apagar').style.display = "block"; 
   
    document.querySelector('.btncancelar').addEventListener('click', function() {
        document.querySelector('.modal-apagar').style.display = "none";}) 

    // Adiciona o evento de clique ao botão de apagar
    document.querySelector('.btnapagar').addEventListener('click', function() {
        document.querySelector('.modal-apagar').style.display = "none"; 

        var url = `http://localhost:3400/produtos/${produtoId}`;
        var requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': obterToken()
            },
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                   
                    carregarProdutos();
                } else {
                    alert('Erro ao deletar o produto. Por favor, tente novamente mais tarde.');
                }
            })
            .catch(error => {
                alert('Erro ao deletar o produto. Por favor, tente novamente mais tarde.');
                console.error('Erro ao deletar o produto:', error);
            });
    });
}




function searchProduct() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    var produtos = document.getElementsByClassName('produto');

    for (var i = 0; i < produtos.length; i++) {
        var nomeProduto = produtos[i].getElementsByTagName('button')[0].textContent.toLowerCase();
        var idProduto = produtos[i].getElementsByTagName('div')[0].textContent.replace('ID: ', '').toLowerCase();

        if (nomeProduto.includes(searchTerm) || idProduto === searchTerm) {
            produtos[i].style.backgroundColor = "rgba(161, 233, 152, 0.76)";
            produtos[i].scrollIntoView({ block: "end", inline: "nearest" });
            setInterval(function () {
                for (var i = 0; i < produtos.length; i++) {
                    produtos[i].style.backgroundColor = "rgba(161, 233, 152, 0.00)";
                }
            }, 1500);


        } else {

            produtos[i].style.backgroundColor = "none";

        }

    }

}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchProduct();

    }

}

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

function checkTime(i) {

    if (i < 10) { i = "0" + i };  
    return i;

}


showTime();

function pin() {
    let btnpin = document.querySelector("#pin");

    btnpin.addEventListener("click", function() {
        removerEstilo1 ()
        document.getElementById('conteudo_editar').style.display = "none";
        document.getElementById('caneta').style.display = "flex";
    });
}

pin();

