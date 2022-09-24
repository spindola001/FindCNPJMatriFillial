$(document).ready(() => {
    Events();
    $('#inputCnpjEntrada').mask('00.000.000/0000-00');
    $('#inputCnpjSaida').mask('00.000.000/0000-00');
});

function Events() {
    $('#btnGetMatriz').on('click', () => {
        getMatrizOrFilial('MATRIZ');
    });

    $('#btnGetFilial').on('click', () => {
        getMatrizOrFilial('FILIAL');
    });

    $('#inputCnpjSaida').on('change', () => {
        $(this).mask('00.000.000/0000-00');
    })
}

function getMatrizOrFilial(MatrizOrFilial) {
    let CNPJ = $('#inputCnpjEntrada').val().replace(/[^\d]+/g, '') ? $('#inputCnpjEntrada').val().replace(/[^\d]+/g, '') : '';
    let Filial = $('#filial').val() ? $('#filial').val() : '';

    switch (MatrizOrFilial) {
        case 'MATRIZ':
            let CNPJMatriz = getCNPJMatriz(CNPJ);
            $('#inputCnpjSaida').val(CNPJMatriz);
            break;
        case 'FILIAL':
            let CNPJFilial = getCNPJFilial(CNPJ, Filial);
            $('#inputCnpjSaida').val(CNPJFilial);
            break;
        default:
            alert('Erro ao buscar Matriz ou Filial...');
            break;
    }
}

function getCNPJMatriz(CNPJFilial) {
    debugger;
    let raizCNPJMatriz = CNPJFilial.slice(0, 8).concat('0001');

    let digitosVerificadores = [
        [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    ];

    let stringToArray = Array.from(raizCNPJMatriz);

    let raizCNPJMatrizInArrayInt = stringToArray.map(function (value) {
        return parseInt(value);
    });

    let CNPJMatriz = primeiroDigVerificador(raizCNPJMatrizInArrayInt, digitosVerificadores);
    return CNPJMatriz;
}

function getCNPJFilial(CNPJMatriz, numFilial) {
    debugger;
    let raizCNPJMatriz = CNPJMatriz.slice(0, 8).concat(numFilial)
    let digitosVerificadores = [
        [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    ];

    let stringToArray = Array.from(raizCNPJMatriz);

    let raizCNPJMatrizInArrayInt = stringToArray.map(function (value) {
        return parseInt(value);
    });

    let CNPJFilial = primeiroDigVerificador(raizCNPJMatrizInArrayInt, digitosVerificadores);
    return CNPJFilial;
}

function primeiroDigVerificador(raizCNPJMatriz, digitosVerificadores) {
    let soma = 0;
    let restoDivisao = 0;
    var primeiroDigVerificador = 0;
    let resultMap = raizCNPJMatriz.map(function (value, index) {
        return value * digitosVerificadores[0][index];
    });

    for (var i = 0; i < resultMap.length; i++) {
        soma += resultMap[i]
    }

    restoDivisao = soma % 11;

    if (restoDivisao >= 2)
        primeiroDigVerificador = 11 - restoDivisao;
    else
        primeiroDigVerificador = 0;

    raizCNPJMatriz.push(primeiroDigVerificador);
    debugger;
    return segundoDigVerificador(raizCNPJMatriz, digitosVerificadores);
}

function segundoDigVerificador(raizCNPJMatriz, digitosVerificadores) {
    let soma = 0;
    let restoDivisao = 0;
    var segundoDigVerificador = 0;
    let resultMap = raizCNPJMatriz.map(function (value, index) {
        return value * digitosVerificadores[1][index];
    });

    for (var i = 0; i < resultMap.length; i++) {
        soma += resultMap[i]
    }

    restoDivisao = soma % 11;

    if (restoDivisao >= 2)
        segundoDigVerificador = 11 - restoDivisao;
    else
        segundoDigVerificador = 0;

    raizCNPJMatriz.push(segundoDigVerificador)
    debugger;
    return raizCNPJMatriz.toString().replaceAll(',', '');
}