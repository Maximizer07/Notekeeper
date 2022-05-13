package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class ChangePassResponse(
    val username: String,
    val password: String,
    val newPassword: String
)