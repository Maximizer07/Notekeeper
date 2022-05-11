package com.maximus.notekeeper.services

import com.maximus.notekeeper.jwt.JwtProvider
import com.maximus.notekeeper.models.AuthInput
import com.maximus.notekeeper.models.RegistrationInput
import com.maximus.notekeeper.models.Role
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

import org.springframework.stereotype.Service

@Service
class AuthService(
    @Autowired
    private var userRepository: UserRepository,
    @Autowired
    val jwtProvider: JwtProvider,
    private var bCryptPasswordEncoder: BCryptPasswordEncoder = BCryptPasswordEncoder()
) : UserDetailsService {
    fun signUp(userInfo: RegistrationInput): User {
        println(userInfo)
        val user = User(username = userInfo.username, name= userInfo.name!!, password = userInfo.password, email = userInfo.email!!)
        val encryptedPassword = bCryptPasswordEncoder.encode(user.password)
        user.password = encryptedPassword
        user.notes = ArrayList()
        user.isEnabled = true
        user.role = Role.ROLE_USER
        userRepository.save(user)
        return userRepository.save(user)
    }

    override fun loadUserByUsername(username: String): UserDetails {
        val optionalUser: User? = userRepository.findByUsername(username);
        if (optionalUser != null) {
            return optionalUser
        }
        throw UsernameNotFoundException("Unknown user: $username")
    }

    fun login(authInput: AuthInput): ResponseEntity<String> {
        val userEntity = userRepository.findByUsername(authInput.username)
        if (userEntity != null) {
            if (bCryptPasswordEncoder.matches(authInput.password, userEntity.password)) {
                val userDetails: UserDetails = userEntity
                val token: String = jwtProvider.generateToken(authInput.username, userDetails.authorities)
                return ResponseEntity(token, HttpStatus.OK)
            } else {
                return ResponseEntity("Ошибка ввода данных", HttpStatus.UNAUTHORIZED)
            }
        }
        return ResponseEntity("Ошибка ввода данных", HttpStatus.UNAUTHORIZED)
    }
}