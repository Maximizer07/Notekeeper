package com.maximus.notekeeper.services

import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.repositories.NoteRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class NoteService(
    @Autowired
    private val noteRepository: NoteRepository
) {
    fun createNote(note: Note) = noteRepository.save(note)
    fun readAll(): List<Note> = noteRepository.findAll()
    fun getAllUserNotes(user: User) = noteRepository.findAllByUser(user)
    fun findById(id: Int) = noteRepository.findById(id)
    fun findByUser(user: User) = noteRepository.findByUser(user)
    fun deleteById(id: Int) = noteRepository.deleteById(id)
}