package OMR.teamProject.OMR.User.Service;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.User.DTO.UserRequestDto;
import OMR.teamProject.OMR.User.DTO.UserResponseDto;
import OMR.teamProject.OMR.User.Entity.UserEntity;
import OMR.teamProject.OMR.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponseDto register(UserRequestDto dto) {
        UserEntity user = UserEntity.builder()
            .username(dto.getUsername())
            .password(dto.getPassword()) // 보통 암호화 필요!
            .nickname(dto.getNickname())
            .email(dto.getEmail())
            .role("USER")
            .build();
        userRepository.save(user);
        return toDto(user);
    }

    private UserResponseDto toDto(UserEntity user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setNickname(user.getNickname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}
