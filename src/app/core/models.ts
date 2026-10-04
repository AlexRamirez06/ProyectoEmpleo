export interface Company {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  industry: string;
}

export interface JobOffer {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  type: 'Tiempo completo' | 'Medio tiempo' | 'Contrato' | 'Freelance';
  modality: 'Remoto' | 'Híbrido' | 'Presencial';
  salaryRange?: string;
  createdAt: string;
  isActive: boolean;
  skills: string[];
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  about: string;
  skills: string[];
  experienceYears: number;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'Pendiente' | 'Revisada' | 'En entrevista' | 'Rechazada' | 'Contratado';
  appliedAt: string;
}

export interface CompanyRegistration {
  account: {
    email: string;
  };
  company: {
    name: string;
    industry: string;
    customIndustry?: string;
    description: string;
    website?: string;
  };
  contact: {
    name: string;
    phone: string;
    department: string;
    address: string;
  };
}
