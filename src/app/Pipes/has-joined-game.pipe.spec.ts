import { HasJoinedGamePipe } from './has-joined-game.pipe';

describe('HasJoinedGamePipe', () => {
  it('create an instance', () => {
    const pipe = new HasJoinedGamePipe();
    expect(pipe).toBeTruthy();
  });
});
