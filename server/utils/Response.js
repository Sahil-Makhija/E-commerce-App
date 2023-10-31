class Response {
    constructor(res) {
        this.res = res;
    }

    Found(data) {
        return this.res.status(200).json({
            status: true,
            ...data
        });
    }

    Created(data){
        return this.res.status(201).json({
            status: true,
            ...data
        });
    }

    Updated(data){
        return this.res.status(200).json({
            status:true,
            ...data
        })
    }

    Deleted(msg){
        return this.res.status(200).json({
            status:true,
            message:msg||'Resource Deleted Successfully!'
        })
    }

    BadRequest(msg){
        return this.res.status(400).json({
            status:false,
            error:msg||"The request contains invalid data. Please check the request payload and try again."
        })
    }

    NotFound(msg) {
        return this.res.status(404).json({
            status:false,
            error:msg
        })
    }

    InternalError(msg){
        return this.res.status(500).json({
            status:false,
            error:msg || 'Internal Server Error!'
        })
    }

    Conflict(msg){
        return this.res.status(409).json({
            status:false,
            error:msg||'The resource with the given identifier already exists.'
        })
    }
}

module.exports = Response;
