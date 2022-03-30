package com.ssafy.chaintract.config;

import com.ssafy.chaintract.interceptor.LoginCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override public void addCorsMappings(CorsRegistry registry){ registry.addMapping("/**") .allowedOrigins("http://localhost:3000"); }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/","/auth/login","/swagger-ui/**","/swagger-resources/**","/v3/api-docs","/test");
    }
}