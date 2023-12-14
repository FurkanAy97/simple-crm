import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../product.service';
Chart.register(...registerables);

@Component({
    selector: 'app-sales-chart',
    templateUrl: './sales-chart.component.html',
    styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent {
    productNames: any[] = []
    salesNumbers: any[] = []

    constructor(private productService: ProductService) {}

    ngOnInit() {
        const allProducts = this.productService.getProducts();

        for (let i = 0; i < allProducts.length; i++) {
            const sales = this.productService.getSales(i);
            this.salesNumbers.push(sales)
        }
        this.getProductNames()
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


    getProductNames() {
        for (let i = 0; i < this.productService.allProducts.length; i++) {
            const productName = this.productService.allProducts[i]['name'];
            this.productNames.push(productName);
        }
    }

}
