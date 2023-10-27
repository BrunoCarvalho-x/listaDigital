document.addEventListener("DOMContentLoaded", function () {
    const listaEntrada = document.getElementById("entradaLista");
    const listas = document.getElementById("variasListas");
    const botaoAdicionarLista = document.getElementById("addLista");
    const nomeLista = [];
    const botaoEditarLista = [];
    const botaoDeletarLista = [];
    const listasEmBloco = [];
    const botaoListas = [];
    const botaoAdicionar = [];
    const TESTE = {
        div: [],
    };
    let auxFuncao = 0;

    function adicionarLista(event) { // função que adiciona a lista criada
        if (event.target.classList.contains("addLista")) { // Verifica se o Click contem o classe de addLista 
            nomeLista[auxFuncao]=listaEntrada.value.trim(); // Associa um nomeLista a função atual, adicionando um indice a ela
            if (nomeLista[auxFuncao] !== "") { // Verifica o caso da string ser vazia

                listasEmBloco[auxFuncao] = document.createElement("ai"); // criando o elemento que será adicionado
                listasEmBloco[auxFuncao].innerHTML = `
                    <span><button class="asListas" data-index="${auxFuncao}"> ${nomeLista[auxFuncao]}</button></span>                 
                    <button class="editarLista" data-index="${auxFuncao}">Editar</button>      
                    <button class="deletarLista" data-index="${auxFuncao}">Excluir</button>
                `;
                // Criando os botões que aparecem na tela com seus respectivos indices, para que posteriormente possão ser acessados. 

                botaoEditarLista[auxFuncao] = listasEmBloco[auxFuncao].querySelector(".editarLista");
                botaoDeletarLista[auxFuncao] = listasEmBloco[auxFuncao].querySelector(".deletarLista"); 
                botaoListas[auxFuncao] = listasEmBloco[auxFuncao].querySelector(".asListas");    
                // vinculando os botões criados as váriaveis.

                listas.appendChild(listasEmBloco[auxFuncao]);
                listaEntrada.value = "";       
            }
            auxFuncao++; // Adicionar +1 para que o próximo uso da função não chame os mesmo locais da memória.
        };
    };

    function deletarLista(event) { // função que deleta a lista
        if (event.target.classList.contains("deletarLista")) { // Verifica a classe do botão que foi clicado
            const indice = event.target.dataset.index; // Vincula a variavel criada ao indice da função clicada acima
            if (TESTE.div[indice]) { // Verifica a div não está vazia 
                TESTE.div[indice].remove(); // remove o que está na div
            };
            listasEmBloco[indice].remove(); // remove os botões criados da função adicionarLista()
        };
    };

    function editarLista(event) { // função de editar o nome da lista

        if (event.target.classList.contains("editarLista")){ // verifica a classe do botão clicado
            let indice = event.target.dataset.index; // vincula o indice do botão
            listasEmBloco[indice].querySelector("span").style.display = "none"; // Tira ele da tela

            let novoNomeListaEntrada = document.createElement("input"); // Cria um input novo que será usado para trocar o nome
            novoNomeListaEntrada.type = "text"; // Tipo do elemento
            novoNomeListaEntrada.value = nomeLista[indice]; // recebe o valor original para que poossa ser trocado posteriormente       
            novoNomeListaEntrada.style.width = "120px"; // Estilo css do elemento
            listasEmBloco[indice].insertBefore(novoNomeListaEntrada, botaoEditarLista[indice]); 
            /* incere na tela, na ordem: 
            novoNomeListaEntrada - botaoEditarLista - botaoExcluir
            */
            botaoEditarLista[indice].style.display = "none"; // vetira o botão editar da tela pra não ocasionar erro

            let botaoSalvarLista = document.createElement("button"); // cria o botão salvar
            botaoSalvarLista.textContent = "Salvar";
            listasEmBloco[indice].insertBefore(botaoSalvarLista, botaoDeletarLista[indice]); // Mesma lógica acima
            novoNomeListaEntrada.focus();

            function SalvarLista() { // função do botão salvar
                let nomeListaTroca = novoNomeListaEntrada.value.trim(); // cria a variavel usada pra trocar o nome e não causar erro

                if (nomeListaTroca !== "") { // verifica nome não vazio
                    listasEmBloco[indice].querySelector("span button").textContent = `${nomeListaTroca}`; // faz a troca no texto html
                    listasEmBloco[indice].querySelector("span").style.display = "inline"; // reaparece na tela o que foi retirado
                    botaoEditarLista[indice].style.display = "inline"; // idem 
                    nomeLista[indice] = nomeListaTroca;
                    novoNomeListaEntrada.remove();	
                    botaoSalvarLista.remove();
                }
            };

            botaoSalvarLista.addEventListener("click", SalvarLista); // escutador da função 
            
            botaoSalvarLista.addEventListener("keydown", function (event) { // função para tecla enter
                if (event.key === "Enter") {
                    event.preventDefault();  
                    SalvarLista();
                }  
            });

            novoNomeListaEntrada.addEventListener("keydown", function (event) { // função para tecla enter
                if (event.key === "Enter") {
                    event.preventDefault();
                    botaoSalvarLista.focus();
                }
            });
        };
    };

    function botaoLista(event) { // função que acessa a lista criada
        let indice = event.target.dataset.index; // vincula o indice a variavel
        if (!TESTE.div[indice]) { // verifica a existencia não nula da div, se for nulo, cria uma nova
            if (event.target.classList.contains("asListas")){ // verifica a classe 
                
                TESTE.div[indice] = document.createElement("div");
                TESTE.div[indice].className = "conteudo";
                TESTE.div[indice].setAttribute('data-index', [indice]);
                TESTE.div[indice].innerHTML = `
                            <h1 id="h1_${indice}">${nomeLista[indice]}</h1>
                            <div class="entrada2">
                                <input type="text" id="item_${indice}" placeholder="Digite um item">
                                <input type="number" id="quantidade_${indice}" class="quantidade" placeholder="Quantidade">
                                <button id="add_${indice}" class="add">Adicionar</button>
                                <button id ="voltar" class="deletar" data-index="${indice}">Voltar</button>
                            </div>
                            <ul id="lista_${indice}"></ul>                              
                `;

                // cria a nova div e a vincula com o indice trabalhado
                
                document.querySelector(".conteudo").style.display = "none"; // retira o conteudo do display para adicionar o nova div

                document.body.appendChild(TESTE.div[indice]); // adiciona a div

                botaoAdicionar[indice] = document.getElementById(`add_${indice}`); // vincula o botao ao novo indice criado
                botaoAdicionar[indice].dataset.index = indice;
            };
        } else if(event.target.classList.contains("asListas")) { // caso não for nula é porque já foi criado, logo só acessa a já existente
            let h1 = document.getElementById(`h1_${indice}`);

            if (nomeLista[indice] !== h1.textContent) {
                h1.textContent = nomeLista[indice];
            };

            // passagem para mudança do nome da lista caso tenha acontecido.

            document.querySelector(".conteudo").style.display = "none";
            TESTE.div[indice].style.display = "block";
        };

    
    };

    function adicionarItem(event) {
        if (event.target.classList.contains("add")){ // verifica a classe clicada
            const indice = event.target.dataset.index; // vincula o indice

            const itemEntrada = document.getElementById(`item_${indice}`); // vincula a variavel
            const quantEntrada = document.getElementById(`quantidade_${indice}`); // vincula a variavel
            const listaCompleta = document.getElementById(`lista_${indice}`); // vincula a variavel
            botaoAdicionar[indice] = document.getElementById(`add_${indice}`); // vincula a variavel

            let itemNome = itemEntrada.value.trim(); // recebe o nome digitado do item
            let itemQuantidade = quantEntrada.value.trim(); // recebe a quantidade digitada do item

            if (itemNome !== "" && itemQuantidade !== "") {
                const listaBloco = document.createElement("li");
                listaBloco.innerHTML = `
                    <span> ${itemQuantidade} - ${itemNome} </span>
                    <button class="completo">Concluído</button>                   
                    <button class="editar">Editar</button>      
                    <button class="deletar">Excluir</button>
                    `;   
                listaCompleta.appendChild(listaBloco);
                itemEntrada.value = "";
                quantEntrada.value = "";
                // segue a mesma lógica das funções anteriores de criação de botões e html

                const botaoCompletar = listaBloco.querySelector(".completo");
                const botaoEditar = listaBloco.querySelector(".editar");
                const botaoDeletar = listaBloco.querySelector(".deletar");
            
                botaoCompletar.addEventListener("click", function () { // "risca" o item da lista
                    const textoElementos = listaBloco.querySelectorAll("span");
                    textoElementos.forEach(function (element) {
                    element.classList.toggle("completed");
                    })
                });
            
                botaoEditar.addEventListener("click", function () {
                    listaBloco.querySelector("span").style.display = "none";

                    let novoNomeEntrada = document.createElement("input");
                    novoNomeEntrada.type = "text";
                    novoNomeEntrada.value = itemNome;

                    let novoQuantidadeEntrada = document.createElement("input");
                    novoQuantidadeEntrada.type = "number";
                    novoQuantidadeEntrada.value = itemQuantidade;
                
                    novoNomeEntrada.style.width = "120px";
                    novoQuantidadeEntrada.style.width = "80px";
        
                    listaBloco.insertBefore(novoNomeEntrada, botaoEditar);
                    listaBloco.insertBefore(novoQuantidadeEntrada, botaoEditar);

                    botaoEditar.style.display = "none";
                    botaoCompletar.style.display = "none";

                    let botaoSalvar = document.createElement("button");
                    botaoSalvar.textContent = "Salvar";

                    listaBloco.insertBefore(botaoSalvar, botaoDeletar);

                    botaoSalvar.addEventListener("click", function () {
                        let novoItemNome = novoNomeEntrada.value.trim();
                        let novaQuantidade = novoQuantidadeEntrada.value.trim();

                        if (novoItemNome !== "" && novaQuantidade !== "") {
                            listaBloco.querySelector("span").textContent = `${novaQuantidade} - ${novoItemNome}`;
                            listaBloco.querySelector("span").style.display = "inline";
                            botaoEditar.style.display = "inline";
                            botaoCompletar.style.display = "inline";
                            itemNome = novoItemNome;
                            itemQuantidade = novaQuantidade;
                            novoNomeEntrada.remove();
                            novoQuantidadeEntrada.remove();		
                            botaoSalvar.remove();
                        };
                    });
                });

                botaoDeletar.addEventListener("click", function () {
                        listaBloco.remove();
                });
            };
        };
    }; // Funcionando ...

    function voltar (event) { // Volta para a parte com várias listas
        if (event.target.id.includes("voltar")){ // verifica o id voltar no evento de clicar
            const indice = event.target.dataset.index; // vincula o indice
            TESTE.div[indice].style.display = "none"; // retira o html associado a esse indice da tela
            document.querySelector(".conteudo").style.display = "block"; // Volta o html anterior.
        };
    };

    listaEntrada.addEventListener("keydown", function (event) { // função para tecla enter
        if (event.key === "Enter") {
            event.preventDefault();
            botaoAdicionarLista.focus();
        }
    });

    botaoAdicionarLista.addEventListener("keydown", function (event) { // função para tecla enter
        if (event.key === "Enter") {
            event.preventDefault();
            adicionarLista(event);
            listaEntrada.focus();
        };
    });

    document.addEventListener("click", adicionarLista);

    document.addEventListener("click", deletarLista);

    document.addEventListener("click", editarLista);

    document.addEventListener("click", botaoLista);

    document.addEventListener("click", voltar);

    document.addEventListener("click", adicionarItem);

});