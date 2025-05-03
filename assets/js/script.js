const trevo = document.getElementById("trevo");
const roleta = document.getElementById("roleta");
const tentativasTexto = document.getElementById("tentativas");

let tentativas = 100; // Número de tentativas disponíveis

// Mapeia os prêmios para ângulos
const premios = {
  "Tente novamente": 0,
  "CARRO - KWID 0KM": 60,
  "R$ 5 MIL": 120,
  "R$ 1,5 MIL": 180,
  "R$ 10 em créditos": 240,
  "R$ 1.000": 300,
};

function girarRoleta() {
  if (tentativas <= 0) return;

  tentativas--;

  let premio;
  const chance = Math.random();

  if (chance < 0.98) {
    premio = "Tente novamente";
  } else {
    // Escolhe aleatoriamente um dos outros prêmios
    const outros = Object.keys(premios).filter(p => p !== "Tente novamente");
    const indice = Math.floor(Math.random() * outros.length);
    premio = outros[indice];
  }

  const baseAngle = premios[premio];
  const voltas = 5;
  const rotaçãoFinal = 360 * voltas + baseAngle;

  // Anima a rotação
  roleta.style.transition = "transform 4s ease-out";
  roleta.style.transform = `rotate(${rotaçãoFinal}deg)`;

  // Atualiza o texto de tentativas
  tentativasTexto.textContent = `${tentativas} tentativa${tentativas !== 1 ? "s" : ""} restante${tentativas !== 1 ? "s" : ""}`;
}

// Reseta a rotação para próximas execuções (evita bugs de rotação acumulada)
roleta.addEventListener("transitionend", () => {
  const atual = roleta.style.transform;
  const angulo = atual.match(/rotate\((\d+)deg\)/);
  if (angulo) {
    const grauFinal = parseInt(angulo[1]) % 360;
    roleta.style.transition = "none";
    roleta.style.transform = `rotate(${grauFinal}deg)`;
  }
});

trevo.addEventListener("click", girarRoleta);
