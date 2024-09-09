package com.ssafy.youniverse.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.youniverse.dto.*;
import com.ssafy.youniverse.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TmdbCallService {
    private final TmdbClient tmdbClient;
    private final ObjectMapper objectMapper;

    @Value("${tmdb.language}")
    private String lang;

    @Value("${tmdb.imageUrl}")
    private String imageUrl;

    @Value("${tmdb.ott-list}")
    private Set<Integer> ottList;

    /**
     * 각 페이지 호출 후 페이지 내의 영화 목록을 List 형태로 변환
     * @param page
     */
    public List<Integer> fetchPage(int page) throws JsonProcessingException {
        List<Integer> movieIds = new ArrayList<>();
        JsonNode results = objectMapper.readTree(tmdbClient.getPopularMoviesId(lang, page)).path("results");
        for (JsonNode result : results) {
            movieIds.add(result.path("id").asInt());
        }
        return movieIds;
    }

    /**
     * 영화 관련 정보 모두 조회
     * details 영화 정보, 장르
     * keywords 영화 키워드
     * watch providers OTT 정보
     * credits 영화 배우, 감독
     * @param id
     */
    public MovieInfoStr fetchMovie(int id) throws JsonProcessingException {
        MovieInfoStr movieInfoStr = new MovieInfoStr();

        movieInfoStr.setDetails(tmdbClient.getDetails(id, lang));
        movieInfoStr.setCredits(tmdbClient.getCredits(id, lang));
        movieInfoStr.setKeywords(tmdbClient.getKeywords(id));
        movieInfoStr.setWatchProviders(tmdbClient.getWatchProviders(id));

        return movieInfoStr;
    }


    public Movie toMovieEntity(String json) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(json);

        Movie movie = new Movie();
        movie.setMovieId(jsonNode.path("id").asLong());

        /**
         * title의 column type은 varchar(200)이므로 문자열의 길이를 최대 200까지만 저장
         */
        String title = jsonNode.path("title").textValue();
        movie.setTitle(title.substring(0, Math.min(title.length(), 200)));

        movie.setLanguage(jsonNode.path("original_language").textValue());
        movie.setOverView(jsonNode.path("overview").textValue());
        movie.setRate(Math.round(jsonNode.path("vote_average").asDouble() / 2 * 10) / 10.0);
        movie.setRuntime(jsonNode.path("runtime").asInt());
        movie.setMovieImage(imageUrl + jsonNode.path("poster_path").textValue());

        return movie;
    }

    public List<Genre> toGenreEntity(String json) throws JsonProcessingException {
        JsonNode genres = objectMapper.readTree(json).path("genres");

        List<Genre> list = new ArrayList<>();
        for (JsonNode node : genres) {
            Genre genre = new Genre();
            genre.setGenreId(node.path("id").asLong());
            genre.setGenreName(node.path("name").textValue());
            list.add(genre);
        }

        return list;
    }

    public List<Keyword> toKeywordEntity(String json) throws JsonProcessingException {
        JsonNode keywords = objectMapper.readTree(json).path("keywords");

        List<Keyword> list = new ArrayList<>();
        for (JsonNode node : keywords) {
            Keyword keyword = new Keyword();
            keyword.setKeywordId(node.path("id").asLong());
            keyword.setKeywordName(node.path("name").textValue());
            list.add(keyword);
        }

        return list;
    }

    /**
     * 총 5개의 OTT만 포함(Netflix(8), Apple TV(2), wavve(356), Disney Plus(337), Watcha(97))
     * @param json
     * @return
     * @throws JsonProcessingException
     */
    public Set<Ott> toOttEntity(String json) throws JsonProcessingException {
        JsonNode KR = objectMapper.readTree(json).path("results").path("KR");

        List<JsonNode> nodeList = new ArrayList<>();
        nodeList.add(KR.path("buy"));
        nodeList.add(KR.path("rent"));
        nodeList.add(KR.path("flatrate"));

        Set<Ott> set = new LinkedHashSet<>();
        for (JsonNode jsonNode : nodeList) {
            for (JsonNode node : jsonNode) {
                if (!ottList.contains(node.path("provider_id").asInt())) {
                    continue;
                }
                Ott ott = new Ott();
                ott.setOttId(node.path("provider_id").asLong());
                ott.setOttName(node.path("provider_name").textValue());
                ott.setOttImage(imageUrl + node.path("logo_path").textValue());
                set.add(ott);
            }
        }

        return set;
    }

    public List<Actor> toActorEntity(String json) throws JsonProcessingException {
        JsonNode cast = objectMapper.readTree(json).path("cast");
        List<Actor> list = new ArrayList<>();
        for (JsonNode node : cast) {
            if (node.path("known_for_department").textValue().equals("Acting")) {
                Actor actor = new Actor();
                actor.setActorId(node.path("id").asLong());
                actor.setActorName(node.path("name").textValue());
                actor.setActorImage(imageUrl + node.path("profile_path").textValue());
                list.add(actor);
                if (list.size() == 5) break;
            }
        }
        return list;
    }

    public List<Director> toDirectorEntity(String json) throws JsonProcessingException {
        JsonNode crew = objectMapper.readTree(json).path("crew");
        List<Director> list = new ArrayList<>();
        for (JsonNode node : crew) {
            if (node.path("job").textValue().equals("Director")) {
                Director director = new Director();
                director.setDirectorId(node.path("id").asLong());
                director.setDirectorName(node.path("name").textValue());
                director.setDirectorImage(imageUrl + node.path("profile_path").textValue());
                list.add(director);
            }
        }
        return list;
    }

    public List<OttMovieDto> makeOttMovie(Set<Ott> otts, Movie movie) {
        return otts.stream()
                .map(ott -> {
                    OttMovieDto ottMovie = new OttMovieDto();
                    ottMovie.setOttId(ott.getOttId());
                    ottMovie.setMovieId(movie.getMovieId());
                    return ottMovie;
                })
                .collect(Collectors.toList());
    }

    public List<KeywordMovieDto> makeKeywordMovie(List<Keyword> keywords, Movie movie) {
        return keywords.stream()
                .map(keyword -> {
                    KeywordMovieDto keywordMovie = new KeywordMovieDto();
                    keywordMovie.setKeywordId(keyword.getKeywordId());
                    keywordMovie.setMovieId(movie.getMovieId());
                    return keywordMovie;
                })
                .collect(Collectors.toList());
    }

    public List<DirectorMovieDto> makeDirectorMovie(List<Director> directors, Movie movie) {
        return directors.stream()
                .map(director -> {
                    DirectorMovieDto directorMovie = new DirectorMovieDto();
                    directorMovie.setDirectorId(director.getDirectorId());
                    directorMovie.setMovieId(movie.getMovieId());
                    return directorMovie;
                })
                .collect(Collectors.toList());
    }

    public List<ActorMovieDto> makeActorMovie(List<Actor> actors, Movie movie) {
        return actors.stream()
                .map(actor -> {
                    ActorMovieDto actorMovie = new ActorMovieDto();
                    actorMovie.setActorId(actor.getActorId());
                    actorMovie.setMovieId(movie.getMovieId());
                    return actorMovie;
                })
                .collect(Collectors.toList());
    }

    public List<GenreMovieDto> makeGenreMovie(List<Genre> genres, Movie movie) {
        return genres.stream()
                .map(genre -> {
                    GenreMovieDto genreMovie = new GenreMovieDto();
                    genreMovie.setGenreId(genre.getGenreId());
                    genreMovie.setMovieId(movie.getMovieId());
                    return genreMovie;
                })
                .collect(Collectors.toList());
    }
}
