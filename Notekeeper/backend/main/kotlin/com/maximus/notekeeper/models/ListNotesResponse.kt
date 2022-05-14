package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class ListNotesResponse(
    val listNotes: List<Note>,
    val success: Boolean
)