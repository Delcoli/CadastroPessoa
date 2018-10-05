var webCam = null;
var ipcRenderer = require('electron').ipcRenderer;

//Função para iniciar a camera
function iniciarCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        webCam = document.getElementById('video');
        webCam.src = URL.createObjectURL(stream);

    }).catch(function () {
      alert('Erro ao iniciar a WebCam');
    });
}

//Definindo uma função para quando o usuário clicar no botão de tirar foto
document.getElementById("tirar-foto").addEventListener("click", function () {
  canvas.getContext("2d").drawImage(webCam,0,0,400,300);
  ipcRenderer.send('enviar-foto',canvas.toDataURL()); //Chamando o ouvinte do Main e enviando a imagem
});

iniciarCamera();
