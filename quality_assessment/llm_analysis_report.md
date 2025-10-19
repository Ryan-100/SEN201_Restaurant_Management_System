# LLM vs Algorithmic Static Analysis Comparison

Student: Phyo  
Course: SEN201 - Software Engineering  
Date: October 10, 2025  
File: src/components/ui/ModalServer.jsx

## What I Did

I compared LLM code review with ESLint on my ModalServer.jsx file. ESLint catches syntax errors and rule violations, while LLM gives deeper insights about code quality and architecture.

## How I Tested

### ESLint Analysis
- Used ESLint v9.37.0 with React plugins
- Standard React rules like react/prop-types
- Ran it twice to check consistency
- File: src/components/ui/ModalServer.jsx

### LLM Analysis
- Used Claude AI assistant
- Asked it to review the code for:
  - Code quality
  - React best practices
  - Performance issues
  - Security problems
  - Architecture patterns

## Results

### ESLint Results

#### Before Fixes
- Found 9 prop validation errors
- Missing validations for:
  - isOpen prop
  - onClose prop
  - tableNumber prop
  - menuItems prop
  - orderItems prop
  - onAddItem prop
  - onUpdateQuantity prop
  - onRemoveItem prop
  - onSubmitOrder prop

#### After Fixes
- 0 errors found
- All prop validation issues fixed
- Second run gave same results (consistent)

### LLM Analysis Results

#### What LLM Found Good
1. Prop validation is well done
2. Component structure is clean
3. Accessibility is decent
4. Responsive design works
5. Error handling is okay
6. Performance could be better

#### What LLM Said to Improve
1. calculateTotal() recalculates every render (use useMemo)
2. Missing ARIA labels
3. Button styling is repeated
4. No error boundaries
5. Could use TypeScript

#### React Best Practices
- Component structure is good
- Hooks are used correctly
- Event handlers are fine
- Conditional rendering works

#### LLM Suggestions
- Use useMemo for calculateTotal()
- Add loading states
- Improve keyboard navigation
- Extract common components

## Key Differences

### ESLint
Good at:
- Finding syntax errors fast
- Catching rule violations
- Being consistent
- Checking all files

Bad at:
- Understanding context
- Finding architecture issues
- Assessing business logic
- Adapting to project needs

### LLM
Good at:
- Understanding context
- Finding architecture problems
- Explaining why things are wrong
- Giving project-specific advice

Bad at:
- Being consistent
- Running fast
- Being objective
- Sometimes over-engineers

## Consistency Test

### ESLint
- Run 1: 0 errors
- Run 2: 0 errors
- Same results both times

### LLM
- Single analysis
- Would probably give similar results if asked again
- Less consistent than ESLint

## My Recommendations

### For Teams
1. Use ESLint for automated checks
2. Use LLM for code reviews
3. Combine both approaches
4. Put ESLint in CI/CD

### For Code Quality
1. Fix ESLint warnings first
2. Apply LLM suggestions slowly
3. Use LLM insights for training
4. Document patterns found

## Conclusion

Both tools are useful but different:

- ESLint is great for catching syntax errors and maintaining standards
- LLM is good for deeper code quality insights

Best approach is to use both:
- ESLint for automated quality checks
- LLM for thorough code reviews

ESLint is consistent and fast, LLM adds human-like understanding.

---

Generated: October 10, 2025  
Time: about 15-20 minutes  
Tools: ESLint v9.37.0, Claude AI  
Files: 1 (ModalServer.jsx)  
Issues: 0 (after fixes)