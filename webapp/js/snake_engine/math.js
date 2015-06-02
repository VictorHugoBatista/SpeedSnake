/**
 *	Speed Snake Beta - 01 06 2015
 *
 *	File: math.js
 *	Author: Victor Hugo Batista
 *	Description: Funções matemáticas mais complexas.
 */

/**
	Gera um número aleatório inteiro em um intervalo.
	Parâmetros:
	|	min = valor mínimo gerado no intervalo.
	|	max = valor máximo gerado no intervalo.
*/
function randomInterval(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}