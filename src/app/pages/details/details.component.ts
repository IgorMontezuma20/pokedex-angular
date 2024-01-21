import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { PokeApiService } from 'src/app/service/poke-api.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  private pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private nameUrl: string = 'https://pokeapi.co/api/v2/pokemon-species'

  constructor(
    private activeRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }
  ngOnInit(): void {
    this.pokemon;
  }

  get pokemon() {
    const id = this.activeRoute.snapshot.params['id']
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.pokemonUrl}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.nameUrl}/${id}`);

    return forkJoin([pokemon, name]).subscribe((res) => {
      console.log(res);
    });
  }
}
