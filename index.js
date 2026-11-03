// ========== MENU MOBILE ==========
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('ativo');
  const icone = menuToggle.querySelector('i');
  icone.classList.toggle('fa-bars');
  icone.classList.toggle('fa-times');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('ativo');
    const icone = menuToggle.querySelector('i');
    icone.classList.add('fa-bars');
    icone.classList.remove('fa-times');
  });
});

// ========== EFEITO DE DIGITAÇÃO ==========
const textoDigitado = document.getElementById('texto-digitado');
const frases = [
  'Desenvolvedor Front-End',
  'UI/UX Enthusiast',
  'Criador de Experiências',
  'Apaixonado por Código'
];

let fraseIndex = 0;
let charIndex = 0;
let apagando = false;

function digitar() {
  const fraseAtual = frases[fraseIndex];

  if (!apagando) {
    textoDigitado.textContent = fraseAtual.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === fraseAtual.length) {
      apagando = true;
      setTimeout(digitar, 2000);
      return;
    }
  } else {
    textoDigitado.textContent = fraseAtual.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      apagando = false;
      fraseIndex = (fraseIndex + 1) % frases.length;
    }
  }

  setTimeout(digitar, apagando ? 50 : 100);
}

digitar();

// ========== ANIMAÇÃO DAS BARRAS DE HABILIDADE ==========
const skillBars = document.querySelectorAll('.skill-progress');

const observerSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const barra = entry.target;
      const progresso = barra.dataset.progress;
      barra.style.width = progresso + '%';
      observerSkills.unobserve(barra);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(barra => observerSkills.observe(barra));

// ========== ANIMAÇÃO DE REVELAÇÃO AO SCROLL ==========
const elementosReveal = document.querySelectorAll(
  '.skill-card, .projeto-card, .info-item, .contato-form'
);

elementosReveal.forEach(el => el.classList.add('reveal'));

const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
      observerReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

elementosReveal.forEach(el => observerReveal.observe(el));

// ========== FORMULÁRIO DE CONTATO ==========
const formContato = document.getElementById('form-contato');
const formFeedback = document.getElementById('form-feedback');

formContato.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    formFeedback.textContent = 'Por favor, preencha todos os campos.';
    formFeedback.className = 'form-feedback erro';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formFeedback.textContent = 'Por favor, insira um email válido.';
    formFeedback.className = 'form-feedback erro';
    return;
  }

  formFeedback.textContent = 'Enviando mensagem...';
  formFeedback.className = 'form-feedback';

  setTimeout(() => {
    formFeedback.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
    formFeedback.className = 'form-feedback sucesso';
    formContato.reset();

    setTimeout(() => {
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';
    }, 5000);
  }, 1200);
});

// ========== ANO ATUAL NO FOOTER ==========
document.getElementById('ano-atual').textContent = new Date().getFullYear();

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});