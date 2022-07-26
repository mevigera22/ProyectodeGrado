import { Component, OnInit } from '@angular/core';
import { crono } from 'src/app/Modelo/cronograna';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-e3',
  templateUrl: './e3.component.html',
  styleUrls: ['./e3.component.css']
})
export class E3Component implements OnInit {
   // SumaPR=0;
    //SumaPP=0;
    //sumaDP=0;
    //SumaD=0;
    PGP=0;
    PGR=0;

    data = new Date();
    actividades: crono[];
    actidad: crono;
    SendDataonChange(event: any) {
      this.data = event.target.value;
      }
  constructor() {
    this.actividades =[];
    this.actidad = new crono();

   }

  ngOnInit(): void {

  }

  EnviarDatos():any{
      this.calular_dia();
      this.calcular_Porcentaje_Real();
      this.calcular_Porcentaje_plan();
      this.dias_retraso();
      this.PAvanceGlobal()
      this.actividades.push(this.actidad);
      this.actidad = new crono();


  }

  PAvanceGlobal(){
      var suma1 = suma1 + (this.actidad.dias * this.actidad.PAvanceP);
      var suma2 = suma2 + (this.actidad.dias * this.actidad.PAvanceR);
      console.log("suma 1");
      console.log(this.actidad.dias * this.actidad.PAvanceP);
      console.log("suma 2");
      console.log(this.actidad.dias * this.actidad.PAvanceR);
      console.log("suma 1");
      console.log(suma1);
      console.log("suma 2");
      console.log(suma2);
      this.PGP = suma1 / this.actidad.dias;
      this.PGR = suma2 / this.actidad.dias;

  }

  calular_dia(){
    const FI =new Date(this.actidad.ini);
    const FR =new Date(this.actidad.FR);
    const timeDiff = Math.abs(FR.getTime() - FI.getTime());
    this.actidad.dias = Math.floor((timeDiff / (1000 * 3600 * 24))-1);
  }
  calcular_Porcentaje_Real(){
    let dt = new Date();
    const FI =new Date(this.actidad.ini);

    const PAP = Math.abs(dt.getTime() - FI.getTime());
    const PAP1 = Math.floor((PAP / (1000 * 3600 * 24))-1);
    if(PAP1 > this.actidad.dias){
      this.actidad.PAvanceR = 100;
      //this.SumaPR = this.SumaPR + this.actidad.PAvanceR;
      this.actidad.estado = "Finalizado";
    }else{
      const cal = ((PAP1 - this.actidad.dias)/PAP1)*100;
      console.log(PAP1 - this.actidad.dias);
      this.actidad.PAvanceR = 100 + Number(cal.toFixed(2));
      //this.SumaPR = this.SumaPR + this.actidad.PAvanceR;
      this.actidad.estado = "En Proceso";
      console.log("porcentaje  real");
      console.log(this.actidad.dias);
      console.log(this.actidad.PAvanceR);
      console.log(PAP1);
      console.log(cal);
      console.log("Fporcentaje  real");
    }

  }
  calcular_Porcentaje_plan(){
    let dt = new Date();
    const FI =new Date(this.actidad.ini);
    const FP =new Date(this.actidad.FP);
    //this.sumaDP = FP.getDate() - FI.getTime();
    // Porcentaje de avance Plan
    const PAP = Math.abs(dt.getTime() - FI.getTime());
    const PAP1 = Math.floor(PAP/(1000 * 3600 * 24));
    const timeDiff = Math.abs(FP.getTime() - FI.getTime());
    let Duracion_Plan = Math.floor((timeDiff / (1000 * 3600 * 24)));
    if(PAP1 > Duracion_Plan){
      this.actidad.PAvanceP = 100;
      //this.SumaPP = this.SumaPP + this.actidad.PAvanceP;
    }else{
      const cal1 = ((PAP1- Duracion_Plan)/PAP1)*100;
      this.actidad.PAvanceP = 100 + Number(cal1.toFixed(2));
      console.log(PAP1);
      console.log("Porcentaje de plan");
      console.log(this.actidad.PAvanceP);
      console.log(cal1);
      console.log(Duracion_Plan);
      console.log("FPorcentaje de plan");
    }

  }
  dias_retraso(){
    const FI =new Date(this.actidad.ini);
    const FP =new Date(this.actidad.FP);
    const FR =new Date(this.actidad.FR);

    const Prom = Math.abs((FR.getTime()-FP.getTime())/(FR.getTime()- FI.getTime()+1));
    console.log("promedio retraso");
    console.log((FR.getTime()-FP.getTime()));
    console.log(FR.getTime()- FI.getTime());
    console.log("Fpromedio retraso");
    const PAP = Math.abs(FP.getTime() - FI.getTime());
    const PAP1 = Math.floor(PAP/(1000 * 3600 * 24));
    let i = Math.abs((PAP1 - this.actidad.dias));
    this.actidad.diasR =i-1;
    this.actidad.PdiasR =  Number(Prom.toFixed(2)) *100;
    //console.log(this.actidad.diasR);

  }

  CrearPDF(){
    // Extraemos el
    const DATA = document.getElementById('pdf');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 4
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Cronograma_${new Date().toISOString()}.pdf`);
    });

    }
    name = 'ExcelSheet.xlsx';

    exportToExcel(): void {
      let element = document.getElementById('season-tble');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

      XLSX.writeFile(book, this.name);
    }

}
