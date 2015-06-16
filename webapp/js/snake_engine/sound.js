/**
 *	Speed Snake Beta - 15 06 2015
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
		{name: musicList[0]},
		{name: musicList[1]},
		//{name: musicList[2]},
		//{name: musicList[3]},
		{name: "tap", volume:1, loop: false, multiplay : true} //permite várias instâncias do áudio tocando
	],
	path : "sounds/",//local dos arquivos
	preload: true,//carga dos arquivos na inicialização
	multiplay: false,//não permite várias instâncias do áudio tocando
	loop: true,
	volume: 0.55,
	
	ready_callback:function(obj){//muda a cor do nome da música para verde ao carregar
		
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

function switchSound(newSound){//troca música por nova
	stop(currentMusic);
	currentMusic = newSound;
	play(currentMusic);
}