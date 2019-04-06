const generateAddress = (addressDetails) => {
    if (!addressDetails) {
        return ''
    }

    let address = '';
    if (addressDetails.region) {
        address = `${ addressDetails.region }`
    }
    if (addressDetails.locality && addressDetails.region !== addressDetails.locality) {
        address = `${ address }, ${ addressDetails.locality }`
    }
    if (addressDetails.district) {
        address = `${ address }, ${ addressDetails.district }`
    }
    if (addressDetails.street && addressDetails.street !== 'Unnamed Road') {
        address = `${ address }, ${ addressDetails.street }`
    }
    if (addressDetails.building) {
        address = `${ address }, ${ addressDetails.building }`
    }

    if(!addressDetails.region) {
        return address.substring(2)
    }
    return address
};

export default generateAddress;