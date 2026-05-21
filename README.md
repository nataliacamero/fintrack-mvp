# fintrack-mvp
---

## 🧪 Testing Guide (Vitest)

### 🚀 Running Tests
- **Run all tests:** `pnpm vitest`
- **Run in UI mode:** `pnpm vitest --ui`

### 🔍 Isolating the Problem
When a test fails and the cause isn't immediately clear, the first step is to isolate it. Run just that one test, without the rest of your suite:

#### 1. Run only a specific test file
```bash
# General
vitest path/to/your.test.js

# For this project
pnpm vitest src/features/transactions/logic/validators.test.ts
```

#### 2. Run only tests matching a name pattern
```bash
# Runs any test with "sanitized" in the name
pnpm vitest -t "sanitized"

# Combined for maximum precision
pnpm vitest src/features/transactions/logic/validators.test.ts -t "sanitized"
```

#### 3. Use `.only` in the code
You can add `.only` to a specific test or describe block to run it exclusively:
```typescript
test.only('sets the default role', () => {
  // only this test runs in the file
})
```

#### 4. Stop after failures
If you have many failures and want to focus on the first one:
```bash
pnpm vitest --bail 1
```

---

### 💡 SDET Troubleshooting Tips
- **Isolation Check:** If the test passes when run alone but fails when run with others, you have a **test isolation problem** (shared state or side effects).
- **Logic Check:** If it fails even when run alone, the issue is in the **test itself** or the **code it's testing**.
