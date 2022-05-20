import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie=null;
  imageBaseUrl = environment.images;
  constructor(private route:ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(id).subscribe((res) =>{
      console.log(res);
      this.movie = res;
    });
  }
  openIMDB(){
    window.open("https://www.imdb.com/title/"+ this.movie.imdb_id);
  }
  openHomepage(){
    window.open(this.movie.homepage)
  }
}
