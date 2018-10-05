const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getConfigInstalador()
    .then(createWindowsInstaller)
    .catch(function (error) {
        console.error(error.message || error);
        process.exit(1);
    });

function getConfigInstalador() {
    console.log('Criando instalador do windows');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'build');

    return Promise.resolve({
        appDirectory: path.join(outPath, 'CadastroPessoa-win32-ia32/'),
        authors: 'Emerson',
        description: "Aplicativo de cadastro de pessoas com integração com a WebCam",
        noMsi: true,
        outputDirectory: path.join(outPath, 'instalador-windows'),
        exe: 'CadastroPessoa.exe',
        setupExe: 'CadastroPessoaSetup.exe'
		})
}

