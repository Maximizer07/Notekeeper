package com.maximus.notekeeper.services

import com.maximus.notekeeper.models.*
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
    fun createNote(addNoteResponse: AddNoteResponse, user: User) : ResponseEntity<SuccessResponse> {
        val note = Note(title = addNoteResponse.title, text = addNoteResponse.text, user = user)
        noteRepository.save(note)

        return ResponseEntity(SuccessResponse(success = true), HttpStatus.OK)
    }

    fun updateNote(note: Note, addNoteResponse: AddNoteResponse) {
        note.text = addNoteResponse.text
        note.title = addNoteResponse.title
        noteRepository.save(note)
        println(addNoteResponse)
    }
    fun readAll(): List<Note> = noteRepository.findAll()
    fun getAllUserNotes(user: User) : ResponseEntity<ListNotesResponse> {
        val listNotesResponse = ListNotesResponse(listNotes = noteRepository.findAllByUser(user), success = true)
        println(listNotesResponse)
        return ResponseEntity(listNotesResponse, HttpStatus.OK)
    }
    fun findById(id: Int) = noteRepository.findById(id)
    fun findByUser(user: User) = noteRepository.findByUser(user)
    fun deleteById(id: Int) {
        return noteRepository.deleteById(id)
    }
}