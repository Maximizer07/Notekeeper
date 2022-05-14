package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/admin")
class AdminController(
    @Autowired
    val noteService: NoteService,
    @Autowired
    val userService: UserService
) {
    @GetMapping(value = ["/notes"])
    fun getNotes(): List<Note> {
        println(noteService.readAll())
        return noteService.readAll()
    }

    //@GetMapping(value = ["/notes/{id}"])
    //fun getNote(@RequestBody user: User, id: Int): List<Note> {
    //    return noteService.getAllUserNotes(user)
    //}
}