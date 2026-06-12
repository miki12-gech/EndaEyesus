import apiClient from '@/api';
import { useAuthStore } from '@/store/authStore';

export const educationApi = {
  // Batches
  listBatches: (phase?: string) => apiClient.instance.get('/education/batches', { params: { phase } }),
  createBatch: (data: any) => apiClient.instance.post('/education/batches', data),

  // Subjects & Lessons
  getSubjectsWithLessons: (batchId: string) =>
    apiClient.instance.get(`/education/batches/${batchId}/subjects`),
  createSubject: (data: any) => apiClient.instance.post('/education/subjects', data),
  createLesson: (data: any) => apiClient.instance.post('/education/lessons', data),
  addInlineExplanation: (lessonId: string, data: any) =>
    apiClient.instance.post(`/education/lessons/${lessonId}/explanations`, data),

  // Exams
  createExam: (data: any) => apiClient.instance.post('/education/exams', data),
  getExam: (examId: string) => apiClient.instance.get(`/education/exams/${examId}`),
  submitExam: (examId: string, answers: Record<string, string>) =>
    apiClient.instance.post(`/education/exams/${examId}/submit`, { answers }),

  // Enrollments (member)
  getMyEnrollment: (phase: string) => apiClient.instance.get(`/education/enrollments/my/${phase}`),
  requestRegistration: (phase: string, batchId: string) =>
    apiClient.instance.post('/education/enrollments/request', { phase, batchId }),

  // Manager
  getPendingEnrollments: () => apiClient.instance.get('/education/enrollments/pending'),
  updateEnrollmentStatus: (id: string, status: string, reason?: string) =>
    apiClient.instance.patch(`/education/enrollments/${id}`, { status, reason }),
  getEnrolledStudents: (batchId: string) =>
    apiClient.instance.get(`/education/enrollments/${batchId}/students`),
  getStudentResults: (filters?: any) =>
    apiClient.instance.get('/education/results', { params: filters }),
  overrideSubjectScore: (enrollmentId: string, subjectId: string, passed: boolean, score?: number) =>
    apiClient.instance.post(`/education/results/${enrollmentId}/subject/${subjectId}/override`, { passed, score }),
  overrideExitScore: (enrollmentId: string, passed: boolean, score?: number) =>
    apiClient.instance.post(`/education/results/${enrollmentId}/exit/override`, { passed, score }),
  graduateMember: (enrollmentId: string) =>
    apiClient.instance.post(`/education/enrollments/${enrollmentId}/graduate`),
};

export const useEducationManager = () => {
  const { user } = useAuthStore();
  return user?.role === 'SERVICE_MANAGER' && user?.serviceClassName === 'የትምህርት ክፍል';
};