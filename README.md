SpeedSnake - soundDev
=====================

Branch do desenvolvimento de som ao jogo.

Descrição
---------
Jogo web criado em homenagem aos jogos snake dos modelos antigos de celular, com o objetivo de enriquecer meu portfólio e ganhar mais experiência com desenvolvimento web.

Desenvolvedor: @VictorHugoBatista.

Link do jogo: http://speedsnake-victorhbatista.rhcloud.com.

Linguagens Utilizadas
---------------------
  - HTML5, CSS3: front-end/design. Diretórios: webapp, webapp/css.
  - JavaScript: engine do jogo. Diretório: webapp/js.
  - JavaEE, MySQL: módulo de ranking. Diretórios: SQL, java/org/victorhbatista/speedsnake.

Configuração da Base de Dados
-----------------------------
Classe de conexão = org.victorhbatista.speedsnake.database.Connection_DAO:
  - HOST: local onde se encontra a base de dados.
  - USER: usuário do MySQL.
  - PASSWORD: senha do usuário do MySQL.
  - Arquivos de base de dados:
    - SQL/database.sql: base de dados inicial, com apenas um registro.
    - SQL/database_test.sql: base de dados de teste, com vários registros.

Bibliotecas Utilizadas
----------------------
  - Javascript
    - jQuery: http://jquery.com/.
    - touchSwipe: http://labs.rampinteractive.co.uk/touchSwipe/demos/index.html.
    - Ion.Sound: http://ionden.com/a/plugins/ion.sound/en.html
  - Java
    - Conector Java-MySQL: http://mvnrepository.com/artifact/mysql/mysql-connector-java/5.1.18.
