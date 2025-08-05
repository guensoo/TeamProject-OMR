package OMR.teamProject.OMR.Review.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectedMovieDto {
    private Boolean adult;
    private String backdrop_path;
    private List<Integer> genre_ids;
    private Long id;
    private String original_language;
    private String original_title;
    private String overview;
    private Double popularity;
    private String poster_path;
    private String release_date;
    private String title;
    private Boolean video;
    private Double vote_average;
    private Integer vote_count;
    private String media_type;
}