import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { ApiService } from './services/api.service';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { AdminEtiketComponent } from './components/admin/admin-etiket/admin-etiket.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { UyeCevapComponent } from './components/uye/uye-cevap/uye-cevap.component';
import { UyeProfilComponent } from './components/uye/uye-profil/uye-profil.component';
import { UyeninSorulariComponent } from './components/uye/uyenin-sorulari/uyenin-sorulari.component';
import { LoginComponent } from './components/login/login.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UyesoruComponent } from './components/uyesoru/uyesoru.component';
import { KayitolComponent } from './components/kayitol/kayitol.component';
import { SoruComponent } from './components/soru/soru.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { EtiketDialogComponent } from './components/dialogs/etiket-dialog/etiket-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { CevapDialogComponent } from './components/dialogs/cevap-dialog/cevap-dialog.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { UyeSoruDialogComponent } from './components/dialogs/uye-soru-dialog/uye-soru-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    SoruComponent,
    KategoriComponent,
    UyesoruComponent,
    UyesoruComponent,
    KayitolComponent,

    //üye
    UyeProfilComponent,
    UyeCevapComponent,
    UyeninSorulariComponent,
    FotoyukleDialogComponent,
    
    //admin
    AdminComponent,
    AdminKategoriComponent,
    AdminEtiketComponent,
    AdminSoruComponent,
    AdminCevapComponent,
    AdminUyeComponent,
    
    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    EtiketDialogComponent,
    KategoriDialogComponent,
    CevapDialogComponent,
    SoruDialogComponent,
    UyeSoruDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    
    UyeDialogComponent,
    FotoyukleDialogComponent,
    EtiketDialogComponent,
    KategoriDialogComponent,
    CevapDialogComponent,
    SoruDialogComponent,
    UyeSoruDialogComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AlertService, ApiService, SafeHTMLPipe, AuthGuard, 
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
