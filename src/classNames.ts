type ClassNames = Array<string | false>

const classNames = (classNames: ClassNames): string => classNames.filter(Boolean).join(' ')

export default classNames
