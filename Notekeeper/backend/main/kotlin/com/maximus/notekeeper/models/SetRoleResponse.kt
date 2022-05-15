package com.maximus.notekeeper.models

import lombok.AllArgsConstructor
import lombok.Data

@Data
@AllArgsConstructor
data class SetRoleResponse(
    val id: Int,
    val role: Role
)