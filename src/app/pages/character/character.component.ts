import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { response } from 'express';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit{
  character: any;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickandmortyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.rickAndMortyService.getCharacter(Number(id)).subscribe(response => {
      this.character = response;
    });
  }
}
