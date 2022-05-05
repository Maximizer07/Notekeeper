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
class UserService(
    @Autowired
    private var userRepository: UserRepository,
    @Autowired
    val jwtProvider: JwtProvider,
    private var bCryptPasswordEncoder: BCryptPasswordEncoder = BCryptPasswordEncoder()
) : UserDetailsService {
    fun addUser(regInput: RegistrationInput): ResponseEntity<String> {
        val user = User(name = regInput.name, password = regInput.password, email = regInput.email)
        val encryptedPassword = bCryptPasswordEncoder.encode(user.password)
        user.password = encryptedPassword
        user.notes = ArrayList()
        user.isEnabled = true
        user.role = Role.ROLE_USER
        userRepository.save(user)
        return ResponseEntity(user.toString(), HttpStatus.OK)
    }

    fun readAll(): List<User> = userRepository.findAll()
    fun findById(id: Int) = userRepository.findById(id)
    fun findByName(name: String) = userRepository.findByName(name)
    fun findByEmail(email: String) = userRepository.findByEmail(email)
    fun deleteById(id: Int) = userRepository.deleteById(id)
    fun deleteByName(name: String) = userRepository.deleteByName(name)
    fun deleteByEmail(email: String) = userRepository.deleteByEmail(email)
    override fun loadUserByUsername(username: String?): UserDetails {
        val optionalUser: User? = userRepository.findByName(username!!);
        if (optionalUser != null) {
            return optionalUser
        }
        throw UsernameNotFoundException("Unknown user: $username")
    }

    fun login(authInput: AuthInput): ResponseEntity<String> {
        val userEntity = userRepository.findByName(authInput.name)
        if (userEntity != null) {
            if (bCryptPasswordEncoder.matches(authInput.password, userEntity.password)) {
                val userDetails: UserDetails = userEntity
                val token: String = jwtProvider.generateToken(authInput.name, userDetails.authorities)
                return ResponseEntity(token, HttpStatus.OK)
            } else {
                return ResponseEntity("Ошибка ввода данных", HttpStatus.UNAUTHORIZED)
            }
        }
        return ResponseEntity("Ошибка ввода данных", HttpStatus.UNAUTHORIZED)
    }
}