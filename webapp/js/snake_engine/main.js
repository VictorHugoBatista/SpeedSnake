/**
 *	Speed Snake Beta - 01 06 2015
 *
 *	File: main.js
 *	Author: Victor Hugo Batista
 *	Description: Funções iniciais do jogo e thread principal.
 */

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