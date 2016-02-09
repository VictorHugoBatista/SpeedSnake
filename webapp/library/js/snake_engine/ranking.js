/**
 *	Speed Snake Beta - 08 02 2016
 *
 *	File: ranking.js
 *	Author: Victor Hugo Batista
 *	Description: Funções de envio de dados de jogo ao ranking, através do módulo java.
 */

/**
	Gera mensagem de fim de jogo com pontuação e formulário de salvamento no ranking.
	Parâmetros:
	|	msg = mensagem exibida no topo da mensagem gerada pelo programa
 */
function messageScoreRanking(){
	return "<div class='txtCentralizado txtResultado' id='txtResultado'>" +
				"<p>Você perdeu!<br/><br/>Nível:	"+gameLevel+"<br/>Pontuação:	"+gameScore+"</p>" +
				"<form id='rankingForm'>" +
					"Salvar Pontuação:<br/><input type='text' name='name' id='playerName' maxlength='3' placeholder='nome'/>" +
					"<input type='button' value='OK' onClick='saveRanking()' />" +
				"</form> <br/>" +
				"Pressione Espaço<br />para reiniciar" +
			"</div>";
}

/**
 	[USA JQUERY]
 	Executa validação do campo de nome do ranking e executa submit das informações para o servlet
 */
function saveRanking(){
	var playerName = $("#playerName").val();//captura valor do campo de nome para validação
	
	if(playerName != ""){//se campo não estiver vazio
		
		$.post( "RankingSaverServlet", { name: $("#txtResultado").find("#playerName").val(), score: gameScore, level: gameLevel }, function(response){
			if(response == "save-ok"){
				window.location = "ranking.jsp";
			}
		});
	}
	else alert("Preencha o campo nome!!");//se o campo estiver vazio
}