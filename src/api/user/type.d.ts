export type LoginParams = {
    username: string;
    password: string;
}
export type LoginParamsByEmail = {
    email: string;
    password: string;
}
export enum Status {
    DISABLE = 0,
    ENABLE = 1,
}
export interface Application {
    id: string;
    clientName: string;
    clientId: string;
    clientVersion: string;
    clientDesc: string;
    clientType: ClientType;
    status: Status;
    shelfType: Status;
    moduleCount: number;
    createdTime: string;
    updatedTime: string;
    webServerRedirectUri: string;
    apiEndpoint: string;
    devTeam: string;
    icon?: string;
    color: string;
    platformType?: 'management' | 'work';
}
export type UserRecord = {
    id: string;
    name: string;
    avatar: string;
    real_name: string;
    deptName: string;
    email: string;
    sexName: string;
    status: Status;
    userCategory: number;
    createTime: string;
    updateTime: string;
    account: string;
    sex: string;
    lastLoginTime: string;
    department?: string;
    postId?: string;
    remark?: string;
    roleName?: string;
    applicationList?: Application[];

}
export type OrgUser = UserRecord & {
    phone: string;
}
export type LearnerUser = UserRecord & {
    firstName: string;
    lastName: string;
    studentCode: string;
    phone: string;
    studentType: string;
    country: string;
    regionCode: string;
    studyLevel: string;
    universityName: string;
    studySpecialty: string;
    auditStatus: string;
    studyDepartment: string;
    studyEnterYear: string;
    updateTime: string;
    reasonRefuse?: string;
}

export type UserSearchParams = {
    name?: string
    user_genre?: string
    status?: string
}


//  组织机构类型
export type OrganizationType = {
    id: string;
    deptName: string;
    parentId: string | null;
    children: OrganizationType[];
    deptCategory: string;
    contactMan: string;
    contactPhone: string;
    email: string;
    memberCount: number;
    status: Status;
    createTime: string
    address: string
    remark: string
}