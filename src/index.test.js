import Wallet from '.'

describe('ExampleComponent', () => {
  it('is truthy', () => {
    expect(new Wallet('http://localhost:3000')).toBeTruthy();
  })
})
