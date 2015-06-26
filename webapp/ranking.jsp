<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="org.victorhbatista.speedsnake.ranking.RankingReturner" %>

<!--
	Speed Snake Beta - 26 06 2015

	File: ranking.jsp
	Author: Victor Hugo Batista
	Description: Página de exibição do ranking armazenado em base de dados
-->

<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<title>Speed Snake Beta | Ranking</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href="css/common_style.css">
		<link rel="stylesheet" type="text/css" href="css/ranking.css">
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
					<th>Pontuação</th>
					<th>Nível</th>
				</tr>
				<% out.println(RankingReturner.returner());	%>
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