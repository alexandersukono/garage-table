

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import {Character} from "../model/character";


@Injectable()
export class CharactersService {

    constructor(private http:HttpClient) {

    }

    findCharacters(sortOrder = 'asc', pageNumber = 0, pageSize = 5):  Observable<Character[]> {
            return this.http.get<Character[]>('https://finalspaceapi.com/api/v0/character/', {
                params: new HttpParams()
                    .set('sort', sortOrder)
                    .set('pageNumber', pageNumber.toString())
                    .set('limit', pageSize.toString())
            });
        } 

}