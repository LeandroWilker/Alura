function irParaSecao(id) {
  const destino = document.getElementById(id);
  const input = document.getElementById("input-list");

  if (destino) {
    destino.scrollIntoView({ behavior: "smooth" });
    input.value = ""; // Limpa o campo após rolar
  }
}

