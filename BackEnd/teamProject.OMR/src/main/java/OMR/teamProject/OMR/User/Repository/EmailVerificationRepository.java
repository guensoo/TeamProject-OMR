package OMR.teamProject.OMR.User.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import OMR.teamProject.OMR.User.Entity.EmailVerification;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
	Optional<EmailVerification> findByEmail(String email);
    
	@Modifying
    @Transactional
    @Query("delete from EmailVerification e where e.email = :email")
    void deleteByEmail(@Param("email") String email);
}
