import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-orders-details',
  templateUrl: './customer-orders-details.component.html',
  styleUrls: ['./customer-orders-details.component.css']
})
export class CustomerOrdersDetailsComponent implements OnInit {
 order: any;
  orderDta: any;


  constructor(  private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    this.order = this.route.params.subscribe(params => {
      this.orderDta = params['order'];
 });

      // console.log('1',this.order.toString());
      console.log('2',this.order);
      console.log('2',this.orderDta);
      // console.log(JSON.stringify(this.order))

  }

}
