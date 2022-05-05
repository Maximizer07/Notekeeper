package com.maximus.notekeeper.config

import com.maximus.notekeeper.jwt.JwtFilter
import com.maximus.notekeeper.services.UserService

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.util.*

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private var userService: UserService,
    @Autowired
    private val jwtFilter: JwtFilter
) : WebSecurityConfigurerAdapter(), WebMvcConfigurer {
    @Autowired
    fun setUserDetailsService( userService: UserService?) {
        this.userService = userService!!
    }
    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        auth
            .userDetailsService(userService)
            .passwordEncoder(BCryptPasswordEncoder())
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://localhost:8080")
        configuration.allowedMethods = listOf("GET","POST","UPDATE","OPTIONS","DELETE")
        configuration.allowCredentials = true
        configuration.addAllowedHeader("Authorization")
        configuration.allowedHeaders = Collections.singletonList("*")
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        val source = UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source
    }
    override fun configure(http: HttpSecurity?) {
        http!!.httpBasic().disable().cors()
            .and()
            .csrf()
            .disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            //Доступ только для не зарегистрированных пользователей
            .antMatchers("/registration","/login","/add_user").not().authenticated()
            //Доступ только для пользователей с ролью Admin
            .antMatchers("/api/admin/**").hasRole("ADMIN")
            //Доступ только для пользователей с ролью User
            .antMatchers("/api/public/**").hasRole("USER")
            //Доступ  для всех пользователей
            .antMatchers("/about/**","/css/**","/js/**","/img/**","/logout","/auth","/","/v3/**","/swagger-ui/**","/public/**").permitAll()
            .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
            //Доступ к остальным запросам только  для авторизованных пользователей
            .anyRequest().authenticated()
            .and().logout().disable()
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter::class.java);
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "PATCH")
            .allowCredentials(true)
    }
}