package com.maximus.notekeeper.services

import com.maximus.notekeeper.models.AddNoteResponse
import com.maximus.notekeeper.models.Note
import com.maximus.notekeeper.models.NotesPostModel
import com.maximus.notekeeper.models.User
import com.maximus.notekeeper.repositories.NoteRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.transaction.Transactional


@Service
@Transactional
class NoteService(
    @Autowired
    private val noteRepository: NoteRepository
) {
    fun createNote(user: User) : Note{
        return noteRepository.save(Note(title = "Untitled Note", user = user, text = "", last_modified = "update"))
    }

    fun updateNote(note: Note, addNoteResponse: AddNoteResponse) {
        println(note)
        println(addNoteResponse)
        note.text = addNoteResponse.text
        note.title = addNoteResponse.title
        noteRepository.save(note)
        println(addNoteResponse)
    }
    fun readAll(): List<Note> = noteRepository.findAll()
    fun getAllUserNotes(user: User) : List<Note> {
        return noteRepository.findAllByUser(user)
    }

    fun saveNotes(list_notes : List<NotesPostModel>){
        list_notes.forEach{
            val note = findById(it.id)!!
            note.title = it.title
            note.text = it.text
            note.last_modified = it.last_modified
            noteRepository.save(note)
        }
    }
    fun findById(id: Int) = noteRepository.findById(id)
    fun findByUser(user: User) = noteRepository.findByUser(user)
    fun deleteById(id: Int) {
        return noteRepository.deleteById(id)
    }
}