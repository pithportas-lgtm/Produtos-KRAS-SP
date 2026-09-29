var KRAS_CAMERAS = [
  { pasta: 'SP40', nome: 'SP40' },
  { pasta: 'SP40H', nome: 'SP40H' },
  { pasta: 'SP60', nome: 'SP60' },
  { pasta: 'SP60H', nome: 'SP60H' },
  { pasta: 'SP100H', nome: 'SP100H' },
  { pasta: 'SP120H', nome: 'SP120H' }
];

(function () {
  function paginaAtual() {
    var partes = window.location.pathname.split('/').filter(function (p) { return p !== ''; });
    if (partes.length && partes[partes.length - 1].indexOf('.') !== -1) {
      partes.pop();
    }
    return partes.length ? decodeURIComponent(partes[partes.length - 1]) : '';
  }

  function linkPara(pasta) {
    return '../' + encodeURIComponent(pasta) + '/index.html';
  }

  function montar() {
    var alvo = document.getElementById('kras-navegacao');
    if (!alvo) return;

    var atual = paginaAtual();
    var indice = -1;
    for (var i = 0; i < KRAS_CAMERAS.length; i++) {
      if (KRAS_CAMERAS[i].pasta === atual) { indice = i; break; }
    }
    if (indice === -1) return;

    var anteriores = KRAS_CAMERAS.slice(0, indice);
    var proximas = KRAS_CAMERAS.slice(indice + 1);
    var html = '<p>Navegue pelas câmeras</p>';

    for (var k = 0; k < anteriores.length; k++) {
      html += '<a class="btn btn-outline btn-lg" href="' + linkPara(anteriores[k].pasta) + '">← CÂMERA ' + anteriores[k].nome + '</a>';
    }
    for (var j = 0; j < proximas.length; j++) {
      html += '<a class="btn btn-primary btn-lg" href="' + linkPara(proximas[j].pasta) + '">IR PARA CÂMERA ' + proximas[j].nome + ' →</a>';
    }

    alvo.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();