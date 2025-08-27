export interface BlogPost {
  id: number
  title: string
  description: string
  content: string
  category: string
  date: string
  readTime: string
  icon: string
  color: string
  status: 'draft' | 'published'
  featured: boolean
  views: number
  tags: string[]
}

export interface Category {
  name: string
  count: number
  color: string
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding SQL Injection: A Developer's Guide",
    description: "Learn about SQL injection vulnerabilities, how they occur, and best practices to prevent them in your applications.",
    content: `
# Understanding SQL Injection: A Developer's Guide

SQL injection is one of the most critical security vulnerabilities that can affect web applications. It occurs when user input is directly concatenated into SQL queries without proper sanitization or parameterization.

## What is SQL Injection?

SQL injection is a code injection technique that exploits vulnerabilities in an application's software by inserting malicious SQL statements into entry fields for execution.

## Common SQL Injection Patterns

### 1. Union-Based Injection
\`\`\`sql
' UNION SELECT username, password FROM users--
\`\`\`

### 2. Boolean-Based Injection
\`\`\`sql
' AND 1=1--
' AND 1=2--
\`\`\`

### 3. Time-Based Injection
\`\`\`sql
'; WAITFOR DELAY '00:00:05'--
\`\`\`

## Prevention Techniques

### 1. Parameterized Queries
Always use parameterized queries or prepared statements:

\`\`\`javascript
// ❌ Vulnerable
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// ✅ Secure
const query = 'SELECT * FROM users WHERE id = ?';
const params = [userId];
\`\`\`

### 2. Input Validation
Implement strict input validation and whitelist allowed characters.

### 3. Least Privilege Principle
Database users should have minimal required permissions.

## Real-World Example

Consider this vulnerable code:

\`\`\`javascript
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = \`SELECT * FROM users WHERE id = \${userId}\`;
  // ... execute query
});
\`\`\`

An attacker could inject: \`/user/1; DROP TABLE users--\`

## Conclusion

SQL injection remains a critical security concern. Always use parameterized queries, validate input, and follow security best practices to protect your applications.
    `,
    category: "Web Security",
    date: "2024-01-15",
    readTime: "8 min read",
    icon: "🔒",
    color: "blue",
    status: "published",
    featured: true,
    views: 1247,
    tags: ["sql-injection", "web-security", "database", "vulnerabilities"]
  },
  {
    id: 2,
    title: "Cross-Site Scripting (XSS) Prevention Strategies",
    description: "Explore different types of XSS attacks and learn effective prevention strategies to secure your web applications.",
    content: `
# Cross-Site Scripting (XSS) Prevention Strategies

Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

## Types of XSS Attacks

### 1. Reflected XSS
Malicious scripts are reflected off the web server, such as in error messages or search results.

### 2. Stored XSS
Malicious scripts are permanently stored on the target server, such as in a database.

### 3. DOM-based XSS
The vulnerability exists in client-side code rather than server-side code.

## Prevention Strategies

### 1. Input Sanitization
Always sanitize user input before rendering it in HTML:

\`\`\`javascript
// ❌ Vulnerable
document.getElementById('output').innerHTML = userInput;

// ✅ Secure
document.getElementById('output').textContent = userInput;
\`\`\`

### 2. Content Security Policy (CSP)
Implement CSP headers to restrict script execution:

\`\`\`http
Content-Security-Policy: default-src 'self'; script-src 'self'
\`\`\`

### 3. Output Encoding
Use proper encoding functions for different contexts:

\`\`\`javascript
// HTML encoding
function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
\`\`\`

## Real-World Example

Consider a comment system:

\`\`\`javascript
// ❌ Vulnerable
const comment = userInput;
document.getElementById('comments').innerHTML += \`<div>\${comment}</div>\`;

// ✅ Secure
const comment = htmlEncode(userInput);
document.getElementById('comments').innerHTML += \`<div>\${comment}</div>\`;
\`\`\`

## Testing for XSS

Use these payloads to test your applications:

\`\`\`html
<script>alert('XSS')</script>
<img src="x" onerror="alert('XSS')">
<svg onload="alert('XSS')">
\`\`\`

## Conclusion

XSS attacks can have severe consequences. Implement proper input validation, output encoding, and Content Security Policies to protect your users.
    `,
    category: "Web Security",
    date: "2024-01-20",
    readTime: "10 min read",
    icon: "⚠️",
    color: "red",
    status: "published",
    featured: true,
    views: 892,
    tags: ["xss", "web-security", "javascript", "prevention"]
  },
  {
    id: 3,
    title: "API Security Best Practices for Modern Applications",
    description: "Discover essential security practices for protecting your APIs from common vulnerabilities and attacks.",
    content: `
# API Security Best Practices for Modern Applications

APIs are the backbone of modern applications, making API security crucial for protecting sensitive data and maintaining system integrity.

## Common API Vulnerabilities

### 1. Authentication Bypass
Weak or missing authentication mechanisms.

### 2. Authorization Flaws
Insufficient access controls and privilege escalation.

### 3. Rate Limiting Issues
Lack of rate limiting leading to abuse and DoS attacks.

### 4. Input Validation
Insufficient input validation and sanitization.

## Security Best Practices

### 1. Implement Strong Authentication

\`\`\`javascript
// Use JWT tokens with proper expiration
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
\`\`\`

### 2. Role-Based Access Control (RBAC)

\`\`\`javascript
// Middleware for role checking
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage
app.get('/admin/users', requireRole(['admin']), getUsers);
\`\`\`

### 3. Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

### 4. Input Validation

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('age').isInt({ min: 0, max: 120 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
\`\`\`

## Security Headers

Implement these security headers:

\`\`\`javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"]
    }
  }
}));
\`\`\`

## API Versioning

Use versioning to maintain backward compatibility:

\`\`\`
GET /api/v1/users
GET /api/v2/users
\`\`\`

## Conclusion

API security requires a multi-layered approach. Implement authentication, authorization, rate limiting, and input validation to create secure APIs.
    `,
    category: "API Security",
    date: "2024-01-25",
    readTime: "12 min read",
    icon: "🛡️",
    color: "green",
    status: "published",
    featured: false,
    views: 567,
    tags: ["api-security", "authentication", "authorization", "rate-limiting"]
  },
  {
    id: 4,
    title: "Secure Code Review: What to Look For",
    description: "Learn the essential security aspects to review when conducting code reviews for security vulnerabilities.",
    content: `
# Secure Code Review: What to Look For

Code reviews are a critical part of the development process, especially when it comes to security. Here's what to look for during security-focused code reviews.

## Critical Security Issues

### 1. SQL Injection Vulnerabilities

Look for string concatenation in SQL queries:

\`\`\`javascript
// ❌ Vulnerable
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// ✅ Secure
const query = 'SELECT * FROM users WHERE id = ?';
const params = [userId];
\`\`\`

### 2. Cross-Site Scripting (XSS)

Check for unsafe HTML rendering:

\`\`\`javascript
// ❌ Vulnerable
element.innerHTML = userInput;

// ✅ Secure
element.textContent = userInput;
\`\`\`

### 3. Authentication Bypass

Verify authentication checks:

\`\`\`javascript
// ❌ Vulnerable
if (req.query.admin === 'true') {
  // Grant admin access
}

// ✅ Secure
if (req.user && req.user.role === 'admin') {
  // Grant admin access
}
\`\`\`

### 4. Insecure Direct Object References

Check for IDOR vulnerabilities:

\`\`\`javascript
// ❌ Vulnerable
app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  res.json(user); // User can access any user's data
});

// ✅ Secure
app.get('/api/users/:id', (req, res) => {
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const user = getUserById(req.params.id);
  res.json(user);
});
\`\`\`

## Code Review Checklist

- [ ] Input validation and sanitization
- [ ] Authentication and authorization checks
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Secure file uploads
- [ ] Error handling (no information disclosure)
- [ ] Logging and monitoring
- [ ] Dependency vulnerabilities
- [ ] Configuration security

## Tools for Security Review

### 1. Static Analysis Tools
- SonarQube
- ESLint security rules
- Bandit (Python)
- Brakeman (Ruby)

### 2. Dependency Scanners
- npm audit
- Snyk
- OWASP Dependency Check

### 3. Code Quality Tools
- SonarQube
- CodeClimate
- Codacy

## Review Process

1. **Automated Scans**: Run security tools first
2. **Manual Review**: Focus on business logic
3. **Security Testing**: Verify fixes work
4. **Documentation**: Update security guidelines

## Conclusion

Security code reviews require attention to detail and knowledge of common vulnerabilities. Use tools to assist, but don't rely solely on automation.
    `,
    category: "Code Security",
    date: "2024-01-30",
    readTime: "15 min read",
    icon: "🔍",
    color: "purple",
    status: "published",
    featured: false,
    views: 423,
    tags: ["code-review", "security", "vulnerabilities", "best-practices"]
  },
  {
    id: 5,
    title: "Understanding CSRF Attacks and Prevention",
    description: "Learn about Cross-Site Request Forgery attacks and how to implement effective countermeasures in your applications.",
    content: `
# Understanding CSRF Attacks and Prevention

Cross-Site Request Forgery (CSRF) is an attack that forces authenticated users to perform unwanted actions on a web application.

## How CSRF Works

1. User is authenticated to a legitimate website
2. Attacker tricks user into visiting a malicious site
3. Malicious site sends request to legitimate site using user's session
4. Legitimate site processes request as if it came from user

## CSRF Attack Example

\`\`\`html
<!-- Malicious page -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="to" value="attacker">
  <input type="submit" value="Click here to win!">
</form>

<script>
  // Auto-submit the form
  document.forms[0].submit();
</script>
\`\`\`

## Prevention Strategies

### 1. CSRF Tokens

Generate unique tokens for each session:

\`\`\`javascript
// Generate token
const csrfToken = crypto.randomBytes(32).toString('hex');
req.session.csrfToken = csrfToken;

// Include in forms
app.get('/transfer', (req, res) => {
  res.render('transfer', { csrfToken: req.session.csrfToken });
});

// Verify token
app.post('/transfer', (req, res) => {
  if (req.body.csrfToken !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // Process transfer
});
\`\`\`

### 2. SameSite Cookie Attribute

Set cookies with SameSite attribute:

\`\`\`javascript
app.use(session({
  secret: 'your-secret',
  cookie: {
    sameSite: 'strict',
    secure: true,
    httpOnly: true
  }
}));
\`\`\`

### 3. Custom Headers

Require custom headers that can't be set by browsers:

\`\`\`javascript
// Middleware to check custom header
const requireCustomHeader = (req, res, next) => {
  if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
};

app.post('/transfer', requireCustomHeader, (req, res) => {
  // Process transfer
});
\`\`\`

## Implementation in Different Frameworks

### Express.js

\`\`\`javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});
\`\`\`

### React

\`\`\`javascript
import { useCsrfToken } from './hooks/useCsrfToken';

function TransferForm() {
  const csrfToken = useCsrfToken();
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      {/* form fields */}
    </form>
  );
}
\`\`\`

## Testing CSRF Protection

Test your protection with these scenarios:

1. **Valid Token**: Should work normally
2. **Missing Token**: Should be rejected
3. **Invalid Token**: Should be rejected
4. **Expired Token**: Should be rejected

## Conclusion

CSRF attacks can be devastating but are preventable. Implement CSRF tokens, use SameSite cookies, and test your protection thoroughly.
    `,
    category: "Web Security",
    date: "2024-02-05",
    readTime: "11 min read",
    icon: "🔄",
    color: "orange",
    status: "published",
    featured: false,
    views: 298,
    tags: ["csrf", "web-security", "authentication", "prevention"]
  }
];

export const mockCategories: Category[] = [
  {
    name: "Web Security",
    count: 3,
    color: "blue"
  },
  {
    name: "API Security",
    count: 1,
    color: "green"
  },
  {
    name: "Code Security",
    count: 1,
    color: "purple"
  }
];

export const getLatestPosts = (limit: number = 3): BlogPost[] => {
  return mockBlogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getPostById = (id: number): BlogPost | undefined => {
  return mockBlogPosts.find(post => post.id === id);
};

export const getPosts = (): BlogPost[] => {
  return mockBlogPosts.filter(post => post.status === 'published');
};

export const getCategories = (): Category[] => {
  return mockCategories;
};
