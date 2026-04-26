import { Clock, Facebook, FileText, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Video } from "lucide-react";

export const healthcareCategories = [
  {
    id: 'primary-care',
    title: 'Primary Care',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    color: 'bg-blue-500'
  },
  {
    id: 'manage-condition',
    title: 'Manage Your Condition',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    color: 'bg-green-500'
  },
  {
    id: 'mental-behavioral-health',
    title: 'Mental & Behavioral Health',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
    color: 'bg-yellow-500'
  },
  {
    id: 'sexual-health',
    title: 'Sexual Health',
    icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    color: 'bg-pink-500'
  },
  {
    id: 'childrens-health',
    title: "Children's Health",
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-8h2v6h-2z',
    color: 'bg-red-500'
  },
  {
    id: 'senior-health',
    title: 'Senior Health',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    color: 'bg-orange-500'
  },
  {
    id: 'womens-health',
    title: "Women's Health",
    icon: 'M17.5 9.5C17.5 6.5 15 4 12 4S6.5 6.5 6.5 9.5c0 2.89 2.39 5.43 5.5 6.44V17c0 .55.45 1 1 1s1-.45 1-1v-1.06c3.11-1.01 5.5-3.55 5.5-6.44zM12 14.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
    color: 'bg-purple-500'
  },
  {
    id: 'mens-health',
    title: "Men's Health",
    icon: 'M17.5 9.5C17.5 6.5 15 4 12 4S6.5 6.5 6.5 9.5c0 2.89 2.39 5.43 5.5 6.44V20h3v-4.06c3.11-1.01 5.5-3.55 5.5-6.44z',
    color: 'bg-indigo-500'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    color: 'bg-emerald-500'
  }
];


// Healthcare categories (matches backend)
export const healthcareCategoriesList = [
  "Primary Care",
  "Manage Your Condition",
  "Mental & Behavioral Health",
  "Sexual Health",
  "Children's Health",
  "Senior Health",
  "Women's Health",
  "Men's Health",
  "Wellness",
];

export const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Neurologist",
  "Gynecologist",
  "General Physician",
  "ENT Specialist",
  "Psychiatrist",
  "Ophthalmologist",
];



   export const testimonials = [
    {
      rating: 5,
      text: "I booked a same-day online consultation in minutes. The doctor reviewed my history, explained my treatment clearly, and sent my prescription immediately.",
      author: "Ayesha K.",
      location: "Lahore",
      bgColor: "bg-chart-1/10"
    },
    {
      rating: 5,
      text: "The follow-up flow is excellent. I can revisit recommendations, track my appointments, and stay connected with my doctor without extra hassle.",
      author: "Hamza R.",
      location: "Karachi",
      bgColor: "bg-chart-2/10"
    },
    {
      rating: 5,
      text: "As a working parent, CareBridge Health saves me time. The consultation quality is great, and I no longer wait in long clinic queues.",
      author: "Sana M.",
      location: "Islamabad",
      bgColor: "bg-chart-4/10"
    },
    {
      rating: 5,
      text: "The doctor dashboard is simple and practical. I can manage appointments, update availability, and deliver care efficiently in one place.",
      author: "Dr. Umar N.",
      location: "Sialkot",
      bgColor: "bg-chart-5/10"
    }
  ];


    export const faqs = [
    {
      question: "How do online doctor consultations work on CareBridge Health?",
      answer: "Choose a doctor, select an available time slot, and join your consultation securely through video or voice. After the session, you can access your notes, prescription, and follow-up details from your dashboard."
    },
    {
      question: "Can I book a doctor appointment without visiting a clinic?",
      answer: "Yes. CareBridge Health is designed for remote care, so you can consult licensed doctors from home using your phone or laptop."
    },
    {
      question: "What medical conditions can be treated online?",
      answer: "Doctors on CareBridge Health handle common primary care concerns, chronic condition follow-ups, preventive care, mental wellness support, and specialist guidance depending on your needs."
    },
    {
      question: "How quickly can I get an appointment?",
      answer: "Many doctors offer same-day availability. You can book based on real-time slots and choose a time that fits your schedule."
    }
  ];

  export const trustLogos = [
    "Trusted by Patients",
    "Verified Doctors",
    "Secure Video Consultations",
    "Digital Prescriptions",
    "Real-Time Appointment Tracking",
    "24/7 Platform Access",
  ];


  export const contactInfo = [
  {
    icon: Phone,
    text: "+92 300 1234567",
  },
  {
    icon: Mail,
    text: "support@carebridgehealth.com",
  },
  {
    icon: MapPin,
    text: "Available across Pakistan",
  },
];


    export const footerSections = [
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Support", href: "/support" },
        { text: "Contact Us", href: "/contact" }
      ]
    },
    {
      title: "For Healthcare",
      links: [
        { text: "Join as Doctor", href: "/signup/doctor" },
        { text: "Doctor Login", href: "/login/doctor" },
      ]
    },
    {
      title: "For Patients",
      links: [
        { text: "Find Doctors", href: "/doctor-list" },
        { text: "Book Appointment", href: "/signup/patient" },
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
      ]
    }
  ];


  export const socials = [
  { name: "twitter", icon: Twitter, url: "https://twitter.com/medicare-plus" },
  { name: "facebook", icon: Facebook, url: "https://facebook.com/medicare-plus" },
  { name: "linkedin", icon: Linkedin, url: "https://linkedin.com/company/medicare-plus" },
  { name: "instagram", icon: Instagram, url: "https://instagram.com/medicare-plus"},
]


export  const cities = ['Karachi', 'Sialkot', 'Islamabad', 'Sukkur', 'Lahore', 'Hyderabad', 'Quetta', 'Faislabad'];



 export const consultationTypes = [
      {
        type: 'Video Consultation',
        icon: Video,
        description: 'Face-to-face consultation via HD video call',
        price: 0,
        recommended: true
      },
      {
        type: 'Voice Call',
        icon: Phone,
        description: 'Audio-only consultation via voice call',
        price: -100,
        recommended: false
      }
    ];


    
        export const emptyStates = {
      upcoming: {
        icon: Clock,
        title: "No Upcoming Appointments",
        description: "You have no upcoming appointments scheduled.",
      },
      completed: {
        icon: FileText,
        title: "No Completed Appointments",
        description: "Completed consultations will appear here.",
      },
    };



      export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };