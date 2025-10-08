/**
 *	Speed Snake Beta - 06 06 2015
 *
 *	File: controls.js
 *	Author: Victor Hugo Batista
 *	Description: Funções de controle do jogo e eventos de teclado
 */

/**
	Controle de acesso à função step() e à variável direction.
	Regra implementada: após mudança de direção, a snake deve dar ao menos um passo.
	Parâmetros:
	|	fStep = true para função "step();"/false para "direction = dir;".
	|	dir = direção à ser setada à direction se fStep for false.
*/
function control(fStep, dir){
	if(fStep){//método step, acionado pela thread principal
		step();
		switchDirection = true;
	}
	else{//mudança de direção, acionada pelos eventos de tecla e touch
		if(switchDirection){
			direction = dir;
			snake[0].dir = dir;
			switchDirection = false;
		}
	}
}

//--------------------------------------eventos_teclado--------------------------------------

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
			case 39: if(direction == "up" || direction == "down") control(false, "right"); break;//direction = "right";
			
			case 32: startGame(); break;//barra de espaço. inicia o jogo
			case 80: pauseGame();//botão P. pausa o jogo
		}
	}
);

//--------------------------------------eventos_toque--------------------------------------

/**
	[USA JQUERY] [USA TOUCHSWIPE]
	Definição de eventos touch para a área de jogo, suportando smartphones e tablets.
	Gestos de movimentação nas quatro direções e um toque simples para início de jogo.
*/
$("#area").swipe({//criação do evento para o elemento da área de jogo, buscado através de jQuery
	swipe:function(event, dir, distance, duration, fingerCount, fingerData){//evento de arrastar
		switch(dir){//validação do evento nas quatro direções
			case "up": if(direction == "left" || direction == "right") control(false, "up"); break;
			case "down": if(direction == "left" || direction == "right") control(false, "down"); break;
			case "left": if(direction == "up" || direction == "down") control(false, "left"); break;
			case "right": if(direction == "up" || direction == "down") control(false, "right");
		}
	},
	
	tap:function(event, target){//evento de toque simples
		startGame();
	},
	
	threshold:50
});

/**
	[USA JQUERY] [USA TOUCHSWIPE]
	Definição de eventos touch para a área de pontuação e o texto "pausa", suportando smartphones e tablets.
	Toque simples para a pausa do jogo atual.
*/
$("#leftContainer, #postTexts").swipe({//criação do evento para os elementos da área de pontuação e o texto "pausa", buscados através de jQuery
	tap:function(event, target){//evento de toque simples
		pauseGame();
	},
	
	threshold:50
});