//Criando uma factory de conexão com o banco de dados
app.factory("dbService", function ($http) {
	var sqlite = require('sqlite-sync');
	var db = sqlite.connect('database.db');

	//Criando a tabela de pessoas, caso ainda não exista
	db.run("CREATE TABLE IF NOT EXISTS pessoas (" +
		"id         INTEGER PRIMARY KEY AUTOINCREMENT," +
		"nome       CHAR (100)," +
		"email      CHAR (100)," +
		"nascimento DATE," +
		"endereco   CHAR (200)," +
		"telefone   CHAR (20)," +
		"foto       BOOLEAN);"
		, function (res) {
			if (res.error) alert('Erro ao criar a tabela de pessoas');
		});

	return db;
});

