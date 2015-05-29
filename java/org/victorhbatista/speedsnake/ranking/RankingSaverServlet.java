package org.victorhbatista.speedsnake.ranking;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.victorhbatista.speedsnake.database.Connection_DAO;
import org.victorhbatista.speedsnake.model.RankingItem;

/**
 * Speed Snake Beta - 28 05 2015
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
        // TODO Auto-generated constructor stub
    }

    /**
	 * Função principal do servlet
	 */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
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
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
}