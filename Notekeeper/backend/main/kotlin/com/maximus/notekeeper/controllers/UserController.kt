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
class UserController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {

    @GetMapping("/api/public/hello")
    fun hello(@CurrentSecurityContext(expression = "authentication.username") username: String): List<Note> {
        return noteService.getAllUserNotes(userService.findByUsername(username)!!);
    }
    @GetMapping(value = ["/api/public/notes"])
    fun getAllNotes(@CurrentSecurityContext(expression = "authentication.username") username: String): List<Note> {
        return noteService.getAllUserNotes(userService.findByUsername(username)!!)
    }

    @PostMapping(value = ["/api/public/notes"])
    fun createNote(@CurrentSecurityContext(expression = "authentication.username") username: String, @RequestBody noteInput: NoteInput): ResponseEntity<String> {
        return noteService.createNote(noteInput, userService.findByUsername(username)!!)
    }
    @GetMapping(value = ["/api/public/notes/{id}"])
    fun getNote(@CurrentSecurityContext(expression = "authentication.username") username: String, @PathVariable id: Int): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username)!! == note?.user)
            ResponseEntity(note, HttpStatus.OK)
        else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }

    @PutMapping(value = ["/api/public/notes/{id}"])
    fun updateNote(@CurrentSecurityContext(expression = "authentication.username") username: String, @PathVariable id: Int, @RequestBody note_edit: Note): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username)!! == note?.user) {
            noteService.updateNote(note, note_edit.text!!)
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }

    @DeleteMapping(value = ["/api/public/notes/{id}"])
    fun deleteNote(@CurrentSecurityContext(expression = "authentication.name") username: String, @PathVariable("id") id: Int = 0): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username)!! == note?.user) {
            noteService.deleteById(note.id!!);
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }
}