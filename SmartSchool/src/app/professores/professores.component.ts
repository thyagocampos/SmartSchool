import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public titulo = 'Professores';
  public profSelecionado: Professor;
  public professorForm: FormGroup;
  public modalRef: BsModalRef; 

  professores = [
    {id: 1, nome: "Lauro"     , disciplina: 'Matemática'},
    {id: 2, nome: "Roberto"   , disciplina: 'Física'},
    {id: 3, nome: "Ronaldo"   , disciplina: 'Português'},    
    {id: 4, nome: "Rodrigo"   , disciplina: 'Inglês'},
    {id: 5, nome: "Alexandre" , disciplina: 'Programação'}
  ];

  constructor(private fb: FormBuilder,
              private modalService: BsModalService) { 
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

criarForm(){
  this.professorForm = this.fb.group({
    nome:['', Validators.required],
    disciplina: ['',Validators.required]
  });
}

  professorSelec(professor: Professor){
    this.profSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar(){
    this.profSelecionado = null;
  }

  professorSubmit(){
    console.log(this.professorForm.value);
  }

}
