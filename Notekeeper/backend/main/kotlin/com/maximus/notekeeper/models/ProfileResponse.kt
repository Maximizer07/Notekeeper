package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class ProfileResponse(
    val id: Int,
    val role: Role,
    val username:String,
    val name:String,
    val email:String
)