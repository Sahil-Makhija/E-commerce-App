const cartForLocalStorage = (obj) =>{
    const objArr = []
    obj.map(item =>{
        objArr.push(item.productID)
        objArr.push(item.qty)
        return null
    })
    return objArr

}

export default cartForLocalStorage