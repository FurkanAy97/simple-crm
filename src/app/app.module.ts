import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';










@NgModule({
  declarations: [AppComponent, DashboardComponent, UserComponent, DialogAddUserComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatFormFieldModule, MatDatepickerModule,
    MatButtonModule, MatTooltipModule, MatDialogModule, MatInputModule, MatNativeDateModule, MatProgressBarModule, FormsModule, provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-be31e","appId":"1:422824591526:web:9d875653e5134a49d37467","storageBucket":"simple-crm-be31e.appspot.com","apiKey":"AIzaSyC1r3CD_-FiHBZc4YPxGIbbpbgdOFhunSs","authDomain":"simple-crm-be31e.firebaseapp.com","messagingSenderId":"422824591526"})), provideFirestore(() => getFirestore())],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
