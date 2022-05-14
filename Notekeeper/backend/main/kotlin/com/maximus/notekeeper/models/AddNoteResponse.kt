package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class AddNoteResponse(
    val id: Int? = -1,
    val title: String,
    val text: String
)