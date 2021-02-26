
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Character} from "../model/character";
import {CharactersService} from "./characters.service";
import {catchError, finalize} from "rxjs/operators";



export class CharactersDataSource implements DataSource<Character> {

    private characterSubject = new BehaviorSubject<Character[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private charactersService: CharactersService) {

    }

    loadCharacters(sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.charactersService.findCharacters(sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(characters => this.characterSubject.next(characters));

    }

    connect(collectionViewer: CollectionViewer): Observable<Character[]> {
        console.log("Connecting data source");
        return this.characterSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.characterSubject.complete();
        this.loadingSubject.complete();
    }

}

