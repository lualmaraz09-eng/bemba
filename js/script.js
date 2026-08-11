// --- 1. MENÚ HAMBURGUESA ---
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('activo');
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('activo');
        });
    });
}


// --- 2. LÓGICA DEL CARRITO / PEDIDO POR CHECKBOXES ---
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check-pedido');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', actualizarBarraPedido);
    });
});

function obtenerProductosSeleccionados() {
    const checkboxes = document.querySelectorAll('.check-pedido:checked');
    let seleccionados = [];
    let total = 0;

    checkboxes.forEach(cb => {
        const nombre = cb.getAttribute('data-nombre');
        const precio = parseInt(cb.getAttribute('data-precio')) || 0;
        seleccionados.push({ nombre, precio });
        total += precio;
    });

    return { seleccionados, total };
}

function actualizarBarraPedido() {
    const { seleccionados, total } = obtenerProductosSeleccionados();
    const barra = document.getElementById('barra-pedido');
    const contador = document.getElementById('contador-pedido');

    if (!barra || !contador) return;

    const cantidad = seleccionados.length;

    if (cantidad > 0) {
        barra.classList.add('activa');
        barra.style.display = 'flex';
        
        const totalFormateado = total.toLocaleString('es-AR');
        contador.textContent = `${cantidad} producto${cantidad > 1 ? 's' : ''} ($${totalFormateado})`;
    } else {
        barra.classList.remove('activa');
        barra.style.display = 'none';
    }
}

function enviarPedido() {
    const { seleccionados, total } = obtenerProductosSeleccionados();

    if (seleccionados.length === 0) {
        alert('Por favor, seleccioná al menos un producto para enviar tu pedido.');
        return;
    }

    let mensaje = "¡Hola! Quisiera hacer el siguiente pedido en Bemba:\n\n";

    seleccionados.forEach(p => {
        const precioFormateado = p.precio.toLocaleString('es-AR');
        mensaje += `• ${p.nombre} ($${precioFormateado})\n`;
    });

    const totalFormateado = total.toLocaleString('es-AR');
    mensaje += `\n*Total estimado:* $${totalFormateado}\n\n`;
    mensaje += "¿Tienen stock disponible para coordinar la entrega?";

    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroWhatsApp = "5491164842490";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    window.open(url, '_blank');
}


// --- 3. QUIZ ---
// Quiz: ¿Cuál es tu yuyito ideal?
const preguntasYuyo = [
    {
        texto: "¿Cómo te gusta relajarte después de un día largo?",
        opciones: [
            { texto: "Con algo suave, digestivo", valor: "peperina" },
            { texto: "Con un aroma cítrico y calmo", valor: "cedron" },
            { texto: "Con algo floral y delicado", valor: "jazmin" }
        ]
    },
    {
        texto: "¿Cuál es tu momento ideal para el mate?",
        opciones: [
            { texto: "Después de comer", valor: "peperina" },
            { texto: "A la tardecita, tranquila", valor: "cedron" },
            { texto: "Antes de dormir", valor: "jazmin" }
        ]
    },
    {
        texto: "Elegí un aroma",
        opciones: [
            { texto: "Fresco y mentolado", valor: "peperina" },
            { texto: "Cítrico suave", valor: "cedron" },
            { texto: "Floral y delicado", valor: "jazmin" }
        ]
    }
];

const resultadosYuyo = {
    peperina: {
        titulo: "¡Sos Peperina! 🌿",
        desc: "Fresca, directa y con los pies en la tierra. Ideal para después de comer, te sienta bien lo simple y efectivo."
    },
    cedron: {
        titulo: "¡Sos Cedrón! 🍋",
        desc: "Calma, aroma suave y buena onda para la tardecita. Buscás momentos tranquilos para bajar un cambio."
    },
    jazmin: {
        titulo: "¡Sos Jazmín! 🌸",
        desc: "Sensible, floral y con ganas de relajar. Disfrutás los detalles delicados antes de terminar el día."
    }
};

let preguntaYuyoActual = 0;
let puntosYuyo = { peperina: 0, cedron: 0, jazmin: 0 };

function mostrarPreguntaYuyo() {
    const pregunta = preguntasYuyo[preguntaYuyoActual];
    document.getElementById('quiz-pregunta').textContent = pregunta.texto;

    const contenedorOpciones = document.getElementById('quiz-opciones-yuyo');
    contenedorOpciones.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.textContent = opcion.texto;
        boton.onclick = () => responderYuyo(opcion.valor);
        contenedorOpciones.appendChild(boton);
    });

    document.getElementById('quiz-card').classList.remove('mostrar-final');
}

function responderYuyo(valor) {
    puntosYuyo[valor]++;

    if (preguntaYuyoActual === preguntasYuyo.length - 1) {
        mostrarResultadoYuyo();
    } else {
        preguntaYuyoActual++;
        mostrarPreguntaYuyo();
    }
}

function mostrarResultadoYuyo() {
    let ganador = "peperina";
    let max = puntosYuyo.peperina;

    if (puntosYuyo.cedron > max) {
        ganador = "cedron";
        max = puntosYuyo.cedron;
    }
    if (puntosYuyo.jazmin > max) {
        ganador = "jazmin";
        max = puntosYuyo.jazmin;
    }

    document.getElementById('quiz-final-texto').textContent = resultadosYuyo[ganador].titulo;
    document.getElementById('quiz-final-desc').textContent = resultadosYuyo[ganador].desc;
    document.getElementById('quiz-card').classList.add('mostrar-final');
}

function reiniciarQuizYuyo() {
    preguntaYuyoActual = 0;
    puntosYuyo = { peperina: 0, cedron: 0, jazmin: 0 };
    mostrarPreguntaYuyo();
}

mostrarPreguntaYuyo();

// --- 4. ANIMACIÓN AL HACER SCROLL ---
const elementosAnimados = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

elementosAnimados.forEach(el => observer.observe(el));


// --- 5. CARRUSEL DEL CATÁLOGO ---
function moverCarrusel(categoria, direccion) {
    const track = document.getElementById('carrusel-' + categoria);
    if (!track) return;
    const distancia = 260; // ancho de tarjeta + gap
    track.scrollBy({ left: distancia * direccion, behavior: 'smooth' });
}