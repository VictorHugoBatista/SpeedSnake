package org.victorhbatista.speedsnake.ranking;

import java.sql.SQLException;
import java.util.ArrayList;

import org.victorhbatista.speedsnake.database.Connection_DAO;
import org.victorhbatista.speedsnake.model.RankingItem;

/**
 * Speed Snake Beta - 08 02 2016
 * 
 * File: RankingReturner.java
 * @author: Victor
 * Description: Bean que recebe os dados do ranking na conexão com a base de dados e os retorna em ArrayList
 */
public class RankingReturner {
	public static ArrayList<RankingItem> returner(){
		try{
			Connection_DAO cDAO = new Connection_DAO();//criação da conexão com a base de dados
			ArrayList<RankingItem> lista = cDAO.getRanking();//retorno dos n registros ranking
			cDAO.closeCon();//se chegou aqui, fechar a conexão
			return lista;//retorna lista diretamente
		}
		catch(Exception e){//possível erro n
			e.printStackTrace();
			return null;
		}
	}
}
