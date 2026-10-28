// ========== DADOS DOS PRODUTOS ==========
const produtos = [
  {
    id: 1,
    nome: "Smartphone Galaxy X",
    descricao: "Tela 6.5\", 128GB, câmera 48MP",
    preco: 1899.90,
    icone: "fa-mobile-alt"
  },
  {
    id: 2,
    nome: "Notebook Ultra",
    descricao: "Intel i7, 16GB RAM, SSD 512GB",
    preco: 4599.00,
    icone: "fa-laptop"
  },
  {
    id: 3,
    nome: "Fone Bluetooth",
    descricao: "Cancelamento de ruído, 30h bateria",
    preco: 349.90,
    icone: "fa-headphones"
  },
  {
    id: 4,
    nome: "Smart TV 55\"",
    descricao: "4K UHD, HDR10+, Android TV",
    preco: 2799.00,
    icone: "fa-tv"
  },
  {
    id: 5,
    nome: "Mouse Gamer RGB",
    descricao: "16000 DPI, 7 botões programáveis",
    preco: 159.90,
    icone: "fa-mouse"
  },
  {
    id: 6,
    nome: "Teclado Mecânico",
    descricao: "Switch Blue, ABNT2, iluminação RGB",
    preco: 289.90,
    icone: "fa-keyboard"
  },
  {
    id: 7,
    nome: "Smartwatch Fit",
    descricao: "Monitor cardíaco, GPS, 5ATM",
    preco: 499.00,
    icone: "fa-clock"
  },
  {
    id: 8,
    nome: "Tablet Pro",
    descricao: "10.5\", 128GB, caneta inclusa",
    preco: 2199.00,
    icone: "fa-tablet-alt"
  }
];

// ========== ESTADO DO CARRINHO ==========
let carrinho = [];

// ========== ELEMENTOS DOM ==========
const produtosGrid = document.getElementById('produtos-grid');
const carrinhoPainel = document.getElementById('carrinho-painel');
const carrinhoItens = document.getElementById('carrinho-itens');
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const carrinhoBtn = document.getElementById('carrinho-btn');
const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
const overlay = document.getElementById('overlay');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

// ========== FUNÇÕES ==========

// Formatar preço para R$
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderizar produtos na vitrine
function renderizarProdutos() {
  produtosGrid.innerHTML = '';
  
  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
      <div class="produto-imagem">
        <i class="fas ${produto.icone}"></i>
      </div>
      <div class="produto-info">
        <h3 class="produto-nome">${produto.nome}</h3>
        <p class="produto-descricao">${produto.descricao}</p>
        <p class="produto-preco">${formatarPreco(produto.preco)}</p>
        <button class="btn-adicionar" data-id="${produto.id}">
          <i class="fas fa-cart-plus"></i> Adicionar
        </button>
      </div>
    `;
    produtosGrid.appendChild(card);
  });
  
  // Adicionar evento aos botões de adicionar
  document.querySelectorAll('.btn-adicionar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.dataset.id);
      adicionarAoCarrinho(id);
    });
  });
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  const itemExistente = carrinho.find(item => item.id === id);
  
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1
    });
  }
  
  atualizarCarrinho();
}

// Remover ou alterar quantidade
function alterarQuantidade(id, delta) {
  const item = carrinho.find(item => item.id === id);
  if (!item) return;
  
  item.quantidade += delta;
  
  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(item => item.id !== id);
  }
  
  atualizarCarrinho();
}

// Remover item completamente
function removerItem(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

// Atualizar interface do carrinho
function atualizarCarrinho() {
  // Atualizar contador
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  contadorCarrinho.textContent = totalItens;
  
  // Atualizar lista de itens
  if (carrinho.length === 0) {
    carrinhoItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
  } else {
    carrinhoItens.innerHTML = '';
    
    carrinho.forEach(item => {
      const div = document.createElement('div');
      div.className = 'carrinho-item';
      div.innerHTML = `
        <div class="carrinho-item-imagem">
          <i class="fas ${item.icone}"></i>
        </div>
        <div class="carrinho-item-info">
          <div class="carrinho-item-nome">${item.nome}</div>
          <div class="carrinho-item-preco">${formatarPreco(item.preco)}</div>
          <div class="carrinho-item-controles">
            <button class="btn-menos" data-id="${item.id}"><i class="fas fa-minus"></i></button>
            <span class="carrinho-item-quantidade">${item.quantidade}</span>
            <button class="btn-mais" data-id="${item.id}"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="remover-item" data-id="${item.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;
      carrinhoItens.appendChild(div);
    });
    
    // Adicionar eventos aos botões de controle
    document.querySelectorAll('.btn-menos').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        alterarQuantidade(id, -1);
      });
    });
    
    document.querySelectorAll('.btn-mais').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        alterarQuantidade(id, 1);
      });
    });
    
    document.querySelectorAll('.remover-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        removerItem(id);
      });
    });
  }
  
  // Calcular e atualizar total
  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  totalCarrinho.textContent = formatarPreco(total);
}

// Abrir carrinho
function abrirCarrinho() {
  carrinhoPainel.classList.add('aberto');
  overlay.classList.add('ativo');
}

// Fechar carrinho
function fecharCarrinho() {
  carrinhoPainel.classList.remove('aberto');
  overlay.classList.remove('ativo');
}

// Finalizar compra (simulação)
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio. Adicione produtos antes de finalizar.');
    return;
  }
  
  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const itensTexto = carrinho.map(item => `${item.quantidade}x ${item.nome}`).join('\n');
  
  alert(`Compra finalizada com sucesso!\n\nItens:\n${itensTexto}\n\nTotal: ${formatarPreco(total)}\n\nObrigado por comprar na LojaExpress!`);
  
  // Limpar carrinho após "compra"
  carrinho = [];
  atualizarCarrinho();
  fecharCarrinho();
}

// ========== EVENTOS ==========

// Abrir/fechar carrinho
carrinhoBtn.addEventListener('click', abrirCarrinho);
fecharCarrinhoBtn.addEventListener('click', fecharCarrinho);
overlay.addEventListener('click', fecharCarrinho);

// Finalizar compra
finalizarCompraBtn.addEventListener('click', finalizarCompra);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && carrinhoPainel.classList.contains('aberto')) {
    fecharCarrinho();
  }
});

// ========== INICIALIZAÇÃO ==========
renderizarProdutos();
atualizarCarrinho();