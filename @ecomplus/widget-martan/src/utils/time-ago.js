// Retorna uma hora em formato humanizade
export function timeAgo (date) {
  const segundos = Math.floor((new Date() - new Date(date)) / 1000)

  const intervalos = {
    ano: 31536000,
    mês: 2592000,
    semana: 604800,
    dia: 86400,
    hora: 3600,
    minuto: 60,
    segundo: 1
  }

  let contador

  if (segundos === 0) {
    return 'Agora'
  }

  for (const intervalo in intervalos) {
    contador = Math.floor(segundos / intervalos[intervalo])

    if (contador > 0) {
      if (contador === 1) {
        return `${contador} ${intervalo} atrás`
      } else {
        if (intervalo === 'mês') {
          return `${contador} meses atrás`
        }
        return `${contador} ${intervalo}s atrás`
      }
    }
  }
}
