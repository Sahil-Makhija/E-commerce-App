import request from "./_axios";

class ServerService {

    async PlaceOrder({ data = {} }) {
        return await request({ url: '/user/order', method: 'POST', data })
    }

    //AUTHENTICATION ROUTES
    async Login({ data = {} }) {
        return await request({
            url: '/user/login',
            method: 'POST',
            data
        })
    }

    async SignUp({ data = {} }) {
        return await request({
            url: '/user/signup',
            method: 'POST',
            data
        })
    }

    async UpdateProfile({ data = {}, id = '' }) {
        return await request({
            data,
            url: `/user/update/${id}`,
            method: 'POST'
        })
    }

    async DeleteProfile({ id = '' }) {
        return await request({
            url: `/user/delete/${id}`,
            method: 'DELETE'
        })
    }

    async UpdatePassword({ id = '', data }) {
        return await request({
            url: `/user/update/password/${id}`,
            method: 'POST',
            data
        })
    }
    //ADMIN Routes

    async CreateProduct({data}){
        return await request({
            data,
            url:'/admin/product/new',
            method:'POST'
        })
    }

    async GetAdminStats(){
        return await request({
            url:'/admin/stats',
            method:'GET'
        })
    }

    async GetAuthQuestion({data}){
        return await request({
            url:'/admin/auth-ques',
            data,
            method:'POST'
        })
    }

    async AdminLogin({data}){
        return await request({
            method:'POST',
            data,
            url:'/admin/retrieve'
        })
    }

    async DeleteProduct({slug}){
        return await request({
            url:`/admin/product/delete/${slug}`,
            method:'DELETE'
        })
    }

    async GetAllOrders(){
        return await request({
            url: '/admin/products/all',
            method: 'GET'
        })
    }

    async GetAllProducts() {
        return await request({
            url: '/admin/orders/all',
            method: 'GET'
        })
    }

    async GetAllUsers() {
        return await request({
            url: '/admin/users/all',
            method: 'GET'
        })
    }

    async DeleteUser({ id = '' }) {
        return await request({
            url: `/admin/user/delete/${id}`,
            method: 'DELETE'
        })
    }

    async UpdateProduct({ data, slug }) {
        return await request({
            data,
            url: `/admin/product/update/${slug}`,
            method: 'POST'
        })
    }


}

const API = new ServerService()

export default API;