package com.Team03.TVFM.api;


import com.Team03.TVFM.model.Client;
import com.Team03.TVFM.model.ClientRepository;
import com.Team03.TVFM.model.Items;
import com.Team03.TVFM.model.ItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class TvfmAPI
{
    @Autowired
    private ClientRepository ClientRepository;

    @DeleteMapping(value = "/remove/vendor/{id}")
    public String remove(@PathVariable long id){
        Client deleteUser = ClientRepository.findById(id).get();
        ClientRepository.delete(deleteUser);
        return "deleted";
    }
    @GetMapping(value = "/all/vendor")
    public List<Client> getAll(){
        return ClientRepository.findAll();
    }
    @PostMapping(value = "/add/vendor")
    public String add(@RequestBody Client client)
    {
        ClientRepository.save(client);
        return "Saved";
    }

    @PutMapping(value = "/update/vendor/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody Client client){
        Client updateUser = ClientRepository.findById(id).get();
        updateUser.setEmail(client.getEmail());
        updateUser.setPassword(client.getPassword());
        ClientRepository.save(updateUser);
        return "updated";
    }

    //For items--------------------------

    @Autowired
    private ItemsRepo ItemsRepo;
    @PostMapping(value = "/add/item")
    public String addItems(@RequestBody Items item)
    {
        ItemsRepo.save(item);
        return "Saved";
    }

    @GetMapping(value = "/all/item")
    public List<Items> getAllItems(){
        return ItemsRepo.findAll();
    }

    @DeleteMapping(value = "/remove/item/{id}")
    public String removeItem(@PathVariable long id){
        Items deleteItem = ItemsRepo.findById(id).get();
        ItemsRepo.delete(deleteItem);
        return "deleted";
    }
}
