import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
      gender
      status
      species
    }
  }
`;

const ADD_CHARACTER = gql`
  mutation AddCharacter($name: String!, $gender: String!, $status: String!, $species: String!) {
    addCharacter(name: $name, gender: $gender, status: $status, species: $species) {
      id
      name
      gender
      status
      species
    }
  }
`;

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient, private apollo: Apollo) { }

  getCharacters(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/?page=${page}`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  getCharactersApollo(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_CHARACTERS,
      })
      .valueChanges.pipe(map(result => result.data));
  }

  addCharacter(name: string, gender: string, status: string, species: string): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_CHARACTER,
      variables: {
        name,
        gender,
        status,
        species,
      },
    });
  }

  deleteCharacter(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_CHARACTER,
      variables: {
        id,
      },
    });
  }
}
