/**
 *	Speed Snake Beta - 14 06 2015
 *
 *	File: graphic.js
 *	Author: Victor Hugo Batista
 *	Description: Funções de interface gráfica.
 */

/**
	[USA JQUERY]
	Adiciona todos os elementos do jogo.
*/
function repaint(){
	paintSnake();
	$("#area").append("<div class='part entity_"+theme+" food' id='food' style='left: "+food.x+"px; top: "+food.y+"px'</div>");//comida
	$("#gameScore").html(gameScore);//pontuação atual
	$("#gameLevel").html(gameLevel);//nível atual
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
	$("#area").html("<div class='part entity_"+theme+" firstPart_"+snake[0].dir+"' style='left: "+snake[0].x+"px; top: "+snake[0].y+"px'</div>");//primeiro elemento
	//$(document.body).append("||"+snake[0].x+"|"+snake[0].y+"|"+snake[0].dir+"|");//debug
	for(i=1; i<snake.length-1; i++){
		$("#area").append("<div class='part entity_"+theme+"' style='left: "+snake[i].x+"px; top: "+snake[i].y+"px;'</div>");//elementos intermediários
		//$(document.body).append("||"+snake[i].x+"|"+snake[i].y+"|"+snake[i].dir+"|");//debug
	}
	$("#area").append("<div class='part entity_"+theme+" lastPart_"+snake[snake.length-1].dir+"' style='left: "+snake[snake.length-1].x+"px; top: "+snake[snake.length-1].y+"px'</div>");//último elemento
	//$(document.body).append("||"+snake[snake.length-1].x+"|"+snake[snake.length-1].y+"|"+snake[snake.length-1].dir+"|");//debug
	//$(document.body).append("|<br />");//debug
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
			//$("#theme").attr("href", "css/snake_game_themes/snake_game_theme666.css");
			break;
	}
}