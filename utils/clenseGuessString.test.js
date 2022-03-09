import cleansGuessString from './cleansGuessString'

describe('cleansGuessString', () => {
  test('should remove numbers from a string', () => {
    const input = 'a1b2c3d4e5f6'
    const output = 'abcdef'
    const result = cleansGuessString(input)
    expect(result).toEqual(output)
  })

  test('should remove special chars from a string', () => {
    const input = 'a*!@£$%^&*()bc'
    const output = 'abc'
    const result = cleansGuessString(input)
    expect(result).toEqual(output)
  })

  test('should convert case to lowercase', () => {
    const input = 'ABCdef'
    const output = 'abcdef'
    const result = cleansGuessString(input)
    expect(result).toEqual(output)
  })

  test('should reduce string length based on max value', () => {
    const input = 'a very long string'

    const output1 = 'averyl'
    const result1 = cleansGuessString(input, 6)
    expect(result1).toEqual(output1)

    const output2 = 'av'
    const result2 = cleansGuessString(input, 2)
    expect(result2).toEqual(output2)
  })
})
