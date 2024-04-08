package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class DemoApplication extends SpringBootServletInitializer {

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(DemoApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void onReady() {
		System.out.println("✔ DEMO API running"
				+ (SERVER_PORT != 0 ? (" on PORT " + SERVER_PORT) : ""));
	}

	private static int SERVER_PORT;

	@Value("${server.port}")
	public void setServerPort(int port) {
		SERVER_PORT = port;
	}
}
