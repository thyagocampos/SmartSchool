import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';
import { ProfessorService } from './professor.service';

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
  public modo = 'post';
  public professores: Professor[];

  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private professorService: ProfessorService) {
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.CarregarProfessores();
  }

  CarregarProfessores() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  criarForm() {
    this.professorForm = this.fb.group({
      id: [],
      nome: ['', Validators.required]
    });
  }

  professorSelec(professor: Professor) {
    this.profSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar() {
    this.profSelecionado = null;
  }

  professorSubmit() {
    this.salvarProfessor(this.professorForm.value);
  }

  salvarProfessor(professor: Professor) {
    (professor.id != 0) ? this.modo = 'put' : this.modo = 'post';      

    this.professorService[this.modo](professor).subscribe(
      (retorno: Professor) => {
        console.log(retorno);
        this.CarregarProfessores();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  professorNovo() {
    this.profSelecionado = new Professor();
    this.professorForm.patchValue(this.profSelecionado);
    console.log(this.profSelecionado);
  }

}
