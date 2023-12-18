import { Container } from '@cats-cradle/design-system/dist/main';
import { DiceAnalyzer } from '../components/DiceAnalyzer';

export default function DicePage() {
  return (
    <main>
      <div>
        <Container>
          <h1>Dice Notation Analyzer</h1>
          <p>
            Determine the appropriate dice notation for skill set rolls and
            visualizes the impact of luck. Gain valuable insights into
            chance&apos;s influence on game play outcomes.
          </p>
          <DiceAnalyzer />
        </Container>
      </div>
    </main>
  );
}