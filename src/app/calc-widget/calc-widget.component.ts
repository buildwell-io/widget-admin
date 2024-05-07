/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApplicationRef, Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Answer, Step } from './entities/step';
import { FetchService } from './fetch.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnswerComponent } from './components/create-answer.component';
import { ANSWERS } from './entities/data';
import * as d3 from 'd3';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'crm-calc-widget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
  ],
  templateUrl: './calc-widget.component.html',
  styleUrl: './calc-widget.component.scss',
})
export class CalcWidgetComponent implements OnInit {
  @ViewChild('d3root', { static: true })
  public readonly d3root!: ElementRef<SVGElement>;

  @ViewChild('nodeTemplate', { static: true, read: TemplateRef })
  public readonly nodeTemplate!: TemplateRef<any>;

  public readonly fetchService = inject(FetchService);
  private readonly dialog = inject(MatDialog);
  private readonly appRef = inject(ApplicationRef);

  public activeStep: number | null = null;

  ngOnInit(): void {
    const svg = d3
      .select(this.d3root.nativeElement)
      .attr('width', 800)
      .attr('height', 600)
      .attr('style', 'border: 1px solid');

    const root = d3.hierarchy({
      name: 'Eve',
      children: [
        { name: 'Cain' },
        { name: 'Seth', children: [ { name: 'Enos' }, { name: 'Noam' } ] },
        { name: 'Abel' },
        { name: 'Awan', children: [ { name: 'Enoch' } ] },
        { name: 'Azura' },
      ],
    });

    const g = svg.append('g').attr('transform', 'translate(20, 20)');

    g.append("g")
      .attr("fill", "none")
      .attr("stroke", '#555')
      .attr("stroke-opacity", 0.4)
      .attr("stroke-linecap", 'round')
      .attr("stroke-linejoin", 'round')
      .attr("stroke-width", '1')
      .selectAll("path")
      // .data<{ source: [number, number], target: [ number, number ]}>([
      //   { source: [10, 10], target: [200, 200] },
      // ])
      .data<{ source: [number, number], target: [ number, number ]}>(
        d3.map(root.links(), (_, i) => ({ source: [10 * i, 10 * i], target: [50 * i, 50 * i ]} ))
      )
      .join("path")
      .attr("d", d3.link(d3.curveBumpX).x((d) => d[1]).y((d) => d[0]));

    g
      .attr('width', 400)
      .attr('height', 300)
      .selectAll()
      .data(root.descendants())
      .join('g')
      .attr('transform', (_, i) => `translate(${50 * i}, ${20 * i})`)
      .each((d, i, nodes) => this.createNode(d, nodes[i]));
  }

  private createNode(data: any, container: any): void {
    const embeddedView = this.nodeTemplate.createEmbeddedView({ $implicit: data.data.name });
    this.appRef.attachView(embeddedView);
    container.appendChild(embeddedView.rootNodes[0]);
  }

  filter(steps: Step[], except: Step): Step[] {
    return steps.filter((step) => step !== except);
  }

  getStep(): Observable<Step> {
    return this.activeStep != null ?
      this.fetchService.getStep(this.activeStep) :
      this.fetchService.getInitialStep();
  }

  onAddAnswerClick(targetStep: number, availableSteps: Step[]): void {
    const dialogRef = this.dialog.open(CreateAnswerComponent, {
      data: { availableSteps },
    });

    dialogRef.afterClosed().subscribe((result) => {
      ANSWERS.push(new Answer(ANSWERS.length, result.text, targetStep, result.nextStep));
    });
  }

  onRemoveClick(answerId: number): void {
    const answerIndex = ANSWERS.findIndex((answer) => answer.id === answerId);
    ANSWERS.splice(answerIndex, 1);
  }
}
