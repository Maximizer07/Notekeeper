package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class RegistrationInput(
    val username:String,
    val name:String? = "",
    val password:String,
    val email:String? = ""
)