package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.AuthInput
import com.maximus.notekeeper.models.RegistrationInput
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.services.AuthService
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
class AuthController(
    @Autowired
    val userService: UserService,
    val authService: AuthService
) {
    @PostMapping("/signup")
    fun login(@ModelAttribute registrationInput: RegistrationInput): User {
        return authService.signUp(registrationInput)
    }

    @PostMapping("/login")
    fun auth(@RequestBody authInput: AuthInput): ResponseEntity<String> {
        return authService.login(authInput)
    }
}