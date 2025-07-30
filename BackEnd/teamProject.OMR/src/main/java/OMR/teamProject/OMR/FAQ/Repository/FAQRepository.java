package OMR.teamProject.OMR.FAQ.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import OMR.teamProject.OMR.FAQ.Entity.FAQEntity;

@Repository
public interface FAQRepository extends JpaRepository<FAQEntity, Long> {
    List<FAQEntity> findAllByOrderBySortOrderAsc();
    
    @Query("SELECT f FROM FAQEntity f JOIN FETCH f.userData WHERE f.id = :id")
    FAQEntity findWithUserDataById(@Param("id")Long id);
}
