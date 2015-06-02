/**
 *	Speed Snake Beta - 01 06 2015
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
			case 39: if(direction == "up" || direction == "down") control(false, "right");break;//direction = "right";
			
			case 32: startGame(); break;//barra de espaço. inicia o jogo
			case 80: pauseGame();//botão P. pausa o jogo
		}
	}
);