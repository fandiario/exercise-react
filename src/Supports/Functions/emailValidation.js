function emailValidation (inputEmail) {
    let result = true
    let arr = []

    let specials = "`~!#$%^&*()+={[]}|:;,/"

    for (let i = 0; i < inputEmail.length; i++) {
        // to check if there's @ or . or space at first index
        if (inputEmail[0] === "@" || inputEmail[0] === "." || inputEmail[0] === " ") {
            result = false
        }

        // to check if there are double @ or .
        if (inputEmail[i] === "@" && inputEmail[i - 1] === "@") {
            result = false
        }

        if (inputEmail[i] === "." && inputEmail[i - 1] === ".") {
            result = false
        }

        // to check if there are more than one @
        if (inputEmail[i] === "@") {
            arr.push (inputEmail[i])

            // if there's more than one @
            if (arr.length !== 1) {
                result = false
                arr = []
            }
        }
        
        // to check if there's special symbols
        for (let j = 0; j <specials.length; j++) {
            if (inputEmail[i] === specials[j]) {
                result = false
            }
        }

    }
    
    return result
}   

export default emailValidation