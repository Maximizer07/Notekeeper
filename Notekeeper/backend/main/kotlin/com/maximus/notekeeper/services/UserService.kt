package com.maximus.notekeeper.services

import com.maximus.notekeeper.jwt.JwtProvider
import com.maximus.notekeeper.models.*
import com.maximus.notekeeper.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service


@Service
class UserService(
    @Autowired
    private var userRepository: UserRepository,
    private var bCryptPasswordEncoder: BCryptPasswordEncoder = BCryptPasswordEncoder()
    ) {
    fun readAll(): List<User> = userRepository.findAll()
    fun findById(id: Int) = userRepository.findById(id)
    fun findByUsername(username: String): User = userRepository.findByUsername(username)!!
    fun findByEmail(email: String) = userRepository.findByEmail(email)
    fun deleteById(id: Int) = userRepository.deleteById(id)
    fun deleteByUsername(username: String) = userRepository.deleteByUsername(username)
    fun deleteByEmail(email: String) = userRepository.deleteByEmail(email)

    fun getProfile(username: String): ProfileResponse{
        val user = findByUsername(username)
        return ProfileResponse(username= user.username, email = user.getEmail(), name=user.getName(), id = user.getId()!!, role=user.role!!)
    }

    fun updateProfile(username: String, profileResponse: ProfileResponse): ResponseEntity<String>{
        if (userRepository.findByEmail(profileResponse.email) != null &&
            userRepository.findByEmail(profileResponse.email) != userRepository.findByUsername(username)){
            return ResponseEntity("Not unique email", HttpStatus.CONFLICT)
        }
        val user = findByUsername(username)
        user.setName(profileResponse.name)
        user.setEmail(profileResponse.email)
        userRepository.save(user)
        return ResponseEntity("Update success", HttpStatus.OK)
    }

    fun updatePassword(username: String, changePassResponse: ChangePassResponse): ResponseEntity<String>{
        val user = findByUsername(username)
        if (!bCryptPasswordEncoder.matches(changePassResponse.password, user.password)) {
            return ResponseEntity("Wrong password", HttpStatus.CONFLICT)
        }
        else{
            val encryptedPassword = bCryptPasswordEncoder.encode(changePassResponse.newPassword)
            println(changePassResponse.toString()+encryptedPassword+user.password)
            user.password = encryptedPassword
            userRepository.save(user)
            return ResponseEntity("Password update success", HttpStatus.OK)
        }
    }
}