/**
 *	Speed Snake Beta - 15 06 2015
 *
 *	File: global.js
 *	Author: Victor Hugo Batista
 *	Description: Pacote com todas variáveis globais da snake engine.
 */

var partSize = 20;//tamanho da parte em altura e largura.
var areaSize = 20*partSize;//tamanho da área de jogo. depende da área da parte.

var direction;//direção de movimento. modificado com o evento de tecla.
var snakeAlive;//indica se a snake está viva
var gamePaused;//indica se o jogo está pausado
var switchDirection;//permite mudança de direção da snake se verdadeiro

var snake;//entidade da snake
var food;//esntidade da comida da snake
var thread;//objeto da thread principal

var gameLevel;//nível do jogador
var gameScore;//pontuação do jogador
var delayThread;//delay da thread do jogo

var theme = 1;//número do tema a ser acionado - 0 = posição inicial

var currentMusic;//nome da música se fundo atual
var musicList = ["afogando_em_numeros", "aprazolam", "black_sea", "Parataste"];//lista de todas as músicas do jogo
var eatSound = "tap";//efeito sonoro da ação de comer
var endSound = "tap";//efeito sonoro do fim de jogo