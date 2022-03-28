package com.ssafy.chaintract.repository;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
//    Contract save(Contract contract);
    List<Contract> findAllByUser(User user);
    Optional<Contract> findById(Long contractId);
    @Query("update contract c set c.est_date = :date where c.id = :contractId")
    long completeContract(long contractId, Date date);
    @Query("select c from contract c, participant p where c.id = p.contract.id and p.user.id = :userId and c.isEstablished = :isEstablished and p.isSigned = :isSigned")
    Optional<List<Contract>> getContracts(long userId, boolean isEstablished, boolean isSigned);
}
