"use client";

import { useState } from "react";
import { useAgentDashboard, useAgentUsers, useAgentApprovals, useAgentData } from "./agent.hooks";
import { User, ShieldCheck, CheckCircle, Ban, Search, Shield, Users, Activity, Settings, Bell, CircleCheck, CircleX } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type TabType = "dashboard" | "users" | "approvals" | "roles" | "logs";

export function AgentControlView() {
    const [activeTab, setActiveTab] = useState<TabType>("dashboard");

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Vertical Sidebar Navigation for Agent Control */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-1">
                    <div className="mb-6 px-3">
                        <h2 className="text-xl font-bold text-[#0F3D2E] dark:text-[#D4AF37] flex items-center gap-2">
                            <Shield className="h-6 w-6 text-[#C9A227] dark:text-[#D4AF37]" />
                            Agent Control
                        </h2>
                        <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">Management & Administration</p>
                    </div>

                    {[
                        { id: "dashboard", label: "Overview", icon: Activity },
                        { id: "users", label: "User Management", icon: Users },
                        { id: "approvals", label: "Pending Approvals", icon: CheckCircle },
                        { id: "roles", label: "Access Control", icon: ShieldCheck },
                        { id: "logs", label: "Activity Logs", icon: Settings },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-[#0F3D2E] text-[#C9A227] dark:bg-[#1E4D3A] dark:text-[#D4AF37] shadow-md"
                                : "text-[#6b6b6b] dark:text-[#B0B0B0] hover:bg-[#F8F5F0] dark:hover:bg-[#252529] hover:text-[#0F3D2E] dark:hover:text-[#F5F5F5]"
                                }`}
                        >
                            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "opacity-100" : "opacity-60"}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white dark:bg-[#1C1C1F] rounded-2xl border border-[#ddd8d0] dark:border-[#2a2a2d] shadow-sm min-h-[600px] overflow-hidden">
                    <div className="h-full">
                        {activeTab === "dashboard" && <DashboardTab />}
                        {activeTab === "users" && <UsersTab />}
                        {activeTab === "approvals" && <ApprovalsTab />}
                        {activeTab === "roles" && <RolesTab />}
                        {activeTab === "logs" && <LogsTab />}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS (TABS)
// ----------------------------------------------------------------------

function DashboardTab() {
    const { metrics, loading } = useAgentDashboard();

    if (loading || !metrics) return <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] animate-pulse">Loading core metrics...</div>;

    const cards = [
        { label: "Total Members", value: metrics.totalUsers, icon: Users, color: "#C9A227", darkColor: "#D4AF37" },
        { label: "Pending Approvals", value: metrics.pendingApprovals, icon: Bell, color: "#7A1C1C", darkColor: "#8B2C2C" },
        { label: "Active Classes", value: metrics.activeClasses, icon: CheckCircle, color: "#0F3D2E", darkColor: "#1E4D3A" },
        { label: "Suspended", value: metrics.suspendedUsers, icon: Ban, color: "#6b6b6b", darkColor: "#B0B0B0" },
    ];

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <h3 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37] mb-2">Platform Overview</h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((c, i) => (
                    <div key={i} className="bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-xl p-4 border border-[#ddd8d0] dark:border-[#2a2a2d]" style={{ borderBottom: `3px solid ${c.darkColor}` }}>
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-semibold text-[#6b6b6b] dark:text-[#B0B0B0] uppercase tracking-wider">{c.label}</p>
                            <c.icon className="h-4 w-4" style={{ color: c.darkColor }} />
                        </div>
                        <p className="text-3xl font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">{c.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gender Chart */}
                <div className="bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <h4 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#F5F5F5] mb-6">Demographics (Gender)</h4>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics.genderData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2d" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b6b6b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b6b6b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1C1C1F', borderColor: '#2a2a2d', color: '#F5F5F5' }} />
                                <Bar dataKey="value" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Academic Year Chart */}
                <div className="bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <h4 className="text-sm font-semibold text-[#0F3D2E] dark:text-[#F5F5F5] mb-6">Academic Year Distribution</h4>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics.academicYearData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2d" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b6b6b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6b6b6b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1C1C1F', borderColor: '#2a2a2d', color: '#F5F5F5' }} />
                                <Bar dataKey="value" fill="#1E4D3A" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersTab() {
    const { users, loading, changeStatus, changeRole } = useAgentUsers();

    if (loading) return <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] animate-pulse">Loading users...</div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37]">User Management</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b6b6b]" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-9 pr-4 py-2 bg-[#F8F5F0] dark:bg-[#0E0E0F] border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#F8F5F0] dark:bg-[#0E0E0F] text-[#6b6b6b] dark:text-[#B0B0B0]">
                        <tr>
                            <th className="px-4 py-3 font-medium">Member</th>
                            <th className="px-4 py-3 font-medium">Department</th>
                            <th className="px-4 py-3 font-medium">Service Class</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ddd8d0] dark:divide-[#2a2a2d]">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-[#F8F5F0]/50 dark:hover:bg-[#252529]/50 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#0F3D2E] dark:bg-[#1E4D3A] flex items-center justify-center text-xs font-bold text-[#C9A227] dark:text-[#D4AF37]">
                                            {u.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">{u.fullName}</p>
                                            <p className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">@{u.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-[#6b6b6b] dark:text-[#B0B0B0]">{u.department}</td>
                                <td className="px-4 py-3 text-[#6b6b6b] dark:text-[#B0B0B0]">{u.serviceClass}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.status === 'active' ? 'bg-[#0F3D2E]/10 text-[#0F3D2E] dark:bg-[#1E4D3A]/30 dark:text-[#4ade80]' :
                                        u.status === 'pending' ? 'bg-[#C9A227]/10 text-[#C9A227] dark:bg-[#D4AF37]/20 dark:text-[#D4AF37]' :
                                            'bg-[#7A1C1C]/10 text-[#7A1C1C] dark:bg-[#8B2C2C]/30 dark:text-[#f87171]'
                                        }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-[#6b6b6b] dark:text-[#B0B0B0]">
                                    <select
                                        className="bg-transparent text-xs font-medium border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-md px-2 py-1 w-24"
                                        value={u.role || "viewer"}
                                        onChange={(e) => changeRole(u.id, e.target.value)}
                                    >
                                        <option value="viewer">Member</option>
                                        <option value="moderator">Class Leader</option>
                                        <option value="admin">Super Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <select
                                        className="bg-transparent text-xs font-medium border border-[#ddd8d0] dark:border-[#2a2a2d] rounded-md px-2 py-1 text-[#6b6b6b] dark:text-[#B0B0B0]"
                                        value={u.status}
                                        onChange={(e) => changeStatus(u.id, e.target.value as any)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="suspended">Suspend</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ApprovalsTab() {
    const { approvals, loading, handleRequest } = useAgentApprovals();

    if (loading) return <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] animate-pulse">Loading approvals queue...</div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <h3 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37]">Pending Approvals ({approvals.length})</h3>

            {approvals.length === 0 ? (
                <div className="bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-xl p-8 text-center border border-[#ddd8d0] dark:border-[#2a2a2d]">
                    <CheckCircle className="h-8 w-8 text-[#0F3D2E] dark:text-[#1E4D3A] mx-auto mb-3 opacity-50" />
                    <p className="text-[#6b6b6b] dark:text-[#B0B0B0] font-medium">All caught up! No pending approvals.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {approvals.map(req => (
                        <div key={req.id} className="bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-xl p-5 border border-[#ddd8d0] dark:border-[#2a2a2d] flex flex-col justify-between" style={{ borderLeft: "3px solid #C9A227" }}>
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-[#1a1a1a] dark:text-[#F5F5F5]">{req.fullName}</h4>
                                    <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0]">{req.requestDate}</span>
                                </div>
                                <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0] mb-1">Requested to join:</p>
                                <p className="text-sm font-semibold text-[#0F3D2E] dark:text-[#D4AF37] mb-5">{req.serviceClass}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleRequest(req.id, "approved")}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#0F3D2E] dark:bg-[#1E4D3A] text-[#C9A227] dark:text-[#D4AF37] py-2 rounded-lg text-xs font-bold hover:brightness-110 transition-all"
                                >
                                    <CircleCheck className="h-4 w-4" /> Approve
                                </button>
                                <button
                                    onClick={() => handleRequest(req.id, "rejected")}
                                    className="flex-1 flex items-center justify-center gap-2 border border-[#7A1C1C]/30 text-[#7A1C1C] dark:text-[#f87171] py-2 rounded-lg text-xs font-bold hover:bg-[#7A1C1C]/10 transition-all"
                                >
                                    <CircleX className="h-4 w-4" /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function RolesTab() {
    const { permissions, loading } = useAgentData();

    if (loading) return <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] animate-pulse">Loading permissions...</div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <h3 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37]">Role Permissions Matrix</h3>
            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Define what different administrative roles can access within the control center.</p>

            <div className="overflow-x-auto rounded-xl border border-[#ddd8d0] dark:border-[#2a2a2d]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#F8F5F0] dark:bg-[#0E0E0F] text-[#6b6b6b] dark:text-[#B0B0B0]">
                        <tr>
                            <th className="px-4 py-3 font-medium capitalize">Permission</th>
                            {permissions.map(p => (
                                <th key={p.role} className="px-4 py-3 font-bold text-[#0F3D2E] dark:text-[#D4AF37] capitalize text-center">
                                    {p.role}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ddd8d0] dark:divide-[#2a2a2d]">
                        {["manageUsers", "manageApprovals", "manageRoles", "manageAnnouncements", "viewLogs"].map(key => (
                            <tr key={key} className="hover:bg-[#F8F5F0]/50 dark:hover:bg-[#252529]/50 transition-colors">
                                <td className="px-4 py-4 font-medium text-[#1a1a1a] dark:text-[#F5F5F5]">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                {permissions.map(p => (
                                    <td key={p.role} className="px-4 py-4 text-center">
                                        {(p as any)[key] ? (
                                            <CheckCircle className="h-5 w-5 text-[#0F3D2E] dark:text-[#1E4D3A] mx-auto" />
                                        ) : (
                                            <Ban className="h-4 w-4 text-[#6b6b6b]/40 dark:text-[#B0B0B0]/30 mx-auto" />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function LogsTab() {
    const { logs, loading } = useAgentData();

    if (loading) return <div className="p-8 text-center text-[#6b6b6b] dark:text-[#B0B0B0] animate-pulse">Loading system logs...</div>;

    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">
            <h3 className="text-lg font-bold text-[#0F3D2E] dark:text-[#D4AF37]">System Activity Logs</h3>
            <p className="text-sm text-[#6b6b6b] dark:text-[#B0B0B0]">Security and administrative actions audit trail.</p>

            <div className="space-y-3">
                {logs.map(log => (
                    <div key={log.id} className="bg-[#F8F5F0] dark:bg-[#0E0E0F] rounded-xl p-4 border border-[#ddd8d0] dark:border-[#2a2a2d] flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'success' ? 'bg-[#0F3D2E] dark:bg-[#1E4D3A]' : 'bg-[#7A1C1C] dark:bg-[#8B2C2C]'}`} />
                            <div>
                                <p className="text-sm font-semibold text-[#1a1a1a] dark:text-[#F5F5F5]">{log.action}</p>
                                <p className="text-xs text-[#6b6b6b] dark:text-[#B0B0B0] mt-1">
                                    By <span className="font-bold">{log.performedBy}</span>
                                    {log.targetUser && ` on target `}
                                    {log.targetUser && <span className="font-bold underline decoration-dotted">{log.targetUser}</span>}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] text-[#6b6b6b] dark:text-[#B0B0B0] bg-white dark:bg-[#1C1C1F] px-2 py-1 rounded-md border border-[#ddd8d0] dark:border-[#2a2a2d]">
                                {log.timestamp}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
