/**
 *	Speed Snake Beta - 19 06 2015
 *
 *	File: sound.js
 *	Author: Victor Hugo Batista
 *	Description: Funções de som do jogo, com play, pause e stop.
 */

/**
	[USA JQUERY] [USA ION.SOUND]
	Carrega os arquivos de som no início do jogo.
*/
ion.sound({
	sounds:[
		{name: musicList[0]},//trilha sonora
		{name: musicList[1]},
		{name: musicList[2]},
		{name: musicList[3]},
		{
			name: eatSound,//som da ação de comer
			volume:1,//volume dos efeitos sonoros
			loop: false,//
			multiplay : true//permite várias instâncias do áudio tocando
		},
		{
			name: endSound,//som de fim de jogo
			volume:1,//volume dos efeitos sonoros
			loop: false,//
			multiplay : true//permite várias instâncias do áudio tocando
		}
	],
	path : "sounds/",//local dos arquivos
	preload: true,//carga dos arquivos na inicialização
	multiplay: false,//não permite várias instâncias do áudio tocando
	loop: true,//loop infinito da trilha sonora
	volume: 0.55,//volume da trilha sonora
	
	ready_callback:function(obj){//callback chamado ao fim da carga de uma música
		if(obj.name == musicList[0]){
			$("#area").html(messageBeginGame());
			canStart = true;//permite o jogo ser iniciado
		}
	}
});

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

function messageBeginGame(){//mensagem de início de jogo
	return "<div class='txtCentralizado txtInicial' id='txtInicial'>" +
				"Controles:" +
				"<p><img src='images/game/setas.png'></img></p>" +
				"Pressione Espaço<br />para iniciar" +
			"</div>";
}