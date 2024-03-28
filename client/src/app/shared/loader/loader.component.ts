import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy{
  isLoading: boolean = false;
  //private subscription: Subscription;

  // constructor(private loadingService: LoaderService){
  //   this.subscription = this.loadingService.isLoading$.subscribe(isLoading => {
  //     this.isLoading = isLoading;
  //   })
  // }
 

  ngOnDestroy(): void {
      //this.subscription.unsubscribe();
  }
}
