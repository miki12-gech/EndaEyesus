import { useState, useEffect } from "react";
import { agentService } from "./agent.service";
import { DashboardMetrics, AgentUser, ApprovalRequest, ActivityLog, RolePermission } from "./agent.types";
import { AdminStats, User } from "@/lib/types";

// Transform AdminStats (backend) → DashboardMetrics (view shape)
function transformStats(stats: AdminStats): DashboardMetrics {
    const pending = stats.byStatus.find(s => s.status === "PENDING")?._count.id ?? 0;
    const suspended = stats.byStatus.find(s => s.status === "SUSPENDED")?._count.id ?? 0;
    const activeClasses = stats.byClass.length;

    const genderData = stats.bySex.map(s => ({
        name: s.sex === "MALE" ? "Male" : "Female",
        value: s._count.id,
    }));

    const academicYearData = stats.byAcademicYear.map(s => ({
        name: s.academicYear.replace("YEAR_", "Y").replace("POST_GRADUATE", "PG"),
        value: s._count.id,
    }));

    return {
        totalUsers: stats.totalUsers,
        pendingApprovals: pending,
        activeClasses,
        suspendedUsers: suspended,
        genderData,
        academicYearData,
    };
}

// Transform User[] (backend) → AgentUser[] (view shape)
function transformUsers(users: User[]): AgentUser[] {
    return users.map(u => ({
        id: u.id,
        fullName: u.fullName,
        username: u.username,
        department: u.department,
        serviceClass: u.serviceClass?.name ?? u.serviceClassID,
        status: u.status === "ACTIVE" ? "active"
            : u.status === "SUSPENDED" ? "suspended"
                : "pending",
        profileImageUrl: u.profileImage ?? null,
        role: u.role === "SUPER_ADMIN" ? "admin"
            : u.role === "CLASS_LEADER" ? "moderator"
                : "viewer",
    }));
}

export function useAgentDashboard() {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agentService.getMetrics().then(data => {
            setMetrics(transformStats(data));
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return { metrics, loading };
}

export function useAgentUsers() {
    const [users, setUsers] = useState<AgentUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        agentService.getUsers().then(data => {
            setUsers(transformUsers(data));
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const changeStatus = async (userId: string, status: "active" | "pending" | "suspended") => {
        if (status === "active") {
            await agentService.approveUser(userId);
        } else if (status === "suspended") {
            await agentService.suspendUser(userId, "Suspended by admin");
        } else {
            await agentService.rejectUser(userId);
        }
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    };

    const changeRole = async (userId: string, role: string) => {
        let dbRole = "MEMBER";
        if (role === "admin") dbRole = "SUPER_ADMIN";
        else if (role === "moderator") dbRole = "CLASS_LEADER";

        await agentService.promoteRole(userId, dbRole);
        fetchUsers(); // Refresh to get proper role string
    };

    const changeClass = async (userId: string, targetClassId: string) => {
        await agentService.changeClass(userId, targetClassId);
        fetchUsers(); // Refresh to get the actual class name
    };

    return { users, loading, changeStatus, changeRole, changeClass, refresh: fetchUsers };
}

export function useAgentApprovals() {
    const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApprovals = () => {
        setLoading(true);
        // Load PENDING users and shape them as ApprovalRequest
        agentService.getUsers().then(data => {
            const pending: ApprovalRequest[] = data
                .filter(u => u.status === "PENDING")
                .map(u => ({
                    id: u.id,
                    userId: u.id,
                    fullName: u.fullName,
                    serviceClass: u.serviceClass?.name ?? u.serviceClassID,
                    requestDate: new Date(u.createdAt).toLocaleDateString(),
                    status: "pending" as const,
                }));
            setApprovals(pending);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchApprovals();
    }, []);

    const handleRequest = async (id: string, action: "approved" | "rejected") => {
        if (action === "approved") {
            await agentService.approveUser(id);
        } else {
            await agentService.rejectUser(id);
        }
        setApprovals(prev => prev.filter(a => a.id !== id));
    };

    return { approvals, loading, handleRequest, refresh: fetchApprovals };
}

export function useAgentData() {
    const [logs] = useState<ActivityLog[]>([]);
    const [permissions] = useState<RolePermission[]>([
        { role: "admin", manageUsers: true, manageApprovals: true, manageRoles: true, manageAnnouncements: true, viewLogs: true },
        { role: "moderator", manageUsers: false, manageApprovals: true, manageRoles: false, manageAnnouncements: true, viewLogs: true },
        { role: "viewer", manageUsers: false, manageApprovals: false, manageRoles: false, manageAnnouncements: false, viewLogs: true },
    ]);
    const [loading] = useState(false);

    return { logs, permissions, loading };
}
