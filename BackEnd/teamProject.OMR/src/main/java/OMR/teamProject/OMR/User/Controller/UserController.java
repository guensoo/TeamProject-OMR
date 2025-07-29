package OMR.teamProject.OMR.User.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMR.teamProject.OMR.User.DTO.UserRequestDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserResponseDto register(@RequestBody UserRequestDto dto) {
        return userService.register(dto);
    }
}
