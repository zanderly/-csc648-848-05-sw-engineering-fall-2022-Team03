package com.Team03.TVFM.api;


import com.Team03.TVFM.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

import javax.persistence.Query;
import javax.transaction.Transactional;

@RestController
@RequestMapping("")
public class TvfmAPI {

    //------Customer path-------//
    @Autowired
    private CustomerRepo CustomerRepo;
    @DeleteMapping(value = "/delete/customer/{id}")
    public String deleteCustomer(@PathVariable long id) {
        Customer customer = CustomerRepo.findById(id).get();
        CustomerRepo.delete(customer);
        return "deleted";
    }

    @GetMapping(value = "/all/customer")
    public List<Customer> getAllCustomers() {
        return CustomerRepo.findAll();
    }

    @PostMapping(value = "/add/customer")
    public String addCustomer(@RequestBody Customer customer) {
        CustomerRepo.save(customer);
        return "Saved";
    }


    //-------Vendor paths--------//
    @Autowired
    private VendorRepository VendorRepository;

    @DeleteMapping(value = "/delete/vendor/{id}")
    public String delete(@PathVariable long id) {
        Vendor vendor = VendorRepository.findById(id).get();
        VendorRepository.delete(vendor);
        return "deleted";
    }

    @GetMapping(value = "/all/vendor")
    public List<Vendor> getAllVendors() {
        return VendorRepository.findAll();
    }

    @PostMapping(value = "/add/vendor")
    public String addVendors(@RequestBody Vendor vendor) {
        VendorRepository.save(vendor);
        return "Saved";
    }

    @PutMapping(value = "/update/vendor/{id}")
    public String updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        Vendor updateVendor = VendorRepository.findById(id).get();
        updateVendor.setEmail(vendor.getEmail());
        updateVendor.setPassword(vendor.getPassword());
        VendorRepository.save(updateVendor);
        return "updated";
    }

    //---------Items paths--------//

    @Autowired
    private ItemsRepo ItemsRepo;
    @PostMapping(value = "/add/item")
    public String addItems(@RequestBody Items item) {
        ItemsRepo.save(item);
        return "Saved";
    }

    @GetMapping(value = "/all/item")
    public List<Items> getAllItems() {
        return ItemsRepo.findAll();
    }

    @DeleteMapping(value = "/remove/item/{id}")
    public String removeItem(@PathVariable long id){
        Items item = ItemsRepo.findById(id).get();
        ItemsRepo.delete(item);
        return "deleted";
    }

    @PutMapping(value = "/update/item/{id}")
    public String updateItem(@PathVariable Long id, @RequestBody Items item) {
        Items updateItem = ItemsRepo.findById(id).get();
        updateItem.setName(item.getName());
        updateItem.setQuantity(item.getQuantity());
        updateItem.setPrice(item.getPrice());
        updateItem.setDescription(item.getDescription());
        updateItem.setNutrition(item.getNutrition());
        ItemsRepo.save(updateItem);
        return "updated";
    }


    //----------Search-----------//

    @Transactional
    @GetMapping(value = "/search")
    public List<Items> searchItem(@RequestBody Items item){
        List<Items> itemRepoHolder;

        if(item.getId() instanceof Long){
            itemRepoHolder = ItemsRepo.findItembyID(item.getId());  //to look with an id
        }
        else if(item.getName() instanceof String){
            itemRepoHolder = ItemsRepo.findItem(item.getName());  //to look with a name, description, nutrition
        }
        else{
            System.out.println("Item not found");
            itemRepoHolder = null;
        }

        //for a recommendation, may have to change it later
        if(itemRepoHolder.isEmpty()){
            Random rand = new Random();
            int num = rand.nextInt((ItemsRepo.maxID() - 1) + 1) + 1;

            itemRepoHolder = ItemsRepo.findItembyID(num);
        }

        return itemRepoHolder; 

    }
}
