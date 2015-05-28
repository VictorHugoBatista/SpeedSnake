<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="org.victorhbatista.speedsnake.ranking.RankingReturner" %>
<!DOCTYPE html>
<html>
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
		<div style="text-align: center; font-weight: bold;">*PÁGINA EM CONSTRUÇÃO. DADOS USADOS PARA TESTE</div>
	</body>
</html>