package com.ssafy.youniverse.api;

import com.ssafy.youniverse.entity.*;
import com.ssafy.youniverse.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class TmdbService {
    private final OttRepository ottRepository;
    private final GenreRepository genreRepository;
    private final ActorRepository actorRepository;
    private final DirectorRepository directorRepository;
    private final KeywordRepository keywordRepository;
    private final MovieRepository movieRepository;

    public Ott saveOtt(Ott ott) {
        Optional<Ott> optionalOtt = ottRepository.findById(ott.getOttId());
        if (optionalOtt.isPresent()) { //이미 존재하는 OTT인 경우
            return optionalOtt.get();
        }
        return ottRepository.save(ott);
    }

    public Genre saveGenre(Genre genre) {
        Optional<Genre> optionalGenre = genreRepository.findById(genre.getGenreId());
        if (optionalGenre.isPresent()) { //이미 존재하는 Genre인 경우
            return optionalGenre.get();
        }
        return genreRepository.save(genre);
    }

    public Actor saveActor(Actor actor) {
        Optional<Actor> optionalActor = actorRepository.findById(actor.getActorId());
        if (optionalActor.isPresent()) { //존재하는 배우인 경우
            return optionalActor.get();
        }
        return actorRepository.save(actor);
    }

    public Director saveDirector(Director director) {
        Optional<Director> optionalDirector = directorRepository.findById(director.getDirectorId());
        if (optionalDirector.isPresent()) { //존재하는 감독인 경우
            return optionalDirector.get();
        }
        return directorRepository.save(director);
    }

    public Keyword saveKeyword(Keyword keyword) {
        Optional<Keyword> optionalKeyword = keywordRepository.findById(keyword.getKeywordId());
        if (optionalKeyword.isPresent()) { //존재하는 키워드인 경우
            return optionalKeyword.get();
        }
        return keywordRepository.save(keyword);
    }

    public Movie saveMovie(Movie movie) {
        Optional<Movie> optionalMovie = movieRepository.findById(movie.getMovieId());
        if (optionalMovie.isPresent()) {
            return optionalMovie.get();
        }
        return movieRepository.save(movie);
    }
}
