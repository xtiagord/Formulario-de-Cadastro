var app = angular.module('myApp', []);

app.controller('clientesCtrl', function($scope, $http) {
    $scope.clientes = [];
    $scope.mostrarClientes = true;
    $scope.mostrarFormulario = false;

    $scope.abrirCadastro = function() {
        $scope.mostrarClientes = false;
        $scope.mostrarFormulario = true;
    };

    $scope.cadastrarCliente = function() {
        $scope.novoCliente.codigo = gerarCodigo(); 
        $scope.clientes.push(angular.copy($scope.novoCliente));
        $scope.novoCliente = {};
        $scope.mostrarClientes = true;
        $scope.mostrarFormulario = false;
    };

    $scope.cancelarCadastro = function() {
        $scope.novoCliente = {};
        $scope.mostrarClientes = true;
        $scope.mostrarFormulario = false;
    };

    $scope.buscarEndereco = function() {
        var cep = $scope.novoCliente.cep;
        if (cep && cep.length === 8) {
            $http.get('https://viacep.com.br/ws/' + cep + '/json/')
                .then(function(response) {
                    if (response.data.erro) {
                        alert('CEP não encontrado');
                    } else {
                        $scope.novoCliente.endereco = response.data.logradouro;
                        $scope.novoCliente.bairro = response.data.bairro;
                        $scope.novoCliente.cidade = response.data.localidade;
                    }
                })
                .catch(function(error) {
                    console.log('Erro ao buscar CEP', error);
                });
        }
    };
    $scope.abrirDetalhesCliente = function(cliente) {
        $scope.clienteDetalhes = angular.copy(cliente);
        $('#modalDetalhesCliente').modal('show');
    };

    function gerarCodigo() {
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var codigo = '';
        for (var i = 0; i < 3; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    }
});
