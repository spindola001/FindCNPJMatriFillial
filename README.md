# FindCNPJMatriFillial
Este serviço faz um calculo capaz de trazer o CNPJ da Matriz, caso a entrada seja um CNPJ Filial, e o CNPJ da Filial caso a entrada seja uma Matriz (Nesse caso, informe o número da filial no campo "Número da filial". Exemplo: 0007 ou 0048).

## Aplicabilidade

- Este recurso foi utilizado na customização de um formulário
  - O usuário digita, no caso, um CNPJ de filial
  - No change do campo a funcionalidade é ativada, buscando o CNPJ da matriz, que será buscada no banco de dados
  - Foi importante ter feito a devidas validações na receita federal, por meio de APIs disponibilizadas na internet, inclusive para trazer as informações dessa API e auto preencher as informações do formulário

## To-do

- Aplicar mascara para o cmapo "CNPJ Saída", quando auto preenchido
