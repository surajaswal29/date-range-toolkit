# Contributing to date-range-toolkit

First off, thank you for considering contributing to date-range-toolkit! It's people like you that make date-range-toolkit such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include code samples and error messages if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful

### Pull Requests

- Fork the repo and create your branch from `main`
- If you've added code that should be tested, add tests
- Ensure the test suite passes
- Make sure your code lints
- Update the documentation

## Development Process

1. Clone the repository

```bash
git clone https://github.com/surajaswal29/date-range-toolkit.git
cd date-range-toolkit
```

2. Install dependencies

```bash
npm install
```

3. Create a branch

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and ensure they follow our coding standards:

- Write clear, readable code
- Follow TypeScript best practices
- Add appropriate comments and documentation
- Update tests as needed

5. Run tests and linting

```bash
npm run test
npm run lint
```

6. Commit your changes

```bash
git add .
git commit -m "feat: add your feature description"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

7. Push to your fork and submit a pull request

```bash
git push origin feature/your-feature-name
```

## Style Guide

### Git Commit Messages

- Use the present tense ("add feature" not "added feature")
- Use the imperative mood ("move cursor to..." not "moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Style Guide

- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use meaningful variable names
- Add TypeScript types where possible
- Document public APIs using JSDoc comments

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting a pull request
- Aim for high test coverage
- Write both positive and negative test cases

## Additional Notes

### Issue and Pull Request Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

Thank you for contributing to date-range-toolkit!
