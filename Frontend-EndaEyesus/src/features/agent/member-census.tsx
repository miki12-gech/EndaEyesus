"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Shield, Users, Search, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import chairmanApiService from "@/lib/chairmanApi";

export function MemberCensusView() {
    const { user } = useAuthStore();
    const systemRole = user?.system_role || user?.role || 'USER';
    const isChairman = systemRole === 'SECRETARIAT_CHAIRMAN';

    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const res = await chairmanApiService.getMemberCensus();
                setMembers(res.data || []);
                setFilteredMembers(res.data || []);
            } catch (error) {
                console.error('Failed to fetch member census:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isChairman) {
            fetchMembers();
        }
    }, [isChairman]);

    useEffect(() => {
        if (!searchQuery) {
            setFilteredMembers(members);
            return;
        }

        const filtered = members.filter((m) =>
            m.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.role?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMembers(filtered);
    }, [searchQuery, members]);

    if (!isChairman) {
        return (
            <div className="bg-[#7A1C1C]/10 dark:bg-[#8B2C2C]/10 border border-[#7A1C1C]/30 dark:border-[#8B2C2C]/30 rounded-xl p-8 text-center">
                <Shield className="h-12 w-12 text-[#7A1C1C] dark:text-[#8B2C2C] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#7A1C1C] dark:text-[#8B2C2C] mb-2">Access Restricted</h3>
                <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Only the Secretariat Chairman can access this page.</p>
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] animate-pulse">Loading member census...</div>;
    }

    const roleColors: Record<string, string> = {
        'SECRETARIAT_CHAIRMAN': 'bg-[#C9A227] text-[#0E0E0F]',
        'SECRETARIAT_VICE': 'bg-[#D4AF37] text-[#0E0E0F]',
        'SECRETARIAT_SECRETARY': 'bg-[#D4AF37] text-[#0E0E0F]',
        'SERVICE_MANAGER': 'bg-[#0F3D2E] text-white',
        'TEACHER': 'bg-[#7A1C1C] text-white',
        'MEMBER': 'bg-[#0E0E0F] text-white',
        'USER': 'bg-[#6b6b6b] text-white',
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#7A1C1C]/10 dark:bg-[#8B2C2C]/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-[#7A1C1C] dark:text-[#8B2C2C]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#7A1C1C] dark:text-[#D4AF37]">{members.length}</p>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">Total Members</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0F3D2E]/10 dark:bg-[#1E4D3A]/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-[#0F3D2E] dark:text-[#1E4D3A]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#0F3D2E] dark:text-[#D4AF37]">
                                {members.filter(m => ['SECRETARIAT_CHAIRMAN', 'SECRETARIAT_VICE', 'SECRETARIAT_SECRETARY'].includes(m.role)).length}
                            </p>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">Secretariat</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-[#C9A227] dark:text-[#D4AF37]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#C9A227] dark:text-[#D4AF37]">
                                {members.filter(m => m.role === 'MEMBER').length}
                            </p>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">Active Members</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1C1C1F] rounded-xl p-4 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#6b6b6b]/10 dark:bg-[#B0B0B0]/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#6b6b6b] dark:text-[#B0B0B0]">
                                {members.filter(m => m.role === 'USER').length}
                            </p>
                            <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0]">Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b] dark:text-[#B0B0B0]" />
                    <Input
                        placeholder="Search by name, email, or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </div>

            {/* Members Table */}
            <div className="bg-white dark:bg-[#1C1C1F] rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F8F5F0] dark:bg-[#0E0E0F] text-[#6b6b6b] dark:text-[#B0B0B0]">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Role</th>
                                <th className="px-4 py-3 font-medium">Service Class</th>
                                <th className="px-4 py-3 font-medium">Department</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ddd8d0] dark:divide-[#2a2a2d]">
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-[#F8F5F0]/50 dark:hover:bg-[#252529]/50 transition-colors">
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-[#1a1a1a] dark:text-[#F5F5F5]">{member.fullName}</p>
                                    </td>
                                    <td className="px-4 py-4 text-[#6b6b6b] dark:text-[#B0B0B0]">{member.email}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[member.role] || 'bg-gray-500 text-white'}`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-[#6b6b6b] dark:text-[#B0B0B0]">{member.serviceClassName || '-'}</td>
                                    <td className="px-4 py-4 text-[#6b6b6b] dark:text-[#B0B0B0]">{member.academicDepartment || '-'}</td>
                                    <td className="px-4 py-4 text-[#6b6b6b] dark:text-[#B0B0B0]">{member.phoneNumber || '-'}</td>
                                    <td className="px-4 py-4 text-[#6b6b6b] dark:text-[#B0B0B0]">
                                        {new Date(member.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredMembers.length === 0 && (
                    <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0]">
                        No members found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
