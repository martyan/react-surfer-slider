const classNames = (classNames: Array<string | false>): string => classNames.filter(Boolean).join(' ')

export default classNames
