import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { response } from 'express';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  characters = Array();
  page = 1;
  maxPages = 1;

  constructor(private rickAndMortyService: RickandmortyService) {}

  ngOnInit(): void {
      this.loadCharacters();
  }

  loadCharacters(): void {
    this.rickAndMortyService.getCharacters(this.page).subscribe(response => {
      this.characters = [...this.characters, ...response.results];
      this.maxPages = response.info.pages;
    });
  }

  onScroll(): void {
    this.page++;
    this.loadCharacters();
  }

  //TODO
  public loadAllCharacters(): void {
    while (this.page < this.maxPages) {
      this.page++;
      this.loadCharacters();
      delay(500);
    } 
  }

  
}
