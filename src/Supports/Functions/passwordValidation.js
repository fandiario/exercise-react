function passwordValidation (inputPassword) {
    let result = true

    if (inputPassword.length <= 8) {
        result = false
    }

    return result
}

export default passwordValidation