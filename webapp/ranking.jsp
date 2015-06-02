<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="org.victorhbatista.speedsnake.ranking.RankingReturner" %>

<!--
	Speed Snake Beta - 01 06 2015

	File: ranking.jsp
	Author: Victor Hugo Batista
	Description: P�gina de exibi��o do ranking armazenado em base de dados
-->

<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<title>Speed Snake Beta | Ranking</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/ranking.css">
	</head>
	<body>
		<header>
			<p><a href="index.html">Speed Snake Beta</a></p>			
			<nav>
				<ul>
					<li><a href="ranking.jsp">Ranking</a></li>
					<li><a href="about.html">Sobre</a></li>
				</ul>
			</nav>			
		</header>
		<section>
			<header>Ranking</header>
			<% out.println(RankingReturner.returner());	%>
		</section>
	</body>
</html>