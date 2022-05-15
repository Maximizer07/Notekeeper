package com.maximus.notekeeper.controllers

import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.Role
import com.maximus.notekeeper.models.SetRoleResponse
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.services.NoteService
import com.maximus.notekeeper.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import javax.transaction.Transactional


@RestController
@Transactional
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
    @GetMapping(value = ["/users"])
    fun getUsers(): List<User> {
        return userService.readAll()
    }

    @GetMapping(value = ["/roles"])
    fun getRoles(): Array<Role> {
        return Role.values()
    }

    @PostMapping(value = ["/user/role"])
    fun SetUserRole(@ModelAttribute setRoleResponse: SetRoleResponse) {
        return userService.setUserRole(setRoleResponse)
    }
    @GetMapping("/users/{id}")
    fun findUser(@PathVariable id: Int): User? {
        return userService.findById(id)
    }

    @PutMapping("/users/{id}")
    fun updateUser(@PathVariable id: Int, @RequestBody user: User) : Boolean{
        return userService.updateUser(id, user)
    }

    @DeleteMapping("/users/{id}")
    fun deleteUser(@PathVariable id: Int) {
        return userService.deleteById(id)
    }

    //@GetMapping(value = ["/notes/{id}"])
    //fun getNote(@RequestBody user: User, id: Int): List<Note> {
    //    return noteService.getAllUserNotes(user)
    //}
}