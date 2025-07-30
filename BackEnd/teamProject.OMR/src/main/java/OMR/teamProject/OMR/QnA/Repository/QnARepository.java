package OMR.teamProject.OMR.QnA.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.QnA.Entity.QnAEntity;

public interface QnARepository extends JpaRepository<QnAEntity, Long> {}