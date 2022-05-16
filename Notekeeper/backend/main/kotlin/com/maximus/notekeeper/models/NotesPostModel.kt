package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class NotesPostModel(
    val id: Int,
    val title: String,
    val text: String,
    val last_modified: String
)