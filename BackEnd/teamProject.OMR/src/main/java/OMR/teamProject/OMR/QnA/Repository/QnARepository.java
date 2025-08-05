package OMR.teamProject.OMR.QnA.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import OMR.teamProject.OMR.QnA.Entity.QnAEntity;

@Repository
public interface QnARepository extends JpaRepository<QnAEntity, Long> {
	
}