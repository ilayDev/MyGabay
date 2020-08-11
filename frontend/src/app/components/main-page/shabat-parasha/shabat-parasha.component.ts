import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shabat-parasha',
  templateUrl: './shabat-parasha.component.html',
  styleUrls: ['./shabat-parasha.component.css']
})
export class ShabatParashaComponent implements OnInit {

  nextParasha: string ;
  path: string = 'hebcal/getParasha';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.get(this.path).subscribe(parasha => this.nextParasha = parasha);
  }

}
