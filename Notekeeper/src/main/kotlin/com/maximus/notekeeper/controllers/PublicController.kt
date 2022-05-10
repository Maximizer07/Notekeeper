package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.AuthInput
import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.NoteInput
import com.maximus.notekeeper.models.RegistrationInput
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.CurrentSecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
class PublicController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {

    @GetMapping("/api/public/hello")
    fun hello(@CurrentSecurityContext(expression = "authentication.name") username: String): List<Note> {
        return noteService.getAllUserNotes(userService.findByName(username)!!);
    }
    @GetMapping(value = ["/api/public/notes"])
    fun getAllNotes(@CurrentSecurityContext(expression = "authentication.name") username: String): List<Note> {
        return noteService.getAllUserNotes(userService.findByName(username)!!)
    }

    @PostMapping(value = ["/api/public/notes"])
    fun createNote(@CurrentSecurityContext(expression = "authentication.name") username: String, @RequestBody noteInput: NoteInput): ResponseEntity<String> {
        return noteService.createNote(noteInput, userService.findByName(username)!!)
    }
    @GetMapping(value = ["/api/public/notes/{id}"])
    fun getNote(@CurrentSecurityContext(expression = "authentication.name") username: String, @PathVariable id: Int): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByName(username)!! == note?.user)
            ResponseEntity(note, HttpStatus.OK)
        else
            ResponseEntity(null, HttpStatus.NOT_FOUND)
    }

    @PutMapping(value = ["/api/public/notes/{id}"])
    fun updateNote(@CurrentSecurityContext(expression = "authentication.name") username: String, @PathVariable id: Int, @RequestBody note_edit: Note): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByName(username)!! == note?.user) {
            noteService.updateNote(note, note_edit.text!!)
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.NOT_FOUND)
    }

    @DeleteMapping(value = ["/api/public/notes/{id}"])
    fun deleteNote(@CurrentSecurityContext(expression = "authentication.name") username: String, @PathVariable("id") id: Int = 0): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByName(username)!! == note?.user) {
            noteService.deleteById(note.id!!);
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