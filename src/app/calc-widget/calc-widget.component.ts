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

function graph(svg: d3.Selection<any, any, any, any>, source: d3.HierarchyNode<unknown>, {
  label = (d: any) => d.data.id,
  highlight = (arg: any): boolean => false,
} = {}) {
  const marginTop = 32;
  const marginLeft = 400;

  const dx = 64;
  const dy = 86;
  const tree = d3.tree().nodeSize([ dx, dy ]);
  const treeLink = d3.linkVertical<d3.HierarchyPointLink<any>, any>().x((d) => d.x).y((d) => d.y);

  const root = tree(source);

  let x0 = Infinity;
  let x1 = -x0;

  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const g = svg.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('transform', `translate(${marginLeft}, ${marginTop})`);

  const link = g.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr('stroke', (d) => highlight(d.source) && highlight(d.target) ? 'red' : null)
    .attr('stroke-opacity', (d) => highlight(d.source) && highlight(d.target) ? 1 : null)
    .attr('d', treeLink);

  const node = g.append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants())
    .join('g')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  node.append('circle')
    .attr('fill', (d) => highlight(d) ? 'red' : d.children ? '#555' : '#999')
    .attr('r', 5);

  node.append('text')
    .attr('fill', (d) => highlight(d) ? 'red' : null)
    .attr('stroke', 'white')
    .attr('paint-order', 'stroke')
    .attr('dy', '0.31em')
    .attr('x', (d) => d.children ? -6 : 6)
    .attr('text-anchor', (d) => d.children ? 'end' : 'start')
    .text((d) => (d.data as any).name);

  return svg.node();
}

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

  @ViewChild('d3root2', { static: true })
  public readonly d3root2!: ElementRef<SVGElement>;

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
        {
          name: 'Seth',
          children: [
            { name: 'Enos' },
            {
              name: 'Noam',
              children: [
                { name: 'Noam 1' },
                { name: 'Noam 2' },
                { name: 'Noam 3' },
                { name: 'Noam 4' },
                { name: 'Noam 5' },
                {
                  name: 'Noam 6',
                  children: [
                    { name: 'Noam 6.1' },
                    { name: 'Noam 6.2' },
                    { name: 'Noam 6.3' },
                    { name: 'Noam 6.4' },
                    { name: 'Noam 6.5' },
                  ],
                },
              ],
            },
            { name: 'Roman' },
            { name: 'Denis' },
          ],
        },
        {
          name: 'Abel',
          children: [
            { name: '1' },
            { name: '2' },
          ],
        },
        {
          name: 'Awan',
          children: [
            { name: 'Enoch' },
          ],
        },
        { name: 'Azura' },
      ],
    });

    const foo = graph(svg, root as d3.HierarchyNode<unknown>, {
      highlight: (d: any) => [ 'Eve', 'Seth', 'Noam', 'Noam 6', 'Noam 6.1' ].includes(d.data.name),
    })!;

    this.d3root2.nativeElement.appendChild(foo);

    // g
    //   .attr('width', 400)
    //   .attr('height', 300)
    //   .selectAll()
    //   .data(root.descendants())
    //   .join('g')
    //   .attr('transform', (_, i) => `translate(${50 * i}, ${20 * i})`)
    //   .each((d, i, nodes) => this.createNode(d, nodes[i]));
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
