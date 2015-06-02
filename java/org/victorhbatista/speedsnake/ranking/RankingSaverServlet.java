package org.victorhbatista.speedsnake.ranking;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.victorhbatista.speedsnake.database.Connection_DAO;
import org.victorhbatista.speedsnake.model.RankingItem;

/**
 * Speed Snake Beta - 01 06 2015
 * 
 * File: RankingSaverServlet.java
 * @author: Victor
 * Description: Servlet que recebe os dados do jogo e os salva em base de dados, redirecionando para a página de ranking após a operação
 */
@WebServlet("/RankingSaverServlet")
public class RankingSaverServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RankingSaverServlet() {
        super();
    }
    
    /**
	 * Método post: Tentativa de acesso ao ranking autorizada.
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//recebimento de parâmetros enviados pela página
    	String name = request.getParameter("name");
    	short score = Short.parseShort(request.getParameter("score")),
    			level = Short.parseShort(request.getParameter("level"));
    	
    	try{
			Connection_DAO cDAO = new Connection_DAO();//criação da conexão com a base de dados
			boolean resultado = cDAO.saveRanking(new RankingItem(name, score, level));//salva o registro no ranking
			
			if(resultado) response.sendRedirect("ranking.jsp");//se o registro foi salvo com sucesso, o site redireciona para a tela de ranking
		}
    	catch(Exception e){//possível erro n
			e.printStackTrace();
		}
	}
    
	/**
	 * Método get: Tentativa de acesso ao ranking via url. Não autorizar.
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		
		PrintWriter out = response.getWriter();
		
		//geração de página de aviso
		out.println("<!DOCTYPE html>");
		out.println("<html lang='pt-br'>");
		out.println("	<head>");
		out.println("		<title>Speed Snake Beta | Método GET</title>");
		out.println("	</head>");
		out.println("	<body>");
		out.println("		<h1>Acesso não autorizado ao método GET!</h1> <br />");
		out.println("		<h3>Para subir no ranking, treine e jogue honestamente ;-) <br /> <a href='index.html'>Retornar ao jogo</a></h3>");
		out.println("		<div style='position: absolute; bottom: 10px; width: 100%;'>");
		out.println("			<hr /> <p>Game by Victor Hugo Batista</p> <br />");
		out.println("			<p style='font-size: 10pt;'>You shall not pass</p>");
		out.println("		</div>");
		out.println("	</body>");
		out.println("</html>");
	}
}