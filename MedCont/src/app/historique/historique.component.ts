import { Component } from '@angular/core';
import { Historique } from '../models/historique';
import { HistoriqueService } from '../services/historique.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {

Listehistorique: Historique[] = [];
  filteredListehistorique: Historique[] = [];
  filterName: string = '';

  constructor(private historiqueService: HistoriqueService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loadHistory();


  }

  loadHistory(): void {
    this.historiqueService.getAllHistorys().subscribe(
      (response) => {
        this.Listehistorique = response;
        this.filteredListehistorique = this.Listehistorique;
      

      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );
  }


  filter() {
    if(this.filterName === ""){
      this.filteredListehistorique = this.Listehistorique;
    }
    else {
        this.filteredListehistorique = this.Listehistorique.filter((historique) =>
        historique.user?.username.toLowerCase().includes(this.filterName.toLowerCase())
        );
      }
  }
}

