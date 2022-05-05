package com.maximus.notekeeper.jwt

import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler
import org.springframework.web.filter.GenericFilterBean
import java.io.IOException
import javax.servlet.http.HttpServletRequest

import org.springframework.stereotype.Component
import org.springframework.util.StringUtils.hasText
import javax.servlet.*
import javax.servlet.http.HttpServletResponse

@Component
class JwtFilter(
    @Autowired
    private val jwtProvider: JwtProvider,

    @Autowired
    private val customUserDetailsService: UserService
) : GenericFilterBean(
) {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(servletRequest: ServletRequest, servletResponse: ServletResponse, filterChain: FilterChain) {
        val token = getTokenFromRequest(servletRequest as HttpServletRequest)
        if (token != null && jwtProvider.validateToken(token)) {
            val userLogin: String = jwtProvider.getLoginFromToken(token)
            val customUserDetails= customUserDetailsService.loadUserByUsername(userLogin)
            val auth = UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities())
            SecurityContextHolder.getContext().authentication = auth
        }
        filterChain.doFilter(servletRequest, servletResponse)
    }

    private fun getTokenFromRequest(request: HttpServletRequest): String? {
        if(request.cookies?.get(0)!=null){
            return request.cookies?.get(0)?.value
        }
        val bearer = request.getHeader(AUTHORIZATION)
        return if (hasText(bearer) && bearer.startsWith("Bearer ")) {
            bearer.substring(7)
        } else null
    }

    companion object {
        const val AUTHORIZATION = "Authorization"
    }
}