package com.maximus.notekeeper.models

import lombok.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*
import javax.persistence.*

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Int? = null,
    private var username: String = "",
    private var name: String = "",
    private var password: String = "",
    private var email: String = "",
    private var enabled: Boolean = true,
    var role: Role? = Role.ROLE_USER,

    @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL], mappedBy = "user")
    var notes: List<Note>? = ArrayList()

) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority?>? {
        if (role != null) {
            val simpleGrantedAuthority = SimpleGrantedAuthority(role?.name)
            return Collections.singletonList(simpleGrantedAuthority)
        }
        return null
    }

    fun setPassword(password: String) {
        this.password = password
    }
    fun setUsername(username: String) {
        this.username = username
    }

    fun setEnabled(enabled: Boolean) {
        this.enabled = enabled
    }

    fun getEmail(): String {
        return email
    }

    fun getName(): String {
        return name
    }

    fun setName(name : String) {
        this.name = name
    }

    fun setEmail(email : String) {
        this.email = email
    }
    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return username
    }

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean {
        return enabled
    }

    fun getId(): Int? {
        return id
    }

}