import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/services/auth.service';
Chart.register(...registerables);

@Component({
    selector: 'app-sales-chart',
    templateUrl: './sales-chart.component.html',
    styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent {
    productNames: any[] = [];
    salesNumbers: any[] = [];
    productIDs: any;

    constructor(private productService: ProductService, public authService: AuthService) {}

    async initializeChart() {
        await this.productService.downloadProducts();
        await this.getProductNames();
        await this.getSales();

        const allProducts = this.productService.getProducts();

        let myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.productNames,
                datasets: [{
                    label: '# of Sales',
                    data: this.salesNumbers,
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

    async getProductNames() {
        for (let i = 0; i < this.productService.allProducts.length; i++) {
            const productName = this.productService.allProducts[i]['name'];
            this.productNames.push(productName);
        }
    }

    async getSales() {
        this.productService.allProducts.forEach(product => {
            let productName = product.name
            const resultObject = this.productService.allProducts.find(obj => obj.name === productName);
            let productSales = resultObject.sales
            this.salesNumbers.push(productSales)
        });
    }
}
