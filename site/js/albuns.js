document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("filtros");
  const campoBusca = document.getElementById("busca");
  const campoOrdem = document.getElementById("ordem");
  const grade = document.getElementById("grade");
  const resultado = document.getElementById("resultado");

  const cartoes = Array.from(grade.querySelectorAll(".album"));

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function ordenar(lista, modo) {
    const copia = [...lista];
    if (modo === "recentes") {
      copia.sort((a, b) => b.dataset.ano - a.dataset.ano);
    } else if (modo === "az") {
      copia.sort((a, b) => a.dataset.nome.localeCompare(b.dataset.nome, "pt-BR"));
    } else {
      copia.sort((a, b) => a.dataset.ano - b.dataset.ano);
    }
    return copia;
  }

  function aplicar() {
    const termo = normalizar(campoBusca.value.trim());
    const modo = campoOrdem.value;

    const ordenados = ordenar(cartoes, modo);
    ordenados.forEach((cartao) => grade.appendChild(cartao));

    let visiveis = 0;
    cartoes.forEach((cartao) => {
      const nome = normalizar(cartao.dataset.nome);
      const bate = nome.includes(termo);
      cartao.classList.toggle("oculto", !bate);
      if (bate) visiveis++;
    });

    if (termo === "") {
      resultado.textContent = `${cartoes.length} álbuns encontrados.`;
    } else {
      resultado.textContent = `${visiveis} álbum(ns) encontrados para "${campoBusca.value.trim()}".`;
    }
  }

  campoBusca.addEventListener("input", aplicar);
  campoOrdem.addEventListener("change", aplicar);

  form.addEventListener("reset", () => {
    setTimeout(aplicar, 0);
  });

  aplicar();
});
