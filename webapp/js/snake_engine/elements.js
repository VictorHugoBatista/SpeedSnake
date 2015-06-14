/**
 *	Speed Snake Beta - 01 06 2015
 *
 *	File: elements.js
 *	Author: Victor Hugo Batista
 *	Description: Criação dos elementos snake e part e suas funções. [snake] <>---- [part]
 */

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