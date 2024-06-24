import { Component, OnInit, ViewChild } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    InfiniteScrollDirective,
    FormsModule,
    MatButtonModule,
    MatSortModule,
    MatCheckboxModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  characters = Array();
  filteredCharacters = Array();
  page = 1;
  maxPages = 1;
  searchTerm = '';
  dataSource = new MatTableDataSource(this.filteredCharacters);
  enabledGenders = Array();
  newCharacter = { name: '', gender: '', status: '', species: '' };

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rickAndMortyService: RickandmortyService) {}

  ngOnInit(): void {
      this.loadCharacters();
      this.dataSource.data = this.characters;
      this.enabledGenders = ["Male", "Female", "Genderless", "Unknown"];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadCharacters(): void {
    this.rickAndMortyService.getCharacters(this.page).subscribe(response => {
      this.characters = [...this.characters, ...response.results];
      this.maxPages = response.info.pages;
    });

    
  }

  onScroll(): void {
    if (this.page < this.maxPages) {
      this.page++;
      this.loadCharacters();
      //this.dataSource.data = this.characters;
      this.checkGender();
    }
  }

  loadAllCharacters(): void {
    while (this.page < this.maxPages) {
      this.page++;
      this.loadCharacters();
      //delay(500);
      //this.dataSource.data = this.characters;
      this.checkGender();
    } 
  }

  onSearch(): void {
    if (!this.searchTerm) {
      //this.dataSource.data = this.characters;
      this.checkGender();
    }
    else {
      this.loadAllCharacters();
      this.filteredCharacters = this.characters.filter(character => 
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.dataSource.data = this.filteredCharacters.filter(item => this.enabledGenders.includes(item.gender));;
    }
  }

  onGenderCheckbox(gender: string): void {
    if (this.enabledGenders.includes(gender)) {
      this.enabledGenders = this.enabledGenders.filter(item => item !== gender);
    }
    else {
      this.enabledGenders.push(gender);
    }
    this.checkGender();
  }

  checkGender(): void {
    this.dataSource.data = this.characters.filter(item => this.enabledGenders.includes(item.gender));
  }

  loadCharactersApollo(): void {
    this.rickAndMortyService.getCharactersApollo().subscribe((data: any) => {
      this.characters = data.characters;
    });
  }

  addCharacter(): void {
    this.rickAndMortyService.addCharacter(this.newCharacter.name, this.newCharacter.gender, this.newCharacter.status, this.newCharacter.species).subscribe(() => {
      this.loadCharactersApollo();
      this.newCharacter = { name: '', gender: '', status: '', species: '' };
    });

    this.dataSource.data = this.characters;
  }

  deleteCharacter(id: string): void {
    this.rickAndMortyService.deleteCharacter(id).subscribe(() => {
      this.loadCharacters();
    });
  }
}
