import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(AppComponent.logged === false){
      this.redirect();
    }
  }

  redirect() {
    this.router.navigate(['login']);
}

}
