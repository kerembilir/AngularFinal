import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  kadi: string;
  kategoriler: Kategori[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis:ApiService
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
    if (this.apiServis.oturumKontrol){
      this.kadi=localStorage.getItem("kadi");
    }
  }
  OturumKapat(){
    localStorage.clear();
    location.href="/";
  }

  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d:Kategori[]) => {
      this.kategoriler = d;
    });
  }
  
  
  
  
  

}

