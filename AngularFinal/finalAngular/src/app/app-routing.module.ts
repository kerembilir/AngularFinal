import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { KayitolComponent } from './components/kayitol/kayitol.component';
import { UyeProfilComponent } from './components/uye/uye-profil/uye-profil.component';
import { UyeCevapComponent } from './components/uye/uye-cevap/uye-cevap.component';
import { UyeninSorulariComponent } from './components/uye/uyenin-sorulari/uyenin-sorulari.component';
import { SoruComponent } from './components/soru/soru.component';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { AdminEtiketComponent } from './components/admin/admin-etiket/admin-etiket.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UyesoruComponent } from './components/uyesoru/uyesoru.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'kayitol', component: KayitolComponent
  },
  { 
    path: 'uye-profil', component: UyeProfilComponent 
  },
  { 
    path: 'uye-cevap', component: UyeCevapComponent
  },
  { 
    path: 'uyenin-sorulari', component: UyeninSorulariComponent
  },
  {
    path: 'soru/:soruId', component: SoruComponent
  },
  {
    path: 'kategori/:katId', component: KategoriComponent
  },
  {
    path: 'uyesoru/:uyeId', component: UyesoruComponent
  },
  {
    path: 'admin', component: AdminComponent, 
     canActivate:[AuthGuard],
     data: {
       yetkiler: ['Admin'],
       gerigit: '/login'
     }
  },
  {
    path: 'admin/kategori', component: AdminKategoriComponent, 
     canActivate:[AuthGuard],
     data: {
       yetkiler: ['Admin'],
       gerigit: '/login'
     }
  },
  {
    path: 'admin/etiket', component: AdminEtiketComponent, 
     canActivate:[AuthGuard],
     data: {
       yetkiler: ['Admin'],
       gerigit: '/login'
     }
  },
  {
    path: 'admin/soru', component: AdminSoruComponent, 
     canActivate:[AuthGuard],
     data: {
       yetkiler: ['Admin'],
       gerigit: '/login'
     }
  },
  {
    path: 'admin/cevap', component: AdminCevapComponent, 
     canActivate:[AuthGuard],
     data: {
       yetkiler: ['Admin'],
       gerigit: '/login'
     }
  },
  {
    path: 'admin/uye', component: AdminUyeComponent, 
     canActivate:[AuthGuard],
     data: {
       yetkiler: ['Admin'],
       gerigit: '/login'
     }
  },
  {
    path: 'admin/soru/:katId', component: AdminSoruComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
