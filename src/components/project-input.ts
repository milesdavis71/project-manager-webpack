import { projectState } from '../state/project-state';
import Component from './base-component';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleField: HTMLInputElement;
  descField: HTMLInputElement;
  peopleField: HTMLInputElement;
  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleField = this.element.querySelector('#title') as HTMLInputElement;
    this.descField = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleField = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.config();
  }
  config() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }
  renderContent() {}
  submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatheruserInput();
    const [title, desc, people] = userInput;
    projectState.addProject(title, desc, people);
  }
  gatheruserInput(): [string, string, number] {
    const enteredTitle = this.titleField.value;
    const enteredDesc = this.descField.value;
    const enteredPeople = this.peopleField.value;
    return [enteredTitle, enteredDesc, +enteredPeople];
  }
}
