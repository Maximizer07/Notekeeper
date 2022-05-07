package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.*
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

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

    @PostMapping(value = ["/api/public/notes"])
    fun createNote(@RequestBody noteInput: NoteInput): ResponseEntity<String> {
        val user = userService.findByName(SecurityContextHolder.getContext().authentication.principal.toString());
        return noteService.createNote(noteInput, user!!)
    }
    @GetMapping(value = ["/api/public/notes/{id}"])
    fun getNote(@PathVariable id: Int): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        val user = userService.findByName(SecurityContextHolder.getContext().authentication.principal.toString())
        return if (user == note?.user)
            ResponseEntity(note, HttpStatus.OK)
        else
            ResponseEntity(null, HttpStatus.NOT_FOUND)
    }

    @PutMapping(value = ["/api/public/notes/{id}"])
    fun updateNote(@PathVariable id: Int): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        val user = userService.findByName(SecurityContextHolder.getContext().authentication.principal.toString())
        return if (user == note?.user) {

            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.NOT_FOUND)
    }

    @DeleteMapping(value = ["/api/public/notes/{id}"])
    fun deleteNote(@PathVariable id: Int): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        val user = userService.findByName(SecurityContextHolder.getContext().authentication.principal.toString())
        return if (user == note?.user) {
            noteService.deleteById(note!!.id!!.toInt());
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.NOT_FOUND)
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