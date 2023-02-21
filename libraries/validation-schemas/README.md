# @cats-cradle/validation-schemas

Contains standard class-validator decorators and custom decorators for use
primarly in defining and validating data used in game design.

```typescript
import {
  validateSync,
  ValidationError,
  IsDiceNotation,
} from '@cats-cradle/validation-schemas';

class Turn {
  @IsDiceNotation()
  public diceNotation: string;
}

let turn = new Turn();
turn.diceNotation = '1d6+4';

const errors: ValidationError[] = validateSync(testClass);

// outputs 0
console.log(errors.length);
```

All validation decorators should be supported by `@cats-cradle/FakerFactory`
enabling automatic generation of fakes.

## Documentation

- [validatorjs](https://validatejs.org/)
- [class-validator](https://github.com/typestack/class-validator)