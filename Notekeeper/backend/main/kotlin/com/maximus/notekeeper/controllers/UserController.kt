package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.*
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.CurrentSecurityContext
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/user")
class UserController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {
    @GetMapping(value = ["/profile"])
    fun getUserData(@CurrentSecurityContext(expression = "authentication.name") username: String): ProfileResponse {
        return userService.getProfile(username)
    }

    @PostMapping(value = ["/profile"])
    fun updateUserDate(
        @CurrentSecurityContext(expression = "authentication.name") username: String,
        @ModelAttribute profileResponse: ProfileResponse
    ): ResponseEntity<String> {
        return if (username != profileResponse.username)
            ResponseEntity(null, HttpStatus.FORBIDDEN)
        else
            return userService.updateProfile(username, profileResponse)

    }

    @PostMapping(value = ["/changepass"])
    fun updatePassword(
        @CurrentSecurityContext(expression = "authentication.name") username: String,
        @ModelAttribute changePassResponse: ChangePassResponse
    ): ResponseEntity<String> {
        return if (username != changePassResponse.username)
            ResponseEntity(null, HttpStatus.FORBIDDEN)
        else
            return userService.updatePassword(username, changePassResponse)

    }
}