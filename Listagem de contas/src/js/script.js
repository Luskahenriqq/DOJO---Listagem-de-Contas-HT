let contas = JSON.parse(localStorage.getItem('CONTAS')) ?? []

montarTabela()

function novaConta() {
  let id
  contas.length === 0 ? id = 1 : id = contas.length + 1;

  let contaNova = {
    Id: id,
    descricao: document.getElementById("descricao").value,
    valor: document.getElementById("valor").value,
    tipo: document.querySelector('input[name=tipo]:checked').value,
    data: document.getElementById("data").value,
    condicao: document.querySelector('input[name=condicao]:checked').value,
    categoria: document.getElementById("categoria").value
  }

  contas.push(contaNova);
  localStorage.setItem('CONTAS', JSON.stringify(contas))
  montarTabela();
}

function montarTabela() {

  let tabelaConta = document.getElementById("tabela_conta");
  if (tabelaConta === undefined) {
    tabelaConta = document.getElementById("tabela_conta");
  }

  if (contas.length > 0) {
    tabelaConta.innerHTML = "";
    for (let i = 0; i < contas.length; i++) {
      tabelaConta.innerHTML += `
             <tr id = "linha_da_conta">
                <td>${contas[i].Id}</td> 
                <td>${contas[i].descricao}</td> 
                <td>${contas[i].valor}</td> 
                <td>${contas[i].tipo}</td> 
                <td>${contas[i].data}</td> 
                <td>${contas[i].condicao}</td> 
                <td>${contas[i].categoria}</td> 

                <td>

                <button title="Editar conta" style ="cursor:pointer;" onclick = "editaConta()">Editar //colocar img </button> 
                <button title="Excluir conta" style ="cursor:pointer;" onclick = "excluiConta()">Exclui //colocar img </button> 
                </td> 

             </tr>
             `;

    }
  } else {
    tabelaConta.innerHTML = `
        <tr> Não existe usuário cadastrado no sistema! </tr>
        `;
  }
}

function editaConta() {
  let editaTabelaDeConta = document.getElementById("edita_tabela");
  let htmlJaMontado = false;

  if (editaTabelaDeConta.innerHTML.trim() != "") {
    htmlJaMontado = true
  }
  if (!htmlJaMontado && contas.length > 0) {

    editaTabelaDeConta.innerHTML += `

              <hr>
              <input type="text" placeholder="Descrição" />
              
              <input type="number" placeholder="Valor" />

              <input name="tipo" type="radio" />Receita
              <input name="tipo" type="radio" />Despesa

              <input type="date" />

              <input name="condicao" type="radio" />Sim
              <input name="condicao" type="radio" />Não

              <select name="selected" id="selected">
                  <option value="">Selecione a Categoria</option>
                  <option value="">Imposto</option>
                  <option value="">Transporte</option>
                  <option value="">Residência</option>
                  <option value="">Alimentação</option>
              </select>

                <button title="Salvar conta" style ="cursor:pointer;" onclick = "salvarContaEditada()"> Salvar </button>
      `;
  }
}


function salvarContaEditada(indice) {
  let editaDadosDaTabela = document.getElementById("tabela_conta");
  if (editaDadosDaTabela) {
    for (contas.splice(indice, 0, contas.length ); indice < contas.length; indice++) {
      
      editaDadosDaTabela.innerText = contas.push(indice);    
    }
    localStorage.setItem('CONTAS', JSON.stringify(contas));
    
  }
  }


function excluiConta(indice) {
  const desejaExcluirConta = confirm(`Tem certeza que deseja excluir essa conta da lista?`);
  if (desejaExcluirConta) {
    contas.splice(indice, 1);
    localStorage.setItem('CONTAS', JSON.stringify(contas));
    console.log();
    montarTabela();
  }

}