import { IsLeaderPipe } from './is-leader.pipe';

describe('IsLeaderPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLeaderPipe();
    expect(pipe).toBeTruthy();
  });
});
