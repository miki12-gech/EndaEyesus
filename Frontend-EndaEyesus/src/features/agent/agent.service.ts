import api from "@/lib/api";
import { AdminStats, User } from "@/lib/types";

// All agent service functions use the real backend API
export const agentService = {
    // ── Stats ──────────────────────────────────────────────────────
    getMetrics: async (): Promise<AdminStats> => {
        const res = await api.get<{ data: AdminStats }>("/admin/dashboard-stats");
        return res.data.data;
    },

    // ── Users ──────────────────────────────────────────────────────
    getUsers: async (): Promise<User[]> => {
        const res = await api.get<{ data: User[] }>("/admin/users");
        return res.data.data;
    },

    approveUser: async (userId: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/approve`);
        return true;
    },

    rejectUser: async (userId: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/reject`);
        return true;
    },

    suspendUser: async (userId: string, reason: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/suspend`, { reason });
        return true;
    },

    promoteRole: async (userId: string, role: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/promote-role`, { role });
        return true;
    },

    changeClass: async (userId: string, serviceClassID: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/change-class`, { serviceClassID });
        return true;
    },

    // ── Leader Management ─────────────────────────────────────────
    promoteLeader: async (userId: string, classID: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/promote-leader`, { classID });
        return true;
    },

    demoteLeader: async (userId: string): Promise<boolean> => {
        await api.patch(`/admin/users/${userId}/demote-leader`);
        return true;
    },

    // ── Office (ፅሕፈት ቤት) ─────────────────────────────────────────
    getOffice: async () => {
        const res = await api.get<{ data: { officeMembers: User[]; unassignedMembers: User[] } }>("/admin/office");
        return res.data.data;
    },

    getPendingOffice: async (): Promise<User[]> => {
        const res = await api.get<{ data: User[] }>("/admin/office/pending");
        return res.data.data;
    },

    approveOffice: async (userId: string): Promise<boolean> => {
        await api.patch(`/admin/office/${userId}/approve`);
        return true;
    },

    disapproveOffice: async (userId: string): Promise<boolean> => {
        await api.patch(`/admin/office/${userId}/disapprove`);
        return true;
    },
};
