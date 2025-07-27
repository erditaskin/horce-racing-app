# 🏇 Horse Racing Vue.js Application

A modern, enterprise-grade horse racing simulation built with Vue 3, featuring real-time race visualization, comprehensive testing, and production-ready architecture.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test:unit      # Unit tests
yarn test:e2e       # E2E tests

# Code quality
yarn lint           # ESLint + auto-fix
yarn format         # Prettier formatting
yarn type-check     # TypeScript validation
```

## 🛠️ Tech Stack

### **Core Framework**
- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Strict type safety
- **Vite** - Lightning-fast build tool

### **State Management & Forms**
- **Pinia** - Vue 3 state management
- **Vee-Validate** - Form validation with Yup schemas
- **Yup** - Schema validation

### **Routing & UI**
- **Vue Router 4** - Client-side routing with lazy loading
- **Tailwind CSS** - Utility-first styling
- **Lucide Vue** - Modern icon library

### **Testing & Quality**
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### **Development Tools**
- **Husky** - Pre-commit hooks
- **Lint-staged** - Staged file processing
- **Commitlint** - Conventional commits

## 🏗️ Architecture

### **Module-Based Structure**
```
src/
├── lib/           # Shared utilities, components, services
├── modules/       # Feature-based modules
│   ├── auth/      # Authentication
│   ├── dashboard/ # Dashboard & statistics
│   ├── race/      # Race simulation & board
│   └── system/    # System pages (404, etc.)
└── resources/     # Mock data & static assets
```

### **Key Features**
- **Lazy Loading** - Route-based code splitting
- **Type Safety** - Strict TypeScript configuration
- **Error Handling** - Graceful degradation
- **Performance** - Optimized bundle sizes
- **Accessibility** - ARIA attributes & keyboard navigation

## 🔧 Development Workflow

### **Git Hooks (Husky)**
```bash
# Pre-commit: Lint + format staged files
git commit -m "feat: add new feature"

# Pre-push: Full lint + format check
git push origin main
```

### **Code Quality Commands**
```bash
yarn lint           # ESLint with auto-fix
yarn format         # Prettier formatting
yarn format:check   # Check formatting
yarn type-check     # TypeScript validation
yarn audit          # Security audit
```

### **Testing Strategy**
- **Unit Tests**: Critical functions, stores, utilities
- **E2E Tests**: User journeys, race simulation flows
- **Coverage**: 90%+ target with Vitest
- **Performance**: Sub-2s load times, 60fps animations

## 📊 Project Status

### **✅ Completed Features**
- Authentication system with role-based access
- Real-time race simulation with animations
- Dashboard with statistics and horse pool
- Comprehensive E2E test suite
- Production-ready build pipeline
- Code quality automation

### **🎯 Performance Metrics**
- **Bundle Size**: <500KB gzipped
- **Load Time**: <2s on 3G
- **Lighthouse Score**: 90+ across all metrics
- **Test Coverage**: 90%+ unit tests
- **E2E Tests**: 11 test cases, 37.7s execution

## 🚀 Production Deployment

```bash
# Build optimized production bundle
yarn build

# Preview production build
yarn preview

# Run all quality checks
yarn lint && yarn format:check && yarn type-check && yarn test:unit
```

## 📝 Development Standards

### **Code Style**
- **Vue 3 Composition API** with `<script setup>`
- **TypeScript strict mode** - no `any` types
- **Null safety** - use `??` for null coalescing
- **ESLint + Prettier** - automated formatting

### **Testing**
- **data-testid** selectors for E2E tests
- **Mock API layer** for fast test execution
- **Retry logic** for flaky operations
- **Comprehensive coverage** of user flows

### **Performance**
- **Lazy loading** for all routes
- **Code splitting** with optimal chunk sizes
- **Memory leak prevention** with proper cleanup
- **60fps animations** with CSS transforms

---

**Built with ❤️ using Vue 3, TypeScript, and modern web technologies**
