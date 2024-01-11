export const escapeCpf = (cpf: string) => {
    return cpf.replace(/\.|-/gm, '')
}