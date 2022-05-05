package com.maximus.notekeeper

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NotekeeperApplication

fun main(args: Array<String>) {
    runApplication<NotekeeperApplication>(*args)
}
