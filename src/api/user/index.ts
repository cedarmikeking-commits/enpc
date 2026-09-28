import { md5 } from "js-md5"
import { http } from "../http"
import { PageParams, ResPage } from "../type"
import { LoginParams, LoginParamsByEmail, OrganizationType, UserRecord, UserSearchParams } from "./type"


/**
 * 密码登录
 * @param params 
 * @returns 
 */
export const loginByPassword = (params: LoginParams): Promise<{ access_token: string, refresh_token: string, real_name: string }> => {
    const query = `grant_type=password&username=${params.username}&password=${params.password}`
    return http.post('/blade-auth/oauth/token?' + query)
}

/**
 * 邮箱登录
 * @param params 
 * @returns 
 */
export const loginByEmail = (params: LoginParamsByEmail): Promise<{ access_token: string, refresh_token: string, real_name: string }> => {
    const query = `grant_type=email&email=${params.email}&password=${params.password}`
    return http.post('/blade-auth/oauth/token?' + query)
}
/**
 * 退出登录
 * @returns 
 */
export const logout = (): Promise<void> => {
    return http.get('/blade-auth/oauth/logout', {}, { ignoreAuth: true })
}

/**
 * 用户分页查询
 * @param params
 * @returns
 * 
 */
export const queryUserPage = (params: UserSearchParams & PageParams): Promise<ResPage<UserRecord>> => {
    return http.get('/blade-system/user/szxy/userPage', params)
}

/**
 * 重置用户密码
 * @param params 
 * @returns 
 */
export const resetUserPassword = (params: { id: string, newPassword: string, newpassword1: string }): Promise<void> => {
    return http.post('/blade-system/user/reset-password', params)
}

/**
 * 启停用用户
 * @param id
 * @param status
 * @returns
 */
export const toggleUserStatus = (id: string, status: number): Promise<void> => {
    return http.post('/blade-system/user/szxy/userDisableAndEnable', { id, status })
}

/**
 * 用户统计
 * @returns
 */
export const getUserStatistics = (): Promise<{ totalName: number, orgName: number, learnerName: number, otherName: number }> => {
    return http.get('/blade-system/user/szxy/userStatistics')
}

/**
 * 个人中心
 */
export const getUserProfile = (): Promise<UserRecord> => {
    return http.get('/blade-system/user/szxy/applicationCenter')
}

/**
 * 修改个人资料
 * @param data 
 * @returns 
 */
export const updateUserProfile = (data: Partial<UserRecord>): Promise<void> => {
    return http.post('/blade-system/user/updateUserProfile', data)
}

/**
 * 修改用户密码
 * @param oldPassword 
 * @param newPassword 
 * @param newpassword1 
 * @returns 
 */
export const updateUserPassword = (oldPassword: string, newPassword: string, newPassword1: string): Promise<void> => {
    return http.post('/blade-system/user/szxy/centerUpdatePassword', { oldPassword: md5(oldPassword), newPassword: md5(newPassword), newPassword1: md5(newPassword1) })
}

/**
 * 获取所属组织树
 * @returns 
 */
export const getOrganizationTree = (params: { [key: string]: any }): Promise<OrganizationType[]> => {
    return http.get('/blade-system/dept/szxy/organizationTree', params)
}
