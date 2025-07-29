package OMR.teamProject.OMR.Notice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.Notice.Entity.NoticeEntity;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {}