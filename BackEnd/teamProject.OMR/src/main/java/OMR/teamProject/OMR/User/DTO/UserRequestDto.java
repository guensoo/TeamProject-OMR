package OMR.teamProject.OMR.User.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserRequestDto {
    private String userId;
    private String password;
    private String nickname;
    private String email;
}