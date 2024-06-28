package com.ssafy.youniverse.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.youniverse.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
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

    private Set<Movie> movieSet = ConcurrentHashMap.newKeySet();
    private Set<Genre> genreSet = ConcurrentHashMap.newKeySet();
    private Set<Actor> actorSet = ConcurrentHashMap.newKeySet();
    private Set<Director> directorSet = ConcurrentHashMap.newKeySet();
    private Set<Keyword> keywordSet = ConcurrentHashMap.newKeySet();
    private Set<GenreMovie> genreMovieSet = ConcurrentHashMap.newKeySet();
    private Set<ActorMovie> actorMovieSet = ConcurrentHashMap.newKeySet();
    private Set<DirectorMovie> directorMovieSet = ConcurrentHashMap.newKeySet();
    private Set<KeywordMovie> keywordMovieSet = ConcurrentHashMap.newKeySet();
    private Set<OttMovie> ottMovieSet = ConcurrentHashMap.newKeySet();

    /**
     * 각 페이지 호출 후 페이지 내의 영화 목록을 getMovie로 전송
     * chunk size 크기만큼 비동기 실행
     * @param page
     */
    @Async("tmdbExecutor")
    public CompletableFuture<Integer> fetchPage(int page) {
        CompletableFuture<Integer> completableFuture = new CompletableFuture<>();
        try {
            JsonNode results = objectMapper.readTree(tmdbClient.getPopularMoviesId(lang, page)).path("results");
            for (JsonNode result : results) {
                getMovie(result.path("id").asInt());
            }

            log.info("Success fetching page {}", page);
            completableFuture.complete(page);
        } catch (Exception e) {
            log.error("Error fetching page {}", page);
            completableFuture.completeExceptionally(e);
        }

        return completableFuture;
    }

    /**
     * 영화 관련 정보 모두 조회
     * details 영화 정보, 장르
     * keywords 영화 키워드
     * watch providers OTT 정보
     * credits 영화 배우, 감독
     * @param id
     */
    private void getMovie(int id) throws JsonProcessingException {
        try {
            String details = tmdbClient.getDetails(id, lang);
            Movie movie = toMovieEntity(details);
            List<Genre> genres = toGenreEntity(details);

            String credits = tmdbClient.getCredits(id, lang);
            List<Actor> actors = toActorEntity(credits);
            List<Director> directors = toDirectorEntity(credits);

            List<Keyword> keywords = toKeywordEntity(tmdbClient.getKeywords(id));
            Set<Ott> otts = toOttEntity(tmdbClient.getWatchProviders(id));

            addEntity(genres, movie, actors, directors, keywords, otts);

            log.info("Success fetching movie {}", id);
        } catch (Exception e) {
            log.error("Error fetching movie {}: {}", id, e.getMessage());
            throw e;
        }
    }


    private Movie toMovieEntity(String json) throws JsonProcessingException {
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

    private List<Genre> toGenreEntity(String json) throws JsonProcessingException {
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

    private List<Keyword> toKeywordEntity(String json) throws JsonProcessingException {
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
    private Set<Ott> toOttEntity(String json) throws JsonProcessingException {
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

    private List<Actor> toActorEntity(String json) throws JsonProcessingException {
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

    private List<Director> toDirectorEntity(String json) throws JsonProcessingException {
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

    /**
     * 영화 한 편의 정보를 여러 엔티티에 맞추어 각각의 Set에 저장
     */
    private void addEntity(List<Genre> genres, Movie movie, List<Actor> actors, List<Director> directors, List<Keyword> keywords, Set<Ott> otts) {
        genreMovieSet.addAll(makeGenreMovie(genres, movie));
        actorMovieSet.addAll(makeActorMovie(actors, movie));
        directorMovieSet.addAll(makeDirectorMovie(directors, movie));
        keywordMovieSet.addAll(makeKeywordMovie(keywords, movie));
        ottMovieSet.addAll(makeOttMovie(otts, movie));

        movieSet.add(movie);
        genreSet.addAll(genres);
        actorSet.addAll(actors);
        directorSet.addAll(directors);
        keywordSet.addAll(keywords);
    }

    private List<OttMovie> makeOttMovie(Set<Ott> otts, Movie movie) {
        return otts.stream()
                .map(ott -> {
                    OttMovie ottMovie = new OttMovie();
                    ottMovie.setOtt(ott);
                    ottMovie.setMovie(movie);
                    return ottMovie;
                })
                .collect(Collectors.toList());
    }

    private List<KeywordMovie> makeKeywordMovie(List<Keyword> keywords, Movie movie) {
        return keywords.stream()
                .map(keyword -> {
                    KeywordMovie keywordMovie = new KeywordMovie();
                    keywordMovie.setKeyword(keyword);
                    keywordMovie.setMovie(movie);
                    return keywordMovie;
                })
                .collect(Collectors.toList());
    }

    private List<DirectorMovie> makeDirectorMovie(List<Director> directors, Movie movie) {
        return directors.stream()
                .map(director -> {
                    DirectorMovie directorMovie = new DirectorMovie();
                    directorMovie.setDirector(director);
                    directorMovie.setMovie(movie);
                    return directorMovie;
                })
                .collect(Collectors.toList());
    }

    private List<ActorMovie> makeActorMovie(List<Actor> actors, Movie movie) {
        return actors.stream()
                .map(actor -> {
                    ActorMovie actorMovie = new ActorMovie();
                    actorMovie.setActor(actor);
                    actorMovie.setMovie(movie);
                    return actorMovie;
                })
                .collect(Collectors.toList());
    }

    private List<GenreMovie> makeGenreMovie(List<Genre> genres, Movie movie) {
        return genres.stream()
                .map(genre -> {
                    GenreMovie genreMovie = new GenreMovie();
                    genreMovie.setGenre(genre);
                    genreMovie.setMovie(movie);
                    return genreMovie;
                })
                .collect(Collectors.toList());
    }

    /**
     * 엔티티를 담은 Set 메모리 초기화
     */
    public void setClear() {
        movieSet.clear();
        genreSet.clear();
        actorSet.clear();
        directorSet.clear();
        keywordSet.clear();
        genreMovieSet.clear();
        actorMovieSet.clear();
        directorMovieSet.clear();
        keywordMovieSet.clear();
        ottMovieSet.clear();
    }

    /**
     * 각 엔티티를 담은 Set을 반환할 get 메서드
     */

    public Set<Movie> getMovieSet() {
        return movieSet;
    }

    public Set<Genre> getGenreSet() {
        return genreSet;
    }

    public Set<Actor> getActorSet() {
        return actorSet;
    }

    public Set<Director> getDirectorSet() {
        return directorSet;
    }

    public Set<Keyword> getKeywordSet() {
        return keywordSet;
    }

    public Set<GenreMovie> getGenreMovieSet() {
        return genreMovieSet;
    }

    public Set<ActorMovie> getActorMovieSet() {
        return actorMovieSet;
    }

    public Set<DirectorMovie> getDirectorMovieSet() {
        return directorMovieSet;
    }

    public Set<KeywordMovie> getKeywordMovieSet() {
        return keywordMovieSet;
    }

    public Set<OttMovie> getOttMovieSet() {
        return ottMovieSet;
    }
}
