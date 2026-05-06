# Contributing to Ceres Network

First off, thank you for considering contributing to Ceres Network! It's people like you that make Ceres Network such a great tool for farmers worldwide.

## 🌾 Our Vision

Ceres Network aims to provide accessible, transparent, and automated crop insurance to farmers globally using blockchain technology. We believe in:

- **Transparency** — All code is open source
- **Accessibility** — Low barriers to entry for farmers
- **Automation** — No claims process, no agents
- **Decentralization** — Powered by Stellar/Soroban smart contracts

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, browser, Node version)

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.10.0]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any alternatives** you've considered

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` — Good for newcomers
- `help wanted` — Extra attention needed
- `documentation` — Improvements to docs

### Pull Requests

We actively welcome your pull requests! Here's how:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 🛠️ Development Setup

### Prerequisites

- **Node.js 20+** — [Download](https://nodejs.org/)
- **npm or yarn** — Comes with Node.js
- **Git** — [Download](https://git-scm.com/)
- **Freighter Wallet** — [Install](https://www.freighter.app/)

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ceres-app.git
   cd ceres-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run type-check   # TypeScript type checking
```

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow our coding standards
   - Add tests for new features
   - Update documentation as needed

3. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   
   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` — New feature
   - `fix:` — Bug fix
   - `docs:` — Documentation changes
   - `style:` — Code style changes (formatting)
   - `refactor:` — Code refactoring
   - `test:` — Adding or updating tests
   - `chore:` — Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all CI checks pass

### PR Review Process

- At least one maintainer review is required
- All CI checks must pass
- Code must follow our style guidelines
- Tests must be included for new features
- Documentation must be updated if needed

## 💻 Coding Standards

### TypeScript

- **Use TypeScript strict mode** — No `any` types
- **Explicit return types** on functions
- **Proper type imports** — Use `import type` when possible
- **Named exports** — Prefer named exports over default exports

```typescript
// ✅ Good
export function formatUSDC(amount: bigint): string {
  return `$${(Number(amount) / 1e7).toFixed(2)}`;
}

// ❌ Bad
export default function(amount: any) {
  return "$" + amount / 1e7;
}
```

### React Components

- **Functional components** with hooks
- **Named exports** for all components
- **Props interfaces** defined explicitly
- **Use client directive** only when needed

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps): React.ReactElement {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Bad
export default ({ label, onClick }: any) => (
  <button onClick={onClick}>{label}</button>
);
```

### File Organization

- **One component per file**
- **Co-locate related files** (component + styles + tests)
- **Index files** for clean imports (optional)
- **Consistent naming** — PascalCase for components, camelCase for utilities

### Code Style

- **Use Prettier** for formatting (if configured)
- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** required
- **Trailing commas** in multi-line structures

## 🧪 Testing Guidelines

### Writing Tests

- **Test user behavior**, not implementation details
- **Use descriptive test names**
- **Follow AAA pattern** — Arrange, Act, Assert
- **Mock external dependencies**

```typescript
// ✅ Good
describe('PolicyCard', () => {
  it('should display policy coverage amount', () => {
    const policy = createMockPolicy({ coverageAmount: BigInt(100000000) });
    render(<PolicyCard policy={policy} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });
});

// ❌ Bad
test('test1', () => {
  // unclear what's being tested
});
```

### Test Coverage

- **Aim for 80%+ coverage** on utilities
- **Test critical user flows** (registration, deposits, etc.)
- **Test error states** and edge cases
- **Test accessibility** features

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

## 📚 Documentation

### Code Documentation

- **JSDoc comments** for public functions
- **Inline comments** for complex logic
- **README updates** for new features
- **Type definitions** serve as documentation

```typescript
/**
 * Format USDC amount from stroops (i128 with 7 decimals) to display string
 * @param stroops - The amount in stroops (1 USDC = 10^7 stroops)
 * @returns Formatted string like "$10.00"
 * @example
 * formatUSDC(BigInt(10000000)) // Returns "$1.00"
 */
export function formatUSDC(stroops: bigint): string {
  const amount = Number(stroops) / Math.pow(10, 7);
  return `$${amount.toFixed(2)}`;
}
```

### Documentation Updates

When making changes, update:
- **README.md** — For user-facing changes
- **Code comments** — For implementation details
- **Type definitions** — Keep them accurate
- **CHANGELOG.md** — For notable changes (maintainers handle this)

## 🎨 UI/UX Guidelines

### Design Principles

- **Mobile-first** — Design for small screens first
- **Accessibility** — WCAG 2.1 AA compliance
- **Dark theme** — Primary theme with green accents
- **Consistent spacing** — Use Tailwind spacing scale
- **Loading states** — Always show skeleton loaders

### Component Guidelines

- **Reuse UI primitives** from `components/ui/`
- **Consistent patterns** — Follow existing component structure
- **Responsive design** — Test on multiple screen sizes
- **Keyboard navigation** — All interactive elements accessible

## 🌍 Community

### Communication Channels

- **GitHub Issues** — Bug reports and feature requests
- **GitHub Discussions** — General questions and ideas
- **Discord** — Real-time chat (coming soon)
- **Twitter** — [@CeresNetwork](https://twitter.com/CeresNetwork) (coming soon)

### Getting Help

- Check existing issues and discussions
- Read the documentation
- Ask in GitHub Discussions
- Be patient and respectful

## 🏆 Recognition

Contributors are recognized in:
- **README.md** — Contributors section
- **Release notes** — For significant contributions
- **GitHub insights** — Automatic tracking

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.

## 🙏 Thank You!

Your contributions make Ceres Network better for farmers worldwide. Whether it's code, documentation, bug reports, or ideas — every contribution matters!

---

**Questions?** Open an issue or discussion, and we'll be happy to help!

**Ready to contribute?** Check out our [good first issues](https://github.com/ceres-network/ceres-app/labels/good%20first%20issue)!
