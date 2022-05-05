package com.maximus.notekeeper.repositories

import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NoteRepository: JpaRepository<Note, Long> {
    fun findById(id:Int): Note?
    fun findAllByUser(user: User): ArrayList<Note>
    fun findByUser(user:User): ArrayList<Note>
    fun deleteById(id: Int)
}