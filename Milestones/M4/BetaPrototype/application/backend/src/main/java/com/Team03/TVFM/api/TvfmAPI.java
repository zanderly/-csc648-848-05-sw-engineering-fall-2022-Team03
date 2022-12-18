package com.Team03.TVFM.api;


import com.Team03.TVFM.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.*;
import java.time.format.DateTimeFormatter;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Query;
import javax.transaction.Transactional;

@RestController
@RequestMapping("/")
public class TvfmAPI {

    @Autowired
    private CustomerRepo CustomerRepo;
    @Autowired
    private VendorRepository VendorRepository;
    @Autowired
    private ItemsRepo ItemsRepo;
    @Autowired
    private PurchasesRepo PurchasesRepo;
    @Autowired
    private OrderDetailsRepo orderDetailsRepo;
    //@Autowired
    //private OrderItemsRepo orderItemsRepo;

    private List<Customer> isCustomer; 
    private List<Vendor> isVendor;

    private String vendorEmail;

    Vendor loginVendor = new Vendor();
    Customer loginCustomer = new Customer();


    //--------------------------------Utility Functions-------------------------------------//

    // Checks if the password is at least 8 long has a capital number and letter
    public static boolean passwordValidation(String password) {
        Pattern numReg = Pattern.compile("[0-9]+");
        Pattern capReg = Pattern.compile("[A-Z]+");

        Matcher numMatch = numReg.matcher(password);
        Matcher capMatch = capReg.matcher(password);

        return password.length() >= 8 &&
                numMatch.find() &&
                capMatch.find();
    }

    //hash password for security (hashed password will be saved in the DB)
    public String passwordHashing(String password){
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


    //----------------------------Web page functions---------------------------------//
    
    //Will register a user and save info in the DB
    @PostMapping(value = "/registration")
    @CrossOrigin
    public String registration(@RequestBody Registration user){
        String status = "registration failed";

        if (passwordValidation(user.getPassword()) == false) {
            return status;
        }

        String newPassword = passwordHashing(user.getPassword());
        String hashEmail = passwordHashing(user.getEmail());

        if(user.getVendor() == 0){
            Customer customer = new Customer();

//            customer.setId(user.getId());
            customer.setName(user.getName());
            customer.setLastname(user.getLastname());
            customer.setEmail(hashEmail);
            customer.setPassword(newPassword);



            CustomerRepo.save(customer);
            status = "registered as a customer";
        }
        else{
            Vendor vendor = new Vendor();
//            vendor.setId(user.getId());
            vendor.setName(user.getName());
            vendor.setLastname(user.getLastname());
            vendor.setEmail(hashEmail);
            vendor.setPassword(newPassword);

            
            VendorRepository.save(vendor);
            status = "registered as vendor";
        }        

        return status;
    }


    //Serach will look for an item name, description or ID
    @Transactional
    @PostMapping(value = "/search")
    @CrossOrigin
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

    
    //login function, will take the user email and password
    Map<String, Integer> loginMap = new ConcurrentHashMap<>();

    @PostMapping(value = "/login")
    @CrossOrigin()
     public String login(@RequestBody Registration user , @RequestHeader("User-Agent") String header){
         String status  = "login failed";

//        if(loginMap.get(header) >= 3) {
//            return status;
//        }


        String newPassword = passwordHashing(user.getPassword());
        String hashEmail = passwordHashing(user.getEmail());
//
        isCustomer = CustomerRepo.findCustomer(hashEmail, newPassword);
        isVendor = VendorRepository.findVendor(hashEmail, newPassword);

//        isCustomer = CustomerRepo.findCustomer(user.getEmail(), user.getPassword());
//        isVendor = VendorRepository.findVendor(user.getEmail(), user.getPassword());

        if(!(isCustomer.isEmpty())) {
            status = "customer";
//           loginCustomer.setEmail(user.getEmail());
            loginCustomer = isCustomer.get(0);
        }
        else if(!(isVendor.isEmpty())){
            status = "vendor";
            //loginVendor.setEmail(user.getEmail());
//            vendorEmail = user.getEmail();
            loginVendor = isVendor.get(0);
        }

        else {

            //insert the person in the map or increment their number of failed logins
//            loginMap.merge(header, 1, Integer::sum);

            status = "login failed";
        }

        return status;
    }


    //Function to display certain number or previous purchases
    @PostMapping(value = "{limit}/purchases")
    public List<Purchases> getPurchases(@PathVariable long limit, @RequestBody Customer customer) {
        // get all the purchases
        List<Purchases> retval = PurchasesRepo.findPurchasesByCustomerID(customer.getId(), limit);

        // start looking for the items in the purchases
        for(Purchases purchase : retval) {
            // get the id of the items
            List<Integer> itemIDs = PurchasesRepo.findItemIDInPurchase(purchase.getId());
            List<Items> items = new LinkedList<>();
            for (Integer id: itemIDs) {
                items.addAll(ItemsRepo.findItembyID(id));
            }
            // add all the items to the purchase
            purchase.setItems(items);
        }
        
        return retval;
    }

    //fucntion to get the vendor info from an item id, it will display email and full name
    @GetMapping(value = "/vendorInfo/{id}")
    public String getVendorInfo(@PathVariable long id){
        String info = ItemsRepo.findVendor(id);

        return "This email of the vendor: " + info + "\n Name: " + 
        VendorRepository.vendorName(info) + " Lastname: " + VendorRepository.vendorLastname(info);
    }


    //working on it
    //place an order will take an item info to put it in the order
    @PostMapping(value = "/cart/placeOrder")
    public /*OrderDetails*/ String placeOrder(@RequestBody Orderinfo orderinfo) {
        Purchases makeOrder = new Purchases();
        String status;

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy"); 
        Date date = new Date();
        OrderDetails detail = new OrderDetails();

        List<CartInfo> lines = orderinfo.getCartLines();
        int temp = lines.size();

        if(!(isCustomer.isEmpty())){

            makeOrder.setOrder_date(formatter.format(date));

            String hashEmail = passwordHashing(loginCustomer.getEmail());
            long id = CustomerRepo.findCustomerID(hashEmail);
            makeOrder.setCustomer_id(id);
            makeOrder.setStatus("Order Placed");

            PurchasesRepo.save(makeOrder);
            
            for (CartInfo line : lines) {
                
                detail.setOrder_id(makeOrder.getId());
                detail.setQuantity(line.getQuantity());
                detail.setItems_id(line.getItemsInfo().getId());
                
                orderDetailsRepo.save(detail);
            }

            status = "Order Placed";

        }
        else{
            status = "you need to login to use this function";
        }

        return status;
        //return detail;
        
    }


    //working on it
    //place an order will take an item info to put it in the order
    @PostMapping(value = "/cart/placeOrdertest")
    public String testplaceOrder(@RequestBody CartInfo cartInfo) {
        Purchases makeOrder = new Purchases();
        String status;

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy"); 
        Date date = new Date();

        if(!(isCustomer.isEmpty())){
            
            makeOrder.setOrder_date(formatter.format(date));

            String hashEmail = passwordHashing(loginCustomer.getEmail());
            long id = CustomerRepo.findCustomerID(hashEmail);
            makeOrder.setCustomer_id(id);
            makeOrder.setStatus("Order Placed");
            //makeOrder.setOrder(cartInfo.getItemsInfo());

            status = "Order Placed";

            PurchasesRepo.save(makeOrder);
        }
        else{
            status = "you need to login to use this function";
        }

        return status;
    }
    

    //--------------------------customer/ logout-------------------//

    @GetMapping(value = "/customer")
    @CrossOrigin
    public Customer getCustomer(){
        return loginCustomer;
    }
    @GetMapping(value = "/vendor")
    @CrossOrigin
    public Vendor getVendor(){
        return loginVendor;
    }

    //logout from an account
    @GetMapping(value = "/logout")
    @CrossOrigin
    void logoutUser(){
        loginCustomer = null;
        //loginVendor = null;
        loginVendor = null;
    }
    

    //---------------------------------------Vendor paths---------------------------//

    //add an item to the DB
    @PostMapping(value = "/vendor/addItems") 
    public String addItemsVendor(@RequestBody Items item) {
        String status = "no items added";

        if(!(isVendor.isEmpty())){
            item.setVendor(vendorEmail);
            ItemsRepo.save(item);
            status = "Saved";
        }
        else{
            status = "you need to login to use this function";
        }
        
        return status;
    }

    //delete an item from the DB
    @DeleteMapping(value = "/vendor/removeItem/{id}") 
    public String removeItemVendor(@PathVariable long id){
        Items item = ItemsRepo.findById(id).get();
        ItemsRepo.delete(item);
        return "deleted";
    }

    //update an item from the DB
    @PutMapping(value = "/vendor/updateItem/{id}")
    public String updateItemVendor(@PathVariable Long id, @RequestBody Items item) {
        Items updateItem = ItemsRepo.findById(id).get();
        updateItem.setName(item.getName());
        updateItem.setQuantity(item.getQuantity());
        updateItem.setPrice(item.getPrice());
        updateItem.setDescription(item.getDescription());
        updateItem.setNutrition(item.getNutrition());
        updateItem.setVendor(vendorEmail);
        ItemsRepo.save(updateItem);
        return "updated";
    }

    //display all items from the DB
    @GetMapping(value = "/vendor/allItems")
    public List<Items> getAllItemsVendor() {
        return ItemsRepo.findAll();
    }

    //display all orders from the DB
    @GetMapping(value = "/vendor/testallOrders")
    public List<Purchases> testgetAllOrders() {
        return PurchasesRepo.findAll();
    }

    @GetMapping(value = "/vendor/allOrders")
    public List<OrderDetails> getAllOrders() {
        return orderDetailsRepo.findAll();
    }


    //---------------------------------- testing paths ----------------------------------//

    @GetMapping(value = "test")
    public String test(){
        return "Test is working";
    }

    @PostMapping(value = "/test/other")
    public test test1(@RequestBody test temp){
        test abc = new test();
        abc.setTemp(temp.getTemp());
        abc.setStringTemp(temp.getStringTemp());
        
        return abc;
    }

    @PostMapping(value = "/test2/other")
    public CartInfo test2(@RequestBody CartInfo cartinfo){
        CartInfo abc = new CartInfo();
        abc.setItemsInfo(cartinfo.getItemsInfo());
        abc.setQuantity(cartinfo.getQuantity());
        
        return abc;
    }

    @PostMapping(value = "/test3/other")
    public Orderinfo test3(@RequestBody Orderinfo orderinfo){
        Orderinfo abc = new Orderinfo();
        abc.setCartLines(orderinfo.getCartLines());
        
        return abc;
    }

    @PostMapping(value = "/add/customer")
    public String addCustomer(@RequestBody Customer customer) {
        CustomerRepo.save(customer);
        return "Saved";
    }

    @PostMapping(value = "/add/vendor")
    public String addVendors(@RequestBody Vendor vendor) {
        VendorRepository.save(vendor);
        return "Saved";
    }

    //-------Admin permissions-------//

    @GetMapping(value = "/admin/allCustomers")
    public List<Customer> getAllCustomers() {
        return CustomerRepo.findAll();
    }

    @GetMapping(value = "/admin/allVendors")
    public List<Vendor> getAllVendors() {
        return VendorRepository.findAll();
    }

    @DeleteMapping(value = "/admin/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable long id) {
        Customer customer = CustomerRepo.findById(id).get();
        CustomerRepo.delete(customer);
        return "deleted";
    }

    @PutMapping(value = "/admin/updateVendor/{id}")
    public String updateVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        Vendor updateVendor = VendorRepository.findById(id).get();
        updateVendor.setEmail(vendor.getEmail());
        updateVendor.setPassword(vendor.getPassword());
        VendorRepository.save(updateVendor);
        return "updated";
    }

    @DeleteMapping(value = "/admin/deleteVendor/{id}")
    public String deleteVendor(@PathVariable long id) {
        Vendor vendor = VendorRepository.findById(id).get();
        VendorRepository.delete(vendor);
        return "deleted";
    }

    @GetMapping(value = "/admin/allItems")
    public List<Items> getAllItems() {
        return ItemsRepo.findAll();
    }

    @PostMapping(value = "/admin/addItems")
    public String addItems(@RequestBody Items item) {
        ItemsRepo.save(item);
        return "Saved";
    }

    @DeleteMapping(value = "/admin/removeItem/{id}")
    public String removeItem(@PathVariable long id){
        Items item = ItemsRepo.findById(id).get();
        ItemsRepo.delete(item);
        return "deleted";
    }

    @PutMapping(value = "/admin/updateItem/{id}")
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

}
