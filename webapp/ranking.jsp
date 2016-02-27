<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="java.util.ArrayList" %>
<%@page import="org.victorhbatista.speedsnake.ranking.RankingReturner" %>
<%@page import="org.victorhbatista.speedsnake.model.RankingItem" %>

<!--
	Speed Snake Beta - 27 02 2016

	File: ranking.jsp
	Author: Victor Hugo Batista
	Description: Página de exibição do ranking armazenado em base de dados
-->

<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<title>Speed Snake Beta | Ranking</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href="library/css/style.css">
	</head>
	<body>
		<header>
			<div class="container-header">
				<p><a href="index.html">Speed Snake Beta</a></p>			
				<nav>
					<ul>
						<li><a href="ranking.jsp">Ranking</a></li>
						<li><a href="soundtrack.html">Trilha Sonora</a></li>
						<li><a href="about.html">Sobre</a></li>
					</ul>
				</nav>
			</div>	
		</header>
		
		<section class="content-section sectionRanking">
			<header class="content-header">Ranking</header>
			<table>
				<tr>
					<th>Pos</th>
					<th>Nome</th>
					<th>Pontuação</th>
					<th>Nível</th>
				</tr>
				<% ArrayList<RankingItem> ranking = RankingReturner.returner();	%>
				<% int pos = 1; /* contador da posição do registro */ %>
				<%-- exibe todos os registros de ranking retornados da função 'RankingReturner.returner()' --%>
				<% for(RankingItem item : ranking){ %>
				<tr>
					<td><%= pos++ %></td>
					<td><%= item.getName() %></td>
					<td><%= item.getScore() %></td>
					<td><%= item.getLevel() %></td>
				</tr>
				<% } %>
			</table>
		</section>
		
		<footer>
			<div class="link-github">
				<iframe class="follow" src="https://ghbtns.com/github-btn.html?user=VictorHugoBatista&type=follow&count=false" frameborder="0" scrolling="0"></iframe>
				<iframe class="star" src="https://ghbtns.com/github-btn.html?user=VictorHugoBatista&repo=SpeedSnake&type=star&count=false" frameborder="0" scrolling="0"></iframe>
			</div>
		</footer>
	</body>
</html>