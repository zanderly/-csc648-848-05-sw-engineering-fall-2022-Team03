package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Team03.TVFM.model.OrderDetails;

import java.util.List;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long>
{

}