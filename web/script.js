const API = "http://localhost:3000";

const quartos = [];
let quartoAtual = null;

carregarQuartos();


function carregarQuartos() {

    fetch(API + "/quartos/listar")

        .then(res => res.json())

        .then(data => {

            quartos.length = 0;
            quartos.push(...data);

            listarQuartos();

        })

        .catch(() => alert("Erro ao conectar com a API"));
}

function listarQuartos() {

    const container = document.querySelector("main");

    container.innerHTML = "";

    quartos.forEach(quarto => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>Quarto ${quarto.numero}</h3>

            <p><b>Tipo:</b> ${quarto.tipo}</p>

            <div class="botoes">

                <button class="btnReservas"
                    onclick="abrirReservas(${quarto.id})">
                    Ver Reservas
                </button>

                <button class="btnExcluir"
                    onclick="excluirQuarto(${quarto.id})">
                    Excluir
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


document.querySelector("#formQuarto")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const novoQuarto = {
        numero: numero.value,
        tipo: tipo.value
    };

    fetch(API + "/quartos/cadastrar", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novoQuarto)
    })

    .then(res => res.json())

    .then(() => {

        alert("Quarto cadastrado!");

        formQuarto.reset();

        carregarQuartos();
    })

    .catch(() => alert("Erro ao cadastrar quarto"));
});


function excluirQuarto(id) {

    if (!confirm("Deseja excluir este quarto?")) return;

    fetch(API + "/quartos/excluir/" + id, {
        method: "DELETE"
    })

    .then(() => {

        alert("Quarto excluído!");

        carregarQuartos();
    })

    .catch(() => alert("Erro ao excluir quarto"));
}


function abrirReservas(id) {

    fetch(API + "/quartos/buscar/" + id)

        .then(res => res.json())

        .then(quarto => {

            quartoAtual = quarto;

            tituloQuarto.innerHTML = "Quarto " + quarto.numero;

            infoQuarto.innerHTML = "Tipo: " + quarto.tipo;

            listarReservas(quarto.reservas || []);

        })

        .catch(() => alert("Erro ao carregar reservas"));
}

function listarReservas(reservas) {

    listaReservas.innerHTML = "";

    reservas.forEach(reserva => {

        listaReservas.innerHTML += `
            <tr>

                <td>${reserva.id}</td>
                <td>${reserva.hospede}</td>

                <td>${new Date(reserva.dataEntrada).toLocaleDateString("pt-BR")}</td>

                <td>${new Date(reserva.dataSaida).toLocaleDateString("pt-BR")}</td>

                <td>
                    <button class="btnExcluir"
                        onclick="excluirReserva(${reserva.id})">
                        Excluir
                    </button>
                </td>

            </tr>
        `;
    });
}


document.querySelector("#formReserva")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const novaReserva = {
        hospede: hospede.value,
        dataEntrada: dataEntrada.value,
        dataSaida: dataSaida.value,
        quartoId: quartoAtual.id
    };

    fetch(API + "/reservas/cadastrar", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novaReserva)
    })

    .then(res => {

        if (!res.ok) throw new Error();

        return res.json();
    })

    .then(() => {

        alert("Reserva cadastrada!");

        formReserva.reset();

        abrirReservas(quartoAtual.id);
    })

    .catch(() => alert("Erro ao cadastrar reserva"));
});


function excluirReserva(id) {

    if (!confirm("Deseja excluir esta reserva?")) return;

    fetch(API + "/reservas/excluir/" + id, {
        method: "DELETE"
    })

    .then(() => {

        alert("Reserva excluída!");

        abrirReservas(quartoAtual.id);
    })

    .catch(() => alert("Erro ao excluir reserva"));
}