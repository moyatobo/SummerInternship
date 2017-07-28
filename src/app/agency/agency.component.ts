/**
 * If the chart breaks look at this issue
 * https://github.com/valor-software/ng2-charts/issues/632
 * We had to make changes to the chart.js in node-modules/ng2-charts/charts/chart.js
 * :)
 */

import { Component, OnInit } from '@angular/core';
import { Agent } from '../shared/agency';
import { Services } from '../services/services.component';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})

export class AgencyComponent implements OnInit {
  errorMessage: string;
  id: string;
  title = 'app works!';
  jedi: Object;
  agency: Agent[];
  mode = 'Observable';

  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';

  //The chart starts up with these names on the x-axis
  public barChartLabels: Array<any> = ['Agency1', 'Agency2', 'Agency3', 'Agency4', 'Agency5', 'GLOBAL'];
  public all_Names: string[];
  public all_Rates: Array<any> = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  };

  //The chart starts up with these values on the y-axis
  public barChartData: Array<any> = [{ data: [0, 0, 0, 0, 0, 0], label: 'ANY' }];  // challenge rates 

  constructor(private service: Services) { }

  ngOnInit() {
    this.getAgency();
    setInterval(()  =>  {  this.getAgency(); },  3000);   //We get new data every 3secs                 
  }

  getAgency(): void {
    var agency = this.service.getAgent()
      .subscribe(res => {
        this.agency = res;
        this.clearArrays();
        this.helper(this.agency);

      },
      error => this.errorMessage = <any>error);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  //Calculates the rate and use the floor method to round down
  public calcRate(challenge: number, login: number): number {
    return Math.floor((challenge / login) * 100);
  }


  //Clears all the arrays used to store fresh data
  clearArrays() {
    this.all_Names = [];
    this.all_Rates = [];

  }

  /* This is where all the storage gets done
  Data coming from the API gets stored into the names and rates array. */
  helper(incoming: any) {
    var agency_Login;
    var agency_Challenge;
    var rate1;

    for (var eachAgent in this.agency) {


      this.all_Names.push(eachAgent);
      rate1 = this.calcRate(this.agency[eachAgent]['numChallenges'], this.agency[eachAgent]['numLogins']);
      this.all_Rates.push(rate1);

    }

    this.resetData();
    this.resetNames();

  }

  // This is where the rates gets reset
  public resetData() {

    this.barChartData = [
      { data: [this.all_Rates[0], this.all_Rates[1], this.all_Rates[2], this.all_Rates[3], this.all_Rates[4], this.all_Rates[5]], label: "rates" }


    ];

  }

  // This is where the names gets reset
  public resetNames() {
    this.barChartLabels = [this.all_Names[0], this.all_Names[1], this.all_Names[2], this.all_Names[3], this.all_Names[4], this.all_Names[5]];


  }


  public chartClicked(e: any): void {
    console.log(e);
  }

  //This allows rates for each agency to be viewed when the cursor is moved on each bar
  public chartHovered(e: any): void {
    console.log(e);
  }
}
