/**
 *	Speed Snake Beta - 19 06 2015
 *
 *	File: gameplay.js
 *	Author: Victor Hugo Batista
 *	Description: Funções principais que fazem o jogo executar.
 */

/**
	[USA JQUERY]
	Função de início do jogo.
	Inicializa todas variáveis importantes para o gameplay.
*/
function startGame(){
	if(canStart){
		direction = "right";
		canStart = false;
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
		
		currentMusic = musicList[0];
		play(currentMusic);//inicia trilha do jogo
		
		run(210);//inicia a thread com a velocidade inicial | 210 - 30
	}
}

/**
	Pausa e des-pausa o jogo.
	Se estiver executando, o jogo irá pausar; se tiver pausado, o jogo irá executar
*/
function pauseGame(){
	pause(currentMusic);//pausa trilha do jogo
	gamePaused = !gamePaused;
}

/**
	[USA JQUERY]
	Ação da morte da snake.
	Pára a thread e exibe uma mensagem com a pontuação.
	Parâmetros:
	|	msg = mensagem exibida na tela após o fim do jogo
*/
function killSnake(){
	stop(currentMusic);//para trilha do jogo
	play(endSound);//toque do som de fim de jogo
	canStart = true;//ao fim, o jogo pode ser reiniciado
	snakeAlive = false;
	clearInterval(thread);//para thread
	$("#area").html(messageScoreRanking());	
	$("#gameScore, #gameLevel").empty();
}

/**
	Snake executa um passo.
	Algoritmo:
	|	copia snake atual para snakeAux
	|	inicia variáveis com os dados de posição da primeira part da snake
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
	
	switch(direction){//passo
		case "up":
			if(y > 0 && !eatHerself(x, y-partSize)){
				if(x == food.x && y-partSize == food.y) eatFood = true;
				snake[0].y -= partSize;
			}
			else killSnake();
			break;
		case "down":
			if(y < areaSize && !eatHerself(x, y+partSize)){
				if(x == food.x && y+partSize == food.y) eatFood = true;
				snake[0].y += partSize;
			}
			else killSnake();
			break;
		case "left":
			if(x > 0 && !eatHerself(x-partSize, y)){
				if(x-partSize == food.x && y == food.y) eatFood = true;
				snake[0].x -= partSize;
			}
			else killSnake();
			break;
		case "right":
			if(x < areaSize && !eatHerself(x+partSize, y)){
				if(x+partSize == food.x && y == food.y) eatFood = true;
				snake[0].x += partSize;
			}
			else killSnake();
	}
	
	for(i=1; i<snake.length; i++) snake[i] = snakeAux[i-1];//copia snakeAux para snake, sem o último elemento
	
	if(eatFood){//ação de comer
		play(eatSound);//toque da ação de comer
		createPart(snake.length, snakeAux[snakeAux.length-1].x, snakeAux[snakeAux.length-1].y, snakeAux[snakeAux.length-1].dir);
		refreshFood();
		refreshScore();
	}
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
	Aumenta a pontuação e sobe de nível - se a pontuação for múltipla de 10 - até o nível 13
*/
function refreshScore(){
	var taxaAceleracao = 15;//velocidade da aceleração da snake
	var newDelay = delayThread-taxaAceleracao;//cálculo do novo delay
	
	if(((++gameScore) % 10 == 0) && (gameLevel < 13)){//aumenta pontuação dentro do if com ++
		switchTheme(++gameLevel);//aumenta nível do jogo com ++
		clearInterval(thread);//para thread
		run(newDelay);//reinicia thread com delay menor - sem parar o jogo
		//$(document.body).append(delayThread + " ");//debug
	}
}