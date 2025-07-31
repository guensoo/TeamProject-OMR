package OMR.teamProject.OMR.User.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.User.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByUserId(String userId);
	Optional<UserEntity> findUserIdByEmail(String email);
    
//    boolean existsByUserId(String userId);
//    boolean existsByEmail(String email);
}