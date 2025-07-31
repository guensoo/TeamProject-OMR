package OMR.teamProject.OMR.User.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.User.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
//    Optional<UserEntity> findByUsername(String username);
}