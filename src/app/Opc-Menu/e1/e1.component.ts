import { Component, OnInit } from '@angular/core';
import { cotizare } from 'src/app/Modelo/cotizacion-e1';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-e1',
  templateUrl: './e1.component.html',
  styleUrls: ['./e1.component.css']
})
export class E1Component implements OnInit {

        total=0
        cotizar: cotizare[];
        cotiza: cotizare;



  constructor() {
      this.cotizar = [];
      this.cotiza = new cotizare();


   }


  ngOnInit(): void {
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
        docResult.save(`Cotizacion_mano_de_obra_${new Date().toISOString()}.pdf`);
      });

  }

  EnviarDatos():any{
      this.cotizar.push(this.cotiza);
      this.cotiza.valorT = this.cotiza.valor * this.cotiza.cantidad;
      this.total= this.total + this.cotiza.valorT;
      this.cotiza = new cotizare();

  }
}
