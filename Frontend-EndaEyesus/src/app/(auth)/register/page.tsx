"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft, Upload, Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { ServiceClass, AcademicYear } from "@/lib/types";

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
    return (
        <Label htmlFor={htmlFor} className="text-sm font-medium text-[#1a1a1a] dark:text-[#F5F5F5] flex items-center gap-1">
            {children}
            {required ? (
                <span className="text-[#7A1C1C] dark:text-[#ff6b6b] ml-0.5 text-xs">*</span>
            ) : (
                <span className="text-[#6b6b6b] dark:text-[#B0B0B0] text-[10px] font-normal ml-1">(optional)</span>
            )}
        </Label>
    );
}

// Shared class for native select elements (consistent with shadcn inputs)
const nativeSelectCls = "w-full h-10 rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] bg-[#F8F5F0] dark:bg-[#252529] text-[#1a1a1a] dark:text-[#F5F5F5] text-sm px-3 focus:outline-none focus:ring-2 focus:ring-[#C9A227] dark:focus:ring-[#D4AF37] focus:border-[#C9A227] dark:focus:border-[#D4AF37]";

const inputCls = "bg-[#F8F5F0] dark:bg-[#252529] border-[#ddd8d0] dark:border-[#2a2a2d] dark:text-[#F5F5F5] dark:placeholder:text-[#4a4a50] focus-visible:ring-[#C9A227] dark:focus-visible:ring-[#D4AF37] focus-visible:border-[#C9A227] dark:focus-visible:border-[#D4AF37] rounded-xl h-10 text-sm";
const triggerCls = "bg-[#F8F5F0] dark:bg-[#252529] border-[#ddd8d0] dark:border-[#2a2a2d] dark:text-[#F5F5F5] focus:ring-[#C9A227] dark:focus:ring-[#D4AF37] rounded-xl h-10 text-sm";

const DEPARTMENTS = [
    "Software Engineering", "Computer Science", "Electrical Engineering",
    "Computer Engineering", "Civil Engineering", "Mechanical Engineering",
    "Architecture", "Medicine", "Nursing", "Pharmacy", "Law",
    "Management", "Accounting & Finance", "Economics", "Agriculture",
    "Natural Sciences", "Social Sciences", "Other (type below)",
];

const ACADEMIC_YEAR_MAP: { label: string; value: AcademicYear }[] = [
    { label: "1st Year", value: "YEAR_1" },
    { label: "2nd Year", value: "YEAR_2" },
    { label: "3rd Year", value: "YEAR_3" },
    { label: "4th Year", value: "YEAR_4" },
    { label: "5th Year", value: "YEAR_5" },
    { label: "6th Year", value: "YEAR_6" },
    { label: "7th Year", value: "YEAR_7" },
    { label: "8th Year", value: "YEAR_8" },
    { label: "Postgraduate", value: "POST_GRADUATE" },
    { label: "Graduated", value: "GRADUATED" },
];

export default function RegisterPage() {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [classes, setClasses] = useState<ServiceClass[]>([]);
    const [loadingClasses, setLoadingClasses] = useState(true);

    // Step 1
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [sex, setSex] = useState<"MALE" | "FEMALE" | "">("");
    const [department, setDepartment] = useState("");
    const [customDepartment, setCustomDepartment] = useState("");
    const [serviceClassID, setServiceClassID] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [academicYear, setAcademicYear] = useState<AcademicYear | "">("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [step1Error, setStep1Error] = useState("");

    // Step 2
    const [bio, setBio] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState("");

    // Load service classes from backend
    useEffect(() => {
        api.get<{ status: string; data: ServiceClass[] }>("/classes")
            .then((res) => setClasses(res.data.data))
            .catch(() => setClasses([]))
            .finally(() => setLoadingClasses(false));
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    const validateStep1 = () => {
        if (!fullName.trim()) return "Full name is required.";
        if (!username.trim()) return "Username is required.";
        if (!sex) return "Please select your sex.";
        if (!department) return "Please select your department.";
        if (department === "Other (type below)" && !customDepartment.trim()) return "Please enter your department.";
        if (!serviceClassID) return "Please select a service class.";
        if (!email.trim()) return "Email is required.";
        if (!phone.trim()) return "Phone number is required.";
        if (academicYear === "") return "Please select your academic year.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        if (password !== confirmPassword) return "Passwords do not match.";
        return "";
    };

    const handleStep1Continue = () => {
        const err = validateStep1();
        if (err) { setStep1Error(err); return; }
        setStep1Error("");
        setStep(2);
    };

    const handleComplete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");

        try {
            const finalDept = department === "Other (type below)" ? customDepartment.trim() : department;

            // Upload image first if provided
            let profileImageUrl: string | undefined;
            if (profileFile) {
                const formData = new FormData();
                formData.append("image", profileFile);
                const uploadRes = await api.post<{ status: string; data: { imageURL: string } }>(
                    "/upload/public-image", formData
                );
                profileImageUrl = uploadRes.data.data.imageURL;
            }

            // Register
            const res = await api.post<{ status: string; data: { user: any; token: string } }>("/auth/register", {
                fullName,
                username,
                sex,
                department: finalDept,
                serviceClassID,
                email,
                phoneNumber: phone,
                academicYear,
                password,
                profileImage: profileImageUrl,
                bio: bio || undefined,
                birthDate: birthDate || undefined,
                birthPlace: birthPlace || undefined,
            });

            const { user, token } = res.data.data;
            const cls = classes.find((c) => c.id === serviceClassID);
            setAuth({ ...user, serviceClassName: cls?.name }, token);
            router.replace("/dashboard");
        } catch (err: any) {
            const data = err.response?.data;
            let msg = data?.message || "Registration failed. Please try again.";
            if (data?.errors && Array.isArray(data.errors)) {
                msg = data.errors.map((e: any) => `${e.path.replace('body.', '')}: ${e.message}`).join(' | ');
            }
            setSubmitError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-48px)] py-8">
            <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>

            <div className="w-full max-w-xl">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl shadow-lg border border-[#ddd8d0] dark:border-[#2a2a2d] overflow-hidden" style={{ borderTop: "4px solid #C9A227" }}>
                    {/* Header */}
                    <div className="px-8 pt-7 pb-4">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 rounded-full bg-[#0F3D2E] dark:bg-[#1E4D3A] flex items-center justify-center flex-shrink-0">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                    <rect x="7.5" y="1" width="3" height="16" rx="1" fill="#C9A227" />
                                    <rect x="2" y="5.5" width="14" height="3" rx="1" fill="#C9A227" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-[#0F3D2E] dark:text-[#D4AF37] leading-tight">Create Account</h1>
                                <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">Enda Eyesus Fellowship · Mekelle University</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="px-8 pb-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-[#7A1C1C] dark:text-[#8B2C2C]">
                                Step {step} of 2 — {step === 1 ? "Personal Information" : "Profile Details"}
                            </span>
                            <span className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">{step === 1 ? "50%" : "100%"}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#EDE9E2] dark:bg-[#252529] overflow-hidden">
                            <div className="h-full rounded-full bg-[#7A1C1C] dark:bg-[#8B2C2C] transition-all duration-500 ease-out" style={{ width: step === 1 ? "50%" : "100%" }} />
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* ─── STEP 1 ─── */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]"><span className="text-[#7A1C1C] dark:text-[#ff6b6b] font-bold">*</span> All fields are required except where marked optional</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
                                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className={inputCls} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="username" required>Username</FieldLabel>
                                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} placeholder="Lowercase only" className={inputCls} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="sex" required>Sex</FieldLabel>
                                        <select id="sex" value={sex} onChange={(e) => setSex(e.target.value as "MALE" | "FEMALE")} className={nativeSelectCls}>
                                            <option value="" disabled>Select</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="academicYear" required>Academic Year</FieldLabel>
                                        <select id="academicYear" value={academicYear} onChange={(e) => setAcademicYear(e.target.value as AcademicYear)} className={nativeSelectCls}>
                                            <option value="" disabled>Select year</option>
                                            {ACADEMIC_YEAR_MAP.map((y) => (
                                                <option key={y.value} value={y.value}>{y.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <FieldLabel htmlFor="department" required>Department</FieldLabel>
                                    <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className={nativeSelectCls}>
                                        <option value="" disabled>Select your department</option>
                                        {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    {department === "Other (type below)" && (
                                        <Input placeholder="Type your department" value={customDepartment} onChange={(e) => setCustomDepartment(e.target.value)} className={`${inputCls} mt-2`} />
                                    )}
                                </div>

                                {/* Service Class — from backend (native select avoids Radix portal issues) */}
                                <div className="space-y-1.5">
                                    <FieldLabel htmlFor="serviceClass" required>Service Class (ክፍል)</FieldLabel>
                                    {loadingClasses ? (
                                        <div className="h-10 rounded-xl bg-[#EDE9E2] dark:bg-[#252529] animate-pulse" />
                                    ) : (
                                        <select
                                            id="serviceClass"
                                            value={serviceClassID}
                                            onChange={(e) => setServiceClassID(e.target.value)}
                                            className={nativeSelectCls}
                                        >
                                            <option value="" disabled>Select your service class</option>
                                            {classes.map((cls) => (
                                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="email" required>Email</FieldLabel>
                                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={inputCls} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="phone" required>Phone Number</FieldLabel>
                                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09XXXXXXXX" className={inputCls} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="password" required>Password</FieldLabel>
                                        <div className="relative">
                                            <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className={`pr-10 ${inputCls}`} />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] dark:text-[#B0B0B0]" aria-label="Toggle password">
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="confirmPassword" required>Confirm Password</FieldLabel>
                                        <div className="relative">
                                            <Input id="confirmPassword" type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className={`pr-10 ${inputCls}`} />
                                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] dark:text-[#B0B0B0]" aria-label="Toggle confirm">
                                                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {step1Error && <p className="text-xs text-[#7A1C1C] dark:text-[#ff6b6b] bg-[#7A1C1C]/8 dark:bg-[#8B2C2C]/20 rounded-lg px-3 py-2">⚠ {step1Error}</p>}

                                <Button type="button" onClick={handleStep1Continue}
                                    className="w-full h-11 mt-2 rounded-xl bg-[#0F3D2E] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#0F3D2E] transition-all duration-200 flex items-center justify-center gap-2">
                                    Continue to Profile <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        {/* ─── STEP 2 ─── */}
                        {step === 2 && (
                            <form onSubmit={handleComplete} className="space-y-5">
                                <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]"><span className="text-[#0F3D2E] dark:text-[#D4AF37] font-bold">ℹ</span> All fields on this step are optional.</p>

                                {/* Profile Image */}
                                <div className="space-y-2">
                                    <FieldLabel>Profile Photo</FieldLabel>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#C9A227] dark:border-[#D4AF37] bg-[#F8F5F0] dark:bg-[#252529] flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {profilePreview ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center">
                                                    <Upload className="h-6 w-6 text-[#C9A227] dark:text-[#D4AF37] mx-auto mb-0.5" />
                                                    <span className="text-[9px] text-[#6b6b6b] dark:text-[#B0B0B0]">Upload</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor="profileImage" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#0F3D2E] dark:border-[#D4AF37] text-[#0F3D2E] dark:text-[#D4AF37] text-sm font-medium hover:bg-[#0F3D2E] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#0E0E0F] transition-all duration-200">
                                                <Upload className="h-3.5 w-3.5" /> Choose Photo
                                            </label>
                                            <input id="profileImage" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-1.5">JPG, PNG or WEBP. Max 5MB.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                        <span className={`text-xs ${bio.length > 180 ? "text-[#7A1C1C] dark:text-[#ff6b6b]" : "text-[#6b6b6b] dark:text-[#B0B0B0]"}`}>{bio.length}/200</span>
                                    </div>
                                    <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value.slice(0, 200))} placeholder="Tell us about your faith journey..." rows={3}
                                        className="bg-[#F8F5F0] dark:bg-[#252529] border-[#ddd8d0] dark:border-[#2a2a2d] dark:text-[#F5F5F5] dark:placeholder:text-[#4a4a50] focus-visible:ring-[#C9A227] dark:focus-visible:ring-[#D4AF37] rounded-xl text-sm resize-none" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="birthDate">Birth Date</FieldLabel>
                                        <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputCls} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <FieldLabel htmlFor="birthPlace">Birth Place</FieldLabel>
                                        <Input id="birthPlace" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, Region" className={inputCls} />
                                    </div>
                                </div>

                                {submitError && <p className="text-xs text-[#7A1C1C] dark:text-[#ff6b6b] bg-[#7A1C1C]/8 dark:bg-[#8B2C2C]/20 rounded-lg px-3 py-2">⚠ {submitError}</p>}

                                <div className="flex gap-3 pt-1">
                                    <Button type="button" onClick={() => setStep(1)} variant="outline"
                                        className="flex-1 h-11 rounded-xl border-[#0F3D2E] dark:border-[#1E4D3A] text-[#0F3D2E] dark:text-[#F5F5F5] font-semibold hover:bg-[#0F3D2E] dark:hover:bg-[#1E4D3A] hover:text-white transition-all duration-200 flex items-center justify-center gap-1">
                                        <ChevronLeft className="h-4 w-4" /> Back
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}
                                        className="flex-[2] h-11 rounded-xl bg-[#0F3D2E] dark:bg-[#D4AF37] text-white dark:text-[#0E0E0F] font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#0F3D2E] transition-all duration-200">
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Creating account...
                                            </span>
                                        ) : "Complete Registration"}
                                    </Button>
                                </div>
                            </form>
                        )}

                        <p className="text-center text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-5">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#0F3D2E] dark:text-[#D4AF37] font-semibold hover:text-[#C9A227] transition-colors">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
