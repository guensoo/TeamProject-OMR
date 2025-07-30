package OMR.teamProject.OMR.QnA.Service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import OMR.teamProject.OMR.QnA.DTO.QnAAnswerDto;
import OMR.teamProject.OMR.QnA.DTO.QnARequestDto;
import OMR.teamProject.OMR.QnA.DTO.QnAResponseDto;
import OMR.teamProject.OMR.QnA.Entity.QnAEntity;
import OMR.teamProject.OMR.QnA.Repository.QnAAnswerRepository;
import OMR.teamProject.OMR.QnA.Repository.QnARepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnAService {
    private final QnARepository qnaRepository;
    private final QnAAnswerRepository qnaAnswerRepository;

    public QnAResponseDto createQnA(QnARequestDto dto) {
        QnAEntity qna = QnAEntity.builder()
            .title(dto.getTitle())
            .content(dto.getContent())
            .authorId(dto.getAuthorId())
            .isSecret(dto.getIsSecret())
            .password(dto.getPassword())
            .createdAt(LocalDateTime.now())
            .build();
        qnaRepository.save(qna);
        return toDto(qna);
    }
    private QnAResponseDto toDto(QnAEntity qna) {
        QnAResponseDto dto = new QnAResponseDto();
        dto.setId(qna.getId());
        dto.setTitle(qna.getTitle());
        dto.setContent(qna.getContent());
        dto.setAuthorId(qna.getAuthorId());
        dto.setIsSecret(qna.getIsSecret());
        dto.setIsReported(qna.getIsReported());
        dto.setCreatedAt(qna.getCreatedAt());

        // 답변 DTO (있으면)
        qnaAnswerRepository.findByQnaId(qna.getId()).ifPresent(answer -> {
            QnAAnswerDto answerDto = new QnAAnswerDto();
            answerDto.setId(answer.getId());
            answerDto.setContent(answer.getContent());
            answerDto.setWriterId(answer.getWriterId());
            answerDto.setCreatedAt(answer.getCreatedAt());
            dto.setAnswer(answerDto);
        });
        return dto;
    }
}
