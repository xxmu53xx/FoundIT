package com.g4AppDev.FoundIT.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g4AppDev.FoundIT.entity.UserEntity;
import com.g4AppDev.FoundIT.service.UserService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @PostMapping("/postUsers")
    public UserEntity createUser(@RequestBody UserEntity user) {
        return userService.createUser(user);
    }

    @PutMapping("/putUserDetails/")
    public UserEntity putUserDetails(@RequestParam Long id, @RequestBody UserEntity userDetails) {
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/deleteUserDetails/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
}
