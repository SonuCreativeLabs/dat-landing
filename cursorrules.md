# Dreams Air Tech - Development Guidelines & Business Context

## Business Overview
Dreams Air Tech is a Chennai-based company specializing in appliance services, including **sales, repair services, and rentals** for ACs, refrigerators, washing machines, and water purifiers. 

### Company Profile
- **Location**: Chennai-based appliance service company
- **Core Services**: 
  - Appliance repairs & maintenance
  - Appliance rentals (monthly/yearly plans)
  - Sales of new appliances
- **Service Areas**: Velachery, OMR, Adyar, Tambaram, and surrounding localities
- **Target Audience**: 
  - Homeowners and renters in Chennai
  - Customers seeking affordable rental solutions
  - Users requiring quick repair services
  - Property managers and real estate agents

### Product Categories
1. **Air Conditioners**
   - Sales of new units
   - Repair and maintenance
   - Rental plans
   - Installation services

2. **Refrigerators**
   - Sales and service
   - Rental options
   - Repair services

3. **Washing Machines**
   - New unit sales
   - Repair services
   - Rental plans

4. **Water Purifiers**
   - Installation
   - Maintenance
   - Repairs
   - Filter replacements

### Business Rules
1. **Booking Process**
   - No online booking system
   - Inquiries via phone/WhatsApp only
   - Focus on direct customer communication
   - Quick response time priority

2. **Service Areas**
   - Primary: Chennai city limits
   - Focus areas: Velachery, OMR, Adyar, Tambaram
   - Service radius: Within 25km from city center

3. **Pricing Strategy**
   - No online pricing display
   - Customized quotes based on requirements
   - Competitive rental plans
   - Flexible payment terms

## Technical Architecture

### Technology Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Backend**: Supabase
- **Hosting**: Vercel
- **Domain**: dreamsairtech.in
- **Analytics**: Google Analytics
- **3D Elements**: Three.js for interactive components

### Key Features
1. **Public Website**
   - Modern UI with animations
   - Service showcases
   - Rental plan information
   - Contact forms
   - Testimonials display
   - Service area maps

2. **Admin Dashboard**
   - Inquiry management
   - Testimonial management
   - Service tracking
   - Analytics reporting
   - Content management

## Development Guidelines

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── services/       # Service-related components
│   ├── rentals/        # Rental-related components
│   ├── admin/          # Admin dashboard components
│   └── shared/         # Shared/common components
├── pages/              # Page components
│   ├── public/         # Public pages
│   └── admin/          # Admin pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── styles/             # Global styles
├── config/             # Configuration
├── data/              # Static data
└── integrations/      # Third-party integrations
```

### Coding Standards

#### TypeScript Guidelines
```typescript
// Service Interface Example
interface ServiceRequest {
  id: string;
  customerName: string;
  phone: string;
  serviceType: 'repair' | 'rental' | 'maintenance';
  appliance: 'ac' | 'refrigerator' | 'washingMachine' | 'waterPurifier';
  location: string;
  requestDate: Date;
  status: 'pending' | 'confirmed' | 'completed';
}

// Rental Plan Interface
interface RentalPlan {
  id: string;
  applianceType: string;
  duration: 'monthly' | 'yearly';
  description: string;
  features: string[];
  terms: string[];
}
```

### SEO & Performance

#### SEO Requirements
- **Meta Tags**:
  ```html
  <meta name="description" content="Chennai's trusted appliance service provider. Expert AC repair, maintenance, and rental services in Velachery, OMR, Adyar, and Tambaram." />
  <meta name="keywords" content="AC service Chennai, appliance rental Chennai, AC repair Velachery, refrigerator service OMR" />
  ```
- **Local SEO**:
  - Google My Business integration
  - Location-specific landing pages
  - Local business schema markup

#### Performance Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Core Web Vitals compliance

### Security Measures

#### Authentication
- Admin access restricted by role
- JWT token-based auth
- Session management
- Rate limiting on login attempts

#### Data Protection
- Environment variables for sensitive data
- Input sanitization
- XSS protection
- CSRF protection
- Regular security audits

### Deployment Process

#### Pre-deployment Checklist
1. Run all tests
2. Verify SEO meta tags
3. Check responsive design
4. Validate contact forms
5. Test admin functions
6. Verify analytics tracking
7. Check loading performance
8. Validate security headers

#### Post-deployment Monitoring
1. Error tracking
2. User behavior analytics
3. Performance monitoring
4. Security scanning
5. Uptime monitoring

## Quality Assurance

### Testing Requirements
1. **Unit Tests**
   - Component testing
   - Utility function testing
   - Hook testing
   - State management testing

2. **Integration Tests**
   - Form submissions
   - Admin workflows
   - Authentication flows
   - API integrations

3. **E2E Tests**
   - Critical user journeys
   - Admin dashboard operations
   - Contact form submissions
   - Responsive design testing

### Documentation

#### Code Documentation
- JSDoc comments for functions
- Component documentation
- API endpoint documentation
- State management documentation

#### Business Documentation
- Service area maps
- Pricing guidelines
- Terms and conditions
- Privacy policy
- Contact protocols

### Change Management Rules

#### Precision in Changes
1. **Strict Adherence to Requests**
   - Only modify what is explicitly requested by the user
   - Do not make additional design changes unless specifically asked
   - Do not modify functionality unless explicitly requested
   - Avoid "improving" or "optimizing" without user consent

2. **Content vs. Design Changes**
   - Text/content updates should not affect design or functionality
   - Design updates should not modify existing content unless specified
   - Functionality changes should be isolated to requested features

3. **Change Scope Guidelines**
   - When updating text: Only modify the specified text
   - When updating design: Only modify the specified design elements
   - When updating functionality: Only modify the specified functions
   - Always preserve existing behavior for non-targeted elements

4. **Documentation of Changes**
   - Clearly communicate what changes are being made
   - List only the specific modifications requested
   - If additional changes might be beneficial, suggest them separately
   - Wait for user approval before implementing suggested changes

5. **Version Control Best Practices**
   - Make atomic commits focused on specific changes
   - Keep changes minimal and precise
   - Document exact changes in commit messages
   - Maintain separation of concerns

## Accessibility Rules

### WCAG 2.1 Compliance
1. **Color Contrast**
   - Maintain minimum contrast ratio of 4.5:1 for normal text
   - Use 3:1 ratio for large text
   - Ensure visibility of focus indicators
   - Test with color blindness simulators

2. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Maintain logical tab order
   - Provide visible focus indicators
   - Implement skip links for main content

3. **Screen Readers**
   - Use proper ARIA labels
   - Maintain semantic HTML structure
   - Provide alt text for images
   - Include proper heading hierarchy

4. **Interactive Elements**
   - Clear focus states
   - Sufficient touch targets (minimum 44x44px)
   - Error messages must be announced
   - Form labels must be properly associated

## Internationalization Rules

### Content Structure
1. **Text Handling**
   - Use Unicode for character encoding
   - Support RTL languages
   - Avoid hard-coded strings
   - Use flexible layouts for text expansion

2. **Date and Time**
   - Use ISO 8601 format for dates
   - Store timestamps in UTC
   - Display times in local timezone
   - Support different date formats

3. **Number Formatting**
   - Use locale-aware number formatting
   - Support different currency formats
   - Handle decimal separators
   - Format large numbers appropriately

## Performance Optimization Rules

### Loading Performance
1. **Image Optimization**
   - Use WebP format with fallbacks
   - Implement lazy loading
   - Provide responsive images
   - Optimize image quality vs size

2. **Code Splitting**
   - Implement route-based splitting
   - Lazy load components
   - Use dynamic imports
   - Optimize bundle size

3. **Resource Loading**
   - Minimize HTTP requests
   - Use resource hints
   - Implement caching strategies
   - Optimize critical rendering path

### Runtime Performance
1. **React Optimization**
   - Use memo for expensive components
   - Implement useMemo for complex calculations
   - Optimize useEffect dependencies
   - Avoid unnecessary re-renders

2. **Animation Performance**
   - Use CSS transforms
   - Implement will-change property
   - Avoid layout thrashing
   - Use requestAnimationFrame

## Error Handling Rules

### Frontend Errors
1. **User Input Validation**
   - Implement client-side validation
   - Show clear error messages
   - Maintain form state on error
   - Provide recovery options

2. **API Error Handling**
   - Implement retry logic
   - Show user-friendly error messages
   - Handle offline scenarios
   - Log errors for debugging

3. **Error Boundaries**
   - Implement React Error Boundaries
   - Provide fallback UI
   - Log component errors
   - Handle async errors

### Error Reporting
1. **Logging Standards**
   - Include error context
   - Log stack traces
   - Add user session information
   - Include environment details

2. **Monitoring**
   - Track error frequency
   - Monitor performance metrics
   - Set up alerts
   - Track user impact

## Security Rules

### Frontend Security
1. **Input Sanitization**
   - Sanitize user inputs
   - Prevent XSS attacks
   - Validate file uploads
   - Implement CSP

2. **Authentication**
   - Secure token storage
   - Implement refresh tokens
   - Handle session timeouts
   - Secure password reset flow

3. **Data Protection**
   - Encrypt sensitive data
   - Implement secure forms
   - Use HTTPS only
   - Handle PII properly

## Testing Rules

### Component Testing
1. **Unit Tests**
   - Test component logic
   - Verify state changes
   - Test error scenarios
   - Mock external dependencies

2. **Integration Tests**
   - Test component interactions
   - Verify data flow
   - Test routing
   - Test form submissions

3. **E2E Testing**
   - Test critical user flows
   - Verify business logic
   - Test error handling
   - Cross-browser testing

### Performance Testing
1. **Load Testing**
   - Test component performance
   - Measure render times
   - Test with large datasets
   - Profile memory usage

2. **Accessibility Testing**
   - Test screen reader compatibility
   - Verify keyboard navigation
   - Test color contrast
   - Validate ARIA attributes

## Third-Party Integration Rules

### Webhook Integration Standards
1. **Endpoint Configuration**
   - Maintain consistent endpoint naming
   - Document all endpoint parameters
   - Implement proper error handling
   - Set up monitoring for webhook health
   - Log all webhook activities
   - Verify endpoint accessibility
   - Maintain backward compatibility
   - Document rate limits

2. **Integration Documentation**
   - Maintain detailed integration specs
   - Document all API parameters
   - Keep configuration history
   - Document testing procedures
   - Store vendor communication
   - Version control integration docs
   - Include sample payloads
   - Document error codes

3. **Testing Requirements**
   - Test with sample payloads
   - Verify error scenarios
   - Test rate limiting
   - Monitor response times
   - Validate data processing
   - Test timeout scenarios
   - Verify retry mechanisms
   - Test concurrent requests

4. **Security Measures**
   - Implement IP whitelisting
   - Validate request signatures
   - Set up rate limiting
   - Monitor for abuse
   - Regular security audits
   - Encrypt sensitive data
   - Log security events
   - Implement request validation

### Lead Management Rules
1. **Data Processing**
   - Validate all incoming data
   - Standardize data format
   - Handle duplicate leads
   - Process in real-time
   - Maintain data integrity
   - Handle malformed data
   - Implement data cleanup
   - Set processing priorities

2. **Storage Requirements**
   - Encrypt sensitive data
   - Implement backup strategy
   - Set retention policies
   - Handle data updates
   - Maintain audit logs
   - Version control data changes
   - Implement data recovery
   - Monitor storage capacity

3. **Notification System**
   - Alert on lead receipt
   - Notify on processing errors
   - Track delivery status
   - Monitor system health
   - Log all notifications
   - Set up escalation paths
   - Configure alert thresholds
   - Maintain notification history

4. **Access Control**
   - Role-based access
   - Audit trail for access
   - Time-based restrictions
   - IP-based restrictions
   - Session management
   - Monitor access patterns
   - Log unauthorized attempts
   - Regular access review

### Integration Verification Checklist
1. **Pre-Integration**
   - [ ] Review vendor documentation
   - [ ] Verify API specifications
   - [ ] Check security requirements
   - [ ] Plan data storage
   - [ ] Design error handling
   - [ ] Set up monitoring
   - [ ] Create test cases
   - [ ] Document integration plan

2. **Implementation**
   - [ ] Configure endpoints
   - [ ] Set up authentication
   - [ ] Implement data validation
   - [ ] Add error handling
   - [ ] Set up logging
   - [ ] Configure monitoring
   - [ ] Add security measures
   - [ ] Document changes

3. **Testing**
   - [ ] Test with sample data
   - [ ] Verify error handling
   - [ ] Check security measures
   - [ ] Test performance
   - [ ] Validate data processing
   - [ ] Test notifications
   - [ ] Check monitoring
   - [ ] Document test results

4. **Post-Implementation**
   - [ ] Monitor live traffic
   - [ ] Review error logs
   - [ ] Check data integrity
   - [ ] Verify notifications
   - [ ] Update documentation
   - [ ] Train team members
   - [ ] Set up maintenance
   - [ ] Plan regular reviews

## Admin Activity Logging Rules

### Activity Tracking
1. **User Actions**
   - Log all admin user logins/logouts
   - Track all content approvals/rejections
   - Record content modifications
   - Log access to sensitive data
   - Track bulk operations
   - Monitor failed login attempts

2. **Testimonial Management**
   - Log testimonial approval/rejection actions
   - Record moderator comments
   - Track status changes
   - Log edit history
   - Record response times
   - Track approval patterns

3. **Enquiry Handling**
   - Log enquiry status changes
   - Record assigned team member
   - Track response times
   - Log customer communications
   - Monitor resolution rates
   - Track priority changes

### Audit Trail Requirements
1. **Log Entry Details**
   - Timestamp (in UTC)
   - Admin user ID and name
   - Action performed
   - IP address
   - Device/browser information
   - Previous and new values
   - Action justification (if required)

2. **Data Retention**
   - Keep logs for minimum 12 months
   - Archive older logs
   - Maintain audit trail backups
   - Implement log rotation
   - Ensure data compliance
   - Set up automated cleanup

### Security & Access
1. **Log Protection**
   - Encrypt sensitive log data
   - Restrict log access
   - Prevent log tampering
   - Regular backup of logs
   - Monitor log access
   - Alert on suspicious activity

2. **Access Levels**
   - Super admin: Full log access
   - Admin: Department-specific logs
   - Moderator: Action-specific logs
   - Read-only: Summary views
   - No log deletion rights
   - Time-based access restrictions

### Monitoring & Reporting
1. **Real-time Monitoring**
   - Dashboard for active users
   - Live activity feed
   - Alert on suspicious patterns
   - Track concurrent sessions
   - Monitor approval rates
   - Track response times

2. **Regular Reports**
   - Daily activity summaries
   - Weekly performance metrics
   - Monthly audit reports
   - User activity patterns
   - Compliance reports
   - Efficiency metrics

### Compliance & Governance
1. **Policy Requirements**
   - Define retention periods
   - Set access controls
   - Document audit procedures
   - Establish review process
   - Define escalation paths
   - Set compliance checks

2. **Review Procedures**
   - Weekly activity review
   - Monthly compliance check
   - Quarterly audit review
   - Annual policy update
   - Regular training updates
   - Performance evaluation

### Analytics & Insights
1. **Performance Metrics**
   - Response time analysis
   - Approval rate trends
   - User efficiency metrics
   - Peak activity periods
   - Common patterns
   - Bottleneck identification

2. **Quality Control**
   - Review decision consistency
   - Track error rates
   - Monitor user performance
   - Identify training needs
   - Track improvement trends
   - Set quality benchmarks

---

**Note**: These rules should be reviewed and updated regularly based on project needs and industry best practices. 