package com.ssafy.chaintract.repository;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findAllByUser(User user);
    Optional<Contract> findById(Long contractId);
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Transactional
    @Query("update contract c " +
            "set c.est_date = :date, " +
            "c.isEstablished = true " +
            "where c.id = :contractId")
    int completeContract(long contractId, Date date);
    @Query("select c from contract c, participant p " +
            "where c.id = p.contract.id " +
            "AND p.user.id = :userId " +
            "AND c.isEstablished = :isEstablished " +
            "AND p.isSigned = :isSigned")
    Optional<List<Contract>> getContracts(long userId, boolean isEstablished, boolean isSigned);
}
