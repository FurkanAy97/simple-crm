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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { NgChartsModule } from 'ng2-charts';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { ProductsComponent } from './products/products.component';
import { BestProductComponent } from './best-product/best-product.component';
import { LoginComponent } from './login/login.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SignUpComponent } from './sign-up/sign-up.component';










@NgModule({
  declarations: [AppComponent, DashboardComponent, UserComponent, DialogAddUserComponent, UserDetailComponent, DialogEditAddressComponent, DialogEditUserComponent, SalesChartComponent, ProductsComponent, BestProductComponent, LoginComponent, SignUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    FormsModule,
    MatMenuModule,
    NgChartsModule,
    // Remove the duplicate provideFirebaseApp instance
    provideFirebaseApp(() => initializeApp({
      "projectId": "simple-crm-be31e",
      "appId": "1:422824591526:web:9d875653e5134a49d37467",
      "storageBucket": "simple-crm-be31e.appspot.com",
      "apiKey": "AIzaSyC1r3CD_-FiHBZc4YPxGIbbpbgdOFhunSs",
      "authDomain": "simple-crm-be31e.firebaseapp.com",
      "messagingSenderId": "422824591526"
    })),
    // ... other providers
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
