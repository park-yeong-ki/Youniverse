package com.ssafy.youniverse.api;

import com.deepl.api.DeepLException;
import com.deepl.api.TextResult;
import com.deepl.api.Translator;
import com.ssafy.youniverse.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/tmdb")
@RequiredArgsConstructor
public class TmdbController {

    private final TmdbService tmdbService;

    @Value("${deepL.auth-Key}")
    private String authKey;  // Replace with your key

    @PostMapping
    public ResponseEntity<?> readData(@RequestBody List<TmdbMovie> tmdbMovies) throws DeepLException, InterruptedException {
        String basicImage = "https://image.tmdb.org/t/p/original/";

        Translator translator = new Translator(authKey);

        for (TmdbMovie tmdbMovie : tmdbMovies) {
            //영화 생성
            Movie movie = new Movie();

            System.out.println("영화");
            System.out.println("-".repeat(10));
            System.out.println(tmdbMovie.getId());
            System.out.println(tmdbMovie.getTitle());
            System.out.println(tmdbMovie.getMovieImage());
            System.out.println(tmdbMovie.getLanguage());
            System.out.println(tmdbMovie.getRate());
            System.out.println(tmdbMovie.getRuntime());
            System.out.println(tmdbMovie.getOverView());

            //영화 입력
            movie.setMovieId(tmdbMovie.getId());
            movie.setTitle(tmdbMovie.getTitle());
            movie.setMovieImage(tmdbMovie.getMovieImage());
            movie.setMovieImage(tmdbMovie.getMovieImage());
            movie.setLanguage(tmdbMovie.getLanguage());
            movie.setRate(tmdbMovie.getRate());
            movie.setRuntime(tmdbMovie.getRuntime());
            movie.setOverView(tmdbMovie.getOverView());

            //장르리스트 생성
            List<Genre> genreList = new ArrayList<>();

            List<TmdbGenre> genres = tmdbMovie.getGenreList();
            System.out.println("장르");
            System.out.println("-".repeat(10));
            for (TmdbGenre tmdbGenre : genres) {
                System.out.println(tmdbGenre.getId());
                System.out.println(tmdbGenre.getName());
                System.out.println();

                //영화 장르 입력
                Genre genre = new Genre();
                genre.setGenreId(tmdbGenre.getId());
                genre.setGenreName(tmdbGenre.getName());
                genreList.add(genre);
            }

            //키워드리스트 생성
            List<Keyword> keywordList = new ArrayList<>();

            List<TmdbKeyword> keywords = tmdbMovie.getKeywordList();
            System.out.println("키워드");
            System.out.println("-".repeat(10));
            for (TmdbKeyword tmdbKeyword : keywords) {
                System.out.println(tmdbKeyword.getId());
                System.out.println(tmdbKeyword.getName());
                System.out.println();

                //키워드 입력
                Keyword keyword = new Keyword();
                keyword.setKeywordId(tmdbKeyword.getId());

                //번역
                TextResult result = translator.translateText(tmdbKeyword.getName(), null, "ko");
                keyword.setKeywordName(result.getText());

                keyword.setSource(0); //tmdb 소스는 0
                keywordList.add(keyword);
            }

            //Ott입력
            List<Ott> ottList = new ArrayList<>();

            System.out.println("OTT");
            System.out.println("-".repeat(10));
            TmdbOttList ottLists = tmdbMovie.getOttList();
            if (ottLists != null) {
                List<TmdbOtt> otts = new ArrayList<>();
                Set<Integer> set = new HashSet<>(); //중복된 OTT 제거용

                if (ottLists.getBuy() != null){
                    for (int i = 0; i < ottLists.getBuy().size(); i++) {
                        TmdbOtt tmdbOtt = ottLists.getBuy().get(i);
                        if (set.contains(tmdbOtt.getProvider_id())) continue;
                        otts.add(tmdbOtt);
                        set.add(tmdbOtt.getProvider_id());
                    }
                }
                if (ottLists.getFlatrate() != null){
                    for (int i = 0; i < ottLists.getFlatrate().size(); i++) {
                        TmdbOtt tmdbOtt = ottLists.getFlatrate().get(i);
                        if (set.contains(tmdbOtt.getProvider_id())) continue;
                        otts.add(tmdbOtt);
                        set.add(tmdbOtt.getProvider_id());
                    }
                }
                if (ottLists.getRent() != null){
                    for (int i = 0; i < ottLists.getRent().size(); i++) {
                        TmdbOtt tmdbOtt = ottLists.getRent().get(i);
                        if (set.contains(tmdbOtt.getProvider_id())) continue;
                        otts.add(tmdbOtt);
                        set.add(tmdbOtt.getProvider_id());
                    }
                }

                for (TmdbOtt tmdbOtt : otts) {
                    System.out.println(tmdbOtt.getProvider_id());
                    System.out.println(tmdbOtt.getProvider_name());
                    System.out.println(basicImage + tmdbOtt.getLogo_path()); //기본 이미지 주소 붙여야함
                    System.out.println();

                    Ott ott = new Ott();
                    ott.setOttId(tmdbOtt.getProvider_id());
                    ott.setOttName(tmdbOtt.getProvider_name());
                    ott.setOttImage(basicImage + tmdbOtt.getLogo_path());
                    ott.setOttUrl("j9b204.p.ssafy.io"); //임시값 넣기
                    ottList.add(ott);
                }
            }

            //영화 배우
            List<Actor> actorList = new ArrayList<>();

            List<TmdbCast> casts = tmdbMovie.getCastList();
            System.out.println("캐스팅");
            System.out.println("-".repeat(10));
            for (TmdbCast tmdbCast : casts) {
                System.out.println(tmdbCast.getId());
                System.out.println(tmdbCast.getName());
                System.out.println(tmdbCast.getKnown_for_department());
                System.out.println(basicImage + tmdbCast.getProfile_path()); //기본 이미지 주소 붙여야함
                System.out.println();

                Actor actor = new Actor();
                actor.setActorId(tmdbCast.getId());

                //번역
                TextResult result = translator.translateText(tmdbCast.getName(), null, "ko");
                actor.setActorName(result.getText());

                actor.setActorImage(basicImage + tmdbCast.getProfile_path());
                actorList.add(actor);
            }

            //감독 입력
            List<Director> directorList = new ArrayList<>();

            List<TmdbCrew> crews = tmdbMovie.getCrewList();
            System.out.println("연출진");
            System.out.println("-".repeat(10));
            for (TmdbCrew tmdbCrew : crews) {
                System.out.println(tmdbCrew.getId());
                System.out.println(tmdbCrew.getName());
                System.out.println(tmdbCrew.getJob());
                System.out.println(basicImage + tmdbCrew.getProfile_path()); //기본 이미지 주소 붙여야함
                System.out.println();

                Director director = new Director();
                director.setDirectorId(tmdbCrew.getId());

                //번역
                TextResult result = translator.translateText(tmdbCrew.getName(), null, "ko");
                director.setDirectorName(result.getText());

                director.setDirectorImage(basicImage + tmdbCrew.getProfile_path());
                directorList.add(director);
            }

            //DB에 tmdb 넣기

            //Ott
            for (Ott ott : ottList) {
                Ott savedOtt = tmdbService.saveOtt(ott);
                OttMovie ottMovie = new OttMovie();
                ottMovie.setOtt(savedOtt);
                ottMovie.setMovie(movie);
                movie.getOttMovies().add(ottMovie);
            }

            //키워드
            for (Keyword keyword : keywordList) {
                Keyword saveKeyword = tmdbService.saveKeyword(keyword);
                KeywordMovie keywordMovie = new KeywordMovie();
                keywordMovie.setKeyword(saveKeyword);
                keywordMovie.setMovie(movie);
                movie.getKeywordMovies().add(keywordMovie);
            }

            //장르
            for (Genre genre : genreList) {
                Genre saveGenre = tmdbService.saveGenre(genre);
                GenreMovie genreMovie = new GenreMovie();
                genreMovie.setGenre(saveGenre);
                genreMovie.setMovie(movie);
                movie.getGenreMovies().add(genreMovie);
            }

            //배우
            for (Actor actor : actorList) {
                Actor saveActor = tmdbService.saveActor(actor);
                ActorMovie actorMovie = new ActorMovie();
                actorMovie.setActor(saveActor);
                actorMovie.setMovie(movie);
                movie.getActorMovies().add(actorMovie);
            }

            //감독
            for (Director director : directorList) {
                Director saveDirector = tmdbService.saveDirector(director);
                DirectorMovie directorMovie = new DirectorMovie();
                directorMovie.setDirector(saveDirector);
                directorMovie.setMovie(movie);
                movie.getDirectorMovies().add(directorMovie);
            }

            //영화
            tmdbService.saveMovie(movie);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
