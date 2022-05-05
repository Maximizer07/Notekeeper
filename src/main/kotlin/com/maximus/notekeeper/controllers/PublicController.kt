package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.AuthInput
import com.maximus.notekeeper.models.RegistrationInput
import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class PublicController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {
    @GetMapping(value = ["/api/public/notes"])
    fun getAllNotes(): List<Note> {
        val user = userService.findByName(SecurityContextHolder.getContext().authentication.principal.toString())
        return noteService.getAllUserNotes(user!!)
    }
    @GetMapping(value = ["/api/public/notes/{id}"])
    fun getNote(@RequestBody id: Int): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        val user = userService.findByName(SecurityContextHolder.getContext().authentication.principal.toString())
        return if (user == note?.user)
            ResponseEntity(note,HttpStatus.OK)
        else
            ResponseEntity(null,HttpStatus.NOT_FOUND)
    }
    @PostMapping("/registration")
    fun login(@RequestBody registrationInput: RegistrationInput): ResponseEntity<String> {
        return userService.addUser(registrationInput)
    }
    @PostMapping("/login")
    fun auth(@RequestBody authInput: AuthInput): ResponseEntity<String> {
        return userService.login(authInput)
    }
}