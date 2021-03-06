<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="java.util.ArrayList" %>
<%@page import="org.victorhbatista.speedsnake.ranking.RankingReturner" %>
<%@page import="org.victorhbatista.speedsnake.model.RankingItem" %>

<!--
	Speed Snake Beta - 08 02 2016

	File: ranking.jsp
	Author: Victor Hugo Batista
	Description: P�gina de exibi��o do ranking armazenado em base de dados
-->

<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<title>Speed Snake Beta | Ranking</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href="library/css/common_style.css">
		<link rel="stylesheet" type="text/css" href="library/css/ranking.css">
	</head>
	<body>
		<header class="headerNfooter">
			<p><a href="index.html">Speed Snake Beta</a></p>			
			<nav>
				<ul>
					<li><a href="ranking.jsp">Ranking</a></li>
					<li><a href="soundtrack.html">Trilha Sonora</a></li>
					<li><a href="about.html">Sobre</a></li>
				</ul>
			</nav>			
		</header>
		
		<section class="sectionContent">
			<header class="headerNfooter headerContent">Ranking</header>
			<table>
				<tr>
					<th>Pos</th>
					<th>Nome</th>
					<th>Pontua��o</th>
					<th>N�vel</th>
				</tr>
				<% ArrayList<RankingItem> ranking = RankingReturner.returner();	%>
				<% int pos = 1; /* contador da posi��o do registro */ %>
				<%-- exibe todos os registros de ranking retornados da fun��o 'RankingReturner.returner()' --%>
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
		
		<footer class="headerNfooter footerFixed">
			<div class="githubLink">
				<iframe class="follow" src="https://ghbtns.com/github-btn.html?user=VictorHugoBatista&type=follow&count=false" frameborder="0" scrolling="0"></iframe>
				<iframe class="star" src="https://ghbtns.com/github-btn.html?user=VictorHugoBatista&repo=SpeedSnake&type=star&count=false" frameborder="0" scrolling="0"></iframe>
			</div>
		</footer>
	</body>
</html>