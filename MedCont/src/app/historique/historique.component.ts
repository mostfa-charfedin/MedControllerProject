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
   // Pagination properties
   pageSize: number = 5; // Number of documents per page
   currentPage: number = 1; // Current page number
   totalPages: number = 1; // Total number of pages
   pages: number[] = []; // Array to store page numbers
  constructor(private historiqueService: HistoriqueService,private route: ActivatedRoute,public router: Router,) { }


  ngOnInit(): void {
    this.loadHistory();


  }

  loadHistory(): void {
    this.historiqueService.getAllHistorys().subscribe(
      (response) => {
        this.Listehistorique = response;
        this.filteredListehistorique = this.Listehistorique;
        this.calculatePagination()

      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );
  }
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredListehistorique.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredListehistorique.slice(startIndex, startIndex + this.pageSize);
  }


  filter() {
    if(this.filterName === ""){
      this.filteredListehistorique = this.Listehistorique;
      this.calculatePagination()
    }
    else {
        this.filteredListehistorique = this.Listehistorique.filter((historique) =>
        historique.user?.username.toLowerCase().includes(this.filterName.toLowerCase())
        );
        this.calculatePagination()
      }
  }
}

