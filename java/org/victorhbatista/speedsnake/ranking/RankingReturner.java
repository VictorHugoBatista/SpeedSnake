package org.victorhbatista.speedsnake.ranking;

import java.sql.SQLException;
import java.util.ArrayList;

import org.victorhbatista.speedsnake.database.Connection_DAO;
import org.victorhbatista.speedsnake.model.RankingItem;

/**
 * Speed Snake Beta - 26 06 2015
 * 
 * File: RankingReturner.java
 * @author: Victor
 * Description: Bean que recebe os dados do ranking na conexão com a base de dados e os organiza em uma tabela
 */
public class RankingReturner {
	public static String returner(){
		try{
			Connection_DAO cDAO = new Connection_DAO();//criação da conexão com a base de dados
			ArrayList<RankingItem> lista = cDAO.getRanking();//retorno dos n registros ranking
			String htmlLista = "";//criação da string da tabela
			short posicao = 1;//posição do jogador atual
			for(RankingItem item : lista){//percorre a lista inteira, criando a tabela com seus dados, incrementando posicao
				htmlLista += "<tr><td>"+(posicao++)+"</td><td>" + item.getName() + "</td><td>"+item.getScore()+"</td><td>"+item.getLevel()+"</td></tr>\n";
			}
			cDAO.closeCon();//se chegou aqui, fechar a conexão
			return htmlLista;
		}
		catch(Exception e){//possível erro n
			e.printStackTrace();
			return "";
		}
	}
}
