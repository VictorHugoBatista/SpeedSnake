/**
 *	Speed Snake Beta - 30 05 2015
 *
 *	File: snake_game.js
 *	Author: Victor Hugo Batista
 *	Description: Pacote de funcionalidades do jogo Snake
 */

var partSize = 20;//tamanho da parte em altura e largura.
var areaSize = 20*partSize;//tamanho da área de jogo. depende da área da parte.

var direction;//direção de movimento. modificado com o evento de tecla.
var snakeAlive;//indica se a snake está viva
var gamePaused;//indica se o jogo está pausado
var switchDirection;//permite mudança de direção da snake se verdadeiro

var snake;//entidade da snake
var food ;//esntidade da comida da snake
var thread;//objeto da thread principal

var gameLevel;//nível do jogador
var gameScore;//pontuação do jogador
var delayThread;//delay da thread do jogo

var theme = 1;//número do tema a ser acionado - 0 = posição inicial
$("#area, #scoreContainer").toggleClass("screen_"+theme);//inicialização do primeiro tema com a página
		
/**
	Thread principal.
	Parâmetro:
	|	delay = valor numérico inteiro inversamente proporcional à dificuldade do jogo
	Atualiza
	Executa um passo da snake
	Atualiza interface gráfica
*/
function run(delay){
	delayThread = delay;
	thread = setInterval(
		function (){
			//"repaint()" não pode executar se a snake bater na execução anterior de "control(true, " ");"
			if(!gamePaused){
				control(true, " ");//step();
				if(snakeAlive) repaint();
			}
		}
	, delayThread);
}

//----------------------------------funções_da_tela----------------------------------
/**
	[USA JQUERY]
	Adiciona todos os elementos do jogo.
*/
function repaint(){
	paintSnake();
	$("#area").append("<div class='part entity_"+theme+"' id='food' style='left: "+food.x+"px; top: "+food.y+"px'</div>");
	$("#gameScore").html(gameScore);
	$("#gameLevel").html(gameLevel);
	//$(document.body).append("|"+food.x+"|"+food.y+"|");//debug
	//$(document.body).append("|<br />");//debug
}

/**
	[USA JQUERY]
	Adiciona as parts da snake na tela.
	|	Limpa a tela com ".html()", adicionando a primeira parte.
	|	Adiciona as outras com ".append()".
*/
function paintSnake(){
	$("#area").html("<div class='part entity_"+theme+"' id='snake' style='left: "+snake[0].x+"px; top: "+snake[0].y+"px'</div>");
	//$(document.body).append("||"+snake[0].x+"|"+snake[0].y+"|"+snake[0].dir+"|");//debug
	for(i=1; i<snake.length-1; i++){
		var part = "<div class='part entity_"+theme+"' id='snake' style='left: "+snake[i].x+"px; top: "+snake[i].y+"px;'</div>";
		$("#area").append(part);
		//$(document.body).append("||"+snake[i].x+"|"+snake[i].y+"|"+snake[i].dir+"|");//debug
	}
	$("#area").append("<div class='part entity_"+theme+"' id='snake' style='left: "+snake[snake.length-1].x+"px; top: "+snake[snake.length-1].y+"px'</div>");
	//$(document.body).append("||"+snake[snake.length-1].x+"|"+snake[snake.length-1].y+"|"+snake[snake.length-1].dir+"|");//debug
	//$(document.body).append("|<br />");//debug
}

//----------------------------------funções_do_jogo----------------------------------
/**
	[USA JQUERY]
	Função de início do jogo.
	Inicializa todas variáveis importantes para o gameplay.
*/
function startGame(){
	direction = "right";
	gamePaused = false;
	switchDirection = true;

	snake = new Array(); createSnake(4);//inicialização da snake
	food = new Object();//inicialização comida da snake
	
	gameLevel = 1;
	gameScore = 0;
	
	refreshFood();//primeira posição da comida da snake
	snakeAlive = true;
	
	//retorna ao tema inicial
	$("#area, #scoreContainer").toggleClass("screen_"+theme);
	theme = 1;
	$("#area, #scoreContainer").toggleClass("screen_"+theme);
	//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme1.css");//retorna ao tema inicial 1
	
	run(210);//inicia a thread com a velocidade inicial | 210 - 30
}

/**
	Pausa e des-pausa o jogo.
	Se estiver executando, o jogo irá pausar; se tiver pausado, o jogo irá executar
*/
function pauseGame(){
	gamePaused = !gamePaused;
}

/**
	[USA JQUERY]
	Ação da morte da snake.
	Pára a thread e exibe uma mensagem com a pontuação.
	Parâmetros:
	|	msg = mensagem exibida na tela após o fim do jogo
*/
function killSnake(msg){
	snakeAlive = false;
	clearInterval(thread);//para thread
	$("#area").html(messageScoreRanking(msg));
	$("#gameScore, #gameLevel").empty();
}

/**
	Gera mensagem de fim de jogo com pontuação e formulário de salvamento no ranking.
	Parâmetros:
	|	msg = mensagem exibida no topo da mensagem gerada pelo programa
 */
function messageScoreRanking(msg){
	return "<div class='txtCentralizado' id='txtResultado'>" +
				"<p>"+msg+"<br/><br/>Nível:	"+gameLevel+"<br/>Pontuação:	"+gameScore+"</p>" +
				"<form method='post' action='RankingSaverServlet'>" +
					"<input type='hidden' name='score' value='"+gameScore+"'/>" +
					"<input type='hidden' name='level' value='"+gameLevel+"'/>" +
					"Salvar Pontuação:<br/><input type='text' name='name' maxlength='3' placeholder='nome'/>" +
					"<input type='submit' value='OK' />" +
				"</form> <br/>" +
				"Pressione Espaço<br />para reiniciar" +
			"</div>";
}

/**
	Controle de acesso à função step() e à variável direction.
	Regra implementada: após mudança de direção, a snake deve dar ao menos um passo.
	Parâmetros:
	|	fStep = true para função "step();"/false para "direction = dir;".
	|	dir = direção à ser setada à direction se fStep for false.
*/
function control(fStep, dir){
	if(fStep){
		step();
		switchDirection = true;
	}
	else{
		if(switchDirection){
			direction = dir;
			snake[0].dir = dir;
			switchDirection = false;
		}
	}
}

/**
	Snake executa um passo.
	Algoritmo:
	|	copia snake atual para snakeAux
	|	primeira parte dá o passo de acordo com a direção atual
	|	|	se há comida da snake na posição do passo: seta eatFood para true
	|	snakeAux é copiada para snake - a última parte de snakeAux é ignorada
	|	se eatFood for true:
	|	|	adiciona à última parte de snakeAux à snake
	|	|	atualiza comida da snake com posição aleatória
	|	|	atualiza pontuação
*/
function step(){
	var snakeAux = copySnake();
	var x = snake[0].x;
	var y = snake[0].y;
	var eatFood = false;
	
	switch(direction){
		case "up":
			if(y > 0 && !eatHerself(x, y-partSize)){
				if(x == food.x && y-partSize == food.y) eatFood = true;
				snake[0].y -= partSize;
			}
			else killSnake("Perdeu!!");
			break;
		case "down":
			if(y < areaSize && !eatHerself(x, y+partSize)){
				if(x == food.x && y+partSize == food.y) eatFood = true;
				snake[0].y += partSize;
			}
			else killSnake("Perdeu!!");
			break;
		case "left":
			if(x > 0 && !eatHerself(x-partSize, y)){
				if(x-partSize == food.x && y == food.y) eatFood = true;
				snake[0].x -= partSize;
			}
			else killSnake("Perdeu!!");
			break;
		case "right":
			if(x < areaSize && !eatHerself(x+partSize, y)){
				if(x+partSize == food.x && y == food.y) eatFood = true;
				snake[0].x += partSize;
			}
			else killSnake("Perdeu!!");
	}
	
	for(i=1; i<snake.length; i++) snake[i] = snakeAux[i-1];
	if(eatFood){
		createPart(snake.length, snakeAux[snakeAux.length-1].x, snakeAux[snakeAux.length-1].y, direction);
		refreshFood();
		refreshScore();
	}
}

/**
	Copia todas as propriedades da snake uma por uma e retorna o objeto.
*/
function copySnake(){
	var snakeRet = new Array();
	for(i=0; i<snake.length; i++){
		snakeRet[i] = new Object();
		snakeRet[i].x = snake[i].x;
		snakeRet[i].y = snake[i].y;
		snakeRet[i].dir = snake[i].dir;
	}
	return snakeRet;
}

/**
	Verifica se a snake bate em si mesma.
	Parâmetros:
	|	x = próxima posição da part 0 em x - left.
	|	y = próxima posição da part 0 em y - top.
	Retorno:
	|	true/false = bateu/não bateu.
*/
function eatHerself(x, y){
	if(snake.length <= 4) return false;
	else{
		for(i=3; i<snake.length; i++){
			if(x == snake[i].x && y == snake[i].y) return true;
	}
		return false;
	}
}

/**
	Adiciona uma posição aleatória nova à comida da snake.
	|	Posição limitada pelo tamanho da área de jogo.
*/
function refreshFood(){
	food.x = randomInterval(0, areaSize/partSize)*partSize;
	food.y = randomInterval(0, areaSize/partSize)*partSize;
	for(i=0; i<snake.length; i++){
		if(food.x == snake[i].x && food.y == snake[i].y) refreshFood();
	}
}

/**
	Aumenta a pontuação e sobe de nível - se a pontuação for múltipla de 10
*/
function refreshScore(){
	var taxaAceleracao = 15;//velocidade da aceleração da snake
	var newDelay = delayThread-taxaAceleracao;//cálculo do novo delay
	
	if(++gameScore % 10 == 0){//aumenta pontuação dentro do if com ++
		if(newDelay > 15){
			switchTheme(++gameLevel);//aumenta nível do jogo com ++
			clearInterval(thread);//para thread
			run(newDelay);//reinicia thread com delay menor - sem parar o jogo
			//$(document.body).append(delayThread + " ");//debug
		}
		else{
			killSnake("Você venceu, parabéns :D :D");
		}
	}
}

/**
	[USA JQUERY]
	Muda o tema do jogo se o jogador ultrapassar certos níveis
	Parâmetros:
	|	level = nível atual do jogo
*/
function switchTheme(level){
	switch(level){
		case 3://tema do nível 3-4
			$("#area, #scoreContainer").toggleClass("screen_"+(theme++));
			$("#area, #scoreContainer").toggleClass("screen_"+theme);
			//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme2.css");
			break;
		
		case 5://tema do nível 5-7
			$("#area, #scoreContainer").toggleClass("screen_"+(theme++));
			$("#area, #scoreContainer").toggleClass("screen_"+theme);
			//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme3.css");
			break;
		
		case 8://tema do nível 8-10
			$("#area, #scoreContainer").toggleClass("screen_"+(theme++));
			$("#area, #scoreContainer").toggleClass("screen_"+theme);
			//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme4.css");
			break;
		
		case 11://tema do nível 11-12
			$("#area, #scoreContainer").toggleClass("screen_"+(theme++));
			$("#area, #scoreContainer").toggleClass("screen_"+theme);
			//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme5.css");
			break;
		
		case 13://tema do nível 13 (HELL)
			$("#area, #scoreContainer").toggleClass("screen_"+(theme++));
			$("#area, #scoreContainer").toggleClass("screen_"+theme);
			gameLevel = "HELL";
			//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme666.css");
			break;
	}
}

//----------------------------------funções_matemáticas----------------------------------
/**
	Gera um número aleatório inteiro em um intervalo.
	Parâmetros:
	|	min = valor mínimo gerado no intervalo.
	|	max = valor máximo gerado no intervalo.
*/
function randomInterval(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//----------------------------------criação_de_elementos----------------------------------
/**
Criação da snake no centro da área de jogo.
Parâmetro:
	|	n = tamanho da snake a ser criada.
	Índices do loop:
	|	i = índice da adição da parte no vetor.
	|	j = posição na página em x (left).
	|	|	monta snake do início para o fim.
*/
function createSnake(n){
	for(i=0, j=areaSize/2; i<n; i++, j-=partSize)
		createPart(i, j, areaSize/2, "right");
}

/**
	Cria uma parte da snake.
	Parâmetros:
	|	n	= índice da adição da parte no vetor.
	|	x	= posição na página em x (left).
	|	y	= posição na página em y (top).
	|	dir	= direção da part.
*/
function createPart(n, x, y, dir){
	snake[n] = new Object();
	snake[n].x = x;
	snake[n].y = y;
	snake[n].dir = dir;
}

//-------------------------------interface_controle_teclado-------------------------------
/**
	[USA JQUERY]
	Definição dos eventos de tecla.
	Teclas de movimentação; início de jogo; pausa/despausa de jogo
*/
$(document.body).keydown(
	function(event){
		switch(event.which){
			case 38: if(direction == "left" || direction == "right") control(false, "up"); break;//direction = "up";
			case 40: if(direction == "left" || direction == "right") control(false, "down"); break;//direction = "down";
			case 37: if(direction == "up" || direction == "down") control(false, "left"); break;//direction = "left";
			case 39: if(direction == "up" || direction == "down") control(false, "right");break;//direction = "right";
			
			case 32: startGame(); break;//barra de espaço. inicia o jogo
			case 80: pauseGame();//botão P. pausa o jogo
		}
	}
);