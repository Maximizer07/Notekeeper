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
    ) {
    fun readAll(): List<User> = userRepository.findAll()
    fun findById(id: Int) = userRepository.findById(id)
    fun findByUsername(username: String) = userRepository.findByUsername(username)
    fun findByEmail(email: String) = userRepository.findByEmail(email)
    fun deleteById(id: Int) = userRepository.deleteById(id)
    fun deleteByUsername(username: String) = userRepository.deleteByUsername(username)
    fun deleteByEmail(email: String) = userRepository.deleteByEmail(email)

}