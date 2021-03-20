export default class UserValidation {
    nameValidation(name) {
        const alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ]
        const firstLetter = name[0]
        if (alphabet.indexOf(firstLetter) === -1) return `Nome não válido (${name})`
        else return name
    }

    brazilianDateHour(text, dateUser, dateInfo) {
        if(!dateUser) return `Não foi possível encontrar a data de ${dateInfo} deste usuário(a)`
        else {
            const date = dateUser.slice(0, 10).split('-').reverse().join('/')
            const hour = dateUser.slice(11, 16)
            return `${text} ${date} às ${hour}`
        }
    }
}