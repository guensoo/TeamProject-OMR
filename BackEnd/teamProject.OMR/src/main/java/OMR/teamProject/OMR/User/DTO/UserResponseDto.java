package OMR.teamProject.OMR.User.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String username;
    private String nickname;
    private String email;
    private String role;
}
