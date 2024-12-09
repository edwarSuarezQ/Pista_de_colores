const pista = document.getElementById('pista-de-baile');
const titulo = document.getElementById('fiesta-titulo');
const agregarColorBtn = document.getElementById('agregar-color');
const reiniciarBtn = document.getElementById('reiniciar');
const votosDiv = document.getElementById('votos');

let votos = {};
let inactividadTimer;
let coloresPorFila = 4;

const listaColores = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'brown', 'teal', 'lime', 'cyan', 'magenta', 'indigo', 'violet', 'gold', 'silver', 'gray', 'black'];	


const sonidos = [
  './assets/sounds/applause.mp3',
  './assets/sounds/campana.mp3',
];


function reproducirSonido() {
  const sonidoAleatorio = sonidos[Math.floor(Math.random() * sonidos.length)];
  const audio = new Audio(sonidoAleatorio);
  audio.play();
}

function agregarColor(color = null) {
 
  const filas = pista.getElementsByClassName('fila');
  let ultimaFila = filas[filas.length - 1];

  
  if (!ultimaFila || ultimaFila.children.length >= coloresPorFila) {
    ultimaFila = document.createElement('div');
    ultimaFila.classList.add('fila');
    pista.appendChild(ultimaFila);
  }

  const nuevoColor = document.createElement('div');
  const colorSeleccionado = color || listaColores[Math.floor(Math.random() * listaColores.length)];
  nuevoColor.classList.add('color');
  nuevoColor.style.backgroundColor = colorSeleccionado;

 
  const contador = document.createElement('span');
  contador.classList.add('contador');
  contador.textContent = '0'; 
  nuevoColor.appendChild(contador);

  // Manejar clics en el color
  nuevoColor.addEventListener('click', () => {
    titulo.style.animation = 'none'; 
    titulo.style.color = colorSeleccionado; 
    reproducirSonido(); 
    registrarVoto(colorSeleccionado);
    reiniciarInactividad();

    
    const clicksActuales = parseInt(contador.textContent);
    contador.textContent = clicksActuales + 1;
  });

  ultimaFila.appendChild(nuevoColor);
}

// Función para reiniciar la pista
function reiniciarPista() {
  pista.innerHTML = '';
  titulo.style.color = ''; 
  titulo.style.animation = 'arcoiris 3s infinite';
  votos = {};
  actualizarVotos();
  clearTimeout(inactividadTimer);

  
  agregarColoresIniciales();
}


function registrarVoto(color) {
  votos[color] = (votos[color] || 0) + 1;
  actualizarVotos();
}

// Actualiza el contador de votos
function actualizarVotos() {
  const colorMasPopular = Object.keys(votos).reduce((a, b) => (votos[a] > votos[b] ? a : b), null);
  votosDiv.innerHTML = colorMasPopular
    ? `Color más popular: <span style="color:${colorMasPopular}">${colorMasPopular}</span> con ${votos[colorMasPopular]} votos.`
    : 'Aún no hay votos.';

}

function reiniciarInactividad() {
  clearTimeout(inactividadTimer);
  inactividadTimer = setTimeout(() => {
    alert('¡Se acabó el tiempo! Reiniciando la fiesta.');
    reiniciarPista();
  }, 10000); 
}


function agregarColoresIniciales() {
  const coloresIniciales = ['red', 'blue', 'yellow', 'green'];
  coloresIniciales.forEach(color => agregarColor(color));
}


agregarColorBtn.addEventListener('click', () => {
  agregarColor();
  reiniciarInactividad();
});

reiniciarBtn.addEventListener('click', reiniciarPista);


agregarColoresIniciales();
