import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReportService } from '../servicios/report.service'; 
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  initDate : Date;
  finalDate : Date;
  formReport: FormGroup;

  constructor(public fb: FormBuilder,
              public reportService : ReportService,
              private spinner: NgxSpinnerService) { 
    this.formReport = this.fb.group({
      initDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  createReport(){
    if(this.validateForm()){
      this.spinner.show();
      this.reportService.generateReport(this.initDate, this.finalDate).subscribe(
        data => {
          this.spinner.hide();
          let file = new Blob([data], { type: 'application/pdf' }); 
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        },
        error => {
          console.log(error);
          this.spinner.hide();
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Parece que algo salio mal!',
          }); 
        }
      )
    }
  }

      /**
   * Valida si el formulario tiene los datos correctamente
   * dligenciados
   */
  validateForm():boolean{
    var bandera:boolean = true;
    if(this.formReport.get('initDate').hasError('required')
    || this.formReport.get('finalDate').hasError('required')){
      bandera = false;
    }
    return bandera;
  }

}
