import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UserService } from '../../../providers/user.service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { CostumerService } from '../../../providers/customer.service/costumer.service';
import { UtilsService } from './../../../providers/Utils/utils.service';
import { SupplierService } from '../../../providers/supplier.service/supplier.service';
import * as Chart from 'chart.js';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';
  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';



// Ragdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


  dataArray=[0,0,0,0,0,0,0,0];
  myConfig: any;
  userscount: any;
  customerscount: any;
  customersArray= [0,0,0,0,0,0,0,0];
  months: any;
  userCount: any[];
  orderCount: any[];
  userMonthes: any[];
  customers=[];
  totalCustomer: number;
  suppliers: any;
  totalSupplier: any;
  customersOrders: any;
  totalOrders: any;
  users: any;
  totalUsers: any;
  barChart:any;
  lineChart:any;
  array=[];
  orderMonthes: any[];
  customerMonthes: any[];





  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor(
    private userService:UserService,
    private toastr:ToastrService ,
    private customerService:CostumerService,
    private supplierService:SupplierService,
    private logger: NGXLogger ,
    private utilsService:UtilsService) {
    }

  ngOnInit(): void {
    this.getUsersByMonth();
    this.getCustomersByMonth();
    this.getOrdersByMonth();
    this.getCustomer();
    this.getSupplier();
    this.getCustomersOrders();
    this.getUsers();

    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }

    this.barChart = new Chart('barChart', {
      type: 'doughnut',
      data: {
          labels: ['المستخدمين', 'العملاء', 'الموردين'],
          datasets: [{
              label: 'hglsjo]ldk',
              data: [7, 4, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          },

        ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  this.lineChart = new Chart('lineChart', {
    type: 'bar',
    data: {
        labels: ['المستخدمين', 'العملاء', 'الموردين'],
        datasets: [{
            label: 'معدل الطلبات خلال الشهور',
            data: [7, 4, 3],
            backgroundColor:'rgba(255, 193, 7, 0.8)',
            borderColor:'rgba(255, 193, 7, 1)',
            fill: false
        },
    //     {
    //       label: 'العملاء',
    //       data: [7, 4, 3],
    //       backgroundColor: [
    //         'rgba(54, 162, 235, 0.2)'
    //       ],
    //       borderColor:'rgba(54, 162, 235, 1)',
    //       fill: false

    //   },
    //   {
    //     label: 'المستخدمين',
    //     data: [7, 4, 3],
    //     backgroundColor: 'rgba(255, 206, 86, 0.2)',
    //     borderColor:'rgba(255, 206, 86, 1)',
    //     fill: false
    // },


      ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//  this.updateOrderChart();

  }
    updateWeatherChart(){
    this.barChart.data.datasets[0].data = [this.totalUsers];
    this.barChart.data.datasets[1].data =  [this.totalCustomer];
    this.barChart.data.datasets[2].data = [this.totalSupplier] ;
    this.barChart.update();
}

    updateOrderChart(){
    this.lineChart.data.datasets[0].data = this.orderCount;
    // this.lineChart.data.datasets[1].data =  [this.customersArray];
    // this.lineChart.data.datasets[2].data = [this.userCount];
    this.lineChart.data.labels = this.orderMonthes;
    // this.lineChart.data.datasets[1].label =  [this.customerMonthes];
    // this.lineChart.data.datasets[2].label = [this.userMonthes];
    this.lineChart.update();
    }

    // updateOrderChart(){
    //   this.lineChart.data.datasets[0].data = [3,4,7];
    //   this.lineChart.data.datasets[1].data =  [0.6,7];
    //   this.lineChart.data.datasets[2].data = [9,4,3];
    //   this.lineChart.data.labels = [8,9,10];
    //   this.lineChart.update();
    //   }

  getUsersByMonth(){
    this.userService.findUsersByMonth().subscribe((res) =>{
     if (res == null){
       this.toastr.error('لا توجد معلومات');
     }
       let data = res['data'];
       console.log("data >>>>>" ,data);
       this.userCount=data;
       this.userCount = this.utilsService.convertJsonToArray(data , "count");
       this.userMonthes = this.utilsService.convertJsonToArray(data , "month");

       console.log('this.userCount',this.userCount);
       console.log('this.userCount',this.userMonthes);
       this.updateOrderChart();
       this.fillZingChart( this.userCount , this.customersArray, this.orderCount);
       },
       err =>{
         this.toastr.error(err);
     }
   )
 }

 getCustomersByMonth(){
  const year =2020;
  this.customerService.findCustomersByMonth().subscribe((res) =>{
   if (res == null){
     this.toastr.error('لا توجد معلومات');
   }
     let data = res['data'];
    if(data){
    this.customers=data;
    this.customersArray = this.utilsService.convertJsonToArray(data , "count");
    this.customerMonthes = this.utilsService.convertJsonToArray(data , "month");

    console.log('this.customersArray',this.customersArray);
    console.log('this.customerMonthes',this.customerMonthes);
    this.updateOrderChart();
    // this.fillZingChart( this.userCount ,  this.customersArray , this.orderCount);
    }else{
      this.toastr.error(' لا توجد معلومات خاصة بالعملاء ');
    }
     },
     err =>{
       this.toastr.error(err);
   }
 )
}

getOrdersByMonth(){
  const year =2020;
  this.customerService.findOrdersByMonth(year).subscribe((res) =>{
   if (res == null){
     this.toastr.error('لا توجد معلومات');
   }
     let data = res['data'];
     console.log("orders" , data);
     this.orderCount=this.utilsService.convertJsonToArray(data , "count");
     this.orderMonthes = this.utilsService.convertJsonToArray(data , "Month");
     console.log('this.orderCount',this.orderCount);
     console.log('this.orderMonthes',this.orderMonthes);
     this.updateOrderChart();
     console.log("orderCount >>>>>" + JSON.stringify( this.orderCount))
    // this.fillZingChart( this.userCount , this.customersArray , this.orderCount);
     },
     err =>{
       this.toastr.error(err);
   }
 )
}



 fillZingChart(users: any[] ,  customer: any[] , orders: any[] ,){
  this.myConfig ={
    type: 'bar',
    title: {
      text: 'Data Basics',
      fontSize: 24,
    },
    legend: {
      draggable: true,
    },
    scaleX: {
      label: { text: 'الشهور' },
      labels: this.userMonthes
    },
    scaleY: {
      label: { text: 'العدد ' }
    },
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 275,
      }
    },
    series: [
      {
        // Plot 1 values, linear data
        values:  users,
        text: 'Users',
      },
      {
        // Plot 2 values, linear data
        values: this.customersArray,
        text: 'Customers'
      },
      {
        // Plot 2 values, linear data
        values: this.orderCount,
        text: 'Orders'
      }
    ]
  };

 }

 getCustomer(){
  this.customerService.getCustomer().subscribe(
    res =>{
      //debugger;
      let data = res['data'];
      this.customers = data;
      this.totalCustomer = data.length;
       this.updateWeatherChart();
      this.array.push(this.totalCustomer);
      console.log('arrayc',this.array);
      // console.log('customers >>>',this.customers);
      },
      err =>{
      console.log(err);
    }
  )
}

getSupplier(){

  this.supplierService.getSupplier().subscribe(
    res =>{
      //debugger;
      let data = res['data'];
      this.suppliers = data;
      this.totalSupplier = data.length;
      this.updateWeatherChart();
      this.array.push(this.totalSupplier);
      console.log('arrays',this.array);
    //  console.log('suppliers >>>',this.suppliers);
      },
      err =>{
      console.log(err);
    }
  )
}

getCustomersOrders(){
  this.customerService.getCustomersOrders().subscribe(
    res =>{
      //debugger;
      let data = res['data'];
      this.customersOrders = data;
      this.totalOrders = data.length;
      // console.log('CustomerOrder >>>',this.customersOrders);
      },
      err =>{
      console.log(err);
    }
  )
}

getUsers(){
  this.userService.getUsers().subscribe(
    res =>{
      //debugger;
      let data = res['data'];
      this.users = data;
      this.totalUsers = data.length;
      this.updateWeatherChart();
      this.array.push(this.totalUsers);
      console.log('arrayu',[this.totalUsers]);
      // console.log('users >>>',this.users);
      },
      err =>{
      console.log(err);
    }
  )
}


}




