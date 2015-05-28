package org.victorhbatista.speedsnake.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.victorhbatista.speedsnake.model.RankingItem;

/**
 * Speed Snake Beta - 28 05 2015
 * 
 * File: Connection_DAO.java
 * @author: Victor Hugo Batista
 * Description: Classe de interface com base de dados
 */
public class Connection_DAO {
	private static Connection con;//conexão com o SGBD
	private static final String TABLE = "speedsnake",
								USER = "root",//usuário do SGBD
								PASSWORD = "root";//senha do SGBD
	
	public Connection_DAO() throws ClassNotFoundException, SQLException{
		//System.out.println("Conectando...");
		Class.forName("com.mysql.jdbc.Driver");
		con = DriverManager.getConnection("jdbc:mysql://localhost/"+TABLE, USER, PASSWORD);
		//System.out.println("Conectado!");
	}
	
	/**
	 * Insere n dados em uma tabela.
	 * @param name - iniciais de três letras do jogador
	 * @param score - pontuação realizada pelo jogador
	 * @param level - nível alcançado pelo jogador
	 * @return boolean - true para sucesso; false para falha
	 */
	public boolean saveRanking(RankingItem item){
		String query = "INSERT INTO ranking (Name, Score, Level) VALUES (?, ?, ?)";//query para inserção, com tokens
		try{
			PreparedStatement stmt = con.prepareStatement(query);
			//substituição dos tokens da query, em ordem
			stmt.setString(1, item.getName());
			stmt.setShort(2, item.getScore());
			stmt.setShort(3, item.getLevel());
			
			stmt.execute();//executa a inserção
			stmt.close();//fecha a conexão do statement
			
			return true;//inserido com sucesso
		}
		catch(SQLException ex){
			return false;//erro de base de dados
		}
	}
	
	/**
	 * Retorna ranking com as 1 - 10 maiores pontuações.
	 * @return ranking - conjunto das maiores pontuações. Se não houver registros ou caso de erro será null
	 */
	public ArrayList<RankingItem> getRanking(){
		ArrayList<RankingItem> ranking = new ArrayList<RankingItem>();//lista a ser preenchida com os itens do ranking
		String query = "SELECT * FROM ranking ORDER BY score DESC LIMIT 20";//query de pesquisa, retorna as 20 primeiras pontuações
		try{
			PreparedStatement stmt = con.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();//dados retornados em uma estrutura de dados da API do mysql
			
			while(rs.next()){//cópia dos dados retornados para a lista
				ranking.add(new RankingItem(rs.getString("name"), rs.getShort("score"), rs.getShort("level")));
			}
			
			stmt.close();//fecha a conexão do statement
			if(ranking.size() > 0) return ranking;//lista não-vazia
			else return null;
		}
		catch(SQLException ex){
			return null;
		}
	}
	
	/**
	 * Fecha a conexão com a base de dados
	 */
	public void closeCon(){
		try{
			con.close();
		}
		catch(SQLException e){
			e.printStackTrace();
		}
	}
}