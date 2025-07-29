package OMR.teamProject.OMR.FAQ.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import OMR.teamProject.OMR.FAQ.Entity.FAQEntity;

public interface FAQRepository extends JpaRepository<FAQEntity, Long> {
    List<FAQEntity> findAllByOrderBySortOrderAsc();
}
