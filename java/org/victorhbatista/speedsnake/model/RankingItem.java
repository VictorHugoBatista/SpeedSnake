package org.victorhbatista.speedsnake.model;

/**
 * Speed Snake Beta - 27 05 2015
 * 
 * File: RankingItem.java
 * @author: Victor
 * Description: Modelo de dados de um item de ranking. Possui nome, pontuação e nível/name, score e level
 */
public class RankingItem {
	private String name;
	private short score, level;
	
	public RankingItem(String name, short score, short level){
		setName(name);
		setScore(score);
		setLevel(level);
	}
	
	//----------getters & setters----------
	public String getName(){
		return name;
	}
	
	private void setName(String name){
		this.name = name;
	}
	
	public short getScore(){
		return score;
	}
	
	private void setScore(short score){
		this.score = score;
	}
	
	public short getLevel(){
		return level;
	}
	
	private void setLevel(short level){
		this.level = level;
	}
}