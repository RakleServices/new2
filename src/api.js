import axios from 'axios';
const responseHandle = (res) => {
    if (res.status == 200) {
        return res.json();
    } else if (res.status == 500 || res.status == 400) {
        res.json.then(console.err);
        return;
    } else if (res.status == 403) {
        sessionStorage.clear();
        window.location.reload(false);
    }
}

const axiosResponseHandle = (res) => {
    if (res.status == 200) {
        return res;
    }
    else if (res.status == 500 || res.status == 400) {
        res.then(console.err);
        return;
    } else if (res.status == 403) {
        sessionStorage.clear();
        window.location.reload(false);
    }
}


const LoginUser = (bphone, password) => {
    return fetch('https://service.nilamiadda.com/userlogin1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bphone, password }),
    }).then(responseHandle)
}
const UpdateNilamiUserSts = (isActive, phone) => {
    return fetch('https://service.nilamiadda.com/updateNilamiuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive, phone }),
    }).then(responseHandle)
}

const GetBranch = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/branch', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}



const InsertBranch = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/branch", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)


}
const DeleteBranch = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/branch/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}


const GetProduct = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/product1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const GetProductByVendor = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/productbyvendor/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const UpsertProduct = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/product", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)

}
const DeleteProduct = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}

const GetCatagory = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/catagory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const UpsertCatagory = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/catagory", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)

}
const DeleteCatagory = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/catagory/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const GetProductTag = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/productTag/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const UpsertProductTag = (body) => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/productTag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    }).then(responseHandle)

}
const DeleteProductTag = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/productTag/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const GetProductImage = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/pImage/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const GetProductAllImage = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/pImage`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const UpsertProductImage = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/productImage", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)

}
const DeleteProductImage = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/productImage/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const GetNilamiUser = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/nilamiUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const InsertBanner = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/banner1", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)

}
const GetBanner = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/banner1', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const DeleteBanner = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/banner1/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const InsertSponsored = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/sponsored", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)

}
const GetSponsored = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/sponsored', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const DeleteSponsored = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/sponsored/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const InsertSpecialOffer = (formdata) => {
    const token = sessionStorage.getItem('token');
    return axios.post("https://service.nilamiadda.com/specialoffer", formdata, {

        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    }).then(axiosResponseHandle)

}
const GetSpecialOffer = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/specialoffer', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const DeleteSpecialOffer = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/specialoffer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const GetPlan = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/subscriptionPlan', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const DeletePlan = (id) => {
    const token = sessionStorage.getItem('token');
    return fetch(`https://service.nilamiadda.com/subscriptionPlan/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    }).then(responseHandle)
}
const InsertPlan = (body) => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/subscriptionPlan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    }).then(responseHandle)

}
const GetContact = () => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/contact_us', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(responseHandle)
}
const PushNOtificationtoAll = (body) => {
    const token = sessionStorage.getItem('token');
    return fetch('https://service.nilamiadda.com/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    }).then(responseHandle)

}
export {
    LoginUser,
    GetBranch,
    GetProduct,
    UpsertProduct,
    DeleteProduct,
    GetCatagory,
    UpsertCatagory,
    DeleteCatagory,
    GetProductTag,
    UpsertProductTag,
    InsertBranch,
    DeleteBranch,
    DeleteProductTag,
    GetProductImage,
    UpsertProductImage,
    DeleteProductImage,
    GetNilamiUser,
    UpdateNilamiUserSts,
    GetBanner,
    DeleteBanner,
    InsertBanner,
    GetPlan,
    DeletePlan,
    InsertPlan,
    GetContact,
    GetProductAllImage,
    InsertSponsored,
    GetSponsored,
    DeleteSponsored,
    GetProductByVendor,
    PushNOtificationtoAll,
    InsertSpecialOffer,
    GetSpecialOffer,
    DeleteSpecialOffer
}