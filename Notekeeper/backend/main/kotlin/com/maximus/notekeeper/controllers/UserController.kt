package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.*
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.CurrentSecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/user")
class UserController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {

    @GetMapping("hello")
    fun hello(@CurrentSecurityContext(expression = "authentication.username") username: String): List<Note> {
        return noteService.getAllUserNotes(userService.findByUsername(username));
    }

    @GetMapping(value = ["notes"])
    fun getAllNotes(@CurrentSecurityContext(expression = "authentication.username") username: String): List<Note> {
        return noteService.getAllUserNotes(userService.findByUsername(username))
    }

    @PostMapping(value = ["notes"])
    fun createNote(
        @CurrentSecurityContext(expression = "authentication.username") username: String,
        @RequestBody noteInput: NoteInput
    ): ResponseEntity<String> {
        return noteService.createNote(noteInput, userService.findByUsername(username))
    }

    @GetMapping(value = ["notes/{id}"])
    fun getNote(
        @CurrentSecurityContext(expression = "authentication.username") username: String,
        @PathVariable id: Int
    ): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username) == note?.user)
            ResponseEntity(note, HttpStatus.OK)
        else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }

    @PutMapping(value = ["notes/{id}"])
    fun updateNote(
        @CurrentSecurityContext(expression = "authentication.username") username: String,
        @PathVariable id: Int,
        @RequestBody note_edit: Note
    ): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username) == note?.user) {
            noteService.updateNote(note, note_edit.text!!)
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }

    @DeleteMapping(value = ["notes/{id}"])
    fun deleteNote(
        @CurrentSecurityContext(expression = "authentication.name") username: String,
        @PathVariable("id") id: Int = 0
    ): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username) == note?.user) {
            noteService.deleteById(note.id!!);
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }

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