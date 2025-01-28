# DAT Landing Page

A modern landing page built with Vite, React, and Supabase, featuring an admin panel for enquiry management. The project uses Vite as the build tool for fast development and optimized production builds.

## Project Structure
```
dat-landing/
├── src/                  # Source code
│   ├── main.tsx         # Application entry point
│   ├── App.tsx          # Root component
│   ├── components/      # React components
│   ├── config/          # Configuration files
│   ├── data/            # Data files and types
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Third-party integrations
│   │   └── supabase/   # Supabase client and types
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── styles/         # Global styles
├── public/             # Static assets
├── supabase/          # Supabase configurations
├── .env               # Environment variables
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── package.json       # Project dependencies
```

## Development Process

This project was developed in two main phases:

1. **Initial Structure with Lovable AI**
   - Used Lovable AI to generate the initial Vite + React project structure
   - Created basic components and layouts
   - Set up routing and basic configurations
   - Established the foundation for the admin panel

2. **Development with Windsurf IDE**
   - Enhanced and completed the project using Windsurf IDE
   - Implemented advanced features and functionality
   - Added real-time status updates and enquiry management
   - Improved UI/UX with shadcn/ui components
   - Integrated Supabase backend and authentication
   - Added comprehensive error handling and state management

## Tech Stack

### Core Framework & Build Tools
- **Build Tool**: Vite with SWC
- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **Package Manager**: npm/bun
- **Environment**: Vite environment variables

### UI & Styling
- **CSS Framework**: Tailwind CSS with PostCSS
- **Component Library**: shadcn/ui (based on Radix UI)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes for dark/light mode
- **Additional UI Components**:
  - Embla Carousel for sliders
  - React Day Picker for date selection
  - Sonner for toast notifications
  - Vaul for drawer components
  - React Resizable Panels

### State Management & Data Fetching
- **API Client**: TanStack Query (React Query) v5
- **Form Management**: React Hook Form with Zod validation
- **Error Handling**: React Error Boundary
- **Type Safety**: TypeScript with strict mode

### Backend & Authentication
- **Backend Service**: Supabase
  - Supabase Auth UI for authentication flows
  - Supabase Auth Helpers for React integration
  - Supabase JS Client for database operations
  - Type-safe database interactions with generated types

### Development Tools
- **IDE & AI Tools**:
  - Lovable AI for initial project structure
  - Windsurf IDE for development
- **Code Quality**:
  - ESLint for code linting
  - TypeScript for type safety
  - Prettier for code formatting
- **Build Tools**:
  - PostCSS for CSS processing
  - Autoprefixer for CSS compatibility
  - SWC for fast TypeScript/JavaScript compilation

### Configuration Files
- **TypeScript**: `tsconfig.json`, `tsconfig.node.json`
- **Vite**: `vite.config.ts`
- **Tailwind**: `tailwind.config.ts`
- **Environment**: `.env`, `.env.example`
- **Components**: `components.json` (shadcn/ui configuration)

## Features

- Modern and responsive design
- Mobile-first approach
- Secure admin panel
- Enquiry management system
- Real-time status updates
- Comment system for enquiries
- Form validation
- SEO optimized

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dat-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Make sure your Supabase URL follows the format: `https://<project>.supabase.co`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Admin Panel Features

- **Enquiry Management**
  - View all enquiries in a responsive grid
  - Filter enquiries by status
  - Update enquiry status (New, In Progress, Completed, etc.)
  - Add admin comments to enquiries
  - Real-time updates using React Query

- **Status Overview**
  - Quick view of enquiry counts by status
  - Interactive status filters
  - Visual indicators for different statuses

## Database Schema

### Enquiries Table
```sql
create table enquiries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  name text,
  email text,
  phone text,
  message text,
  status text default 'new',
  admin_comment text
);
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please reach out to the development team.
