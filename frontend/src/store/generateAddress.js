const generateAddress = (addressDetails) => {
    if (!addressDetails) {
        return ''
    }
    const keys = [
        'region',
        'subregion',
        'locality',
        'sublocality',
        'district',
        'street',
        'building'
    ];

    let address = [];
    keys.forEach((value) => {
        if (addressDetails[value] && address.indexOf(addressDetails[value]) === -1 && addressDetails[value] !== 'Unnamed Road') {
            address.push(addressDetails[value])
        }
    });

    return address.join(', ')
};

export default generateAddress;