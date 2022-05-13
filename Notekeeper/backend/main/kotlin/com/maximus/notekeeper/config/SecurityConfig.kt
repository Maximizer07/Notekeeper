package com.maximus.notekeeper.config

import com.maximus.notekeeper.jwt.JwtFilter
import com.maximus.notekeeper.services.AuthService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import javax.servlet.http.HttpServletRequest

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private var jwtFilter: JwtFilter,
    private var authService: AuthService

) : WebSecurityConfigurerAdapter(), WebMvcConfigurer {
    fun SecurityConfig(jwtFilter: JwtFilter, authService: AuthService) {
        this.jwtFilter = jwtFilter;
        this.authService = authService;
    }

    override fun configure(http: HttpSecurity?) {
        http!!.csrf().disable()
            .httpBasic().disable()
            .cors()
            .and()
            .authorizeHttpRequests()
            .antMatchers("/registration", "/signup", "/", "/home").permitAll()
            .antMatchers("/api/admin/**", "/logout").hasRole("ADMIN")
            .antMatchers("/api/user/**", "/logout").hasRole("USER")
            .and()
            .userDetailsService(authService).exceptionHandling()
            .authenticationEntryPoint { request: HttpServletRequest?, response: HttpServletResponse, authException: AuthenticationException? ->
                response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized"
                )
            }
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter::class.java);
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "PATCH")
            .allowCredentials(true)
    }
}