import { Project } from '../model/project';
import Component from './base-component';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    }
    this.project.people > 1;
    return `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.renderContent();
  }
  config() {}
  renderContent() {
    this.element.querySelector('h2')!.innerHTML = this.project.title;
    this.element.querySelector('h3')!.innerHTML = `${this.persons} assigned`;
    this.element.querySelector('p')!.innerHTML = this.project.description;
  }
}
