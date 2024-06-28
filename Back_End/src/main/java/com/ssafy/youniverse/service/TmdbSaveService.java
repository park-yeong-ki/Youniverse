package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.*;
import com.ssafy.youniverse.repository.bulk.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class TmdbSaveService {
    private final MovieBulkRepository movieRepository;
    private final GenreBulkRepository genreRepository;
    private final ActorBulkRepository actorRepository;
    private final DirectorBulkRepository directorRepository;
    private final KeywordBulkRepository keywordRepository;
    private final GenreMovieBulkRepository genreMovieRepository;
    private final ActorMovieBulkRepository actorMovieRepository;
    private final DirectorMovieBulkRepository directorMovieRepository;
    private final KeywordMovieBulkRepository keywordMovieRepository;
    private final OttMovieBulkRepository ottMovieRepository;

    /**
     * Bulk insert를 활용해 각 엔티티 개수만큼의 insert 쿼리를 묶어 DB에 저장
     */
    @Transactional
    public void saveInfos(Set<Movie> movieSet, Set<Genre> genreSet, Set<Actor> actorSet, Set<Director> directorSet, Set<Keyword> keywordSet,
                          Set<GenreMovie> genreMovieSet, Set<ActorMovie> actorMovieSet, Set<DirectorMovie> directorMovieSet, Set<KeywordMovie> keywordMovieSet, Set<OttMovie> ottMovieSet) {
        genreRepository.saveAll(genreSet);
        actorRepository.saveAll(actorSet);
        directorRepository.saveAll(directorSet);
        keywordRepository.saveAll(keywordSet);
        movieRepository.saveAll(movieSet);

        genreMovieRepository.saveAll(genreMovieSet);
        actorMovieRepository.saveAll(actorMovieSet);
        directorMovieRepository.saveAll(directorMovieSet);
        keywordMovieRepository.saveAll(keywordMovieSet);
        ottMovieRepository.saveAll(ottMovieSet);
    }
}
