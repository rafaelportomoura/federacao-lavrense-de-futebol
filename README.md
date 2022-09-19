# Federação Lavrense de Futebol

![flf](flf.jpg)

## 📝 Descrição

A cidade de Lavras localizada no sul de Minas Gerais possui uma longa tradição com o esporte futebol. Na cidade é muito comum haver campeonatos amadores com uma boa presença de público para assistir. Em 2022 visando organizar esses campeonatos surgiu a FLF - Federação Lavrense de Futebol.
O objetivo deste sistema é proporcionar uma interface para que a FLF possa organizar os campeonatos com suas partidas, estádios, times, jogadores e gols.

## 🎨 Protótipo

- [Figma](https://www.figma.com/file/j6eV1HmmW8XD7hbb3ZDqOQ/FLF?node-id=0%3A1)

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fj6eV1HmmW8XD7hbb3ZDqOQ%2FFLF%3Fnode-id%3D0%253A1" allowfullscreen></iframe>


## 🧑🏻‍💻 Tecnologias

- JavaScript (ECMAScript 2021)
- Front-end -> ReactJs (18.2.0)
- Back-end -> TypeScript (3.9)
- MySQL (8.0)
- NodeJS (16.16.0) -> express.js (4.18.1)

## Padrões:

### Padrão do git:

- Todas as funcionalidades (backend,banco de dados e frontend) devem estar dentro da pasta `app/{nome_da_funcionalidade}`
- Todas Documentações devem estar dentro da pasta `Documentação`
- Todos os padrões adotados devem estar na pasta `Padrões adotados`
- Todos os requisitos devem estar na pasta `Requisitos`
- Somente pode abrir branch a partir de uma issue
- Toda branch pull request para main, deve ser devidamente revisada
- Após cada release é necessário criar a tag e documentar a release no github

### Padrão de escrita:

- Todo o código será escrito em inglês;
- Todas as mensagens de erros e sucessos serão escritas em inglês;
- Todas os nomes de váriaveis devem ser escritas no padrão snake_case;
- Todas os nomes de funções e classes devem ser escritas no padrão CamelCase;
- Todas interfaces devem ser escritas no padrão I{NomeDaInterface};
- Deve haver apenas um objeto de log para aplicação inteira;
- Deve haver apenas um objeto de mensagens de erro e sucesso para aplicação
inteira;
- Deve uma classe de erro para cada pacote da aplicação (Services, Controllers,
Autenticação, Repositories) e cada uma deve logar claramente o local do
acontecimento do erro;
- Os logs serão salvos em um banco de dados;

### Documentação:

- O código deve ser escrito de maneira clara e auto-documentável.
- As documentações de APIs seguirão o padrão OpenApi Specification.
- O código deve ser comentado somente quando for estritamente necessário.

### Teste Unitários:

- Para toda função do código, será necessário implementar um teste unitário que
cubra todas as branchs e linhas dessa função;
- Toda função que foge ao teste da função testada, deve ser simulada.
- Sempre antes de cada commit o desenvolvedor deve verificar se sua implementação
está coberta pelos testes