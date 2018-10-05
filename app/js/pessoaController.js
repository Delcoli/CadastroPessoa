//Criando o controller de pessoas, e injetando as dependências.
app.controller("pessoaController", function ($scope, $window, dbService) {

	//Criando a variável referente a pessoa
	$scope.pessoa = {};

	//Listando pessoas cadastradas
	$scope.listaPessoas = function () {
		dbService.runAsync("SELECT * FROM pessoas", function (data) {
			$scope.pessoas = data;
		});
	}

	//Salvando cadastro de pessoa
	$scope.salvar = function () {
		if ($scope.pessoa.id) { //Se a pessoa já tiver o id, indica que é uma edição
			//Editar
			var id = $scope.pessoa.id;
			delete $scope.pessoa.id;
			delete $scope.pessoa.$$hashKey; //Apaga elemento $$hashKey do objeto
			dbService.update('pessoas', $scope.pessoa, { id: id }); //entidade, dados, where, função CallBack
		} else {
			//nova
			dbService.insert('pessoas', $scope.pessoa); // entidade, dados
		}
		$scope.pessoa = {}; //Limpando a variável de pessoa
		$scope.listaPessoas(); //Recuperando todas as pessoas cadastradas
		$('#modalPessoa').modal('hide'); //Ocultando o modal de cadastro / edição de pessoa
	}

	//Abrindo para editar
	$scope.editar = function (dados) {
		$scope.pessoa = dados;
		$('#modalPessoa').modal('show'); //Abrindo o modal de cadastro / edição de pessoa
	}

	//Excluindo
	$scope.excluir = function (dados) {
		if (confirm("Deseja realmente apagar o cadastro de " + dados.nome + "?")) {
			dbService.delete('pessoas', { id: dados.id });
			$scope.listaPessoas();
		}
	}

	//Abertura do modal para visualização de foto
	$scope.verFoto = function(dados) {
		$scope.nomePessoa = dados.nome;
		$scope.foto = dados.foto;
		$('#modalVerFotoPessoa').modal('show');
	}

	//Abrindo camêra
	$scope.abrirCamera = function () {
		$window.ipcRenderer.send('abrir-camera');
	}

	//Remover a foto anexada
	$scope.removerFoto = function () {
		if (!$scope.pessoa.foto) return;

		if (confirm("Deseja realmente remover a foto?")) {
			$scope.pessoa.foto = null;
		}
	}

	//Recebendo a foto
	$window.ipcRenderer.on('receber-foto', function (event, args) {
		$scope.pessoa.foto = args; //Foto vem em formato base64, através de um evento disparado pelo main.js
		$scope.$apply(); //Forçando o angular aplicar as alterações para mostrar a foto
	});
});

