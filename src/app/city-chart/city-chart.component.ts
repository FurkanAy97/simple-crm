import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

Chart.register(...registerables);

@Component({
  selector: 'app-city-chart',
  templateUrl: './city-chart.component.html',
  styleUrls: ['./city-chart.component.scss']
})
export class CityChartComponent implements AfterViewInit {
  userCities: string[] = [];
  productIDs: any;

  @ViewChild('myCityChartCanvas') myCityChartCanvas!: ElementRef;
  allUsers: any[];
  firestore = getFirestore();
  cityCounts: { [key: string]: number } = {};

  constructor(public authService: AuthService) {
  }

  countCities() {
    this.userCities.forEach(city => {
      this.cityCounts[city] = (this.cityCounts[city] || 0) + 1;
    });
    console.log(this.cityCounts);
  }

  async ngAfterViewInit() {
    const userCollection = collection(this.firestore, 'users');

    await new Promise<void>((resolve) => {
      onSnapshot(userCollection, (querySnapshot) => {
        this.allUsers = [];
        querySnapshot.forEach((doc) => {
          let userData = doc.data();
          userData['id'] = doc.id;
          this.allUsers.push(userData);
        });

        this.timeStampIntoDate();
        resolve();
      });
    });

    this.extractCities();
    this.countCities();  
    this.initializeChart();
  }

  timeStampIntoDate() {
    this.allUsers.forEach(user => {
      let timestamp = user.birthDate;
      let birthDate = new Date(timestamp);
      let formattedDate = birthDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      user.birthDate = formattedDate;
    });
  }

  extractCities() {
    this.userCities = this.allUsers.map(user => user.city);
    console.log(this.userCities);
  }

  initializeChart() {
    const cityLabels = Object.keys(this.cityCounts);
    const cityData = Object.values(this.cityCounts);

    let myCityChart = new Chart('myCityChart', {
      type: 'pie',
      data: {
        labels: cityLabels,
        datasets: [{
          label: '# of Sales',
          data: cityData,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
