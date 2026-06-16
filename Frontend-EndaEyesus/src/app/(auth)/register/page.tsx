"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, ChevronRight, User, Mail, Lock, Home, Phone, Upload } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import apiClient from "@/api";
import { mapGeneratedUserToAuthUser } from "@/lib/authHelper";

function FieldLabel({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
    return (
        <Label htmlFor={htmlFor} className="text-sm font-medium text-[#1a1a1a] dark:text-[#F5F5F5] flex items-center gap-1 flex-row">
            {children}
            {required && (
                <span className="text-[#7A1C1C] dark:text-[#ff6b6b] ml-0.5 text-xs">*</span>
            )}
        </Label>
    );
}

const inputCls = "bg-[#F8F5F0] dark:bg-[#252529] border-[#ddd8d0] dark:border-[#2a2a2d] dark:text-[#F5F5F5] dark:placeholder:text-[#6b6b6b] focus-visible:ring-[#C9A227] dark:focus-visible:ring-[#D4AF37] focus-visible:border-[#C9A227] dark:focus-visible:border-[#D4AF37] rounded-xl h-11 text-sm pl-10";

export default function RegisterPage() {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [sex, setSex] = useState("");
    const [clericalRank, setClericalRank] = useState("NONE");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    
    const [serviceClassId, setServiceClassId] = useState("");
    const [academicDept, setAcademicDept] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [dormBlock, setDormBlock] = useState("");
    const [dormRoom, setDormRoom] = useState("");
    const [serviceClasses, setServiceClasses] = useState<any[]>([]);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await apiClient.instance.get("/member-affairs/service-classes");
                setServiceClasses(res.data.data || []);
            } catch (err) {
                console.error("Failed to load service classes", err);
            }
        };
        fetchClasses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!fullName.trim()) { setError("Full name is required."); return; }
        if (!email.trim()) { setError("Email is required."); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }
        if (!sex) { setError("Sex is required."); return; }

        setIsSubmitting(true);

        try {
            let profileImageUrl = "";
            
            if (profileImage) {
                setUploadingImage(true);
                try {
                    const fd = new FormData();
                    fd.append("image", profileImage);
                    const uploadRes = await apiClient.instance.post<{ data: { imageURL: string } }>("/upload/image", fd, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    profileImageUrl = uploadRes.data.data.imageURL;
                } catch (uploadErr) {
                    console.error("Image upload failed:", uploadErr);
                } finally {
                    setUploadingImage(false);
                }
            }

            // ✅ Use type assertion to bypass generated type
            const regRes = await (apiClient.auth.register as any)({
                full_name_three_parts: fullName,
                email,
                password,
                sex: sex as "MALE" | "FEMALE",
                clerical_rank: clericalRank as "NONE" | "DEACON" | "PRIEST" | "LECTOR" | "OTHER",
                profile_image_url: profileImageUrl || undefined,
                phone_number: phoneNumber || undefined,
                service_class_id: serviceClassId || undefined,
                academic_dept: academicDept || undefined,
                academic_year: academicYear ? parseInt(academicYear) : undefined,
                dorm_block: dormBlock || undefined,
                dorm_room: dormRoom || undefined,
            });
            const regToken = (regRes.data as any).token || 'authenticated';

            const userProfileRes = await apiClient.auth.getCurrentUser();
            const mappedUser = mapGeneratedUserToAuthUser(userProfileRes.data);
            setAuth(mappedUser, regToken);
            
            setSuccessMessage("Registration successful! Redirecting...");
            setTimeout(() => {
                router.replace("/dashboard");
            }, 1500);
        } catch (err: any) {
            const data = err.response?.data;
            let msg = data?.detail || data?.message || "Registration failed. Please check details.";
            if (data?.errors && Array.isArray(data.errors)) {
                msg = data.errors.map((e: any) => `${e.path.replace('body.', '')}: ${e.message}`).join(' | ');
            }
            setError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-48px)] py-8">
            <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>

            <div className="w-full max-w-md px-4">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-2xl shadow-lg border border-[#ddd8d0] dark:border-[#2a2a2d] overflow-hidden" style={{ borderTop: "4px solid #C9A227" }}>
                    {/* Header */}
                    <div className="px-8 pt-8 pb-4 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-[#7A1C1C] dark:bg-[#9B2323] flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                    <rect x="12" y="3" width="4" height="22" rx="1" fill="#C9A227" />
                                    <rect x="4" y="9" width="20" height="4" rx="1" fill="#C9A227" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-2xl font-semibold text-[#7A1C1C] dark:text-[#D4AF37] tracking-tight">Create Account</h1>
                        <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mt-1 font-medium">Enda Eyesus Fellowship · Mekelle University</p>
                    </div>

                    <div className="px-8 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                                    <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="First Middle Last" required className={inputCls} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className={inputCls} />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="password" required>Password</FieldLabel>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                                    <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required className={inputCls} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#7A1C1C] dark:hover:text-[#D4AF37]" aria-label="Toggle password">
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="confirmPassword" required>Confirm Password</FieldLabel>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                                    <Input id="confirmPassword" type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" required className={inputCls} />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#7A1C1C] dark:hover:text-[#D4AF37]" aria-label="Toggle confirm password">
                                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Sex */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="sex" required>Sex</FieldLabel>
                                <Select value={sex} onValueChange={setSex}>
                                    <SelectTrigger className={inputCls.replace("pl-10", "pl-3")}>
                                        <SelectValue placeholder="Select sex" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Clerical Rank */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="clericalRank">Clerical Rank (የክህነት መዓርግ)</FieldLabel>
                                <Select value={clericalRank} onValueChange={setClericalRank}>
                                    <SelectTrigger className={inputCls.replace("pl-10", "pl-3")}>
                                        <SelectValue placeholder="Select clerical rank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NONE">None</SelectItem>
                                        <SelectItem value="DEACON">Deacon</SelectItem>
                                        <SelectItem value="PRIEST">Priest</SelectItem>
                                        <SelectItem value="LECTOR">Lector</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                                    <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="09XXXXXXXX" className={inputCls} />
                                </div>
                            </div>

                            {/* Service Class */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="serviceClass">Service Class (የአገልግሎት ክፍል)</FieldLabel>
                                <Select value={serviceClassId} onValueChange={setServiceClassId}>
                                    <SelectTrigger className={inputCls.replace("pl-10", "pl-3")}>
                                        <SelectValue placeholder="Select your class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceClasses.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.class_name_amharic}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Academic Department */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="academicDept">Academic Department</FieldLabel>
                                <Input id="academicDept" value={academicDept} onChange={(e) => setAcademicDept(e.target.value)} placeholder="e.g., Engineering" className={inputCls} />
                            </div>

                            {/* Academic Year */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="academicYear">Academic Year</FieldLabel>
                                <Select value={academicYear} onValueChange={setAcademicYear}>
                                    <SelectTrigger className={inputCls.replace("pl-10", "pl-3")}>
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Year 1</SelectItem>
                                        <SelectItem value="2">Year 2</SelectItem>
                                        <SelectItem value="3">Year 3</SelectItem>
                                        <SelectItem value="4">Year 4</SelectItem>
                                        <SelectItem value="5">Year 5+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Dorm Block & Room */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <FieldLabel htmlFor="dormBlock">Dorm Block</FieldLabel>
                                    <Input id="dormBlock" value={dormBlock} onChange={(e) => setDormBlock(e.target.value)} placeholder="e.g., A" className={inputCls} />
                                </div>
                                <div className="space-y-1.5">
                                    <FieldLabel htmlFor="dormRoom">Room Number</FieldLabel>
                                    <Input id="dormRoom" value={dormRoom} onChange={(e) => setDormRoom(e.target.value)} placeholder="e.g., 101" className={inputCls} />
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="space-y-1.5">
                                <FieldLabel htmlFor="profilePicture">Profile Picture</FieldLabel>
                                <div className="relative">
                                    <input
                                        id="profilePicture"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setProfileImage(file);
                                        }}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="profilePicture"
                                        className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border-2 border-dashed border-[#ddd8d0] dark:border-[#2a2a2d] hover:border-[#7A1C1C] dark:hover:border-[#D4AF37] cursor-pointer transition-colors text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#7A1C1C] dark:hover:text-[#D4AF37]"
                                    >
                                        <Upload className="h-4 w-4" />
                                        {profileImage ? profileImage.name : "Upload profile picture (optional)"}
                                    </label>
                                </div>
                            </div>

                            {error && <p className="text-xs text-[#7A1C1C] dark:text-[#ff6b6b] text-center bg-[#7A1C1C]/8 dark:bg-[#ff6b6b]/10 rounded-lg px-3 py-2">⚠ {error}</p>}
                            {successMessage && <p className="text-xs text-[#7A1C1C] dark:text-[#7ac9a8] text-center bg-[#7A1C1C]/8 dark:bg-[#7ac9a8]/10 rounded-lg px-3 py-2">✓ {successMessage}</p>}

                            <Button type="submit" disabled={isSubmitting}
                                className="w-full h-11 mt-2 rounded-xl bg-[#7A1C1C] text-white dark:bg-[#D4AF37] dark:text-[#0E0E0F] font-semibold hover:bg-[#C9A227] dark:hover:bg-[#e0c040] hover:text-[#7A1C1C] transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating account...
                                    </span>
                                ) : (
                                    <>
                                        Register Account <ChevronRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-[#ddd8d0] dark:bg-[#2a2a2d]" />
                            <span className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] font-medium uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-[#ddd8d0] dark:bg-[#2a2a2d]" />
                        </div>

                        <div className="space-y-3">
                            <Link href="/login"
                                className="flex items-center justify-center w-full h-11 rounded-xl border-2 border-[#7A1C1C] dark:border-[#9B2323] text-[#7A1C1C] dark:text-[#F5F5F5] text-sm font-semibold hover:bg-[#7A1C1C] dark:hover:bg-[#9B2323] hover:text-white transition-all duration-200">
                                Sign In Instead
                            </Link>
                            <Link href="/"
                                className="flex items-center justify-center gap-1.5 w-full h-9 text-sm text-[#6b6b6b] dark:text-[#B0B0B0] hover:text-[#7A1C1C] dark:hover:text-[#D4AF37] transition-colors font-medium">
                                <Home className="h-3.5 w-3.5" /> Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}