package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.*
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.CurrentSecurityContext
import org.springframework.web.bind.annotation.*
import javax.transaction.Transactional

@RequestMapping("/api/notes")
@Transactional
@RestController
class NoteController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {
    @GetMapping(value = [""])
    fun getAllNotes(@CurrentSecurityContext(expression = "authentication.name") username: String): List<Note> {
        println("lol")
        return noteService.getAllUserNotes(userService.findByUsername(username))
    }

    @GetMapping(value = ["/new"])
    fun createNote(
        @CurrentSecurityContext(expression = "authentication.name") username: String
    ): Note {
        return noteService.createNote(userService.findByUsername(username))
    }

    @PostMapping(value = [""])
    fun saveNotes(
        @CurrentSecurityContext(expression = "authentication.name") username: String, @RequestBody allNotes: List<NotesPostModel>
    ) {
        noteService.saveNotes(allNotes)
    }

    @GetMapping(value = ["/{id}"])
    fun getNote(
        @CurrentSecurityContext(expression = "authentication.name") username: String,
        @PathVariable id: Int
    ): ResponseEntity<GetNoteByIdResponse> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username) == note?.user)
            ResponseEntity(GetNoteByIdResponse(note = note, success = true), HttpStatus.OK)
        else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }

    @PutMapping(value = ["/{id}"])
    fun updateNote(
        @CurrentSecurityContext(expression = "authentication.name") username: String,
        @PathVariable id: Int,
        @ModelAttribute addNoteResponse: AddNoteResponse
    ): ResponseEntity<SuccessResponse> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username) == note?.user || note == null) {
            noteService.updateNote(note!!, addNoteResponse)
            ResponseEntity(SuccessResponse(success = true), HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }


    @DeleteMapping(value = ["{id}"])
    fun deleteNote(
        @CurrentSecurityContext(expression = "authentication.name") username: String,
        @PathVariable("id") id: Int
    ): ResponseEntity<Note?> {
        val note: Note? = noteService.findById(id)
        return if (userService.findByUsername(username) == note?.user) {
            noteService.deleteById(note.id!!);
            ResponseEntity(note, HttpStatus.OK);
        } else
            ResponseEntity(null, HttpStatus.FORBIDDEN)
    }
}