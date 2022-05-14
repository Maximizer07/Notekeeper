package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class GetNoteByIdResponse(
    val note: Note,
    val success: Boolean
)