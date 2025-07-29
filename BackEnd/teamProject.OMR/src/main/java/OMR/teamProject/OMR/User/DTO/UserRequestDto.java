package OMR.teamProject.OMR.User.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDto {
    private String username;
    private String password;
    private String nickname;
    private String email;
}