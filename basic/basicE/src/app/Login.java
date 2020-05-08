package app;

import java.io.PrintWriter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Login {
	public static void loginCertification(PrintWriter pw, String status) throws JsonProcessingException {
		if(status == null) {
			pw.append(new ObjectMapper().writeValueAsString("No"));
			return;
		}
	}
}
