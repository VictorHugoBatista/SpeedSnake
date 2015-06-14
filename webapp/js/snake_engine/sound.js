/**
 *	Speed Snake Beta - 14 06 2015
 *
 *	File: sound.js
 *	Author: Victor Hugo Batista
 *	Description: Funções de som do jogo, com play, pause e stop.
 */

/**
	[USA ION.SOUND]
	Carrega os arquivos de som no início do jogo.
*/
ion.sound({
	sounds:[//nome dos arquivos, sem extensão
		{name: "afogando_em_numeros", volume: 0.5},
		//{name: "black_sea"},
		//{name: "Parataste"},
		{name: "aprazolam", volume: 0.5},
		{name: "tap", multiplay : true} //permite várias instâncias do áudio tocando
	],
	path : "sounds/",//local dos arquivos
	preload: true,//carga dos arquivos na inicialização
	multiplay: false,//não permite várias instâncias do áudio tocando

	ready_callback:function(obj) {//muda a cor do nome da música para verde ao carregar
		
	}
});

//força execução antes de carregar completamente
ion.sound.preload("pop_cork");
ion.sound.play("pop_cork");

function play(soundName) {//executa som pelo Ion-Sound
	ion.sound.play(soundName);
}

function pause(soundName) {//executa som pelo Ion-Sound
	ion.sound.pause(soundName);
}

function stop(soundName) {//para o som pelo Ion-Sound
	ion.sound.stop(soundName);
}