package com.Team03.TVFM.api;


import com.Team03.TVFM.model.*;
//import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/")
public class TvfmAPI
{

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private VendorRepo vendorRepo;
    @Autowired
    private ItemsRepo itemsRepo;
    @Autowired
    private PurchasesRepo purchasesRepo;
    @Autowired
    private OrderDetailsRepo orderDetailsRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private AllergensRepo allergensRepo;
    @Autowired
    private CartRepo cartRepo;

    //--------------------------------Utility Functions-------------------------------------//

    // Checks if the given email is a valid address
    public static boolean emailValidation(String email)
    {
        Pattern emailReg = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

        Matcher emailMatch = emailReg.matcher(email);

        return emailMatch.find();
    }

    // Checks if the password is at least 8 long has a capital number and letter
    public static boolean passwordValidation(String password)
    {
        Pattern numReg = Pattern.compile("[0-9]+");
        Pattern capReg = Pattern.compile("[A-Z]+");

        Matcher numMatch = numReg.matcher(password);
        Matcher capMatch = capReg.matcher(password);

        return password.length() >= 8 &&
                numMatch.find() &&
                capMatch.find();
    }

    //hash password for security (hashed password will be saved in the DB)
    public String passwordHashing(String password)
    {
        String passwordToHash = password;
        String generatedPassword = null;

        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(passwordToHash.getBytes());
            byte[] bytes = md.digest();

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }

            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        //System.out.println(generatedPassword);

        return generatedPassword;
    }

    //----------------------------Login/Register---------------------------------//

    //Will register a user and save info in the DB
    @PostMapping(value = "/registration")
    @CrossOrigin
    public String registration(@RequestBody Registration user)
    {
        String status = "registration failed";

        if (passwordValidation(user.getPassword()) == false && emailValidation(user.getEmail()) == false) {
            return status;
        }

        String newPassword = passwordHashing(user.getPassword());

        if (user.getVendor() == 0) {
            Customer customer = new Customer();

            customer.setName(user.getName());
            customer.setLastname(user.getLastname());
            customer.setEmail(user.getEmail());
            customer.setPassword(newPassword);

            customerRepo.save(customer);
            status = "registered as a customer";
        } else {
            Vendor vendor = new Vendor();

            vendor.setName(user.getName());
            vendor.setLastname(user.getLastname());
            vendor.setEmail(user.getEmail());
            vendor.setPassword(newPassword);
            vendor.setVendor(1);

            vendorRepo.save(vendor);
            status = "registered as vendor";
        }

        return status;
    }

    //login function, will take the user email and password
    Map<String, Integer> loginMap = new ConcurrentHashMap<>();


    @PostMapping(value = "/login")
    @CrossOrigin()
    public String login(@RequestBody Registration user, @RequestHeader("User-Agent") String header)
    {
        if (loginMap.containsKey(header) && loginMap.get(header) >= 3) {
            return null;
        }

        String newPassword = passwordHashing(user.getPassword());
        user.setPassword(newPassword);

        if (user.getVendor() == 0) {
            if (customerRepo.findCustomer(user.getEmail(), user.getPassword()) != null)
                return customerRepo.findCustomer(user.getEmail(), user.getPassword()).toString();
        } else if (user.getVendor() == 1) {
            if (vendorRepo.findVendor(user.getEmail(), user.getPassword()) != null)
                return vendorRepo.findVendor(user.getEmail(), user.getPassword()).toString();
        } else {
            //insert the person in the map or increment their number of failed logins
            loginMap.merge(header, 1, Integer::sum);
        }
        return null;
    }


    //----------------------------Web page functions---------------------------------//


//    @PostMapping(value = "/search/filtered")
//    public List<Items> searchItemsFiltered(@RequestBody SearchFiltered filtered)
//    {
//        List<Items> itemList = null;
//        Gson gson = new Gson();
//        Items item = gson.fromJson(filtered.getItem(), Items.class);
//        Allergens allergens = gson.fromJson(filtered.getAllergens(), Allergens.class);
//
//        if (item.getId() != null) {
//            itemList.add(itemsRepo.findItembyID(item.getId()));  //to look with an id
//        } else if (item.getName() != null) {
//            itemList = itemsRepo.findItem(item.getName());  //to look with a name, description, nutrition
//        } else {
//            System.out.println("Item not found");
//            itemList = null;
//        }
//
//        //for a recommendation, may have to change it later
//        if (itemList.isEmpty()) {
//            Random rand = new Random();
//            int num = rand.nextInt((itemsRepo.maxID() - 1) + 1) + 1;
//
//            itemList.add(itemsRepo.findItembyID(num));
//        }
//
//        for (Items itemListEntry : itemList) {
//            // get the list of allergens that an item has
//            Allergens allergensFromItem = allergensRepo.findAllergensByID(itemListEntry.getId());
//            if(allergensFromItem.matches(allergens)){
//                // remove the item from the list if it contains any of the allergens
//                itemList.remove(itemListEntry);
//            }
//        }
//        return itemList;
//    }

    //Search will look for an item name, description or ID
    @Transactional
    @PostMapping(value = "/search")
    @CrossOrigin
    public List<Items> searchItem(@RequestBody Items item)
    {
        List<Items> itemRepoHolder = new LinkedList<>();

        if (item.getId() != null) {
            itemRepoHolder.add(itemsRepo.findItembyID(item.getId()));  //to look with an id
        } else if (item.getName() != null) {
            itemRepoHolder = itemsRepo.findItem(item.getName());  //to look with a name, description, nutrition
        } else {
            System.out.println("Item not found");
            itemRepoHolder = null;
        }

        //for a recommendation, may have to change it later
        if (itemRepoHolder.isEmpty()) {
            Random rand = new Random();
            int num = rand.nextInt((itemsRepo.maxID() - 1) + 1) + 1;

            itemRepoHolder.add(itemsRepo.findItembyID(num));
        }

        return itemRepoHolder;
    }

    //Function to display certain number or previous purchases
    @PostMapping(value = "/previousPurchases")
    public List<ReturnPurchases> getPurchases(@RequestBody Customer customer) {
        
        // Get the last purchase made by the customer
        List<Purchases> retval = purchasesRepo.findLastPurchase(customer.getId());

        // Create a list to hold the previous purchases information
        List<ReturnPurchases> oldPurchases = new ArrayList<ReturnPurchases>();
        ReturnPurchases tempValue = new ReturnPurchases();

        // Loop through the last 5 purchases made by the customer
        for (int i =0; i<5; i++) {
            tempValue.setOrdersInfo(retval);

            List<OrderDetails> retval2 = orderDetailsRepo.findLastPurchase(retval.get(i).getId());
            tempValue.setOrderDetails(retval2);

            oldPurchases.set(i, tempValue);
        }
        // Return the list of previous purchases
        return oldPurchases;
    }

    //place an order will take an item info to put it in the order
    @PostMapping(value = "/cart/placeOrder")
    public Long testplaceOrder(@RequestBody Orderinfo orderinfo , @RequestBody Customer customer)
    {
        Purchases makeOrder = new Purchases();
        
        List<OrderDetails> newDetails = new ArrayList<OrderDetails>();

        Long status = -1L;

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();

        //hash the users password
        customer.setPassword(passwordHashing(customer.getPassword()));

        if (customerRepo.findCustomer(customer.getEmail(), customer.getPassword()) != null) {

            makeOrder.setOrder_date(formatter.format(date));

            //long id = customerRepo.findCustomerID(customer.getEmail());
            makeOrder.setCustomer_id(customer.getId());
            makeOrder.setStatus("Order Placed");

            purchasesRepo.save(makeOrder);

            for (int i = 0; i < orderinfo.getCartLines().size(); i++) {
                OrderDetails details = new OrderDetails();
                details.setItem(orderinfo.getCartLines().get(i).getItemsInfo());
                details.setQuantity(orderinfo.getCartLines().get(i).getQuantity());
                details.setPurchases(makeOrder);

                newDetails.add(details);
            }

            orderDetailsRepo.saveAll(newDetails);

            status = purchasesRepo.getPurchases();
        } else {
            status = -1L;
        }

        return status;
    }

    // get the user's cart from the data base
    @PostMapping(value = "/cart/get")
    public List<Items> getCart(@RequestBody Registration user)
    {
        List<Items> itemList = new LinkedList<>();
        Cart cart = null;

        // are they logged in
//        if (user.getVendor() == 0) {
//            if(customerRepo.findCustomer(user.getEmail(), user.getPassword()) != null) {
//                cart = cartRepo.findCartByAccountID(user.getId(), false);
//            }
//        } else {
//            if(vendorRepo.findVendor(user.getEmail(), user.getPassword()) != null) {
//                cart = cartRepo.findCartByAccountID(user.getId(), true);
//            }
//        }

        // was the cart filled
        if (cart == null) {
            return null;
        }

        // fill out the return value with items
//        for(int itemID : cart.getItemIDs()) {
//            itemList.add(itemsRepo.findItembyID(itemID));
//        }
        return itemList;
    }


    //------------------update customer information------------------------//
    @PostMapping(value = "/updateCustomer/{id}")
    @CrossOrigin
    public String updateCustomerInfo(@PathVariable Long id, @RequestBody Customer customer)
    {
        String status = "update failed";

        Customer updatedCustomer = customerRepo.findById(id).get();

        if (updatedCustomer.getId() != 0) {
            //update customer info
            updatedCustomer.setEmail(customer.getEmail());

            String newPassword = passwordHashing(customer.getPassword());
            updatedCustomer.setPassword(newPassword);
            updatedCustomer.setName(customer.getName());
            updatedCustomer.setLastname(customer.getLastname());

            //update address
            Address updatedAddress = new Address();
            updatedAddress.setNumber(customer.getAddress().getNumber());
            updatedAddress.setStreet(customer.getAddress().getStreet());
            updatedAddress.setCity(customer.getAddress().getCity());
            updatedAddress.setState(customer.getAddress().getState());
            updatedAddress.setZipcode(customer.getAddress().getZipcode());

            updatedCustomer.setAddress(updatedAddress);
            updatedAddress.setCustomer(updatedCustomer);

            addressRepo.save(updatedAddress);
            customerRepo.save(updatedCustomer);
            status = "updated";
        } else {
            status = "customer not found";
        }

        return status;
    }


    //updates a password and uses hashing function to save it to th db
    @PostMapping(value = "/updateCustomerPassword/{id}")
    @CrossOrigin
    public String updateCustomerPassword(@PathVariable Long id, @RequestBody Customer customer){
        String status = "update failed";

        Customer updatedCustomer = customerRepo.findById(id).get();
        String newPassword = passwordHashing(customer.getPassword());

        if(updatedCustomer != null){
            updatedCustomer.setPassword(newPassword);
            customerRepo.save(updatedCustomer);
            
            status = newPassword;
        }
        else{
            status = "customer not found";
        }

        return status;
    }

    //updates the customer email
    @PostMapping(value = "/updateCustomerEmail/{id}")
    @CrossOrigin
    public String updateCustomerEmail(@PathVariable Long id, @RequestBody Customer customer){
        String status = "update failed";

        Customer updatedCustomer = customerRepo.findById(id).get();

        if(updatedCustomer != null){
            updatedCustomer.setEmail(customer.getEmail());
            customerRepo.save(updatedCustomer);
            status = "info updated";
        }
        else{
            status = "customer not found";
        }

        return status;
    }

    //updates full name
    @PostMapping(value = "/updateCustomerFullName/{id}")
    @CrossOrigin
    public String updateCustomerFullName(@PathVariable Long id, @RequestBody Customer customer){
        String status = "update failed";

        Customer updatedCustomer = customerRepo.findById(id).get();

        if(updatedCustomer != null){
            updatedCustomer.setName(customer.getName());
            updatedCustomer.setLastname(customer.getLastname());
            customerRepo.save(updatedCustomer);
            status = "info updated";
        }
        else{
            status = "customer not found";
        }

        return status;
    }

    //updates address
    @PostMapping(value = "/updateCustomerAddress/{id}")
    @CrossOrigin
    public String updateCustomerAddress(@PathVariable Long id, @RequestBody Address newAddress){
        String status = "update failed";

        Customer updatedCustomer = customerRepo.findById(id).get();

        if (updatedCustomer.getId() != 0) {
            if(updatedCustomer.getAddress() != null && addressRepo.findById(updatedCustomer.getAddress().getId()).isPresent()){
                addressRepo.findById(updatedCustomer.getAddress().getId()).get().setNumber(newAddress.getNumber());
                addressRepo.findById(updatedCustomer.getAddress().getId()).get().setStreet(newAddress.getStreet());
                addressRepo.findById(updatedCustomer.getAddress().getId()).get().setCity(newAddress.getCity());
                addressRepo.findById(updatedCustomer.getAddress().getId()).get().setState(newAddress.getState());
                addressRepo.findById(updatedCustomer.getAddress().getId()).get().setZipcode(newAddress.getZipcode());
            } else {
                newAddress.setCustomer(updatedCustomer);
                updatedCustomer.setAddress(newAddress);
                addressRepo.save(newAddress);
            }

            customerRepo.save(updatedCustomer);

            status = updatedCustomer.toString();
        } else {
            status = "customer not found";
        }

        return status;
    }

    @PostMapping(value = "/updateCustomerCart/{id}")
    @CrossOrigin
    public String updateCustomerCart(@PathVariable Long id, @RequestBody String newCart) {
        String status = "update failed";

        Customer updatedCustomer = customerRepo.findById(id).get();

        if (updatedCustomer.getId() != 0) {
            if(updatedCustomer.getCart() != null && cartRepo.findById(updatedCustomer.getCart().getId()).isPresent()){
                cartRepo.findById(updatedCustomer.getCart().getId()).get().setCustomer(updatedCustomer);
                cartRepo.findById(updatedCustomer.getCart().getId()).get().setItemIDs(newCart);
            } else {
                Cart updatedCart = new Cart();
                updatedCart.setCustomer(updatedCustomer);
                updatedCart.setItemIDs(newCart);
                updatedCustomer.setCart(updatedCart);
                cartRepo.save(updatedCart);
            }
            customerRepo.save(updatedCustomer);
            status = updatedCustomer.toString();
        }
        return status;
    }


        //------------------update vendor information------------------------//
    @PostMapping(value = "/updateVendor/{id}")
    @CrossOrigin
    public String updateVendorInfo(@PathVariable Long id, @RequestBody Vendor vendor)
    {
        String status = "update failed";

        Vendor updatedVendor = vendorRepo.findById(id).get();

        if (updatedVendor.getId() != 0) {
            //update vendor info
            String newPassword = passwordHashing(vendor.getPassword());

            updatedVendor.setEmail(vendor.getEmail());
            updatedVendor.setPassword(newPassword);
            updatedVendor.setName(vendor.getName());
            updatedVendor.setLastname(vendor.getLastname());

            //update address
            if(updatedVendor.getAddress() != null && addressRepo.findById(updatedVendor.getAddress().getId()).isPresent()){
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setNumber(vendor.getAddress().getNumber());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setStreet(vendor.getAddress().getStreet());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setCity(vendor.getAddress().getCity());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setState(vendor.getAddress().getState());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setZipcode(vendor.getAddress().getZipcode());
            } else {
                Address updatedAddress = new Address();
                updatedAddress.setNumber(vendor.getAddress().getNumber());
                updatedAddress.setStreet(vendor.getAddress().getStreet());
                updatedAddress.setCity(vendor.getAddress().getCity());
                updatedAddress.setState(vendor.getAddress().getState());
                updatedAddress.setZipcode(vendor.getAddress().getZipcode());
                updatedAddress.setVendor(updatedVendor);
                updatedVendor.setAddress(updatedAddress);
                addressRepo.save(updatedAddress);
            }

            vendorRepo.save(updatedVendor);
            status = "updated";
        } else {
            status = "vendor not found";
        }

        return status;
    }

    @PostMapping(value = "/updateVendorPassword/{id}")
    @CrossOrigin
    public String updateVendorPassword(@PathVariable Long id, @RequestBody Vendor vendor){
        String status = "update failed";

        Vendor updatedVendor = vendorRepo.findById(id).get();
        String newPassword = passwordHashing(vendor.getPassword());

        if(updatedVendor != null){
            updatedVendor.setPassword(newPassword);
            vendorRepo.save(updatedVendor);

            status = newPassword;
        }
        else{
            status = "vendor not found";
        }

        return status;
    }

    @PostMapping(value = "/updateVendorEmail/{id}")
    @CrossOrigin
    public String updateVendorEmail(@PathVariable Long id, @RequestBody Vendor vendor){
        String status = "update failed";

        Vendor updatedVendor = vendorRepo.findById(id).get();

        if(updatedVendor != null){
            updatedVendor.setEmail(vendor.getEmail());
            vendorRepo.save(updatedVendor);
            status = "info updated";
        }
        else{
            status = "vendor not found";
        }

        return status;
    }

    @PostMapping(value = "/updateVendorFullName/{id}")
    @CrossOrigin
    public String updateVendorFullName(@PathVariable Long id, @RequestBody Vendor vendor){
        String status = "update failed";

        Vendor updatedVendor = vendorRepo.findById(id).get();

        if(updatedVendor != null){
            updatedVendor.setName(vendor.getName());
            updatedVendor.setLastname(vendor.getLastname());
            vendorRepo.save(updatedVendor);
            status = "info updated";
        }
        else{
            status = "vendor not found";
        }

        return status;
    }

    @PostMapping(value = "/updateVendorAddress/{id}")
    @CrossOrigin
    public String updateVendorAddress(@PathVariable Long id, @RequestBody Address newAddress){
        String status = "update failed";
        Vendor updatedVendor = vendorRepo.findById(id).get();

        if (updatedVendor.getId() != 0) {
            if(updatedVendor.getAddress() != null && addressRepo.findById(updatedVendor.getAddress().getId()).isPresent()){
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setNumber(newAddress.getNumber());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setStreet(newAddress.getStreet());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setCity(newAddress.getCity());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setState(newAddress.getState());
                addressRepo.findById(updatedVendor.getAddress().getId()).get().setZipcode(newAddress.getZipcode());
            } else {
                newAddress.setVendor(updatedVendor);
                updatedVendor.setAddress(newAddress);
                addressRepo.save(newAddress);
            }
            vendorRepo.save(updatedVendor);
            status = updatedVendor.toString();
        } else {
            status = "customer not found";
        }

        return status;
    }

    //---------------------------------------Vendor paths---------------------------//

    //add an item to the DB
    @PostMapping(value = "/vendor/addItems")
    public String addItemsVendor(@RequestBody Items item, @RequestBody Vendor vendor)
    {
        String status = "no items added";

        if (vendorRepo.findVendor(vendor.getEmail(), vendor.getPassword()) != null) {
            item.setVendor(vendor.getEmail());
            itemsRepo.save(item);
            status = "Saved";
        } else {
            status = "you need to login to use this function";
        }

        return status;
    }


    // add an item with its associated allergens into the db
//    @PostMapping(value = "/vendor/addItems/allergens")
//    public String addItemsVendor(@RequestBody AddItem newItem)
//    {
//        String status = "no items added";
//        Gson gson = new Gson();
//        Vendor vendor= gson.fromJson(newItem.getVendor(), Vendor.class);
//        Items item= gson.fromJson(newItem.getItem(), Items.class);
//        Allergens allergens= gson.fromJson(newItem.getAllergens(), Allergens.class);
//
//        if (vendorRepo.findVendor(vendor.getEmail(), vendor.getPassword()) != null) {
//            item.setVendor(vendor.getEmail());
//            itemsRepo.save(item);
//
//            allergens.setId(item.getId());
//            allergensRepo.save(allergens);
//            status = "Saved";
//        } else {
//            status = "you need to login to use this function";
//        }
//
//        return status;
//    }

    //delete an item from the DB
    @DeleteMapping(value = "/vendor/removeItem/{id}")
    public String removeItemVendor(@PathVariable long id)
    {
        Items item = itemsRepo.findById(id).get();
        itemsRepo.delete(item);
        return "deleted";
    }

    //update an item from the DB
    @PutMapping(value = "/vendor/updateItem/{id}")
    public String updateItemVendor(@PathVariable Long id, @RequestBody Items item, @RequestBody Vendor vendor)
    {
        if (vendorRepo.findVendor(vendor.getEmail(), vendor.getPassword()) != null) {
            Items updateItem = itemsRepo.findById(id).get();
            updateItem.setName(item.getName());
            updateItem.setQuantity(item.getQuantity());
            updateItem.setPrice(item.getPrice());
            updateItem.setDescription(item.getDescription());
            updateItem.setNutrition(item.getNutrition());
            updateItem.setVendor(vendor.getEmail());
            itemsRepo.save(updateItem);
            return "updated";
        } else {
            return "you need to login to use this function";
        }
    }

    //display all items from the DB
    @GetMapping(value = "/vendor/allItems")
    public List<Items> getAllItemsVendor()
    {
        return itemsRepo.findAll();
    }

    //display all orders from the DB
    @GetMapping(value = "/vendor/testallOrders")
    public List<Purchases> testgetAllOrders()
    {
        return purchasesRepo.findAll();
    }

    /*@GetMapping(value = "/vendor/allOrders")
    public List<OrderDetails> getAllOrders() {
        return orderDetailsRepo.findAll();
    }*/

    // get the vendor info from an item id, it will display email and full name
    @GetMapping(value = "/vendorInfo/{id}")
    public String getVendorInfo(@PathVariable long id)
    {
        String info = itemsRepo.findVendor(id);

        return "This email of the vendor: " + info + "\n Name: " +
                vendorRepo.vendorName(info) + " Lastname: " + vendorRepo.vendorLastname(info);
    }
    

    //---------------------------------- testing paths ----------------------------------//

    @GetMapping(value = "test")
    public String test()
    {
        return "Test is working";
    }

    @PostMapping(value = "/test/other")
    public test test1(@RequestBody test temp)
    {
        test abc = new test();
        abc.setTemp(temp.getTemp());
        abc.setStringTemp(temp.getStringTemp());

        return abc;
    }

    @PostMapping(value = "/test2/other")
    public CartInfo test2(@RequestBody CartInfo cartinfo)
    {
        CartInfo abc = new CartInfo();
        abc.setItemsInfo(cartinfo.getItemsInfo());
        abc.setQuantity(cartinfo.getQuantity());

        return abc;
    }

    @PostMapping(value = "/test3/other")
    public Orderinfo test3(@RequestBody Orderinfo orderinfo)
    {
        Orderinfo abc = new Orderinfo();
        abc.setCartLines(orderinfo.getCartLines());

        return abc;
    }

    @PostMapping(value = "/add/customer")
    public String addCustomer(@RequestBody Customer customer)
    {
        customerRepo.save(customer);
        return "Saved";
    }

    @PostMapping(value = "/add/vendor")
    public String addVendors(@RequestBody Vendor vendor)
    {
        vendorRepo.save(vendor);
        return "Saved";
    }

    //-------Admin permissions-------//

    @GetMapping(value = "/admin/allCustomers")
    public List<Customer> getAllCustomers()
    {
        return customerRepo.findAll();
    }

    @GetMapping(value = "/admin/allVendors")
    public List<Vendor> getAllVendors()
    {
        return vendorRepo.findAll();
    }

    @DeleteMapping(value = "/admin/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable long id)
    {
        Customer customer = customerRepo.findById(id).get();
        customerRepo.delete(customer);
        return "deleted";
    }

//    @PutMapping(value = "/admin/updateVendor/{id}")
//    public String updateVendor(@PathVariable Long id, @RequestBody Vendor vendor)
//    {
//        String status = "update failed";
//
//        Vendor updateVendor = vendorRepo.findById(id).get();
//        // Address updatedAddress = new Address();
//
//
//        if (updateVendor.getId() != 0) {
//            updateVendor.setLastname(vendor.getLastname());
//
//            // updateVendor.setAddress(updatedAddress);
//            // updatedAddress.setVendor(updateVendor);
//
//            // addressRepo.save(updatedAddress);
//            vendorRepo.save(updateVendor);
//
//            status = "updated";
//        } else {
//            status = "vendor not found";
//        }
//
//        return status;
//
//        //What was here previously
//        // Vendor updateVendor = VendorRepository.findById(id).get();
//        // updateVendor.setEmail(vendor.getEmail());
//        // updateVendor.setPassword(vendor.getPassword());
//        // VendorRepository.save(updateVendor);
//        // return "updated";
//    }

    @DeleteMapping(value = "/admin/deleteVendor/{id}")
    public String deleteVendor(@PathVariable long id)
    {
        Vendor vendor = vendorRepo.findById(id).get();
        vendorRepo.delete(vendor);
        return "deleted";
    }

    @GetMapping(value = "/admin/allItems")
    public List<Items> getAllItems()
    {
        return itemsRepo.findAll();
    }

    @PostMapping(value = "/admin/addItems")
    public String addItems(@RequestBody Items item)
    {
        itemsRepo.save(item);
        return "Saved";
    }

    @DeleteMapping(value = "/admin/removeItem/{id}")
    public String removeItem(@PathVariable long id)
    {
        Items item = itemsRepo.findById(id).get();
        itemsRepo.delete(item);
        return "deleted";
    }

    @PutMapping(value = "/admin/updateItem/{id}")
    public String updateItem(@PathVariable Long id, @RequestBody Items item)
    {
        Items updateItem = itemsRepo.findById(id).get();
        updateItem.setName(item.getName());
        updateItem.setQuantity(item.getQuantity());
        updateItem.setPrice(item.getPrice());
        updateItem.setDescription(item.getDescription());
        updateItem.setNutrition(item.getNutrition());
        itemsRepo.save(updateItem);
        return "updated";
    }

}
