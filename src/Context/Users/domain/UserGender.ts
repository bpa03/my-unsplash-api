import { UserGenderIsInvalid } from './UserGenderInvalid';

export class UserGender {
  readonly value: string;
  readonly validValues = ['male', 'female'];

  constructor (value: 'male' | 'female') {
    this.value = value;
  }

  ensureIsValidGender (value: string): void {
    if (!this.validValues.includes(value)) {
      throw new UserGenderIsInvalid(`<${value}> is not a valid gender`);
    }
  }
}
