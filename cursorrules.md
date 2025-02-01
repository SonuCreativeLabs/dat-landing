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

---

**Note**: This document serves as both a technical guide and business reference. Regular updates will be made to reflect changes in business requirements and technical implementations. 