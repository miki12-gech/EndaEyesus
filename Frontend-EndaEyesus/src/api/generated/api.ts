/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  /** @format date-time */
  timestamp?: string;
}

export interface User {
  /** @format uuid */
  id?: string;
  full_name_three_parts?: string;
  /** @format email */
  email?: string;
  system_role?:
    | "USER"
    | "MEMBER"
    | "TEACHER"
    | "SERVICE_MANAGER"
    | "SECRETARIAT_SECRETARY"
    | "SECRETARIAT_VICE"
    | "SECRETARIAT_CHAIRMAN";
  /** @format uuid */
  service_class_id?: string | null;
  profile_image_url?: string | null;
  bio?: string | null;
  /** @format date-time */
  created_at?: string;
}

export interface Batch {
  /** @format uuid */
  id?: string;
  course_track?: "GUBAE_ABEW" | "GUBAE_HAWARYAT" | "GUBAE_ECCLESIAE";
  batch_number?: number;
  status?: "ACTIVE" | "GRADUATED";
  academic_year?: number;
}

export interface CourseSubmission {
  /** @format uuid */
  id?: string;
  title?: string;
  status?:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "IMPLEMENTATION_IN_PROGRESS"
    | "PUBLISHED";
  review_feedback?: string | null;
  implemented_page_url?: string | null;
  /** @format date-time */
  submitted_at?: string | null;
  /** @format date-time */
  published_at?: string | null;
}

export interface Announcement {
  /** @format uuid */
  id?: string;
  title?: string;
  content?: string;
  is_public?: boolean;
  /** @format uuid */
  target_class_id?: string | null;
  author?: User;
  /** @format date-time */
  published_at?: string;
  reaction_counts?: {
    likes?: number;
    stars?: number;
  };
}

export interface LibraryItem {
  /** @format uuid */
  id?: string;
  title?: string;
  description?: string | null;
  /** @format uri */
  drive_url?: string;
  category?: "SPIRITUAL" | "ACADEMIC" | "OTHER";
  academic_department?: string | null;
  academic_year?: number | null;
  document_type?: "TEXTBOOK" | "PAST_EXAM" | null;
  likes?: number;
  downloads?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://api.endaeyesus.org/api/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Enda Eyesus Community Digital Ecosystem API
 * @version 1.0.0
 * @baseUrl https://api.endaeyesus.org/api/v1
 * @contact Development Team <dev@endaeyesus.org>
 *
 * REST API for the Enda Eyesus LMS and community platform.
 * Authentication via JWT stored in HttpOnly cookie.
 * Versioning: /api/v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  classes = {
    /**
     * No description
     *
     * @name ListServiceClasses
     * @summary List service classes
     * @request GET:/classes
     * @secure
     */
    listServiceClasses: (
      query?: {
        is_public_registration?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id?: string;
          name?: string;
          description?: string | null;
        }[],
        any
      >({
        path: `/classes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @name Register
     * @summary Tier 1 registration
     * @request POST:/auth/register
     * @secure
     */
    register: (
      data: {
        full_name_three_parts: string;
        /** @format email */
        email: string;
        /** @minLength 8 */
        password: string;
        sex?: string;
        clerical_rank?: string;
        profile_image_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<User, ProblemDetail>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Login
     * @summary Login and receive JWT cookie
     * @request POST:/auth/login
     * @secure
     */
    login: (
      data: {
        /** @format email */
        email: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id?: string;
          system_role?: string;
        },
        ProblemDetail
      >({
        path: `/auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Logout
     * @summary Logout (clear cookie)
     * @request POST:/auth/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetCurrentUser
     * @summary Get current user profile
     * @request GET:/auth/me
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  membership = {
    /**
     * No description
     *
     * @name ApplyMembership
     * @summary Apply for full membership
     * @request POST:/membership/apply
     * @secure
     */
    applyMembership: (
      data: {
        university_id: string;
        academic_dept: string;
        /**
         * @min 1
         * @max 5
         */
        academic_year: number;
        dorm_block: string;
        dorm_room: string;
        /** @format uuid */
        preferred_class_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: "MEMBER_UPGRADED";
          /** @format uuid */
          service_class_id?: string;
          orientation_checklist?: object;
        },
        any
      >({
        path: `/membership/apply`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  announcements = {
    /**
     * No description
     *
     * @name ListAnnouncements
     * @summary List announcements
     * @request GET:/announcements
     * @secure
     */
    listAnnouncements: (
      query?: {
        /**
         * @max 100
         * @default 20
         */
        limit?: number;
        /** @default 0 */
        offset?: number;
        /** @format uuid */
        class_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items?: Announcement[];
          total?: number;
          limit?: number;
          offset?: number;
        },
        any
      >({
        path: `/announcements`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateAnnouncement
     * @summary Create announcement
     * @request POST:/announcements
     * @secure
     */
    createAnnouncement: (
      data: {
        title: string;
        content: string;
        is_public: boolean;
        /** @format uuid */
        target_class_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Announcement, any>({
        path: `/announcements`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ReactToAnnouncement
     * @summary Add or remove a reaction
     * @request POST:/announcements/{id}/reactions
     * @secure
     */
    reactToAnnouncement: (
      id: string,
      data: {
        type: "LIKE" | "STAR";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/announcements/${id}/reactions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CommentOnAnnouncement
     * @summary Add a comment
     * @request POST:/announcements/{id}/comments
     * @secure
     */
    commentOnAnnouncement: (
      id: string,
      data: {
        content: string;
        parentCommentId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/announcements/${id}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  lms = {
    /**
     * No description
     *
     * @name ListBatches
     * @summary List batches
     * @request GET:/lms/batches
     * @secure
     */
    listBatches: (
      query?: {
        course_track?: "GUBAE_ABEW" | "GUBAE_HAWARYAT" | "GUBAE_ECCLESIAE";
        /**
         * @max 100
         * @default 20
         */
        limit?: number;
        /** @default 0 */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items?: Batch[];
          total?: number;
        },
        any
      >({
        path: `/lms/batches`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateBatch
     * @summary Create new batch (Education Manager only)
     * @request POST:/lms/batches
     * @secure
     */
    createBatch: (
      data: {
        course_track: "GUBAE_ABEW" | "GUBAE_HAWARYAT" | "GUBAE_ECCLESIAE";
        batch_number: number;
        academic_year: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Batch, any>({
        path: `/lms/batches`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GraduateBatch
     * @summary Graduate a batch
     * @request PUT:/lms/batches/{id}/graduate
     * @secure
     */
    graduateBatch: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          message?: string;
          certificates_generated?: number;
          failed_students?: number;
        },
        any
      >({
        path: `/lms/batches/${id}/graduate`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateSubmission
     * @summary Create draft submission (Teacher)
     * @request POST:/lms/submissions
     * @secure
     */
    createSubmission: (
      data: {
        /** @format uuid */
        batch_id: string;
        title: string;
        content_package: object;
      },
      params: RequestParams = {},
    ) =>
      this.request<CourseSubmission, any>({
        path: `/lms/submissions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ListSubmissions
     * @summary List submissions (filter by status)
     * @request GET:/lms/submissions
     * @secure
     */
    listSubmissions: (
      query?: {
        status?:
          | "DRAFT"
          | "SUBMITTED"
          | "UNDER_REVIEW"
          | "APPROVED"
          | "REJECTED"
          | "IMPLEMENTATION_IN_PROGRESS"
          | "PUBLISHED";
        /**
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items?: CourseSubmission[];
          total?: number;
        },
        any
      >({
        path: `/lms/submissions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name SubmitForReview
     * @summary Submit draft for review
     * @request PATCH:/lms/submissions/{id}/submit
     * @secure
     */
    submitForReview: (id: string, params: RequestParams = {}) =>
      this.request<CourseSubmission, any>({
        path: `/lms/submissions/${id}/submit`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ApproveSubmission
     * @summary Approve submission (Education Manager)
     * @request PUT:/lms/submissions/{id}/approve
     * @secure
     */
    approveSubmission: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          status?: "APPROVED";
          message?: string;
        },
        any
      >({
        path: `/lms/submissions/${id}/approve`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ImplementSubmission
     * @summary Set implemented page URL (Technical Team)
     * @request PUT:/lms/submissions/{id}/implement
     * @secure
     */
    implementSubmission: (
      id: string,
      data: {
        /** @format uri */
        implemented_page_url: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: "PUBLISHED";
          implemented_page_url?: string;
        },
        any
      >({
        path: `/lms/submissions/${id}/implement`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Enroll
     * @summary Enroll in a batch
     * @request POST:/lms/enrollments
     * @secure
     */
    enroll: (
      data: {
        /** @format uuid */
        batch_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          enrollment_id?: string;
          status?: "ENROLLED";
        },
        ProblemDetail
      >({
        path: `/lms/enrollments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CompleteLesson
     * @summary Mark a lesson as completed
     * @request POST:/lms/enrollments/{id}/complete-lesson
     * @secure
     */
    completeLesson: (
      id: string,
      data: {
        lesson_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          progress?: number;
          completed_lessons?: string[];
        },
        any
      >({
        path: `/lms/enrollments/${id}/complete-lesson`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  library = {
    /**
     * No description
     *
     * @name ListLibrary
     * @summary List library items
     * @request GET:/library
     * @secure
     */
    listLibrary: (
      query?: {
        category?: "SPIRITUAL" | "ACADEMIC" | "OTHER";
        academic_department?: string;
        /**
         * @min 1
         * @max 5
         */
        academic_year?: number;
        course_id?: string;
        document_type?: "TEXTBOOK" | "PAST_EXAM";
        /**
         * @max 100
         * @default 20
         */
        limit?: number;
        /** @default 0 */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items?: LibraryItem[];
          total?: number;
        },
        any
      >({
        path: `/library`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name LikeLibraryItem
     * @summary Like a library item
     * @request POST:/library/{id}/like
     * @secure
     */
    likeLibraryItem: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          likes?: number;
        },
        any
      >({
        path: `/library/${id}/like`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  notifications = {
    /**
     * No description
     *
     * @name ListNotifications
     * @summary Get user notifications
     * @request GET:/notifications
     * @secure
     */
    listNotifications: (
      query?: {
        unread_only?: boolean;
        /**
         * @max 100
         * @default 20
         */
        limit?: number;
        /** @default 0 */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          items?: {
            /** @format uuid */
            id?: string;
            title?: string;
            message?: string;
            target_route?: string;
            is_read?: boolean;
            /** @format date-time */
            created_at?: string;
          }[];
          unread_count?: number;
        },
        any
      >({
        path: `/notifications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MarkAllRead
     * @summary Mark all notifications as read
     * @request PATCH:/notifications/read-all
     * @secure
     */
    markAllRead: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notifications/read-all`,
        method: "PATCH",
        secure: true,
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @name ChangeUserRole
     * @summary Change user role
     * @request PUT:/admin/users/{id}/role
     * @secure
     */
    changeUserRole: (
      id: string,
      data: {
        new_role:
          | "USER"
          | "MEMBER"
          | "TEACHER"
          | "SERVICE_MANAGER"
          | "SECRETARIAT_SECRETARY"
          | "SECRETARIAT_VICE"
          | "SECRETARIAT_CHAIRMAN";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          user_id?: string;
          previous_role?: string;
          new_role?: string;
        },
        any
      >({
        path: `/admin/users/${id}/role`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateSubClass
     * @summary Create a sub‑class under a department
     * @request POST:/admin/departments/{id}/subclasses
     * @secure
     */
    createSubClass: (
      id: string,
      data: {
        sub_class_name: string;
        /** @format uuid */
        sub_chair_id?: string;
        /** @format uuid */
        sub_vice_id?: string;
        /** @format uuid */
        sub_secretary_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          sub_class_id?: string;
          message?: string;
        },
        any
      >({
        path: `/admin/departments/${id}/subclasses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
