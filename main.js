const electron = require('electron');
const app = electron.app;  // Módulo que irá controlar a vida útil da aplicação
const BrowserWindow = electron.BrowserWindow;  // Módulo para criar as telas nativa
const ipcMain = electron.ipcMain;  // Módulo para controlar a comunicação IPCMain

// Referência global da tela principal da aplicação (página index.html).
let telaIndex = null;

// Referência global da tela que será usada na aplicação (página camera.html).
let telaCamera = null;

// Quando todas as telas forem fechadas, finaliza a execução da aplicação.
app.on('window-all-closed', function () {
    // No MAC, é comum a aplicação ficar na barra de menus, assim fica ativa até que o usuário feche com CMD + Q
    if (process.platform != 'darwin') app.quit();
});

// Essa função é chamada quando o Electron acabar o carregamento e está pronto para criar as telas.
app.on('ready', function () {
    criarTelaIndex();
});

//Comunicação ipcMain - Fica ouvindo quando o evento 'abrir-camera' é disparado
ipcMain.on('abrir-camera', function (event, arg) {
    criarTelaCamera();
});

//Comunicação ipcMain - Fica ouvindo quando o evento 'enviar-foto' é disparado
ipcMain.on('enviar-foto', function (event, arg) {
    //Dispara o evento 'receber-foto' para a tela index, aonde tem um ouvinte aguardando
    if (telaIndex != null) telaIndex.webContents.send('receber-foto', arg);
});

//Função para criar a tela Index da aplicação
function criarTelaIndex() {
    // Criando a tela nativa da página index
    telaIndex = new BrowserWindow({
        minWidth: 1270,       //Indicativo da largura minima da tela
        minHeight: 650,       //Indicativo da altura minima da tela
        width: 1270,          //Indicativo da largura da tela
        height: 650,          //Indicativo da altura da tela
        center: true,         //Indicativo se a tela será centralizada
        resizable: true,      //Indicativo se a tela é redimensionável
        movable: true,        //Indicativo se a tela pode mover
        frame: true,          //Indicativo se é para criar um frame
        transparent: false,   //Indicativo se a tela será transparente
        show: false,          //Indicativo se é para mostrar a tela ou se será forçada a exibição
        autoHideMenuBar: true //Ocultar automaticamente a barra de Menu nativa
    });

    //Na criação da tela index, foi utilizado algumas propriedades para mostrar como é a utilização.
    //Todas as propriedades são opcionais, e se não utilizadas, serão atribuidas os valores padrões
    //de acordo com a documentação do electron. Link da documentação: https://electronjs.org/docs/api/browser-window

    // Carregando a página
    telaIndex.loadURL('file://' + __dirname + '/app/index.html');

    //Setando o menu como vazio
    //telaIndex.setMenu(null);

    // Comando para abrir a parte de desenvolvimento do Chromium
    //telaIndex.webContents.openDevTools();

    //Função quando a tela está pronta para ser exibida
    telaIndex.once('ready-to-show', function () {
        telaIndex.show()
    });

    // Função quando a tela é fechada
    telaIndex.on('closed', function () {
        //Realizar a remoção da referência da tela criada
        telaIndex = null;
    });
}

//Função para criar a tela da Camera da aplicação
function criarTelaCamera() {
    // Criando a tela nativa da página index
    telaCamera = new BrowserWindow({
        width: 406,            //Indicativo da largura da tela
        height: 334,           //Indicativo da altura da tela
        center: false,         //Indicativo se a tela será centralizada
        resizable: false,      //Indicativo se a tela é redimensionável
        movable: true,         //Indicativo se a tela pode mover
        frame: true,           //Indicativo se é para criar um frame
        transparent: false,    //Indicativo se a tela será transparente
        show: false,           //Indicativo se é para mostrar a tela ou se será forçada a exibição
        autoHideMenuBar: true, //Ocultar automaticamente a barra de Menu nativa
        parent: telaIndex,     //Definido quem é a tela 'PAI'
        modal: true            //Define que é um modal, ou seja bloqueia a tela 'PAI'
    });

    //Na criação da tela index, foi utilizado algumas propriedades para mostrar como é a utilização.
    //Todas as propriedades são opcionais, e se não utilizadas, serão atribuidas os valores padrões
    //de acordo com a documentação do electron. Link da documentação: https://electronjs.org/docs/api/browser-window

    // Carregando a página
    telaCamera.loadURL('file://' + __dirname + '/app/camera.html');

    //Setando o menu como vazio
    telaCamera.setMenu(null);

    //Comando para abrir a parte de desenvolvimento do Chromium
    //telaCamera.webContents.openDevTools();

    //Função quando a tela está pronta para ser exibida
    telaCamera.once('ready-to-show', function () {
        telaCamera.show()
    });

    // Função quando a tela é fechada
    telaCamera.on('closed', function () {
        //Realizar a remoção da referência da tela criada
        telaCamera = null;
    });
}
