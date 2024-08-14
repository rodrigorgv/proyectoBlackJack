//sintaxis de patrón modulo

//--esta es una función tipo flecha que se autoinvoca
(() => {
    'use strict' //esto le dice a js que sea estricto validando el codigo


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K']
    let puntosJugador = 0
    let puntosComputadora = 0
    const puntosHtml = document.querySelectorAll('small')
    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')


    //referencias dle html
    const btnPedir = document.querySelector('#btnPedir')
    const btnDetener = document.querySelector('#btnDetener')
    const btnNuevo = document.querySelector('#btnNuevo')


    //esta funcion crea un nuevo deck
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        //descargamos biblioteca de underscore para utilizar la función suffle
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();


    //esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }

        let carta = deck.pop();
        return carta;
    }
    pedirCarta();

    //pedirCarta();
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    }

    const valor = valorCarta(pedirCarta());

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;

            //<!-- <img class="carta" src="assets/cartas/2C.png" alt="" srcset=""> -->    
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos) <= 21);
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('nadie gana');
            } else if (puntosMinimos > 21) {
                alert('computadora gana');
            } else if (puntosComputadora > 21) {
                alert('jugador gana');
            } else {
                alert('computadora gana');
            }
        }, 100);
    }


    //eventos
    //escuchamos un evento
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;

        //<!-- <img class="carta" src="assets/cartas/2C.png" alt="" srcset=""> -->    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            //alert('perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            //alert('Ganaste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear
        deck = [];
        deck = crearDeck();
        puntosComputadora = 0;
        puntosJugador = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';
    });
})();

