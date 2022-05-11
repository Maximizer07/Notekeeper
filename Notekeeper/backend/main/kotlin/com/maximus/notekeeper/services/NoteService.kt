package com.maximus.notekeeper.services

import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.NoteInput
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.repositories.NoteRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
class NoteService(
    @Autowired
    private val noteRepository: NoteRepository
) {
    fun createNote(noteInput: NoteInput, user: User) : ResponseEntity<String> {
        val note = Note(text = noteInput.text, user = user)
        noteRepository.save(note);
        return ResponseEntity(note.toString(), HttpStatus.OK)
    }

    fun updateNote(note: Note, text: String) {
        note.text = text
        noteRepository.save(note)
    }
    fun readAll(): List<Note> = noteRepository.findAll()
    fun getAllUserNotes(user: User) = noteRepository.findAllByUser(user)
    fun findById(id: Int) = noteRepository.findById(id)
    fun findByUser(user: User) = noteRepository.findByUser(user)
    fun deleteById(id: Int) {
        return noteRepository.deleteById(id)
    }
}