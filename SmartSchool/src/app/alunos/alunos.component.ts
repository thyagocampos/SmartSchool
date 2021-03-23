import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno;    
  public modalRef: BsModalRef; 

  alunos = [
    {id: 1, nome:'Marta', sobrenome: 'Kent'   , telefone: 332255 },
    {id: 2, nome:'Paula', sobrenome: 'Isabela', telefone: 332255 },
    {id: 3, nome:'Laura', sobrenome: 'Antonia', telefone: 332255 },
    {id: 4, nome:'Luiza', sobrenome: 'Maria'  , telefone: 332255 },
    {id: 5, nome:'Lucas', sobrenome: 'Machado', telefone: 332255 },
    {id: 6, nome:'Pedro', sobrenome: 'Alves'  , telefone: 332255 },
    {id: 7, nome:'Paulo', sobrenome: 'José'   , telefone: 332255 }
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
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSelec(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar(){
    this.alunoSelecionado = null;    
  }
  
  alunoSubmit(){
    console.log(this.alunoForm.value);    
  }
}
