//Criando na variável global uma referência da instância do ipcRenderer.
window.ipcRenderer = require('electron').ipcRenderer;

//Criando na variável global uma referência da instância do modulo angular, e inserindo as dependências.
window.app = angular.module('cadPessoa', [require('angular-route'), 'angularUtils.directives.dirPagination']);

//Criando a rota referente ao cadastro de pessoas
window.app.config(function ($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "views/pessoa.html",
		controller: "pessoaController"
	});
});

