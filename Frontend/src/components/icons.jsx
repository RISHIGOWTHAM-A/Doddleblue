const Svg = ({ children, className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
)

export const CrownIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.5 18.5 4 8l4.5 4L12 4l3.5 8L20 8l1.5 10.5h-19z" />
    <rect x="4" y="19.5" width="16" height="1.8" rx="0.9" />
  </svg>
)

export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
)

export const LockIcon = (p) => (
  <Svg {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
)

export const UserIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" />
  </Svg>
)

export const LinkIcon = (p) => (
  <Svg {...p}>
    <path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </Svg>
)

export const EyeIcon = (p) => (
  <Svg {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
)

export const EyeOffIcon = (p) => (
  <Svg {...p}>
    <path d="M17.9 17.9A10.4 10.4 0 0 1 12 19c-6.5 0-10-7-10-7a17 17 0 0 1 4.1-4.4" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    <path d="M14.1 5.1A10 10 0 0 1 22 12" />
    <path d="m2 2 20 20" />
  </Svg>
)

export const ArrowIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
)
