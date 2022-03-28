package com.ssafy.chaintract.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String [] swagger ={"/v2/**",
                "/configuration/**",
                "/swagger*/**",
                "/webjars/**",
                "/swagger-resources/**"};

        http.authorizeRequests()
                .antMatchers(swagger).permitAll()
                .and()
                .csrf().disable();
    }
}
