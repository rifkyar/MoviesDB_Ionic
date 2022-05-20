import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage= 1;
  imageBaseUrl = environment.images;
  constructor(private movieService: MoviesService, private loadingController: LoadingController) { }

  ngOnInit() {
   this.LoadTopMovie();
  }
  async LoadTopMovie(event?:InfiniteScrollCustomEvent){
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles',
    })
    await loading.present();

    console.log("coba");
    this.movieService.getTopMovie(this.currentPage).subscribe((res) =>{
      loading.dismiss();
      // this.movies = [...this.movies, ...res.results]
      this.movies.push(...res.results);
      console.log(res.results);
      event?.target.complete();
      if(event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });

    
  }
  loadMore(event:InfiniteScrollCustomEvent){
    this.currentPage ++;
    this.LoadTopMovie(event);

  }

}
