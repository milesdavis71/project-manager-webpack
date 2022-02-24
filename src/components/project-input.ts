import { autobind } from '../decorators/autobind-decorator';
import { projectState } from '../state/project-state';
import { Validatable, validate } from '../util/validate';
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
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  @autobind
  submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatheruserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputFields();
    }
  }
  gatheruserInput(): [string, string, number] | void {
    const enteredTitle = this.titleField.value;
    const enteredDesc = this.descField.value;
    const enteredPeople = this.peopleField.value;

    const titleValidate: Validatable = { value: enteredTitle, required: true };
    const descValidate: Validatable = {
      value: enteredDesc,
      required: true,
      minLength: 5,
    };
    const peopleValidate: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidate) ||
      !validate(descValidate) ||
      !validate(peopleValidate)
    ) {
      alert('huhu');
    } else {
      return [enteredTitle, enteredDesc, +enteredPeople];
    }
  }

  clearInputFields() {
    this.titleField.value = '';
    this.descField.value = '';
    this.peopleField.value = '';
  }
}
