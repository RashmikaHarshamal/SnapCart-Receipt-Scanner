package com.snapcart.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class GoogleVisionConfig {

    @Value("${google.cloud.vision.credentials.location}")
    private String credentialsLocation;

    @Bean
    public ImageAnnotatorClient imageAnnotatorClient() throws IOException {
        GoogleCredentials credentials = GoogleCredentials
            .fromStream(new ClassPathResource("service-account-key.json").getInputStream());
        
        ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
            .setCredentialsProvider(() -> credentials)
            .build();
            
        return ImageAnnotatorClient.create(settings);
    }
}