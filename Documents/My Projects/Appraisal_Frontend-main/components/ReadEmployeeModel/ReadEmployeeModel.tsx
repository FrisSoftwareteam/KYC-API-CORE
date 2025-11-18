"use client";

import type React from "react";

import { useState } from "react";
import {
  User,
  GraduationCap,
  CreditCard,
  Heart,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Award,
  DollarSign,
  Activity,
  Users,
  Briefcase,
  Clock,
  Star,
  Shield,
  FileText,
  Zap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type Employee = {
  id: number;
  staffId: string;
  fullnames: string;
  email: string;
  workflow: string;
  appraisal: string;
  role: string;
  status: string;
  avatar: string;
  department?: string;
  joinDate?: string;
  salary?: number;
};

interface EmployeeDetailsModalProps {
  employee: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  gradient: string;
  bgGradient: string;
  iconBg: string;
}

function AccordionSection({
  title,
  icon,
  children,
  defaultOpen = false,
  gradient,
  bgGradient,
  iconBg,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-2xl border-0 bg-gradient-to-r ${bgGradient} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/30 transition-all duration-200 group"
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${iconBg} shadow-lg group-hover:scale-110 transition-transform duration-200`}
          >
            <div className="text-white">{icon}</div>
          </div>
          <span className="font-bold text-gray-900 text-lg">{title}</span>
        </div>
        <div
          className={`p-2 rounded-full bg-white/20 text-gray-700 group-hover:bg-white/40 transition-all duration-200`}
        >
          {isOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <Separator className="mb-5 bg-white/30" />
          <div className="animate-in slide-in-from-top-2 duration-300">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function EmployeeDetailsModal({
  employee,
  open,
  onOpenChange,
}: EmployeeDetailsModalProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-0 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-white/20">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-white shadow-2xl">
                <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl">
                  {employee.fullnames
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                {employee.fullnames}
              </DialogTitle>
              <p className="text-lg text-gray-600 font-medium mb-3">
                Employee Information Portal
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                  {employee.staffId}
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                  {employee.role}
                </Badge>
                <Badge
                  className={`px-3 py-1 text-sm font-semibold shadow-lg ${
                    employee.status === "Active"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  }`}
                >
                  {employee.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-medium">
                The employee details are listed below.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          {/* Personal Information */}
          <AccordionSection
            title="Personal Information"
            icon={<User className="w-6 h-6" />}
            defaultOpen={true}
            gradient="from-blue-500 to-cyan-500"
            bgGradient="from-blue-50 to-cyan-50"
            iconBg="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Email Address
                      </p>
                      <p className="font-semibold text-gray-900">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </p>
                      <p className="font-semibold text-gray-900">
                        +234 801 234 5678
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Home Address
                      </p>
                      <p className="font-semibold text-gray-900">
                        15 Victoria Island, Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </p>
                      <p className="font-semibold text-gray-900">
                        March 15, 1990
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Department
                      </p>
                      <p className="font-semibold text-gray-900">
                        {employee.department || "Not Assigned"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Join Date
                      </p>
                      <p className="font-semibold text-gray-900">
                        {employee.joinDate || "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Educational Information */}
          <AccordionSection
            title="Educational Information"
            icon={<GraduationCap className="w-6 h-6" />}
            gradient="from-green-500 to-emerald-500"
            bgGradient="from-green-50 to-emerald-50"
            iconBg="bg-gradient-to-r from-green-500 to-emerald-500"
          >
            <div className="space-y-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-400">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Bachelor's Degree
                  </h4>
                  <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                    Completed
                  </Badge>
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  Computer Science & Engineering
                </p>
                <p className="text-sm text-gray-600">
                  University of Lagos • 2008-2012 • First Class Honors
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-400">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Master's Degree
                  </h4>
                  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200">
                    Completed
                  </Badge>
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  Business Administration (MBA)
                </p>
                <p className="text-sm text-gray-600">
                  Lagos Business School • 2014-2016 • Distinction
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-teal-400">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Professional Certifications
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-800">
                      • Project Management Professional (PMP)
                    </p>
                    <p className="text-xs text-gray-600">
                      PMI • Valid until 2025
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-800">
                      • Certified Scrum Master (CSM)
                    </p>
                    <p className="text-xs text-gray-600">
                      Scrum Alliance • 2023
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-800">
                      • AWS Cloud Practitioner
                    </p>
                    <p className="text-xs text-gray-600">
                      Amazon Web Services • 2024
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-800">
                      • Six Sigma Green Belt
                    </p>
                    <p className="text-xs text-gray-600">ASQ • 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Bank Information */}
          <AccordionSection
            title="Bank Information"
            icon={<CreditCard className="w-6 h-6" />}
            gradient="from-purple-500 to-pink-500"
            bgGradient="from-purple-50 to-pink-50"
            iconBg="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Primary Bank Account
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Bank Name
                    </p>
                    <p className="font-bold text-gray-900 text-lg">
                      First Bank of Nigeria
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Account Number
                    </p>
                    <p className="font-bold text-gray-900 text-lg">
                      3012345678
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Account Name
                    </p>
                    <p className="font-bold text-gray-900">
                      {employee.fullnames}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Account Type
                    </p>
                    <p className="font-bold text-gray-900">Savings Account</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Salary & Benefits
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Monthly Salary
                    </p>
                    <p className="font-bold text-gray-900 text-2xl">
                      ₦{employee.salary?.toLocaleString() || "Not Available"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </p>
                    <p className="font-bold text-gray-900">
                      Direct Bank Transfer
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Tax Identification
                    </p>
                    <p className="font-bold text-gray-900">
                      TIN-{employee.id}234567
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Pension Fund
                    </p>
                    <p className="font-bold text-gray-900">
                      Stanbic IBTC Pension
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Health Information */}
          <AccordionSection
            title="Health Information"
            icon={<Heart className="w-6 h-6" />}
            gradient="from-red-500 to-orange-500"
            bgGradient="from-red-50 to-orange-50"
            iconBg="bg-gradient-to-r from-red-500 to-orange-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Medical Information
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </p>
                    <p className="font-bold text-gray-900 text-xl">
                      O+ (Universal Donor)
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Known Allergies
                    </p>
                    <p className="font-bold text-gray-900">None Reported</p>
                  </div>
                  <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Emergency Contact
                    </p>
                    <p className="font-bold text-gray-900">
                      Mrs. Sarah {employee.fullnames.split(" ")[1] || "Contact"}
                    </p>
                    <p className="text-sm text-gray-600">+234 802 345 6789</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Medical Fitness
                    </p>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Fit for Duty
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Health Insurance
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Insurance Provider
                    </p>
                    <p className="font-bold text-gray-900">
                      AIICO Insurance Plc
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Policy Number
                    </p>
                    <p className="font-bold text-gray-900">
                      AII-{employee.id}789-2024
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Coverage Plan
                    </p>
                    <p className="font-bold text-gray-900">
                      Premium Family Plan
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Coverage Amount
                    </p>
                    <p className="font-bold text-gray-900">₦5,000,000 Annual</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Staff Promotion History */}
          <AccordionSection
            title="Staff Promotion History"
            icon={<TrendingUp className="w-6 h-6" />}
            gradient="from-indigo-500 to-blue-500"
            bgGradient="from-indigo-50 to-blue-50"
            iconBg="bg-gradient-to-r from-indigo-500 to-blue-500"
          >
            <div className="space-y-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-400">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {employee.role}
                    </h4>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 shadow-lg">
                    Current Position
                  </Badge>
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  {employee.department || "Department"} • Level 5
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  January 2024 - Present • 11 months
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Key Achievements:
                  </p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Led 3 major projects with 100% success rate</li>
                    <li>• Improved team productivity by 25%</li>
                    <li>• Mentored 5 junior staff members</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-400">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Senior {employee.role}
                    </h4>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-gray-600 border-gray-300"
                  >
                    Previous Position
                  </Badge>
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  {employee.department || "Department"} • Level 4
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  June 2022 - December 2023 • 1 year 7 months
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Performance Rating: Excellent
                  </p>
                  <p className="text-sm text-gray-600">
                    Promoted ahead of schedule due to outstanding performance
                  </p>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-400">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Junior {employee.role}
                    </h4>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-gray-600 border-gray-300"
                  >
                    Starting Position
                  </Badge>
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  {employee.department || "Department"} • Level 3
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {employee.joinDate || "2021"} - May 2022 • 1 year 2 months
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Onboarding Program: Completed
                  </p>
                  <p className="text-sm text-gray-600">
                    Fast-tracked promotion due to exceptional learning curve
                  </p>
                </div>
              </div>
            </div>
          </AccordionSection>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/20">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/80 hover:bg-white"
          >
            Close
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
            <FileText className="w-4 h-4 mr-2" />
            Export Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
