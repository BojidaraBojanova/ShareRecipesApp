import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../types/recipe';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchQuery: string = '';
  searchResults: Recipe[] = [];
  isLoading: boolean = true;


  constructor(private route: ActivatedRoute, private searchService: SearchService) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'];

        this.search();
        console.log(this.searchResults)
      })
  }

  search():void{
    if(this.searchQuery.trim() !== ''){
      this.searchService.searchRecipes(this.searchQuery).subscribe(
        results => {
          this.searchResults = results;
          this.isLoading = false;
        },
        error => {
          this.searchResults = []
          console.error('Error searching recipes', error)
        }
      )
    }
  }
}
