import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {

  @Input() title:string ='No title';
  @Input('labelsDonut') doughnutChartLabels!: Label[];
  @Input('dataDonut') doughnutChartData!: MultiDataSet;
  @Input() colors: Color[]= [
    {backgroundColor:['#6857E6','#009FEE','#F02059']}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
