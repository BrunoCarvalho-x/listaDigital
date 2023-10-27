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
        link: [],
    };
    let auxFuncao = 0;

    function adicionarLista(event) {
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
    }; // Funcionando ...

    function deletarLista(event) { // funçãoo que deleta a lista clicada
        if (event.target.classList.contains("deletarLista")) { // Verifica a classe do botão que foi clicado
            let indice = event.target.dataset.index; // Vincula a variavel criada ao indice da função clicada acima
            listasEmBloco[indice].remove(); // remove os botões criados da função adicionarLista()
            if (TESTE.div[indice] != '') { // Verifica se  
                (TESTE.div[indice]).remove();
                (TESTE.script[indice]).remove();
            };
        };
    }; // Funcionando ...

    function editarLista(event) {

        if (event.target.classList.contains("editarLista")){
            let indice = event.target.dataset.index;           
            listasEmBloco[indice].querySelector("span").style.display = "none";

            let novoNomeListaEntrada = document.createElement("input");
            novoNomeListaEntrada.type = "text";
            novoNomeListaEntrada.value = nomeLista[indice];          
            novoNomeListaEntrada.style.width = "120px"; 
            listasEmBloco[indice].insertBefore(novoNomeListaEntrada, botaoEditarLista[indice]);
            botaoEditarLista[indice].style.display = "none";

            let botaoSalvarLista = document.createElement("button");
            botaoSalvarLista.textContent = "Salvar";
            listasEmBloco[indice].insertBefore(botaoSalvarLista, botaoDeletarLista[indice]);
            novoNomeListaEntrada.focus();

            function SalvarLista() {
                let nomeListaTroca = novoNomeListaEntrada.value.trim();

                if (nomeListaTroca !== "") {
                    listasEmBloco[indice].querySelector("span button").textContent = `${nomeListaTroca}`;
                    listasEmBloco[indice].querySelector("span").style.display = "inline";
                    botaoEditarLista[indice].style.display = "inline";
                    nomeLista[indice] = nomeListaTroca;
                    novoNomeListaEntrada.remove();	
                    botaoSalvarLista.remove();
                }
            }; // Funcionando ...

            botaoSalvarLista.addEventListener("click", SalvarLista);
            
            botaoSalvarLista.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();  
                    SalvarLista();
                }  
            }); // Funcionando ...   

            novoNomeListaEntrada.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    botaoSalvarLista.focus();
                }
            }); // Funcionando ...
        };
    }; // Funcionando ...

    function botaoLista(event) {
        let indice = event.target.dataset.index;
        if (!TESTE.div[indice]) {
            if (event.target.classList.contains("asListas")){
                
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
                TESTE.script[indice] = document.createElement("script");
                //TESTE.link[indice] = document.createElement("link");
                //TESTE.link[indice].rel = "stylesheet";
                //TESTE.link[indice].href = "listaCompras.css";

                document.querySelector(".conteudo").style.display = "none";

                document.body.appendChild(TESTE.div[indice]); 
                document.body.appendChild(TESTE.script[indice]);
                // document.head.appendChild(TESTE.link[indice]);  

                botaoAdicionar[indice] = document.getElementById(`add_${indice}`);
                botaoAdicionar[indice].dataset.index = indice;
            };
        } else if(event.target.classList.contains("asListas")) {
            let h1 = document.getElementById(`h1_${indice}`);

            if (nomeLista[indice] !== h1.textContent) {
                h1.textContent = nomeLista[indice];
            };

            document.querySelector(".conteudo").style.display = "none";
            TESTE.div[indice].style.display = "block";
        };

    
    }; // Funcionando ...

    function adicionarItem(event) {
        if (event.target.classList.contains("add")){
            const indice = event.target.dataset.index;

            const itemEntrada = document.getElementById(`item_${indice}`);
            const quantEntrada = document.getElementById(`quantidade_${indice}`);
            const listaCompleta = document.getElementById(`lista_${indice}`);
            botaoAdicionar[indice] = document.getElementById(`add_${indice}`);

            let itemNome = itemEntrada.value.trim();
            let itemQuantidade = quantEntrada.value.trim();

            if (itemNome !== "" && itemQuantidade !== "") { // required (??)
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
            
                const botaoCompletar = listaBloco.querySelector(".completo");
                const botaoEditar = listaBloco.querySelector(".editar");
                const botaoDeletar = listaBloco.querySelector(".deletar");
            
                botaoCompletar.addEventListener("click", function () {
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

    function voltar (event) {
        if (event.target.id.includes("voltar")){
            const indice = event.target.dataset.index;
            TESTE.div[indice].style.display = "none";
            document.querySelector(".conteudo").style.display = "block";
        };
    }; // Funcionando ...

    listaEntrada.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            botaoAdicionarLista.focus();
        }
    }); // Funcionando ...

    botaoAdicionarLista.addEventListener("keydown", function (event) {  
        if (event.key === "Enter") {
            event.preventDefault();
            adicionarLista(event);
            listaEntrada.focus();
        };
    }); // Funcionando ...

    document.addEventListener("click", adicionarLista);

    document.addEventListener("click", deletarLista);

    document.addEventListener("click", editarLista);

    document.addEventListener("click", botaoLista);

    document.addEventListener("click", voltar);

    document.addEventListener("click", adicionarItem);

});