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
    private var id: Long? = null,
    private var name: String = "",
    private var password: String = "",
    private var email: String = "",
    private var enabled: Boolean = true,
    var role: Role? = Role.ROLE_USER,

    @OneToMany(fetch = FetchType.LAZY, cascade = [CascadeType.ALL], mappedBy = "user")
    var notes: List<Note>? = ArrayList()

) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority?>? {
        if (role!=null) {
            val simpleGrantedAuthority = SimpleGrantedAuthority(role?.name)
            return Collections.singletonList(simpleGrantedAuthority)
        }
        return null
    }
    fun setPassword(password: String){
        this.password = password
    }
    fun setEnabled(enabled: Boolean){
        this.enabled = enabled
    }
    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return name
    }
    fun getEmail(): String {
        return email;
    }
    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean {
        return enabled
    }
}