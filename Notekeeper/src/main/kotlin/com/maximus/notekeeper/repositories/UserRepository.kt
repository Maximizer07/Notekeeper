package com.maximus.notekeeper.repositories

import com.maximus.notekeeper.models.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository: JpaRepository <User, Long> {
    fun findById(id: Int): User?
    fun findByName(name: String): User?
    fun findByEmail(email: String): User?
    fun deleteById(id: Int)
    fun deleteByName(name: String)
    fun deleteByEmail(email: String)
}