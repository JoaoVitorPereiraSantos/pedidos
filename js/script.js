class Produto{
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        this.quantidade = null;
    }

    salvar(){
        let produto = this.lerDados();

        if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            } else{
                this.atualizar(this.editId, produto);
            }
        }

       this.listaTabela();
       this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_acoes = tr.insertCell();
            let imgEdit = document.createElement('img');
            let imgDelet = document.createElement('img');

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProdutos;
            td_valor.innerText = this.arrayProdutos[i].preco;
            td_quantidade.innerText = this.arrayProdutos[i].quantidade;
            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelet)

            td_id.classList.add('center');
            td_valor.classList.add('center');
            td_quantidade.classList.add('center');
            td_total.classList.add('center');
            
            imgEdit.src = './img/edit.png';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");
                imgDelet.src = './img/delet.png';
                imgDelet.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");
                td_acoes.classList.add('center');
         
        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        produto.quantidade = parseFloat(produto.quantidade)
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for(let i = 0; i< this.arrayProdutos.length; i++){
            if(this.arrayProdutos [i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco; 
                this.arrayProdutos[i].quantidade = produto.quantidade;  
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProdutos;
        document.getElementById('preco').value = dados.preco;
        document.getElementById('quantidade').value = dados.quantidade;
        document.getElementById('btn1').innerText = 'Atualizar' ;
    }


    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProdutos = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;
        produto.quantidade = document.getElementById('quantidade').value;


        return produto;
    }

    validaCampos(produto){
        let msg = '';

        if(produto.nomeProdutos ==''){
            msg += '- Informe o Nome do Produto \n';
        }

        if(produto.preco ==''){
            msg += '- Informe o Preço do Produto \n';
        }

        if(produto.quantidade ==''){
            msg += '- Informe a quantidade do produto \n';
        }

        if(msg != ''){
            alert(msg);
            return false
        }

        return true
    }

    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id){
        
        if(confirm('Desesa realmente deletar o Item: ' +id)) {
            let tbody = document.getElementById('tbody');
            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i);
                }
    
            }

            console.log(this.arrayProdutos);
        }

    }
}

var produto = new Produto();