import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {CharactersService} from "../services/characters.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {CharactersDataSource} from "../services/characters.datasource";


@Component({
    selector: 'characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, AfterViewInit {

    characterIcon = "";

    dataSource: CharactersDataSource;

    displayedColumns= ["id", "name", "species", "origin", "gender"];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild('input', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute,
                private charactersService: CharactersService) {

    }

    ngOnInit() {

        this.dataSource = new CharactersDataSource(this.charactersService);

        this.dataSource.loadCharacters('asc', 0, 5);


    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadCharactersPage())
        )
        .subscribe();
    }

    loadCharactersPage() {
        this.dataSource.loadCharacters(
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    setCharIcon(img) {
        this.characterIcon = img;
    }
}
