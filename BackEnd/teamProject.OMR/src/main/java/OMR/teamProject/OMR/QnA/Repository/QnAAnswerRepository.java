package OMR.teamProject.OMR.QnA.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.QnA.Entity.QnAAnswerEntity;

public interface QnAAnswerRepository extends JpaRepository<QnAAnswerEntity, Long> {
    Optional<QnAAnswerEntity> findByQnaId(Long qnaId);
}