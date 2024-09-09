import example from "@/example"

describe("example/example.ts", () => {
  describe(".example", () => {
    test("when example is called, it returns 'example.ts'", () => {
      // Arrange - nothing at the moment

      // Act
      const result = example()

      // Assert
      expect(result).toBe("example.ts")
    })
  })
})
