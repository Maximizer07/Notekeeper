package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class AddNoteResponse(
    val title: String?="",
    val text: String?=""
)