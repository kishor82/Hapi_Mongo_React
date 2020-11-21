import { greetWelcome } from '../use-cases';
import makeGreetWelcomeAction from './greet-welcome';

const greetWelcomeAction = makeGreetWelcomeAction({ greetWelcome });

export { greetWelcomeAction };
